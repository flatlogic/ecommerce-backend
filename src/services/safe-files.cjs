const fs = require('fs');
const path = require('path');

function invalidPath() {
  const error = new Error('Invalid file path');
  error.status = 400;
  return error;
}

function relativeParts(value) {
  if (typeof value !== 'string' || !value || /[\\\0]/.test(value) || path.isAbsolute(value)) {
    throw invalidPath();
  }
  const parts = value.split('/');
  if (parts.some(part => !part || part === '.' || part === '..' || part.includes(':'))) {
    throw invalidPath();
  }
  return parts;
}

function requireInside(root, target) {
  const relative = path.relative(root, target);
  if (!relative || relative === '..' || relative.startsWith('..' + path.sep) || path.isAbsolute(relative)) {
    throw invalidPath();
  }
}

exports.downloadPath = function downloadPath(root, name) {
  const parts = relativeParts(name);
  let realRoot;
  let target;
  try {
    realRoot = fs.realpathSync(root);
    target = fs.realpathSync(path.join(realRoot, ...parts));
  } catch (error) {
    if (error.code === 'ENOENT' || error.code === 'ENOTDIR') {
      error.status = 404;
    }
    throw error;
  }
  requireInside(realRoot, target);
  if (!fs.statSync(target).isFile()) {
    throw invalidPath();
  }
  return target;
};

exports.uploadPath = function uploadPath(root, folder, filename) {
  const nameParts = relativeParts(filename);
  if (nameParts.length !== 1 || Buffer.byteLength(filename) > 255) {
    throw invalidPath();
  }
  const folderParts = relativeParts(folder);
  fs.mkdirSync(root, { recursive: true });
  const realRoot = fs.realpathSync(root);
  let directory = realRoot;
  for (const part of folderParts) {
    directory = path.join(directory, part);
    fs.mkdirSync(directory, { recursive: true });
    if (fs.lstatSync(directory).isSymbolicLink()) {
      throw invalidPath();
    }
    requireInside(realRoot, fs.realpathSync(directory));
  }
  return path.join(directory, filename);
};

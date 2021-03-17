const db = require('../models');
const assert = require('assert');

module.exports = class FileDBApi {
  static async replaceRelationFiles(
    relation,
    rawFiles,
    options,
  ) {
    assert(relation.belongsTo, 'belongsTo is required');
    assert(
      relation.belongsToColumn,
      'belongsToColumn is required',
    );
    assert(relation.belongsToId, 'belongsToId is required');

    let files = [];

    if (Array.isArray(rawFiles)) {
      files = rawFiles;
    } else {
      files = rawFiles ? [rawFiles] : [];
    }

    await this._removeLegacyFiles(relation, files, options);
    await this._addFiles(relation, files, options);
  }

  static async _addFiles(relation, files, options) {
    const transaction = (options && options.transaction) || undefined;
    const currentUser = (options && options.currentUser) || {id: null};

    const inexistentFiles = files.filter(
      (file) => !!file.new,
    );

    for (const file of inexistentFiles) {
      await db.file.create(
        {
          belongsTo: relation.belongsTo,
          belongsToColumn: relation.belongsToColumn,
          belongsToId: relation.belongsToId,
          name: file.name,
          sizeInBytes: file.sizeInBytes,
          privateUrl: file.privateUrl,
          publicUrl: file.publicUrl,
          createdById: currentUser.id,
          updatedById: currentUser.id,
        },
        {
          transaction,
        },
      );
    }
  }

  static async _removeLegacyFiles(
    relation,
    files,
    options,
  ) {
    const transaction = (options && options.transaction) || undefined;

    const filesToDelete = await db.file.findAll({
      where: {
        belongsTo: relation.belongsTo,
        belongsToId: relation.belongsToId,
        belongsToColumn: relation.belongsToColumn,
        id: {
          [db.Sequelize.Op
            .notIn]: files
            .filter((file) => !file.new)
            .map((file) => file.id)
        },
      },
      transaction,
    });

    for (let file of filesToDelete) {
      await file.destroy({
        transaction,
      });
    }
  }
};

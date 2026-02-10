FROM node:12-buster
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
ENV NODE_ENV=production
EXPOSE 8080
CMD ["node", "src/index.js"]

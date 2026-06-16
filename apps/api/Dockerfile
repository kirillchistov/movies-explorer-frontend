FROM node:22-alpine AS runtime

WORKDIR /app

COPY package*.json lerna.json ./
COPY packages/shared/package.json packages/shared/package.json
COPY apps/web/package.json apps/web/package.json
COPY apps/api/package.json apps/api/package.json

RUN npm ci

COPY packages/shared packages/shared
COPY apps/api apps/api

RUN npm run build --workspace packages/shared \
  && npm run build --workspace apps/api

ENV NODE_ENV=production
EXPOSE 3003

CMD ["node", "apps/api/dist/app.js"]

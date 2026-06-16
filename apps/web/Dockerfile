FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json lerna.json ./
COPY packages/shared/package.json packages/shared/package.json
COPY apps/api/package.json apps/api/package.json
COPY apps/web/package.json apps/web/package.json

RUN npm ci

COPY packages/shared packages/shared
COPY apps/web apps/web

ARG VITE_API_BASE_URL=/api
ARG VITE_MOVIES_API_URL=https://api.nomoreparties.co/beatfilm-movies
ARG VITE_PUBLIC_BASE=/

ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_MOVIES_API_URL=$VITE_MOVIES_API_URL
ENV VITE_PUBLIC_BASE=$VITE_PUBLIC_BASE

RUN npm run build --workspace packages/shared \
  && npm run build --workspace apps/web

FROM nginx:1.27-alpine AS runtime

COPY apps/web/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/apps/web/dist /usr/share/nginx/html

EXPOSE 80

FROM node:24.18.1-alpine

WORKDIR /app
ENV NODE_ENV=production

COPY package.json tsconfig.json ./
RUN npm i -g corepack
RUN corepack enable && corepack prepare --activate
COPY pnpm-*.yaml ./
RUN pnpm install --frozen-lockfile --prod --ignore-scripts
RUN pnpm dlx jsr add @mkvlrn/config -D
RUN npm i -g tsx
COPY src/ ./src/
COPY .env.schema env.d.ts ./
USER node

CMD ["tsx", "src/main.ts"]

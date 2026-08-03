FROM node:24.18.1-alpine

WORKDIR /app
ENV NODE_ENV=production
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0

COPY package.json ./
RUN npm i -g corepack
RUN corepack enable && corepack prepare --activate
COPY pnpm-*.yaml ./
RUN pnpm install --frozen-lockfile --prod --ignore-scripts
RUN echo '{"compilerOptions":{"paths":{"#/*":["./src/*"]},"experimentalDecorators":true,"emitDecoratorMetadata":true}}' > ./tsconfig.json
COPY src/ ./src/
COPY .env.schema env.d.ts ./
USER node

CMD ["pnpm", "-q", "dlx", "tsx", "src/main.ts"]

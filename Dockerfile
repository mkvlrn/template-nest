FROM node:24.19.0-alpine@sha256:d32cdf619f63fe0471182d08996dd516c6275bb5fd31ae06e55a570bd9e1ad43

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

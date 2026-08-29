FROM node:26.8.1-alpine@sha256:50c3b2f6988dfc307b86e5301d69611af31f4789bdf232863b07d3b02fe55ae0

WORKDIR /app
ENV NODE_ENV=production

COPY package.json ./
RUN npm i -g pnpm tsx
COPY pnpm-*.yaml ./
RUN pnpm install --frozen-lockfile --prod --ignore-scripts
RUN echo '{"compilerOptions":{"paths":{"#/*":["./src/*"]},"experimentalDecorators":true,"emitDecoratorMetadata":true}}' > ./tsconfig.json
COPY src/ ./src/
COPY .env.schema env.d.ts ./
USER node

CMD ["tsx", "src/main.ts"]

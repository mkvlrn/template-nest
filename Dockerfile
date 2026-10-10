FROM node:26.11.1-alpine@sha256:143494b1da2945f061539253adc65e4f1569ddf07da2d384c022c791a9d90a4a

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

# template-nest

[![ci](https://img.shields.io/github/actions/workflow/status/mkvlrn/template-nest/checks.yml?branch=main&style=flat&logo=github&label=ci)](https://github.com/mkvlrn/template-nest/actions/workflows/checks.yml?query=branch%3Amain)
[![template](https://img.shields.io/badge/template-use_this_template-2ea44f?style=flat&logo=github)](https://github.com/mkvlrn/template-nest/generate)
[![mise](https://mise-versions.jdx.dev/badge.svg)](https://mise.jdx.dev)
[![license](https://img.shields.io/github/license/mkvlrn/template-nest?style=flat)](https://github.com/mkvlrn/template-nest/blob/main/LICENSE)

A sane, opinionated template for ESM NestJS projects written in TypeScript without a transpilation step during development — TypeScript is executed directly by Node.js.

> [!NOTE]
> This template includes an Arch Linux Dev Container based on [mise-devcontainers](https://github.com/mkvlrn/mise-devcontainers), providing a consistent development environment with [mise](https://mise.jdx.dev) preconfigured.
>
> `mise` manages the project-specific runtimes, tools, and tasks inside the container, so it does not need to be installed on the host.

Uses, among other tools/packages:

- [pnpm](https://github.com/pnpm/pnpm) as package manager
- [Biome](https://github.com/biomejs/biome) for linting and formatting
- [Lefthook](https://github.com/evilmartians/lefthook) for Git hooks
- [Cocogitto](https://github.com/cocogitto/cocogitto) for commit message linting
- [Vitest](https://github.com/vitest-dev/vitest) for testing
- [tsx](https://github.com/privatenumber/tsx) for development-time TypeScript execution

## requirements and dependencies

To use the included Dev Container you need:

- Docker or a compatible container runtime
- a Dev Container-compatible editor or the [Dev Container CLI](https://github.com/devcontainers/cli)
- an SSH agent exposed through `SSH_AUTH_SOCK` with at least one key loaded

The SSH agent is forwarded into the container for Git authentication and commit signing. Private keys remain on the host.

Once inside the container, install the project dependencies:

```sh
pnpm install
```

The project-specific runtimes and development tools are managed by `mise`.

If you prefer not to use the Dev Container, install [mise](https://mise.jdx.dev) locally and run `mise install` before installing the project dependencies.

> [!NOTE]
> Git hooks keep the tooling managed by mise and the project dependencies synchronized after checkouts and merges.

## why use this template instead of nestjs-cli?

- ESM
- Biome instead of ESLint + Prettier
- no build-then-run development flow; Node.js runs the TypeScript source using tsx
- Vitest instead of Jest
- no Nest CLI code-generation dependencies or `nest-cli.json`
- the result pattern is available through [@mkvlrn/result](https://www.npmjs.com/package/@mkvlrn/result), together with the global filter, for explicit error handling
- a smaller, stricter, and more modernized starting point while retaining the usual NestJS project structure

## subpath imports

Subpath imports (`#/`) are used instead of relative paths. They are mapped through the `imports` field in `package.json`, allowing native Node.js resolution at runtime without additional build tooling, and mirrored in `tsconfig.json` for editor support.

Example:

```ts
import { add } from "#/lib/math"; // ./src/lib/math.ts
```

## running

### `mise dev`

Runs the project in watch mode.

### `mise test`

Runs the tests.

### `mise lint-fix`

Runs Biome in fix mode to lint and format the project.

### `mise typecheck`

Runs TypeScript type checking.

## ci

CI is provided by GitHub Actions through [`.github/workflows/checks.yml`](https://github.com/mkvlrn/template-nest/blob/main/.github/workflows/checks.yml).

It runs:

- Biome linting and formatting checks
- TypeScript type checking
- Vitest tests

## license

[MIT](https://github.com/mkvlrn/template-nest/blob/main/LICENSE)

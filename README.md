# template-nest

![build](https://img.shields.io/github/actions/workflow/status/mkvlrn/template-nest/checks.yml?branch=main&style=flat&logo=github)
[![template](https://img.shields.io/badge/template-use_this_template-2ea44f?style=flat&logo=github)](https://github.com/mkvlrn/template-nest/generate)
[![mise](https://mise-versions.jdx.dev/badge.svg)](https://mise.jdx.dev)
![license](https://img.shields.io/github/license/mkvlrn/template-nest?style=flat)

A sane, opinionated template for esm nestjs projects written in typescript that doesn't rely on transpilation - typescript is executed directly by node.

> [!CAUTION]
> This template requires [mise](https://mise.jdx.dev) to manage runtimes, tools, and tasks in a single workflow, providing a lightweight alternative to devcontainers.
>
> You must [install mise](https://mise.jdx.dev/installing-mise.html) before starting. If you prefer a less opinionated setup, this template isn't for you.

Uses, among other tools/packages:

- [pnpm](https://github.com/pnpm/pnpm) as package manager for node
- [biome](https://github.com/biomejs/biome) for code linting and formatting
- [lefthook](https://github.com/evilmartians/lefthook) for git hooks
- [cocogitto](https://github.com/cocogitto/cocogitto) for commit message linting
- [vitest](https://github.com/vitest-dev/vitest) for testing
- [tsx](https://github.com/privatenumber/tsx) for dev time typescript

## requirements and dependencies

As noted at the top, you need [mise](https://mise.jdx.dev) to get started with this template. Run `mise install` in the project root to fetch the pinned versions of Node and other tools locally.

This is _by far_ the easiest way to keep your environment consistent across different machines and team members, no matter the frequency of version updates.

Once the tooling is installed, you can install the Node dependencies with `pnpm install`.

> [!NOTE]
> Git hooks are in place to make sure both the tooling managed by mise and the project dependencies are synced with each checkout and merge.

## why use this template instead of nestjs-cli?

- esm
- biome is objectively faster and overall a better choice over eslint+prettier
- no weird build-then-run-dev flow, node (with tsx loader) runs the code
- people still using jest should... reconsider
- any kind of code generation is ass, but nestjs's cli is _particularly_ terrible, so dependencies for that and the nest-cli.json file are gone - just add files yourself, I promise you'll be fine
- the result pattern is used with the [@mkvlrn/result](https://jsr.io/@mkvlrn/result) package - together with the global filter, error handling becomes a breeze; it is of course optional, but I think it's a good idea to just use it _everywhere_
- overall it's just as opinionated, but a tad cleaner, stricter, and modernized

Just check what is in it, it't not that different from what you'd get with nestjs-cli.

## subpath imports

Subpath imports (`#/`) are used instead of relative paths, mapped via the `imports` field in `package.json` (allowing native Node resolution at runtime without extra build tools) and mirrored in `tsconfig.json` for IDE support.

**Example**:

```ts
import { add } from "#/lib/math"; // this points to ./src/lib/math.ts
```

## running

### `mise dev`

Runs the project in watch mode.

### `mise test`

Runs tests.

### `mise lint-fix`

Runs biome in fix mode to lint and format the project.

### `mise typecheck`

Runs type checking using tsc.

## ci

This repository uses GitHub Actions for CI. The workflow is defined in `.github/workflows/checks.yml`.

It automates:

- **Linting & Formatting**: Running Biome.
- **Type Checking**: Running TypeScript type checking.
- **Testing**: Running Vitest, halting the workflow at the first test failure.

## vscode

You might want to install the recommended extensions in vscode. Search for **@recommended** in the extensions tab, they'll show up as _"workspace recommendations"_.

If you have been using eslint and prettier and their extensions, you might want to disable eslint entirely and keep prettier as the formatter only for certain types of files.

This is done by the `.vscode/settings.json` file.

Debug configuration is also included for running the source directly with node.

## license

MIT

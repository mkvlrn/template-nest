# template-nest

A sane, opinionated template for esm nestjs projects written in typescript.

For new, node 24+ projects.

Uses:

- [biome](https://github.com/biomejs/biome) for linting and formatting
- [commitlint](https://github.com/conventional-changelog/commitlint) for linting commit messages
- [husky](https://github.com/typicode/husky) for git hooks
- [lint-staged](https://github.com/lint-staged/lint-staged) for checks on commit
- [vitest](https://github.com/vitest-dev/vitest) for testing
- [tsx](https://github.com/privatenumber/tsx) for dev time typescript

## why use this template instead of nestjs-cli?

- esm
- biome is objectively faster and overall a better choice over eslint+prettier
- no weird build-then-run-dev flow, tsx runs the dev code
- people still using jest should... reconsider
- any kind of code generation is ass, but nestjs's cli is _particularly_ terrible, so dependencies for that and the nest-cli.json file are gone - just add files yourself, I promise you'll be fine
- overall it's just as opinionated, but a tad cleaner, stricter, and modernized

Just check what is in it, it't not that different from what you'd get with nestjs-cli.

## running

### `pnpm dev`

Runs the project in watch mode with tsx.

### `pnpm build`

Builds/transpiles the code to `./build`.

### `pnpm start`

Runs the built project.

### `pnpm test`, `pnpm test-e2e`

Runs tests.

### `pnpm biome-fix`

Runs biome in fix mode (only [safe fixes](https://biomejs.dev/linter/#safe-fixes)) to lint and format the project.

### `pnpm typecheck`

Runs type checking using tsc.

## vscode

You might want to install the recommended extensions in vscode. Search for **@recommended** in the extensions tab, they'll show up as _"workspace recommendations"_.

If you have been using eslint and prettier and their extensions, you might want to disable eslint entirely and keep prettier as the formatter only for certain types of files.

This is done by the `.vscode/settings.json` file.

Debug configurations are also included (for source using tsx and for bundle using the generated source maps).

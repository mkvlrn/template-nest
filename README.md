# template-nest

A sane, opinionated template for esm nestjs projects written in typescript.

Uses:

- [biome](https://github.com/biomejs/biome) for linting and formatting
- [vitest](https://github.com/vitest-dev/vitest) for tests
- [commitlint](https://github.com/conventional-changelog/commitlint) for linting commit messages
- [husky](https://github.com/typicode/husky) for git hooks

## why use this template instead of nestjs-cli?

- esm
- biome is a linter/formatter running on git hooks (pre-commit, pre-push)
- vitest as a test runner
- overall it's just as opinionated, but a tad cleaner, stricter, and modernized

The cli is "fine", but it seems that project will take a long time before they decide to modernize it by supporting esm, switch to vitest (or the native test runner), use biome (which is better than eslint/prettier overall, and they probably won't even upgrade eslint to the flat config which is at least beareble) and removing some bloat.

Just check what is in it, it't not that different from what you'd get with nestjs-cli.

## running

### `yarn dev`

Runs the project in watch mode, automatically restarting on changes.

### `yarn build`

Builds/transpiles the code to `./build`.

### `yarn start`

Runs the built project.

### `yarn test`, `yarn test:e2e`

Runs tests with vitest.

### `yarn tidy`

Runs biome in fix mode (only [safe fixes](https://biomejs.dev/linter/#safe-fixes)) to lint and format the project. Not only `./src` and `./test`, but also all "loose" config files around root (js, ts, json, jsonc) or other directories.

### `yarn typecheck`

Runs typechecking using tsc and the `tsconfig.json` file.

## that tsconfig.json seems very strict and opinionated

Yup.

## vscode

You might want to install the recommended extensions in vscode. Search for **@recommended** in the extensions tab, they'll show up as _"workspace recommendations"_.

If you have been using eslint and prettier and their extensions, you might want to disable eslint entirely and keep prettier as the formatter only for certain types of files.

I suggesting using the settings in `.vscode/settings-example.json`, that should be pasted into your own `.vscode/settings.json`. I'm not commiting the `.vscode/settings.json` proper because it shouldn't be in VCS as it contains your personal settings.

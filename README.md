# template-nest

A sane, opinionated template for esm nestjs projects written in typescript.

For new, node 24+ projects.

Uses:

- [biome](https://github.com/biomejs/biome) for linting and formatting
- [commitlint](https://github.com/conventional-changelog/commitlint) for linting commit messages
- [husky](https://github.com/typicode/husky) for git hooks
- [vite](https://github.com/vitejs/vite) for building
- [vitest](https://github.com/vitest-dev/vitest) for testing
- [tsx](https://github.com/privatenumber/tsx) for dev time typescript

## why use this template instead of nestjs-cli?

- esm
- biome is objectively faster and overall a better choice over eslint+prettier
- no weird build-then-run-dev flow, tsx runs the dev code
- people still using jest should... reconsider
- building the right way with vite
- any kind of code generation is ass, but nestjs's cli is particularly terrible, so dependencies for that and the nest-cli.json file are gone - just add files yourself, I promise you'll be fine
- overall it's just as opinionated, but a tad cleaner, stricter, and modernized

Just check what is in it, it't not that different from what you'd get with nestjs-cli.

## running

### `npm run dev`

Runs the project in watch mode with tsx.

### `npm run build`

Builds/transpiles the code to `./build`.

### `npm start`

Runs the built project.

### `npm test`, `npm run test-e2e`

Runs tests.

### `npm run biome-fix`

Runs biome in fix mode (only [safe fixes](https://biomejs.dev/linter/#safe-fixes)) to lint and format the project.

### `yarn typecheck`

Runs type checking using tsc.

## that tsconfig.json seems very strict and opinionated

Yup.

## vscode

You might want to install the recommended extensions in vscode. Search for **@recommended** in the extensions tab, they'll show up as _"workspace recommendations"_.

If you have been using eslint and prettier and their extensions, you might want to disable eslint entirely and keep prettier as the formatter only for certain types of files.

This is done by the `.vscode/settings.json` file.

Debug configurations are also included (for source using tsx and for bundle using the generated source maps).

# template-nest

A sane, opinionated template for esm nestjs projects written in typescript.

Uses biome, vitest, swc.

## why use this instead of nestjs-cli?

- biome is a linter/formatter running on git hooks (pre-commit, pre-push)
- vitest as a test runner
- project runs (`yarn dev`) in esm mode without having to compile first
- builds with swc

The cli is "fine", but it seems that project will take a long time before they decide to modernize it by supporting esm, switch to vitest (or the native test runner), use biome (which is better than eslint/prettier overall, and they probably won't even upgrade eslint to the flat config which is at least beareble) and run without having to compile first.

Just check what is in it, it't not that different from what you'd get with nestjs-cli.

## running

### `yarn dev`

Runs the project in watch mode, automatically restarting on changes. Uses swc to run the typescript code without transpiling to `./build`.

### `yarn build`

Builds the project to `./build`. Again uses swc, but this time it will transpile to esm compatible javascript.

### `yarn start`

Runs the built project.

### `yarn test`, `yarn test:integration`, `yarn test:e2e`

Vitest is configured to work in 3 different types of tests, indicated by the script name (`yarn test` without a specifier will run unit tests).

### `yarn tidy`

This will run biome in fix mode (only [safe fixes](https://biomejs.dev/linter/#safe-fixes)) to lint and format the project. Directories `./src` and `./test`, along with all "loose" compatible files in the root of the project (js, ts, json, jsonc) will be processed.

### `yarn typecheck`

Check for typescript type errors with `tsc`. No transpilation is done.

## that tsconfig.json seems very strict and opinionated

Yup.

## test conventions

Convention over configuration, yo. But configure away if you must!

Three directories laid out in the root of the project:

- `./test` for unit tests, mirroring the structure of `./src`
- `./test-integration` for integration tests
- `./test-e2e` for end-to-end tests

Within each of these directories, the `_mocks`, `_setup`, and `_utils` directories should hold any mocks, vitest setup files (those are used automatically by the vitest config), and general utilities for the tests.

Since the folder directories are path aliased, any mocks or utilities needed by the tests can be imported from the 🧪 alias, such as `🧪/_utils/my-util.ts`. You can change the alias in the `tsconfig.json` file if you find it difficult to use emojis and you _hate fun_.

The tests are run with vitest, which is configured in `./vitest.config.ts`. This config depends on this directory structure, and will automatically find all the tests in the `./test` directory.

## vscode

You might want to install the recommended extensions in vscode (workspace recommended):

- [biomejs.biome](https://marketplace.visualstudio.com/items?itemName=biomejs.biome)
- [ms-vscode.test-adapter-converter](https://marketplace.visualstudio.com/items?itemName=ms-vscode.test-adapter-converter)
- [vitest.explorer](https://marketplace.visualstudio.com/items?itemName=vitest.explorer)

If you have been using eslint and prettier and their extensions, you might want to disable eslint entirely and keep prettier as the formatter only for certain types of files.

I suggest using this configuration (YMMV):

```json
{
  "[css][jsonc][json][javascript][javascriptreact][typescript][typescriptreact]": {
    "editor.defaultFormatter": "biomejs.biome"
  },
  "[markdown][html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "biome.enabled": true,
  "editor.codeActionsOnSave": {
    "quickfix.biome": "explicit",
    "source.fixAll": "never",
    "source.organizeImports.biome": "never"
  },
  "eslint.enable": false
}
```

These settings are in `.vscode/settings-example.json` and you should paste into your own `.vscode/settings.json`, or create a new one. I'm not commiting the `.vscode/settings.json` proper because it shouldn't be in VCS as it contains your personal settings.

# template-nest

A sane, opinionated template for esm nestjs projects written in typescript.

Uses biome, vitest, swc.

## why use this instead of nestjs-cli?

- biome is a linter/formatter running on git hooks (pre-commit, pre-push)
- vitest is a test runner
- project runs (`yarn dev`) in esm mode without having to compile first
- builds with swc

The cli is "fine", but it seems that project will drag its feet for what seems to be a few years before they decide to modernize it by supporting esm, switch to vitest (or the native test runner), use biome (which is better than eslint/prettier overall, and they probably won't even upgrade eslint to the flat config which is at least beareble) and run without having to compile first.

Just check the scripts and figure it out, it's really not complicated to get it going.

## running

### `yarn dev`

This will run the project in watch mode, and will automatically restart on changes. Uses swc to run the typescript code without transpiling to `./build`.

### `yarn build`

This will build the project to `./build`. Again uses swc, but this time it will transpile to esm compatible javascript.

### `yarn start`

This will run the project in production mode. Uses the `./build` directory to run the project.

### `yarn test`

This will run vitest tests once. Use `--watch` to run in watch mode, and `--coverage` to generate coverage reports.

### `yarn tidy`

This will run biome in fix mode (only safe fixes) to lint and format the project. Directories `./src` and `./test`, along with all "loose" compatible files in the root of the project (js, ts, json, jsonc) will be processed.

### `yarn typecheck`

This will run the typescript compiler to check for type errors. Does not transpile any files, only checks the type errors.

## vscode

You might want to install the recommended extensions in vscode (workspace recommended):

- [biomejs.biome](https://marketplace.visualstudio.com/items?itemName=biomejs.biome)
- [EditorConfig.EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
- [ms-vscode.test-adapter-converter](https://marketplace.visualstudio.com/items?itemName=ms-vscode.test-adapter-converter)
- [vitest.explorer](https://marketplace.visualstudio.com/items?itemName=vitest.explorer)

These are the recommended settings (not commited to git because ultimately they are personal). Should be in `.vscode/settings.json` as to not mess with your global settings:

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
    "source.fixAll.sortJSON": "never",
    "source.organizeImports": "never",
    "source.organizeImports.biome": "explicit",
    "source.sortImports": "never"
  },
  "eslint.enable": false
}
```

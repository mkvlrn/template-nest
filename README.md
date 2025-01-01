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

### important

Since this is an esm project and path aliases are configured (see tsconfig.json), all imports must be the full name of the file, e.g. `~/app.service.ts` instead of `~/app.service`.

It's the [rule for esm in node](https://nodejs.org/api/esm.html#mandatory-file-extensions).

Node isn't happy with importing from `.ts` extensions (it can be done but why bother?), so `.js` is used and vscode understands it just fine.

### for non vscode users

![to the gulag!](https://i.imgflip.com/3gg3ge.jpg)

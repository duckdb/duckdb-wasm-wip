# DuckDB-Wasm experimental deployment

Live deployment: https://shellwip.duckdb.org/

Trackig issue: https://github.com/duckdb/duckdb-wasm/issues/1202

This is an experimental deployment of [duckdb-wasm](https://github.com/duckdb/duckdb-wasm)'s shell that enables extension loading.

Main idea is allow testing with this feature to be able to collect feedback.

## Featured: Extension Loading
Extension are currently build-in duckdb-wasm package, but that's it's not scalable and do not allows flexible deployments.
[Duckdb extensions](https://duckdb.org/docs/extensions/overview) are a powerful way to deliver opt-in featues, and the idea is experimenting with this to allow bringing that also to duckdb-wasm.

To stress test extension loading, in the current [shellwip](https://shellwip.duckdb.org/)  NO extension are pre-loaded at start-up, so "LOAD parquet;" is for example needed to allow accessing Parquet files.

## Basics
```
duckdb> set Calendar = 'gregorian';
Catalog Error: Setting with name "Calendar" is not in the catalog, but it exists in the icu extension.

To install and load the extension, run:
INSTALL icu;
LOAD icu;

duckdb> LOAD icu;
┌┐
└┘

duckdb> set Calendar = 'gregorian';
┌┐
└┘
```
or from a (CORS-)reachable URL:
```
duckdb> LOAD "https://raw.githubusercontent.com/duckdb/duckdb-wasm-wip/main/static/assets/eh/extensions/json.extension.wasm";
┌┐
└┘

```

Each extension is delivered as a single WebAssembly file with a custom dynlink section that provides relocation informations. Providing a full path means fetching the extension from there, while providing a short name would look up extension in the extensions folder in the local deployment.

## Support table
|name|deployed|mantainer|situation|notes|
|:----|:----|:----|:----|:----|
|excel|X|🌳|⚙️| |
|fts|X|🌳|⚙️| |
|icu|X|🌳|✅| |
|inet|X|🌳|⚙️| |
|json|X|🌳|✅|works, improvement on current status, https://github.com/duckdb/duckdb-wasm/discussions/1228|
|parquet|X|🌳|⚙️| |
|tpcds|X|🌳|⚙️| |
|tpch|X|🌳|⚙️| |
|spatial|X|🦆|⚙️| |
|httpfs| |🌳|🚧|S3 functionality broken: https://github.com/duckdb/duckdb-wasm/issues/1207|
|jemalloc| |🌳|⛔|compilation fails|
|sqlsmith| |🌳|⚙️| |
|visualizer| |🌳|⚙️| |
|quack| |🦆|✅|works!|
|postgres_scanner| |🦆|⚙️| |
|sqlite_scanner| |🦆|🚧|core functionality missing: https://github.com/duckdb/duckdb-wasm/issues/1213|
|substrait| |🦆|⚙️| |

🌳 = in-tree, 🦆 = DuckDB Labs, 🚧 = known problems, ⛔ = blocked

⚙️ = compiles, no real test have been performed
✅ = compiles AND seems to work

If you happen to experiment with a given ⚙️-extension, please send a PR adding relevant comments or movign to ✅.

## Differences with DuckDB's CLI
INSTALL is a no-op and unchecked.

## Missing
Wasm extension signing is currently disabled.

Exposing extension API to JavaScript API, to allow loading at start-up of a given set of extensions.

JavaScript API to register where extensions should be looked up.

While providing an URL, the right one has to be provided for a given bundle (eh or mvp), we haven't settled yet for a naming-schema that allow to provide bundle compatible URLs.

Documentation and instructions.

## Extension developer?
Creating extensions currently requires using a recent Emscripten providing specific linking time flags (`-fPIC -fSIDE_MODULE`), and the current target are C/C++ extensions.

Documentation is coming on how to compile your own extensions!

You developed a Rust extension? There are (sketchy) plans on how to make possible, but do get in touch.

## What's next
The idea for this phase is trying things out and collecting feedback, while working on making this available (opt-in at first) in main duckdb-wasm.

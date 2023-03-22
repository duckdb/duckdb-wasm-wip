# DuckDB-Wasm experimental deployment

Live demo: https://duckdb.github.io/duckdb-wasm-wip/

This is an experimental deployment of [duckdb-wasm](https://github.com/duckdb/duckdb-wasm)'s shell that enables extension loading.

Main idea is allow testing with this feature to be able to collect feedback.

Note that in this experiment NO extension are pre-loaded at start-up, so "LOAD parquet;" is for example needed to allow accessing Parquet files.

## Missing
INSTALL is currently a no-op, there is no registeration of extensions, extension signing currently disabled.

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

## Support table
|name|mantainer|situation|notes|
|:----|:----|:----|:----|
|excel|🌳|⚙️| |
|fts|🌳|⚙️| |
|httpfs|🌳|🚧|compiles with minor modifycations, but it's expect to be broken|
|icu|🌳|⚙️| |
|inet|🌳|⚙️| |
|jemalloc|🌳|⛔|compilation fails|
|json|🌳|⚙️| |
|parquet|🌳|⚙️| |
|sqlsmith|🌳|⚙️| |
|tpcds|🌳|⚙️| |
|tpch|🌳|⚙️| |
|visualizer|🌳|⚙️| |
|quack|🦆|✅|works!|
|postgres_scanner|🦆|⚙️| |
|sqlite_scanner|🦆|⚙️| |
|substrait|🦆|⚙️| |

Each extension is delivered a WebAssembly file with a custom dynlink section that provides relocation informations.

## What's next
The idea for this phase is trying things out and collecting feedback, while working on making this available (opt-in at first) in main duckdb-wasm.

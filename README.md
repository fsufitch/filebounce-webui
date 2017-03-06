# File Bounce Web UI

This is a single page application web UI for connecting to a
File Bounce Transfer Node to upload files (and eventually to a
File Bounce Arbiter to negotiate transfer nodes).

## Requirements

* node 6.7.0+ (with npm)

## Setup

First, clone the repository. Then, with the repository as the current folder:

    npm install

This will install all necessary NPM dependencies and generate the protobuf
code necessary for the project to build.

## Development Commands

| Command  | Explanation   |
| --------: | :------------- |
| `npm start` | Alias for `npm run server:dev` |
| `npm run server` | Alias for `npm run server:dev` |
| `npm run server:dev` | start a development server at `localhost:9999`, using development options (source maps, no minification, ng2 dev mode enabled) |
| `npm run server:prod` | start a development server at `localhost:9999` using production options (no sourcemaps, minified via UglifyJS, `console.debug` is a no-op) |
| `npm run build:dev` | build distributable bundles in `build/` using development options |
| `npm run build:prod` | build distributable bundles in `build/` using production options |
| `npm run gen-protobuf` | regenerate protobuf JS/TS using `protobufjs`, based on protobuf sources in `src/filebounce/protobufs` |

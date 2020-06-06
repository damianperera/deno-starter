![Deno](https://img.shields.io/badge/deno-v1.x.x-success?logo=deno&style=flat)
![CI](https://github.com/damianperera/Deno-REST-Boilerplate/workflows/CI/badge.svg?branch=master&event=push) ![GitHub Issues](https://img.shields.io/github/issues/damianperera/Deno-REST-Boilerplate) [![GitHub License](https://img.shields.io/github/license/damianperera/Deno-REST-Boilerplate)](https://github.com/damianperera/Deno-REST-Boilerplate/blob/master/LICENSE)
## Install
### Deno
To install Deno follow the setup guide found [here](https://deno.land/#installation). If you are using an IDE such as VS Code, Atom, Visual Studio or a JetBrains product, make sure to install the appropriate Deno plugin and update `ts-config.json` if required. A working community-developed plugin can be found [here](https://github.com/justjavac/typescript-deno-plugin).

### Sandbox
To test drive a production build of this server run the following command after installing Deno.
```bash
$ deno run --allow-net https://damianperera.github.io/Deno-REST-Boilerplate/server.bundle.js
```

## Getting Started
### Run
Execute the following command in your terminal to start the local server.

```bash
$ ./deno run
```
![Run](https://s7.gifyu.com/images/deno-run.gif)

### Build
Execute the following command in your terminal to bundle your source files and create a single `.js` file in the `build/` directory. After building the `server.bundle.js`, you can execute the Production Run.

```bash
$ ./deno build
```
![Build](https://s7.gifyu.com/images/deno-build.gif)

### Production Run
Execute the following command in your terminal to start the production build of the server.
```bash
$ deno run --allow-net build/server.bundle.js
```
![Production Run](https://s7.gifyu.com/images/deno-production-run.gif)

## Tests
### Unit Tests
Execute the following command in your terminal to run the unit test suite.

```bash
$ ./deno test
```
![Tests](https://s7.gifyu.com/images/deno-test.gif)

Tests are maintained in a separate folder in order to support package bundling in the future.

### Integration Tests
Start the server and execute the following command in your terminal to execute the integration test suite.

```bash
$ ./deno integration
```
![Integration Tests](https://s7.gifyu.com/images/deno-integration.gif)

Integration tests can be found in the `integration/` directory. These are very rudimentary cURL tests that execute requests against the configured endpoints.

## Creating a new REST Endpoint
When using this boilerplate your starting point for a REST API endpoint would be the `controllers` directory.

```
- src
|- controllers
 |- health.ts
 |- products.ts
 |- accounts.ts
```

The `controllers` directory contains the route declaration of your REST service. For each file in this directory an automatic base path will be generated. 

For example, specifying a new file named `orders.ts` inside the `controllers` directory with a default export of type `Array<Routes.Endpoints>` will automatically create the base path `/api/v1/orders` and configure any endpoint `path` specified in the controller on top of the base path like `/api/v1/orders/summary`.

## Permissions
Since Deno is a secure runtime for JS you need to explicitly give programs the permission to do certain 'privileged' actions, such as access the network. This server requires the `--allow-net` and `--allow-read` permissions out of the box.

- `--allow-net`: Being a REST service this is required in order to bind a port and access the network. You can make the permission level more granular by specifying the networks that the service has access to (e.g. `--allow-net:0.0.0.0`) in the `./deno` executable.
- `--allow-read`: Since the route manager automatically configures endpoints based on filenames and their contents, the server needs read access to the filesystem. You can make the permission level more granular by allowing read access only to the server's root directory instead of the entire filesystem by specifying `--allow-read=./` in the `./deno` executable.

## Absolute Imports
You can refer the TS files in the source directories using absolute file paths such as `service/interface/...` instead of relative file paths such as `../../interface/...`. The paths are configured inside `src/config/absolutePaths.json`.

## Deno Args
You can pass in Deno args such as additional permissions by simply appending them to the `run` or `test` commands - e.g. to grant permission to read environment variables you can execute the following command:

```bash
$ ./deno run --allow-env
```

## Correlation ID
A [Correlation ID](https://blog.rapid7.com/2016/12/23/the-value-of-correlation-ids/) is generated for every request and injected into the request headers using the value of the `CORRELATION_ID_HEADER` variable in `src/constants.ts`

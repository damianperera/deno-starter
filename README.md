<a href="https://deno.land"><img src="https://deno.land/logo.svg" alt="Deno Logo" width="50"/></a>

## Installation
### Deno
To install Deno follow the setup guide found [here](https://deno.land/#installation). If you are using an IDE such as VS Code, Atom, Visual Studio or a JetBrains product, make sure to install the appropriate Deno plugin and update `ts-config.json` if required. A working community-developed plugin can be found [here](https://github.com/justjavac/typescript-deno-plugin).

## Permissions
Since Deno is a secure runtime for JS you need to explicitly give programs the permission to do certain 'privileged' actions, such as access the network. This server requires the `--allow-net` and `--allow-read` permissions out of the box.

- `--allow-net`: Being a REST service this is required in order to bind a port and access the network. You can make the permission level more granular by specifying the networks that the service has access to (e.g. `--allow-net:0.0.0.0`) in the `./deno` executable.
- `--allow-read`: Since the route manager automatically configures endpoints based on filenames and their contents, the server needs read access to the filesystem. You can make the permission level more granular by allowing read access only to the server's root directory instead of the entire filesystem by specifying `--allow-read=./` in the `./deno` executable. 

## Getting Started

### Startup
<p align="left"><img style="border-radius:50%" src="https://s7.gifyu.com/images/Peek-2020-05-31-15-01.gif" alt="Terminal"/></p>

Run the following command in your terminal to start the server.

```bash
$ ./deno run
```

### Tests
<p align="left"><img style="border-radius:50%" src="https://s7.gifyu.com/images/Peek-2020-05-31-15-02.gif" alt="Terminal"/></p>

Run the following command in your terminal to execute the test suite.

```bash
$ ./deno test
```

Tests are maintained in a separate folder since Deno has a potential feature in its road-map to ship application sources in a packaged bundle, similar to a `.java` or `.exe` executable - refer [#986](https://github.com/denoland/deno/issues/986) for more information on this discussion.

### Creating a new REST Endpoint
When using this boilerplate your starting point for a REST endpoint would be the `controllers` directory.

```
- src
|- controllers
 |- health.ts
 |- products.ts
 |- accounts.ts
```

The `controllers` directory contains the route declaration of your REST service. For each file in this directory an automatic base path will be generated. 

For example, specifying a new file named `orders.ts` inside the `controllers` directory with a default export of type `Array<Routes.Endpoints>` will automatically create the base path `/api/v1/orders` and configure any endpoint `path` specified in the controller on top of the base path like `/api/v1/orders/summary`.

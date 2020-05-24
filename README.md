<a href="https://deno.land"><img src="https://deno.land/logo.svg" alt="Deno Logo" width="50"/></a>

## Installation
### Deno
To install Deno, follow the setup guide found [here](https://deno.land/#installation).

## Permissions
Since Deno is marketed as a _secure_ runtime for JS you need to explicitly give programs the permission to do certain 'privileged' actions, such as access the network. This server requires the `--allow-net` and `--allow-read` permissions out of the box.

- `--allow-net`: As a REST service this is required in order to access the network
- `--allow-read`: Since the route manager automatically configures endpoints based on filenames and their contents, the server needs read access to the filesystem. You can make the permission level more granular by allowing read access only to the server's root directory by specifying `--allow-read=./`. 

## Getting Started

Run the following command in your terminal to start the server.

```bash
$ deno run --allow-net --allow-read server.ts
```

### Creating a new REST Endpoint
When using this boilerplate your starting point for a REST endpoint would be the `controllers` directory.

```
- controllers
|-- health.ts
|-- products.ts
|-- accounts.ts
```

The `controllers` directory contains the route declaration of your REST service. For each file in this directory an automatic base path will be generated. 

For example, specifying a new file named `orders.ts` inside the `controllers` directory with a default export of type `Array<Routes.Endpoints>` will automatically create the base path `/api/v1/orders` and configure any endpoint `path`s specified in the controller on top of the base path.

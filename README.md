<a href="https://deno.land"><img src="https://deno.land/logo.svg" alt="Deno Logo" width="50"/></a>

## Installation
### Deno
To install Deno, follow the setup guide found [here](https://deno.land/#installation).

### Server
Run the following command in your terminal to start the server.

```bash
deno run --allow-net --allow-read server.ts
```
## Getting Started
### Creating a new REST Endpoint
Using this boilerplate your starting point for a REST endpoint would be the `controllers` directory.

```
- controllers
---- health.ts
---- products.ts
---- accounts.ts
```

The `controllers` directory contains the route declaration of your REST service. For each file in this directory an automatic base path will be generated. 

For example, specifying a new file named `orders.ts` inside the `controllers` directory with a default export of type `Array<Routes.Endpoints>` will automatically create the base path `/api/v1/orders` and configure any endpoint `path`s specified in the controller on top of the base path.
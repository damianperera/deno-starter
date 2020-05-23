<a href="https://deno.land"><img src="https://deno.land/logo.svg" alt="Deno Logo" width="50"/></a>

## Getting Started
### Deno
To install Deno, follow the setup guide found [here](https://deno.land/#installation).
### Server
Run the following command in your terminal to start the server.

```bash
deno run --allow-net --allow-read server.ts
```
## Development
### Creating a new Controller
Simply create a file inside the `controllers` directory which corresponds to the name of the required base path. For example, if you require a base path similar to `/api/v1/products` simply create a file named `products.ts` inside the `controllers` directory. The route configuration will automatically pickup the new endpoints defined inside this file using the filename as the base path.

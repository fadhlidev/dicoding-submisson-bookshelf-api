import { server as createServer } from "@hapi/hapi";
import { routes } from "./routes.js";

const server = createServer({
  port: 9000,
  host: "localhost",
  routes: {
    cors: {
      origin: ["*"],
    },
  },
});

server.route(routes);

await server.start();
console.log(`Server berjalan pada ${server.info.uri}`);

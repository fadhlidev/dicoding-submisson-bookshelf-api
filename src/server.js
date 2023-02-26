import { server as createServer } from "@hapi/hapi";

const server = createServer({
  port: 5000,
  host: "localhost",
  routes: {
    cors: {
      origin: ["*"],
    },
  },
});

await server.start();
console.log(`Server berjalan pada ${server.info.uri}`);

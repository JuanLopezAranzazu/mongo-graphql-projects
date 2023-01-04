const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schemas/index");
const { authenticated } = require("./middlewares/authenticated");

require("./mongo");
const { config } = require("./config");

const app = express();

app.use(authenticated);

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(config.port, () => {
  console.log("SEVER RUNNING IN PORT ", config.port);
});

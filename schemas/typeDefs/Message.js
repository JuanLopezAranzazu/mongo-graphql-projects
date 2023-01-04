const { GraphQLObjectType, GraphQLString, GraphQLBoolean } = require("graphql");

const MessageType = new GraphQLObjectType({
  name: "Message",
  fields: () => ({
    successful: { type: GraphQLBoolean },
    message: { type: GraphQLString },
  }),
});

module.exports = MessageType;

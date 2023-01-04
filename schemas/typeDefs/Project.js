const { GraphQLObjectType, GraphQLID, GraphQLString } = require("graphql");
// models
const User = require("./../../models/User");
// types
const UserType = require("./User");

const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent) {
        return User.findById(parent.userId);
      },
    },
  }),
});

module.exports = ProjectType;

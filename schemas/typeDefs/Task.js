const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
} = require("graphql");
// models
const Project = require("./../../models/Project");
const User = require("./../../models/User");
// types
const ProjectType = require("./Project");
const UserType = require("./User");

const TaskType = new GraphQLObjectType({
  name: "Task",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    active: { type: GraphQLBoolean },
    project: {
      type: ProjectType,
      resolve(parent) {
        return Project.findById(parent.projectId);
      },
    },
    user: {
      type: UserType,
      resolve(parent) {
        return User.findById(parent.userId);
      },
    }
  }),
});

module.exports = TaskType;

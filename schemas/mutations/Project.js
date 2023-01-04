const { GraphQLString, GraphQLNonNull, GraphQLID } = require("graphql");
// types
const ProjectType = require("./../typeDefs/Project");
const MessageType = require("./../typeDefs/Message");
// models
const Project = require("./../../models/Project");

const createProject = {
  type: ProjectType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent, args, { user }, info) {
    console.log("AUTHENTICATED", user);
    console.log(args);
    if (!user) {
      throw new Error("You must be logged in to do that");
    }

    const userFound = await User.findById(user.id);
    if (!userFound) {
      throw new Error("Unauthorized");
    }

    const newProject = new Project({
      userId: user.id,
      name: args.name,
      description: args.description,
    });

    return newProject.save();
  },
};

const updateProject = {
  type: ProjectType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent, args, { user }, info) {
    console.log("AUTHENTICATED", user);
    console.log(args);
    if (!user) {
      throw new Error("Unauthorized");
    }
    const projectUpdated = await Project.findOneAndUpdate(
      { id, userId: user.id },
      { name: args.name, description: args.description },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!projectUpdated) {
      throw new Error("No project for given id");
    }
    return projectUpdated;
  },
};

const deleteProject = {
  type: MessageType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  async resolve(parent, args, { user }, info) {
    console.log("AUTHENTICATED", user);
    console.log(args);
    const projectDeleted = await Project.findOneAndDelete({
      id: args.id,
      userId: user.id,
    });
    if (!projectDeleted) {
      throw new Error("No project with given ID Found for the user");
    }

    return { successful: true, message: "Project delected" };
  },
};

module.exports = { createProject, updateProject, deleteProject };

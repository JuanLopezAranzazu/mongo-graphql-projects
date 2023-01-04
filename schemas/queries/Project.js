const { GraphQLList, GraphQLNonNull, GraphQLID } = require("graphql");
// types
const ProjectType = require("./../typeDefs/Project");
// models
const Project = require("./../../models/Project");

const getAllProjects = {
  type: new GraphQLList(ProjectType),
  async resolve(parent, args, ctx, info) {
    const projects = await Project.find({});
    return projects;
  },
};

const getByIdProject = {
  type: ProjectType,
  args: { id: { type: new GraphQLNonNull(GraphQLID) } },
  async resolve(parent, args, ctx, info) {
    const { id } = args;
    const project = await Project.findOne({ id });
    return project;
  },
};

const getProjectsByUser = {
  type: ProjectType,
  async resolve(parent, args, { user }, info) {
    console.log("AUTHENTICATED", user);
    if (!user) {
      throw new Error("You must be logged in to do that");
    }
    const projects = await Project.find({ userId: user.id });
    return projects;
  },
};

module.exports = { getAllProjects, getByIdProject, getProjectsByUser };

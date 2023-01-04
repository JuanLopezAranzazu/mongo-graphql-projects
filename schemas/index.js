const { GraphQLObjectType, GraphQLSchema } = require("graphql");
// queries
const { getAllUsers, getByIdUser } = require("./queries/User");
const {
  getAllProjects,
  getByIdProject,
  getProjectsByUser,
} = require("./queries/Project");
const { getAllTasks, getByIdTask } = require("./queries/Task");
// mutations
const { registerUser, loginUser } = require("./mutations/User");
const {
  createProject,
  updateProject,
  deleteProject,
} = require("./mutations/Project");
const { createTask, updateTask, deleteTask } = require("./mutations/Task");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  description: "queries for application",
  fields: {
    // queries user
    getAllUsers,
    getByIdUser,
    // queries project
    getAllProjects,
    getByIdProject,
    getProjectsByUser,
    // queries task
    getAllTasks,
    getByIdTask,
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  description: "mutations for application",
  fields: {
    // mutations user
    registerUser,
    loginUser,
    // mutations project
    createProject,
    updateProject,
    deleteProject,
    // mutations task
    createTask,
    updateTask,
    deleteTask,
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

module.exports = schema;

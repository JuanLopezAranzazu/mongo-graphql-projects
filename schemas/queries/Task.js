const { GraphQLList, GraphQLNonNull, GraphQLID } = require("graphql");
// types
const TaskType = require("./../typeDefs/Task");
// models
const Task = require("./../../models/Task");

const getAllTasks = {
  type: new GraphQLList(TaskType),
  async resolve(parent, args, ctx, info) {
    const tasks = await Task.find({});
    return tasks;
  },
};

const getByIdTask = {
  type: TaskType,
  args: { id: { type: new GraphQLNonNull(GraphQLID) } },
  async resolve(parent, args, ctx, info) {
    const { id } = args;
    const task = await Task.findOne({ id });
    return task;
  },
};

module.exports = { getAllTasks, getByIdTask };

const {
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLBoolean,
} = require("graphql");
// types
const TaskType = require("./../typeDefs/Task");
const MessageType = require("./../typeDefs/Message");
// models
const Task = require("./../../models/Task");

const createTask = {
  type: TaskType,
  args: {
    message: { type: new GraphQLNonNull(GraphQLString) },
    projectId: { type: new GraphQLNonNull(GraphQLID) },
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

    const newTask = new Task({
      userId: user.id,
      message: args.message,
      projectId: args.projectId,
    });

    return newTask.save();
  },
};

const updateTask = {
  type: TaskType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    message: { type: new GraphQLNonNull(GraphQLString) },
    active: { type: new GraphQLNonNull(GraphQLBoolean) },
  },
  async resolve(parent, args, { user }, info) {
    console.log("AUTHENTICATED", user);
    console.log(args);
    if (!user) {
      throw new Error("Unauthorized");
    }
    const taskUpdated = await Task.findOneAndUpdate(
      { id, userId: user.id },
      { message: args.message, active: args.active },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!taskUpdated) {
      throw new Error("No task for given id");
    }
    return taskUpdated;
  },
};

const deleteTask = {
  type: MessageType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  async resolve(parent, args, { user }, info) {
    console.log("AUTHENTICATED", user);
    console.log(args);
    const taskDeleted = await Task.findOneAndDelete({
      id: args.id,
      userId: user.id,
    });
    if (!taskDeleted) {
      throw new Error("No task with given ID Found for the user");
    }

    return { successful: true, message: "Task delected" };
  },
};

module.exports = { createTask, updateTask, deleteTask };

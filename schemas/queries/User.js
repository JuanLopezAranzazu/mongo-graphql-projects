const { GraphQLList, GraphQLNonNull, GraphQLID } = require("graphql");
// types
const UserType = require("./../typeDefs/User");
// models
const User = require("./../../models/User");

const getAllUsers = {
  type: new GraphQLList(UserType),
  async resolve(parent, args, ctx, info) {
    const users = await User.find({});
    return users;
  },
};

const getByIdUser = {
  type: UserType,
  args: { id: { type: new GraphQLNonNull(GraphQLID) } },
  async resolve(parent, args, ctx, info) {
    const { id } = args;
    const user = await User.findOne({ id });
    return user;
  },
};

module.exports = { getAllUsers, getByIdUser };

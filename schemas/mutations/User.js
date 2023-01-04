const { GraphQLString, GraphQLNonNull } = require("graphql");
const { hash, verify } = require("argon2");
const { createJwt } = require("./../../middlewares/authenticated");
// types
const UserType = require("./../typeDefs/User");
// models
const User = require("./../../models/User");

const registerUser = {
  type: UserType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    username: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent, args, ctx, info) {
    console.log(args);
    const { password, ...rest } = args;
    const passwordHash = await hash(password);
    const newUser = new User({ ...rest, password: passwordHash });
    return newUser.save();
  },
};

const loginUser = {
  type: GraphQLString,
  args: {
    username: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent, args, ctx, info) {
    console.log(args);
    const { username, password } = args;
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error("USER USERNAME", username, "NOT FOUND");
    }
    if (!verify(user.password, password)) {
      throw new Error("INCORRECT PASSWORD", password);
    }
    const token = await createJwt({
      id: user.id,
      username: user.username,
    });
    return token;
  },
};

module.exports = { registerUser, loginUser };

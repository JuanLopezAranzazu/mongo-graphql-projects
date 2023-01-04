const { Schema, model } = require("mongoose");

const projectSchema = new Schema({
  name: { type: String, unique: true, required: [true, "REQUIRED NAME"] },
  description: { type: String },
  userId: {
    type: String,
    required: true,
  },
});

projectSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Project = model("Project", projectSchema);

module.exports = Project;

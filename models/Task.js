const { Schema, model } = require("mongoose");

const taskSchema = new Schema({
  message: { type: String, unique: true, required: [true, "REQUIRED MESSAGE"] },
  active: { type: Boolean, required: true },
  projectId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

taskSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Task = model("Task", taskSchema);

module.exports = Task;

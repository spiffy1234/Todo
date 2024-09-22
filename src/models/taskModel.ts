import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: [true, "Its required"],
  },

  isCompleted: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Task = mongoose.models.tasks || mongoose.model("tasks", taskSchema);

export default Task;

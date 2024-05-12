import mongoose from "mongoose";
import CourseModel from "./Course.model.js";
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      validate: {
        validator: async function (courseId) {
          return await CourseModel.findById(courseId).then(
            (course) => course.userEmail === this.email
          );
        },
        message: "Course email must match user email",
      },
    },
  ],
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;

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
  //age, country
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
  tokens: {
    type: [String],
    required: false,
  },
  authType: {
    type: String,
    required: true,
    default: "application", // Default value for users registered through the application
  },
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;

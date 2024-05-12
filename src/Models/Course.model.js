import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
  },
  creationDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  courseName: {
    type: String,
    required: true,
  },
  coursePurpose: {
    type: String,
    required: true,
  },
  confidenceLevel: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  studyDaysPerWeek: {
    type: Number,
    required: true,
    min: 1,
    max: 7,
  },
  courseTopics: {
    type: [String],
    required: true,
  },
  examDate: {
    type: Date,
  },
  preferredStudyDays: {
    type: [Number],
    required: true,
    validate: {
      validator: function (v) {
        return v.length === this.studyDaysPerWeek;
      },
      message: "Array size must match the number of study days per week",
    },
  },
});

const CourseModel = mongoose.model("Course", courseSchema);

export default CourseModel;

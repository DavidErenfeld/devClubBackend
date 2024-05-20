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
  finishDate: {
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
  courseTopics: {
    type: [String],
    required: true,
  },
  examDate: {
    type: Date,
  },
  studyDaysPerWeek: {
    type: Number,
    required: true,
    min: 1,
    max: 7,
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
  //hours: Number
});

const CourseModel = mongoose.model("Course", courseSchema);

export default CourseModel;

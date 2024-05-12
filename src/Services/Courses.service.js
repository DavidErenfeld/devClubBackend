import CourseModel from "../Models/Course.model.js";

const getCourseDb = async () => {
  try {
    const users = await CourseModel.find();
    return { success: true, data: users };
  } catch (e) {
    console.log(e.message);
    return { success: false, message: e.message };
  }
};

const getCourseById = async (id) => {
  try {
    const user = await CourseModel.findById(id);
    return { success: true, data: user };
  } catch (e) {
    console.log(e.message);
    return { success: false, message: e.message };
  }
};

const createNewCourse = async (course) => {
  try {
    const newCourse = await CourseModel.create(course);
    return { success: true, data: newCourse };
  } catch (e) {
    console.log(e.message);
    return { success: false, message: e.message };
  }
};

const updateCourseById = async (id, updateCourse) => {
  try {
    const updatedCourse = await CourseModel.findByIdAndUpdate(
      id,
      updateCourse,
      {
        new: true,
      }
    );
    return { success: true, data: updatedCourse };
  } catch (e) {
    console.log(e.message);
    return { success: false, message: e.message };
  }
};

const deleteCourseById = async (id) => {
  try {
    await CourseModel.findByIdAndDelete(id);
    return { success: true, message: "Course deleted successfully" };
  } catch (e) {
    console.log(e.message);
    return { success: false, message: e.message };
  }
};

export {
  getCourseDb,
  getCourseById,
  createNewCourse,
  updateCourseById,
  deleteCourseById,
};

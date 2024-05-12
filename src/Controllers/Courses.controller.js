import {
  getCourseDb,
  getCourseById,
  createNewCourse,
  updateCourseById,
  deleteCourseById,
} from "../Services/Courses.service.js";

export const getAllCourses = async (req, res) => {
  try {
    const response = await getCourseDb();
    if (response.success) {
      response.data.length > 0
        ? res.status(200).json(response.data)
        : res.status(200).json({ message: "There are no course yet" });
    } else {
      res.status(500).send(response);
    }
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

export const getCourseByCourseId = async (req, res) => {
  try {
    const response = await getCourseById(req.params.id);
    if (response.success) {
      res.status(200).json(response.data);
    } else {
      res.status(500).send(response);
    }
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

export const createCourse = async (req, res) => {
  try {
    const response = await createNewCourse(req.body);
    if (response.success) {
      res.status(201).json(response.data);
    } else {
      res.status(500).send(response);
    }
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

export const updateCourseByCourseId = async (req, res) => {
  try {
    const response = await updateCourseById(req.params.id, req.body);
    if (response.success) {
      res.status(200).json(response.data);
    } else {
      res.status(500).send(response);
    }
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

export const deleteCourseByCourseId = async (req, res) => {
  try {
    const response = await deleteCourseById(req.params.id);
    if (response.success) {
      res.status(200).send({ message: "Course deleted successfully" });
    } else {
      res.status(500).send(response);
    }
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

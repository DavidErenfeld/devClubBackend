import {
  getUsersDb,
  getUserById,
  createNewUser,
  updateUserById,
  deleteUserById,
} from "../Services/Users.service.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await getUsersDb();
    if (users.success) {
      users.data.length > 0
        ? res.status(200).json(users.data)
        : res.status(200).json({ message: "There are no users yet" });
    } else {
      throw new Error("Failed to retrieve users");
    }
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

export const getUserByUserId = async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    if (user.success) {
      res.status(200).json(user.data);
    } else {
      throw new Error("User not found");
    }
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const newUser = await createNewUser(req.body);
    if (newUser.success) {
      res.status(201).json(newUser.data);
    } else {
      throw new Error("Error creating user");
    }
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

export const updateUserByUserId = async (req, res) => {
  try {
    const updatedUser = await updateUserById(req.params.id, req.body);
    if (updatedUser.success) {
      res.status(200).json(updatedUser.data);
    } else {
      throw new Error("Error updating user");
    }
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

export const deleteUserByUserId = async (req, res) => {
  try {
    const result = await deleteUserById(req.params.id);
    if (result.success) {
      res.status(200).send({ message: "User deleted successfully" });
    } else {
      throw new Error("Error deleting user");
    }
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

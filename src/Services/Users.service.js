import UserModel from "../Models/User.model.js";

const getUsersDb = async () => {
  try {
    const users = await UserModel.find();
    return { success: true, data: users };
  } catch (e) {
    console.log(e.message);
    return { success: false, message: e.message };
  }
};

const getUserById = async (id) => {
  try {
    const user = await UserModel.findById(id);
    return { success: true, data: user };
  } catch (e) {
    console.log(e.message);
    return { success: false, message: e.message };
  }
};

const createNewUser = async (user) => {
  try {
    const newUser = await UserModel.create(user);
    return { success: true, data: newUser };
  } catch (e) {
    console.log(e.message);
    return { success: false, message: e.message };
  }
};

const updateUserById = async (id, update) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(id, update, {
      new: true,
    });
    return { success: true, data: updatedUser };
  } catch (e) {
    console.log(e.message);
    return { success: false, message: e.message };
  }
};

const deleteUserById = async (id) => {
  try {
    await UserModel.findByIdAndDelete(id);
    return { success: true, message: "User deleted successfully" };
  } catch (e) {
    console.log(e.message);
    return { success: false, message: e.message };
  }
};

export {
  getUsersDb,
  getUserById,
  createNewUser,
  updateUserById,
  deleteUserById,
};

import UserModel from "../Models/User.model.js";
import bcrypt from "bcryptjs";

const registerUser = async (user) => {
  const { email, password, username } = user;

  try {
    const existUser = await UserModel.findOne({ email: email });
    if (existUser !== null) {
      return { error: "Email already exists" };
    }
  } catch (err) {
    return { error: "Server error" };
  }

  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await UserModel.create({
      username: username, // Make sure this matches your schema field
      email: email,
      password: hashedPassword,
    });
    return { user: newUser };
  } catch (err) {
    return { error: "Server error" };
  }
};

export default { registerUser };

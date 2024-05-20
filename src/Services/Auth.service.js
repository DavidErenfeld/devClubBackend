import UserModel from "../Models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import generateTokens from "./Tokens.service.js";

const registerUser = async (user) => {
  const { email, password, username } = user;

  try {
    const existUser = await UserModel.findOne({ email });
    if (existUser) {
      return { error: "Email already exists" };
    }
  } catch (err) {
    return { error: "Server error" };
  }

  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await UserModel.create({
      username,
      email,
      password: hashedPassword,
    });
    return { user: newUser };
  } catch (err) {
    return { error: "Server error" };
  }
};

const loginUser = async (email, password) => {
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return { error: "User does not exist " };
    }

    if (user.authType === "google") {
      return { error: "Google authenticated accounts must log in via Google" };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { error: "Password is not match" };
    }

    const { accessToken, refreshToken } = await generateTokens(user.id);

    user.tokens = user.tokens || [];
    user.tokens.push(refreshToken);
    await user.save();

    return {
      accessToken,
      refreshToken,
    };
  } catch (err) {
    console.log("Server error: " + err.message);
    return { error: "Server error: " + err.message };
  }
};

const refreshUser = async (userId, refreshToken) => {
  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return { error: "User not found" };
    }

    if (!user.tokens || !user.tokens.includes(refreshToken)) {
      user.tokens = [];
      await UserModel.findByIdAndUpdate(userId, user);
      return { error: "Access blocked, suspicion of token theft" };
    }
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      await generateTokens(userId);
    user.tokens = user.tokens.filter((t) => t !== refreshToken);
    user.tokens.push(newRefreshToken);
    await UserModel.findByIdAndUpdate(userId, {
      $set: { id: userId, tokens: user.tokens },
    });

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  } catch (err) {
    console.log("Server error: " + err.message);
    return { error: "Server error: " + err.message };
  }
};

const logoutUser = async (refreshToken) => {
  try {
    const tokenDetailse = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    );
    if (tokenDetailse) {
      console.log(userDetailse);
      const user = await UserModel.find((user) => user.id === userDetailse.id);
      if (!user) return { error: "user not exist" };
      if (!user.tokens || !user.tokens.includes(refreshToken)) {
        user.tokens = [];
        await UserModel.save(user);
        return { error: "invulid token" };
      } else {
        user.tokens = user.tokens.filter((t) => t !== refreshToken);
      }
    }

    return { message: "User is successfully logged out" };
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
};
export default { registerUser, loginUser, refreshUser, logoutUser };
// "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NDU0MzM0NzU5ODhmNjU2MTYwMzY3ZCIsImlhdCI6MTcxNjIxMTk4MCwiZXhwIjoxNzE2MjEyODgwfQ.yfXagPfvU-vz2HIhHtGcc6ADBD2Y2G1FA2gBCiTKV6U",
// "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NDU0MzM0NzU5ODhmNjU2MTYwMzY3ZCIsImlhdCI6MTcxNjIxMTk4MH0.e2Q7aOXAvq8ecSDytaLUfDotQOZdtpVvgJQSdXRdRwI"

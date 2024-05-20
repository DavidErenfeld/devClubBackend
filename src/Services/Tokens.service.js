import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generateTokens = async (userID) => {
  const accessToken = jwt.sign({ id: userID }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });

  const refreshToken = jwt.sign({ id: userID }, process.env.JWT_REFRESH_SECRET);

  return { accessToken, refreshToken };
};

export default generateTokens;

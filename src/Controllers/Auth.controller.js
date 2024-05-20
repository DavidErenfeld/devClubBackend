import AuthService from "../Services/Auth.service.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const sendErrorResponse = (res, status, message) => {
  return res.status(status).json({ error: message });
};

const register = async (req, res) => {
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    return sendErrorResponse(
      res,
      400,
      "Email, password, or userName is missing"
    );
  }

  try {
    const result = await AuthService.registerUser({
      email,
      password,
      username,
    });
    if (result.error) {
      return sendErrorResponse(res, 400, result.error);
    }
    return res.status(201).json({ user: result.user });
  } catch (error) {
    return sendErrorResponse(res, 500, error.message);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return sendErrorResponse(res, 400, "Email and password are required");
  }

  try {
    const result = await AuthService.loginUser(email, password);
    if (result.error) {
      return sendErrorResponse(res, 400, result.error);
    }
    return res.status(201).json(result);
  } catch (error) {
    return sendErrorResponse(res, 500, error.message);
  }
};

const refresh = async (req, res) => {
  const authHeader = req.headers["authorization"];
  const refreshToken = authHeader && authHeader.split(" ")[1];
  if (!refreshToken)
    return sendErrorResponse(res, 401, "Refresh token is missing");

  jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET,
    async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        return sendErrorResponse(res, 403, err.message);
      }

      try {
        const userId = decodedToken.id;
        const result = await AuthService.refreshUser(userId, refreshToken);
        if (result.error) {
          return sendErrorResponse(res, 400, result.error);
        }
        return res.status(201).json({
          accessToken: result.accessToken,
          refreshToken: result.refreshToken,
        });
      } catch (error) {
        return sendErrorResponse(res, 500, error.message);
      }
    }
  );
};

const logout = async (req, res) => {
  const authHeader = req.headers["authorization"];
  const refreshToken = authHeader && authHeader.split(" ")[1];
  if (!refreshToken) {
    return res.status(401).send("Refresh token is missing");
  }

  try {
    const result = await AuthService.logoutUser(refreshToken);
    if (result.error) {
      return res.status(400).send(result.error);
    }
    return res.status(200).send({ message: result.message });
  } catch (err) {
    console.error("Error during logout: ", err);
    return res.status(403).send(err.message);
  }
};

export default { register, login, refresh, logout };

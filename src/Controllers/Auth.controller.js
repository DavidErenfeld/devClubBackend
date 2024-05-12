import AuthService from "../Services/Auth.service.js";
import passport from "passport";

const register = async (req, res) => {
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    return res
      .status(400)
      .json({ error: "Email, password, or userName is missing" });
  }

  try {
    const result = await AuthService.registerUser({
      email,
      password,
      username,
    });
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json({ user: result.user });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

const login = async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!user) {
      return res.status(401).json({ error: info.message });
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      return res.status(200).json({ message: "Logged in successfully" });
    });
  })(req, res, next);
};

export default { register, login };

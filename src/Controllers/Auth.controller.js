import AuthService from "../Services/Auth.service.js";

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

export default { register };

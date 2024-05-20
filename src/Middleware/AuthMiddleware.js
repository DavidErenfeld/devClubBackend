import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.status(401).send("Token is null");
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    if (typeof verified === "object" && verified !== null && "id" in verified) {
      req.user = { id: verified.id };
      next();
    } else {
      return res.status(401).send("Invalid token structure");
    }
  } catch (err) {
    return res.status(401).send("Token is invalid");
  }
};

export default authMiddleware;

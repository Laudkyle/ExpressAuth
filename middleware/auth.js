import jwt from "jsonwebtoken";

const accessToken = process.env.JWT_ACCESS_SECRET;

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  if (!token) {
    res
      .status(400)
      .json({ msg: "You require an access token to consume this API" });
  }
  try {
    const decodedUser = jwt.verify(token, accessToken);
    req.user = decodedUser;
    res.status(200);
    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid access token" });
  }
};

export default authMiddleware;

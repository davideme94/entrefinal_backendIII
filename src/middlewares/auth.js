export const authToken = (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });
    next();
  };
  
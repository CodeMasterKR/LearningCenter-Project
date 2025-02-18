import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
   try {
      let jwtKey = process.env.JWTKEY;
      let [type, token] = req.header("Authorization").split(" ");

      if (!token) {
         return res.status(401).json({ message: "Not authorized" });
      }

      let data = jwt.verify(token, jwtKey);
      req.user = data;
      next();
   } catch (error) {
      return res
         .status(500)
         .json({ message: "Something is wrong with your token" });
   }
};

export default verifyToken;

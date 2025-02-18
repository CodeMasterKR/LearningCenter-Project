function selfPolice(roles) {
   return (req, res, next) => {
      let { id } = req.params;
      let { teacherId } = req.body;

      if (teacherId == req.user.id || roles.includes(req.user.role)) {
         return next();
      }
      res.status(400).json({ message: "Not allowed." });
   };
}

export default selfPolice;

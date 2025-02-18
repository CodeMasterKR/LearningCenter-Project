function rolePolice(roles) {
   return (req, res, next) => {
      let { id } = req.params;
      if (id == req.user.id || roles.includes(req.user.role)) {
         return next();
      }
      res.status(400).json({ message: "Not allowed." });
   };
}

function creatPolice(roles) {
   return (req, res, next) => {
      if (roles.includes(req.user.role)) {
         return next();
      }
      res.status(400).json({ message: "Not allowed." });
   };
}
export { rolePolice, creatPolice };

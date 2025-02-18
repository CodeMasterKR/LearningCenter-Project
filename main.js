import express from "express";
import sequelize from "./config/db.js";
import { config } from "dotenv";
import mainRoute from "./routes/index.js";
import upload from "./config/multer.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
config();

const port = process.env.PORT;
const app = express();
app.use(express.json());

const options = {
   definition: {
      openapi: "3.1.0",
      info: {
         title: "Online Courses",
         version: "0.1.0",
         description:
            "This is a simple CRUD API application made with Express and documented with Swagger",
      }, 
      servers: [
         {
            url: "http://localhost:3000/",
         },
      ],
   },
   apis: ["./routes/*.js"],
};

const specs = swaggerJSDoc(options);

app.use(
   cors({
      origin: "*", // Barcha manbalarga ruxsat berish (faqat test uchun)
      methods: "GET,POST,PUT,DELETE",
      allowedHeaders: "Content-Type,Authorization",
   })
);

app.use("/api", mainRoute);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/*", (req, res) => {
   res.status(400).json({ message: "Not found route." });
});

app.post("/upload", upload.single("file"), (req, res) => {
   res.send(`Fayl yuklandi: ${req.file.filename}`);
});

async function Connect() {
   try {
      await sequelize.authenticate();
      // await sequelize.sync({ force: true });
      console.log("Db connected successfully ✅");
      app.listen(port, () => console.log("Server started on port", port));
   } catch (error) {
      console.log(error.message);
   }
}
Connect();

import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
   host: "localhost",
   username: "root",
   password: "Kamronbek196769*",
   database: "onlineedu",
   dialect: "mysql",
   logging: false,
});

export default sequelize;

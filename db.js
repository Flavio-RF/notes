const mongoose = require("mongoose")
// const seeders = require("./src/seeders")

module.exports = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION_STRING)
        console.log("connect to db")

        mongoose.connection.on("error", (error) => {
            console.log("error mientras se tenia conexion con la base de datos.", error);
        });

        await mongoose.connection.dropDatabase();
    } catch (error) {
        console.log("Error al iniciar conexion con la base de datos.", error)

    }
}
const mongoose = require("mongoose")

module.exports = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION_STRING)
        console.log("connect to db")

        mongoose.connection.on("error", (error) => {
            console.log("error mientras se tenia conexion con la base de datos.", error);
        });

    } catch (error) {
        console.log("Error al iniciar conexion con la base de datos.", error)

    }
}
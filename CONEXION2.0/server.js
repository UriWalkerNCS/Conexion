const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

// Conexión a MongoDB Atlas
mongoose.connect("mongodb+srv://sanchezurivic05:PANDA23@cluster0.jow9n.mongodb.net/basePrueba1?tls=true&tlsAllowInvalidCertificates=true", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    tls: true
});

const db = mongoose.connection;

// Manejo de errores en la conexión
db.on("error", console.error.bind(console, "❌ Error de conexión a MongoDB:"));
db.once("open", () => {
    console.log("✅ Conectado a MongoDB Atlas");
});

// Definir esquema y modelo
const UsuarioSchema = new mongoose.Schema({
    nombre: String,
    edad: Number
});

const Usuario = mongoose.model("TheCollitions", UsuarioSchema); 
// Ruta para obtener los datos de MongoDB
app.get("/api/data", async (req, res) => {
    try {
        const usuarios = await Usuario.find();  
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Servidor en el puerto 3000
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

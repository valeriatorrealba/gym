const express = require("express");
const app = express();

const { insertar, consultar, editar, eliminar } = require("./consulta");

app.listen(3000, console.log("Server ON"))
app.use(express.json())
app.get("/", (req, res) =>{
    res.sendFile(__dirname + "/index.html");
})

app.post("/ejercicios", async (req,res) => {
    try {
        const datos = Object.values(req.body)
        const respuesta = await insertar(datos)
        res.json(respuesta)
    } catch (error) {
        res.status(500).send("algo salio mal 😢...")
    }
});

app.get("/ejercicios", async (req, res) =>{
    try {
        const registros = await consultar();
        res.json(registros);
    } catch (error) {
        res.status(500).send("algo salio mal 😢...")
    }
});

app.put("/ejercicios", async (req,res) => {
    try {
        const datos = Object.values(req.body)
        const respuesta = await editar(datos)
        res.json(respuesta)
    } catch (error) {
        res.status(500).send("algo salio mal 😢...")
    }
});

app.delete("/ejercicios", async (req, res) => {
    try {
        const { nombre } = req.query
        const respuesta = await eliminar(nombre)
        res.json(respuesta)
    } catch (error) {
        res.status(500).send("algo salio mal 😢...")
    }
})


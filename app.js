import express from 'express';
import {ConfigDotenv} from "dotenv" 
import BodyParser from "body-parser";

const app = express();
const port = process.env.port || 3000;

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/", (_, res) => {
    res.send('Hola, estamos aprendiendo express con la ficha 3407184');
});

app.get("/productos", (req, res)=>{
    res.send(`<h1> listado de productos</h1>
    <ol>
        <li>Televisor</li>
        <li>Celular</li>
        <li>Impresora</li>
        </ol>`)
})
app.listen(port, () => {
    console.log(`Servidor en funcionamiento en el puerto: ${port}`);
});

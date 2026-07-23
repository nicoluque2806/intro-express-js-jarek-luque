//const express = require("express")
import express from 'express';
import {configDotenv} from "dotenv"

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (_, res) => {
    res.send('Hola, estamos aprendiendo express con la ficha 3407184');
});

app.listen(port,() => {
    console.log('Servidor funcionando en el puerto $(port)');
});
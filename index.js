import express from "express";

const app = express();
const PORT = 3000;

// Nombre del servidor
const servidor = "Servidor Express";

// =======================================
// 1. Parámetro simple único
// Ruta: /saludo/:nombre
// =======================================
app.get("/saludo/:nombre", (req, res) => {
    const { nombre } = req.params;

    if (nombre.length < 3) {
        return res.status(400).json({
            error: "El nombre debe tener al menos 3 letras."
        });
    }

    res.send(`Hola, ${nombre}, bienvenido`);
});

// =======================================
// 2. Parámetro simple único
// Ruta: /productos/:nombre
// =======================================
app.get("/productos/:nombre", (req, res) => {
    const { nombre } = req.params;

    const producto = {
        id: 1,
        nombre: nombre,
        stock: 50,
        precioUnitario: 25.99,
        categoria: "Tecnología"
    };

    res.json(producto);
});

// =======================================
// 3. Múltiples parámetros en la ruta
// Ruta: /productos/:categoria/:id
// =======================================
app.get("/productos/:categoria/:id", (req, res) => {
    const { categoria, id } = req.params;

    res.json({
        producto: id,
        categoria: categoria,
        servidor: servidor
    });
});

// =======================================
// 4. Parámetros combinados con Query Params
// Ruta: /usuarios/:id/posts?orden=asc
// =======================================
app.get("/usuarios/:id/posts", (req, res) => {
    const { id } = req.params;
    const { orden = "asc" } = req.query;

    let publicaciones = [
        { id: 1, titulo: "Primer Post" },
        { id: 2, titulo: "Segundo Post" },
        { id: 3, titulo: "Tercer Post" }
    ];

    publicaciones.sort((a, b) =>
        orden === "desc" ? b.id - a.id : a.id - b.id
    );

    res.json({
        usuario: id,
        orden: orden,
        publicaciones
    });
});

// =======================================
// 5. Parámetros combinados con Query Params
// Ruta: /usuarios/:id/:posts_id/comentarios
// =======================================
app.get("/usuarios/:id/:posts_id/comentarios", (req, res) => {
    const { id, posts_id } = req.params;
    const { orden = "asc" } = req.query;

    let comentarios = [
        { id: 1, comentario: "Excelente publicación" },
        { id: 2, comentario: "Muy interesante" },
        { id: 3, comentario: "Gracias por compartir" }
    ];

    comentarios.sort((a, b) =>
        orden === "desc" ? b.id - a.id : a.id - b.id
    );

    res.json({
        usuario: id,
        post: posts_id,
        orden: orden,
        comentarios
    });
});

// =======================================
// 6. Validación y manejo de recursos no encontrados
// Ruta: /libros/:isbn
// =======================================
const libros = [
    {
        isbn: "9780001",
        titulo: "JavaScript Básico",
        autor: "Juan Pérez"
    },
    {
        isbn: "9780002",
        titulo: "Node.js desde Cero",
        autor: "Ana Gómez"
    },
    {
        isbn: "9780003",
        titulo: "Express Framework",
        autor: "Carlos Ruiz"
    }
];

app.get("/libros/:isbn", (req, res) => {
    const { isbn } = req.params;

    const libro = libros.find(libro => libro.isbn === isbn);

    if (!libro) {
        return res.status(404).json({
            mensaje: "Libro no encontrado"
        });
    }

    res.json(libro);
});

// =======================================
// Iniciar servidor
// =======================================
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// ----- RUTAS PARA ESTADOS -----
app.get('/estados', (req, res) => {
    db.query('SELECT * FROM ESTADOS', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

app.post('/estados', (req, res) => {
    const { descripcion } = req.body;
    db.query('INSERT INTO ESTADOS (descripcion) VALUES (?)', [descripcion], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).json({ id: result.insertId });
    });
});

// ----- RUTAS PARA TIPOS DE TICKET -----
app.get('/tiposticket', (req, res) => {
    db.query('SELECT * FROM TIPOSTICKET', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

app.post('/tiposticket', (req, res) => {
    const { descripcion } = req.body;
    db.query('INSERT INTO TIPOSTICKET (descripcion) VALUES (?)', [descripcion], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).json({ id: result.insertId });
    });
});

// ----- RUTAS PARA TICKETS -----
app.get('/tickets', (req, res) => {
    db.query('SELECT * FROM TICKETS', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

app.get('/ticketsUrl', (req, res) => {
    const repo = req.query.repo;

    if (!repo) {
        return res.status(400).json({ error: "Falta el parámetro 'repo'" });
    }

    const query = `
        SELECT 
            t.id_ticket, 
            t.encabezado, 
            t.descripcion,
            idf_tipo_estado,
            e.descripcion AS estado, 
            idf_tipo_ticket,
            tt.descripcion AS tipo_ticket, 
            t.repositorio, 
            t.owner
        FROM ticketingithub.tickets t
        LEFT JOIN ticketingithub.estados e ON t.idf_tipo_estado = e.id_estado
        LEFT JOIN ticketingithub.tiposticket tt ON t.idf_tipo_ticket = tt.id_tipo_ticket
        WHERE t.repositorio = ?
    `;

    db.query(query, [repo], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});



app.post('/tickets', (req, res) => {
    const { encabezado, descripcion, idf_tipo_ticket, idf_tipo_estado, repositorio, owner } = req.body;
    const sql = 'INSERT INTO TICKETS (encabezado, descripcion, idf_tipo_ticket, idf_tipo_estado, repositorio, owner) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [encabezado, descripcion, idf_tipo_ticket, idf_tipo_estado, repositorio, owner], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).json({ id: result.insertId });
    });
});

app.put('/modificarTicket', (req, res) => {
    const repo = req.query.ticket; // ticket es solo una string

    const { encabezado, descripcion, idf_tipo_ticket, idf_tipo_estado, repositorio, owner, id_ticket } = req.body;

    const sql = `
        UPDATE TICKETS 
        SET encabezado = ?, descripcion = ?, idf_tipo_ticket = ?, idf_tipo_estado = ?, repositorio = ?, owner = ?
        WHERE repositorio = ? and id_ticket = ?
    `;

    db.query(sql, [encabezado, descripcion, idf_tipo_ticket, idf_tipo_estado, repositorio, owner, repo, id_ticket], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Ticket no encontrado' });
        }
        res.json({ message: 'Ticket actualizado correctamente' });
    });
});

// Eliminar un ticket por id_ticket
app.delete('/tickets/:id_ticket', (req, res) => {
    const { id_ticket } = req.params;
    const sql = 'DELETE FROM TICKETS WHERE id_ticket = ?';
    db.query(sql, [id_ticket], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Ticket no encontrado' });
        }
        res.json({ message: 'Ticket eliminado correctamente' });
    });
});

app.get('/api/search', async (req, res) => {
  const repo = req.query.q;
  const response = await fetch(`https://api.github.com/search/repositories?q=${repo}`);
  const data = await response.json();
  res.json(data);
});


// Puerto del servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`API corriendo en http://localhost:${PORT}`);
});

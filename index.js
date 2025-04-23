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

app.post('/tickets', (req, res) => {
    const { encabezado, descripcion, idf_tipo_ticket, idf_tipo_estado, repositorio, owner } = req.body;
    const sql = 'INSERT INTO TICKETS (encabezado, descripcion, idf_tipo_ticket, idf_tipo_estado, repositorio, owner) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [encabezado, descripcion, idf_tipo_ticket, idf_tipo_estado, repositorio, owner], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).json({ id: result.insertId });
    });
});

app.put('/tickets/:id', (req, res) => {
    const id = req.params.id;
    const { encabezado, descripcion, idf_tipo_ticket, idf_tipo_estado, repositorio, owner } = req.body;
    
    const sql = `
      UPDATE TICKETS 
      SET encabezado = ?, descripcion = ?, idf_tipo_ticket = ?, idf_tipo_estado = ?, repositorio = ?, owner = ?
      WHERE id_ticket = ?
    `;
    
    db.query(sql, [encabezado, descripcion, idf_tipo_ticket, idf_tipo_estado, repositorio, owner, id], (err, result) => {
      if (err) return res.status(500).send(err);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Ticket no encontrado' });
      }
      res.json({ message: 'Ticket actualizado correctamente' });
    });
  });

// Puerto del servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`API corriendo en http://localhost:${PORT}`);
});

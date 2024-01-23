import { randomUUID } from 'node:crypto';
import bodyParser from 'body-parser';
import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';

const app = express();
const PORT = 3000;

const sqlite = sqlite3.verbose();
const db = new sqlite.Database(':memory:');

db.serialize(() => {
  db.run('CREATE TABLE search_history (id TEXT, term TEXT, created_at DATETIME)');
});

app.use(cors({
  origin: '*',
}))
app.use(bodyParser.json());

app.get('/search', (_req, res) => {
  db.all('SELECT * FROM search_history', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(rows);
  });
});

app.post('/search', (req, res) => {
  const { searchTerm } = req.body;
  if (!searchTerm) {
    return res.status(400).json({ error: 'searchTerm is required' });
  }
  const id = randomUUID();
  const createdAt = new Date().toISOString();

  db.run('INSERT INTO search_history VALUES (?, ?, ?)', id, searchTerm, createdAt, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.status(201).json({ id, searchTerm, created_at: createdAt });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

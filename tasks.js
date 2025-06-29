const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all tasks
router.get('/', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM tasks');
  res.json({ tasks: rows });
});

// Add or update task
router.post('/', async (req, res) => {
  const { id, title, description, due_date, priority, status, shared_with } = req.body;
  if (!title) return res.status(400).json({ message: 'Title is required' });

  if (id) {
    await db.query(
      `UPDATE tasks SET title=?, description=?, due_date=?, priority=?, status=?, shared_with=? WHERE id=?`,
      [title, description, due_date, priority, status, shared_with, id]
    );
  } else {
    await db.query(
      `INSERT INTO tasks (user_id, title, description, due_date, priority, status, shared_with) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      ['user1', title, description, due_date, priority, status, shared_with]
    );
  }

  res.json({ message: 'Task saved' });
});

// Delete task
router.delete('/:id', async (req, res) => {
  await db.query('DELETE FROM tasks WHERE id = ?', [req.params.id]);
  res.json({ message: 'Task deleted' });
});

module.exports = router;

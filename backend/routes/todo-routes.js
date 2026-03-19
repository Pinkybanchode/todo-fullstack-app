const express = require("express");
const router = express.Router();

const { getTodos, addTodo, updateTodoById, deleteTodoById, getTodoById } = require("../controllers/todo-controller");

router.get('/', getTodos);
router.get('/:id', getTodoById);
router.post('/', addTodo);
router.put('/:id', updateTodoById);
router.delete('/:id', deleteTodoById);

module.exports = router;
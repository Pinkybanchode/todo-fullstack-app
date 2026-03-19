const TodoModel = require("../models/todo-model");
const mongoose = require("mongoose");

// this is a gettodos - which fetch all the todos in DB - if no todo return 404(Not found)
exports.getTodos = async(req, res) => {
    console.log("GET API CALL")
    try{
        const todos = await TodoModel.find();
    
    if(!todos || todos.length == 0){
        console.log("res:", todos)
        return res.status(404).json({
            success:false,
            message:"No todos Found",
            data: []
        })
    }

    res.status(200).json({
        success:true,
        data:todos
    })
    }
    catch (error) {
        console.error("GET TODO ERROR:", error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
    
}

exports.getTodoById = async(req, res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid ID"
            });
        }
    const todo = await TodoModel.findById(id);

    if(!todo) {
        return res.status(404).json({
            success: false,
            message: `Todo Not Found for id: ${id}`
        });
    }

    res.status(200).json({
        success: true,
        data: todo
    });
}

//Create New todo method
exports.addTodo = async (req, res) => {
    const {data} = req.body;

    if(!data || Object.keys(data).length === 0){
        return res.status(400).json({
            success: false,
            message: "Please provide the data to create a new todo"
        })
    }

    const newTodo = await TodoModel.create(data);
    //const getAllTodos = await TodoModel.find();

    res.status(201).json({
        success: true,
        message: "Todo Created Successfully",
        data: newTodo
    })
}

exports.updateTodoById = async (req, res) => {
    const {id} = req.params;
    const {data} = req.body;

    if(!data || Object.keys(data).length === 0){
        return res.status(400).json({
            success: false,
            message: "Please provide the data to update the todo"
        })
    }

    const todo = await TodoModel.findById(id);
    if(!todo){
        return res.status(404).json({
            success: false,
            message: `Todo Not Found for id: ${id}`
        });
    }

    const updatedTodo = await TodoModel.findByIdAndUpdate(id, data, {new: true});

    res.status(200).json({
        success: true,
        data: updatedTodo,
        message: "Todo Updated Successfully"
    });
}

exports.deleteTodoById = async (req, res) => {
    const {id} = req.params;

    const todo = await TodoModel.findById(id);
    if(!todo){
        return res.status(404).json({
            success: false,
            message: `Todo Not Found for id: ${id}`
        });
    }


    await TodoModel.findByIdAndDelete(id);

    res.status(200).json({
        success: true,
        message: "Todo Deleted Successfully"
    });
}


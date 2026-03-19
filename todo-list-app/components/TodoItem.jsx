import React, { useState } from "react";
import { useTodo } from "../src/contexts";

function TodoItem({todo}) {
    const [isTodoEditable, setIsTodoEditable] = useState(false);
    const [todoMsg, setTodoMsg] = useState(todo.title)
    const {updateTodo, deleteTodo, toggleComplete} = useTodo()

    const editTodo = () =>{
        updateTodo(todo._id, {...todo, title:todoMsg})
        setIsTodoEditable(false);
    }
    const toggleCompleted = () =>{
        toggleComplete(todo._id);
    }
    return (
        <div
            className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300 text-black ${todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbcd7]"
                }`}>
            <input
                type="checkbox"
                className="cursor-pointer"
                checked={todo.completed}
                onChange={toggleCompleted}
            />
            <input
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg ${isTodoEditable ? "border-black/10 px-2" : "border-transparent"
                    } ${todo.completed ? "line-through" : ""}`}
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                readOnly={!isTodoEditable}
            />

            <button
                className="text-sm px-2 py-1 bg-gray-200 rounded-lg"
                onClick={() => {
                    if (todo.completed) return;

                    if (isTodoEditable) {
                        editTodo();
                    } else {
                        setIsTodoEditable((prev) => !prev);
                    }
                }}
            >
                {isTodoEditable ? "✔️" : "✏️"}
            </button>

            <button
                className="text-sm px-2 py-1 bg-red-200 rounded-lg"
                onClick={() => deleteTodo(todo._id)}
            >
                ❌
            </button>
        </div>
    );

}

export default TodoItem
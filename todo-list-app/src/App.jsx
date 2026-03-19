import { useEffect, useState } from 'react'
import './App.css'
import { TodoProvider } from './contexts';
import { TodoForm, TodoItem } from '../components';
import axios from "axios";

function App() {
const [todos, setTodos] = useState([]);
const api_url = "http://localhost:4000"
// const addTodo=(todo) =>{
//   setTodos((prev) => [...prev,todo])
// }
const addTodo= async(todo) => {
  const res = await axios.post(`${api_url}/api/todos`, {data:todo});
  setTodos((prev) => [...prev, res.data.data]);
};
// const updateTodo=(_id, todo) =>{
//   setTodos((prev) => prev.map((prevTodo) => (prevTodo._id === _id ? todo : prevTodo)))
// }
const updateTodo= async (_id, updatedTodo) => {
  const res = await axios.put(`${api_url}/api/todos/${_id}`,{data:updatedTodo});

  setTodos((prev) => prev.map((prevTodo) => (prevTodo._id === _id ? res.data.data : prevTodo)))
};
// const deleteTodo=(_id) =>{
//   setTodos((prev) => prev.filter(each => (each._id !== _id)))
// }
const deleteTodo=async (_id) =>{
  await axios.delete(`${api_url}/api/todos/${_id}`);
  setTodos((prev) => prev.filter(each => (each._id !== _id)))
}
// const toggleComplete=(_id) =>{
//   setTodos((prev) => prev.map(prevTodo => (prevTodo._id === _id ? 
//     {...prevTodo, completed: !prevTodo.completed}  
//     : prevTodo)))
// }
const toggleComplete = async(_id) => {
  const todo = todos.find((todo) => todo._id === _id);

  const res = await axios.put(`${api_url}/api/todos/${_id}`,{ data: { ...todo, completed: !todo.completed }});
  setTodos((prev) => prev.map((prevTodo) => (prevTodo._id === _id ? res.data.data : prevTodo)))
};
useEffect(()=>{
  axios.get(`${api_url}/api/todos`)
    .then(res => setTodos(res.data.data))
    .catch(err => console.log(err));
},[])

// useEffect(() =>{
//     const todos = JSON.parse(localStorage.getItem("todos"));
//     if(todos && todos.length > 0){
//       setTodos(todos);
//     }
// },[])

// useEffect(()=>{
//   localStorage.setItem("todos", JSON.stringify(todos));
// },[todos])

  return (
    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}}>
     <div className='bg-[#172842] min-h-screen py-8'>

        <div className='w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white'>
          <h2 className='text-2xl font-bold text-center mb-8 mt-2'>Todo List</h2>
            <div className='mb-4'>
              <TodoForm />
            </div>
            <div className='flex flex-wrap gap-y-3'>
              {
                todos.map((todo)=>(
                  <div key={todo._id} className='w-full'>
                    <TodoItem todo ={todo} />
                  </div>
                ))
              }
            </div>
          
        </div>

     </div>
    </TodoProvider>
  )
}

export default App

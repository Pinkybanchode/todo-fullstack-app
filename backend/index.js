const express = require("express");
const cors = require("cors")
const dotenv = require("dotenv");


const DbConnection = require('./databaseConnection');

const todoRoutes = require("./routes/todo-routes");
dotenv.config();
const app = express();
app.use(cors());
DbConnection();

app.use(express.json());

app.get("/", (req, res)=> {
    res.status(200).json({
        message: "This is Home Page :-)"
    })
})

app.use("/api/todos", todoRoutes);

// app.use((req, res) => {
//     res.status(500).send({
//         message: "Not Built Yet"
//     });
// });
app.use((err, req, res, next) => {
    console.error("GLOBAL ERROR:", err.stack);

    res.status(500).json({
        success: false,
        message: err.message,
        stack: err.stack
    });
});
const PORT = 4000;
app.listen(PORT, () =>{
    console.log(`Server is up and rruning on http://localhost:${PORT}`)
})

# todo-list-apis

This Project is Backend APIs for Managing Todo List

Supports following APIs (services)
    1. GetTodos - returns All the todos
    2. GetTodoById - returns specific todo by Id
    3. AddNewTodo - Adds new todo to the list
    4. UpdateTodoById - Updates specific todo Id: todotitle/completed status
    5. DeleteTodo - Delete specific todo by Id

# challenges
1. faced connection error MongoParseError  usenewurlparser, useunifiedtopology not supported
    Solution: with mongoose v6+ those are add by default, so removed

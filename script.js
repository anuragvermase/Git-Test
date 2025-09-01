// Get references to HTML elements
const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

// Array to store our todos
let todos = [];

// Add event listeners
addBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTodo();
    }
});

// Function to add a new todo
function addTodo() {
    const todoText = todoInput.value.trim();
    
    // Check if input is not empty
    if (todoText === '') {
        alert('Please enter a task!');
        return;
    }
    
    // Create todo object
    const todo = {
        id: Date.now(), // Simple ID using timestamp
        text: todoText,
        completed: false
    };
    
    // Add to todos array
    todos.push(todo);
    
    // Clear input
    todoInput.value = '';
    
    // Update display
    displayTodos();
}

// Function to display todos
function displayTodos() {
    // Clear current list
    todoList.innerHTML = '';
    
    // Loop through todos and create HTML elements
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        
        li.innerHTML = `
            <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''} 
                   onchange="toggleTodo(${todo.id})">
            <span class="todo-text">${todo.text}</span>
            <button class="delete-btn" onclick="deleteTodo(${todo.id})">Delete</button>
        `;
        
        todoList.appendChild(li);
    });
}

// Function to toggle todo completion
function toggleTodo(id) {
    todos = todos.map(todo => {
        if (todo.id === id) {
            todo.completed = !todo.completed;
        }
        return todo;
    });
    
    displayTodos();
}

// Function to delete a todo
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    displayTodos();
}

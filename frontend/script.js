document.getElementById('add-task-btn').addEventListener('click', function() {
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value;

    console.log("Button clicked"); // Debugging log

    if (taskText.trim() === '') {
        console.log("Empty task, not adding."); // Check for empty input
        return; // Don't allow empty tasks
    }

    const newTask = {
        name: taskText,
    };

    console.log("Adding task:", newTask); // Debugging log for task details

    // POST request to add the task
    fetch('http://127.0.0.1:5000/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTask)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Failed to add task");
        }
    })
    .then(addedTask => {
        console.log("Task added:", addedTask); // Log success
        addTaskToDOM(addedTask); // Add task to the DOM
        taskInput.value = ''; // Clear the input field
    })
    .catch(error => {
        console.error('Error adding task:', error); // Log any errors
    });
});

function addTaskToDOM(task) {
    const taskList = document.getElementById('task-list');
    const li = document.createElement('li');
    li.textContent = task.name;

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i> Delete'; // Using Font Awesome icon
    deleteBtn.addEventListener('click', function() {
        // DELETE request to remove the task
        fetch(`http://127.0.0.1:5000/tasks/${task.id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                taskList.removeChild(li); // Remove task from DOM
            } else {
                throw new Error("Failed to delete task");
            }
        })
        .catch(error => console.log('Error deleting task:', error));
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

// Theme toggle functionality
document.getElementById('toggle-theme').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    const icon = document.body.classList.contains('dark-mode') ? '🌕' : '🌙';
    this.textContent = icon;
});

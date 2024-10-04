from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# In-memory task list (for simplicity)
tasks = []
task_id_counter = 1  # Counter to assign unique IDs to tasks

# Root URL route
@app.route('/')
def index():
    return "Welcome to the Task Manager API", 200

# GET route for retrieving tasks
@app.route('/tasks', methods=['GET'])
def get_tasks():
    return jsonify(tasks), 200

# POST route for adding a new task
@app.route('/tasks', methods=['POST'])
def add_task():
    global task_id_counter
    new_task = request.json
    new_task['id'] = task_id_counter
    tasks.append(new_task)
    task_id_counter += 1
    return jsonify(new_task), 201

# DELETE route for removing a task by ID
@app.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    task_to_delete = next((task for task in tasks if task['id'] == task_id), None)
    if task_to_delete:
        tasks.remove(task_to_delete)
        return jsonify({"message": "Task deleted"}), 200
    return jsonify({"message": "Task not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)

import React, { useState } from 'react';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [editingText, setEditingText] = useState('');

  // Add new task
  const addTask = () => {
    if (newTask.trim() === '') return;
    setTasks([...tasks, { id: Date.now(), text: newTask }]);
    setNewTask('');
  };

  // Edit task
  const editTask = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    setEditingTask(id);
    setEditingText(taskToEdit.text);
  };

  // Update task after editing
  const updateTask = () => {
    setTasks(tasks.map((task) => (task.id === editingTask ? { ...task, text: editingText } : task)));
    setEditingTask(null);
    setEditingText('');
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Task Manager</h1>

        {/* Input for new tasks */}
        <div className="flex mb-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter a new task..."
            className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addTask}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        {/* List of tasks */}
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className="flex items-center justify-between mb-4">
              {editingTask === task.id ? (
                <>
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={updateTask}
                    className="bg-green-500 text-white px-4 py-2 rounded-r-lg hover:bg-green-600 ml-2"
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <span className="flex-grow">{task.text}</span>
                  <div>
                    <button
                      onClick={() => editTask(task.id)}
                      className="bg-yellow-400 text-white px-4 py-2 rounded-lg hover:bg-yellow-500 ml-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 ml-2"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>

        {tasks.length === 0 && <p className="text-gray-500 text-center">No tasks available. Add some tasks!</p>}
      </div>
    </div>
  );
};

export default App;

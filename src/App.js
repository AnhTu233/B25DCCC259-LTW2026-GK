import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Layout from './components/Layout';
import Home from './pages/Home';
import TaskList from './pages/TaskList';
import AddTask from './pages/AddTask';
import TaskDetail from './pages/TaskDetail';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Tải dữ liệu API hoặc LocalStorage[cite: 6]
  useEffect(() => {
    const localData = localStorage.getItem('gk_tasks');
    if (localData) {
      setTasks(JSON.parse(localData));
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    axios.get('/data/tasks.json', { signal: controller.signal })
      .then(res => {
        setTasks(res.data);
        setLoading(false);
      })
      .catch(err => {
        if (!axios.isCancel(err)) {
          setError(true);
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, []);

  // Lưu dữ liệu vào LocalStorage[cite: 6]
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('gk_tasks', JSON.stringify(tasks));
    }
  }, [tasks, loading]);

  const addTask = (newTask) => {
    const maxId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) : 0;
    const taskToAdd = { ...newTask, id: maxId + 1, done: false };
    setTasks([...tasks, taskToAdd]);
  };

  const toggleTaskStatus = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home tasks={tasks} loading={loading} error={error} />} />
        <Route path="tasks" element={<TaskList tasks={tasks} toggleTaskStatus={toggleTaskStatus} deleteTask={deleteTask} loading={loading} error={error} />} />
        <Route path="tasks/new" element={<AddTask addTask={addTask} />} />
        <Route path="tasks/:id" element={<TaskDetail tasks={tasks} />} />
      </Route>
    </Routes>
  );
};

export default App;
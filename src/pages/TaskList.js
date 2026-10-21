import React, { useState } from 'react';
import FilterBar from '../components/FilterBar';
import TaskTable from '../components/TaskTable';

const TaskList = ({ tasks, toggleTaskStatus, deleteTask, loading, error }) => {
  const [search, setSearch] = useState('');
  const [filterPriority, setFilterPriority] = useState('Tất cả');

  if (loading) return <div><b>Đang tải...</b></div>;
  if (error) return <div><b>Không tải được dữ liệu.</b></div>;

  const filteredTasks = tasks.filter(task => {
    const matchSearch = task.title.toLowerCase().includes(search.toLowerCase());
    const matchPriority = filterPriority === 'Tất cả' || task.priority === filterPriority;
    return matchSearch && matchPriority;
  });

  return (
    <div>
      <FilterBar 
        search={search} 
        setSearch={setSearch} 
        filterPriority={filterPriority} 
        setFilterPriority={setFilterPriority} 
      />
      
      {filteredTasks.length > 0 ? (
        <>
          <p><b>Tìm thấy {filteredTasks.length} công việc</b></p>
          <TaskTable 
            tasks={filteredTasks} 
            toggleTaskStatus={toggleTaskStatus} 
            deleteTask={deleteTask} 
          />
        </>
      ) : (
        <p><b>Không có dữ liệu.</b></p>
      )}
    </div>
  );
};

export default TaskList;
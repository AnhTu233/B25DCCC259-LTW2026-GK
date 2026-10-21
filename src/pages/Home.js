import React from 'react';

const Home = ({ tasks, loading, error }) => {
  if (loading) return <div><b>Đang tải...</b></div>;
  if (error) return <div><b>Không tải được dữ liệu.</b></div>;

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.done).length;
  // Bắt buộc dùng reduce cho ít nhất 1 con số
  const hoursLeft = tasks.reduce((sum, task) => (!task.done ? sum + task.hours : sum), 0);

  return (
    <div>
      <h2>Công việc nhóm</h2>
      <p><b>Tổng số công việc:</b> {totalTasks}</p>
      <p><b>Số công việc đã xong:</b> {completedTasks}</p>
      <p><b>Tổng số giờ còn lại:</b> {hoursLeft}</p>
    </div>
  );
};

export default Home;
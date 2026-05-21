import React, { useState, useEffect } from "react";
import Navbar from "../../components/Layout/Navbar";
import TodoServices from "../../Services/TodoServices";
import Spinner from "../../components/Spinner";
import './TodoList.css';

const TodoList = () => {
  const [todoStatus, settodoStatus] = useState("");
  const [filteredTask, setFilteredTask] = useState([]);
  const [allTask, setAllTask] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all user todos once on mount
  const getUserTask = async () => {
    const userData = JSON.parse(localStorage.getItem("todo_token"));
    const id = userData && userData?.user.id;

    setLoading(true);
    try {
      const { data } = await TodoServices.getAllTodo(id);
      const tasks = data?.todos || [];
      setAllTask(tasks);
      setFilteredTask(tasks); // Default: show all tasks initially
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  // Run once when page loads
  useEffect(() => {
    getUserTask();
  }, []);

  // Handle filtering when todoStatus or allTask updates
  useEffect(() => {
    const cleanStatus = todoStatus.trim();

    if (cleanStatus === "incomplete") {
      setFilteredTask(allTask.filter((item) => !item?.isCompleted));
    } else if (cleanStatus === "completed") {
      setFilteredTask(allTask.filter((item) => item?.isCompleted));
    } else {
      // Default / "Select Status": Show everything
      setFilteredTask(allTask);
    }
  }, [todoStatus, allTask]);

  return (
    <>
      <Navbar />

      <div className="filter-wrapper">
        <div className="filter-container">
          <h4>Filter By:</h4>
          <div className="filter-group">
            <select
              className="form-select"
              value={todoStatus}
              onChange={(e) => settodoStatus(e.target.value)}
            >
              <option value=" ">Select Status (All)</option>
              <option value="incomplete">Incomplete</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div className="todo-container">
          {filteredTask.length === 0 ? (
            <div className="no-task-wrapper">
              <h1 className="no-task">No Tasks Found</h1>
              <p>Try switching your filters or add a new task to get started.</p>
            </div>
          ) : (
            <div className="todo-card-grid">
              {filteredTask.map((task, idx) => {
                const currentId = task?._id || idx;
                return (
                  <div className="task-card" key={currentId}>
                    <div className="task-card-header">
                      <span className={`status-badge ${task?.isCompleted ? "completed" : "incomplete"}`}>
                        {task?.isCompleted ? "Completed" : "Incomplete"}
                      </span>
                      <p className="task-card-date">
                        {task?.createdAt?.substring(0, 10)}
                      </p>
                    </div>

                    <div className="task-card-body">
                      <h2 className="task-card-title">{task?.title}</h2>
                      <p className="task-card-desc">{task?.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default TodoList;
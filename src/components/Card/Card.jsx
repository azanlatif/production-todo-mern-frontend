import React, { useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import EditTodo from "../EditTodo";
import toast from "react-hot-toast";
import TodoServices from "../../Services/TodoServices";
import "./Card.css";

const Card = ({ allTask, getUserTask }) => {
    // Tracks the specific task being edited to prevent all modals from opening at once
    const [editingTaskId, setEditingTaskId] = useState(null);

    const handleDelete = async (id) => {
        try {
            await TodoServices.deleteTodo(id);
            getUserTask();
            toast.success('Task Deleted successfully');
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || 'Error deleting task');
        }
    };

    return (
        <div className="card-grid">
            {allTask?.map((task, idx) => {
                const currentId = task?._id || idx;
                
                return (
                    <div className="task-card" key={currentId}>
                        {/* 1. Header Wrapper: Aligns Status Badge and Date on one line */}
                        <div className="task-card-header">
                            <span className={`status-badge ${task?.isCompleted ? "completed" : "incomplete"}`}>
                                {task?.isCompleted ? "Completed" : "Incomplete"}
                            </span>
                            <p className="task-card-date">
                                {task?.createdAt?.substring(0, 10)}
                            </p>
                        </div>

                        {/* 2. Body Wrapper: Contains the titles and descriptions */}
                        <div className="task-card-body">
                            <h2 className="task-card-title">
                                {task?.title}
                            </h2>
                            <p className="task-card-desc">
                                {task?.description}
                            </p>
                        </div>

                        {/* 3. Actions Wrapper: Pushes action buttons to the bottom right */}
                        <div className="card-actions">
                            <button 
                                onClick={() => setEditingTaskId(currentId)} 
                                className="card-action-btn edit"
                                title="Edit Task"
                            >
                                <FaEdit size={14} />
                            </button>

                            <button 
                                onClick={() => handleDelete(task?._id)} 
                                className="card-action-btn delete"
                                title="Delete Task"
                            >
                                <FaTrashAlt size={14} />
                            </button>
                        </div>

                        {/* Modal container targeting only the specific task card */}
                        {editingTaskId === currentId && (
                            <EditTodo 
                                getUserTask={getUserTask} 
                                task={task} 
                                setShowModal={(isOpen) => setEditingTaskId(isOpen ? currentId : null)} 
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default Card;
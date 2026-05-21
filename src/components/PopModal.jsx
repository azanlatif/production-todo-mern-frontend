import React from "react";
import toast from "react-hot-toast";
import TodoServices from "../Services/TodoServices";
import "./PopModal.css";

const PopModal = ({
    showModal,
    setShowModal,
    title,
    setTitle,
    description,
    setDescription,
    getUserTask
}) => {
    // handle close
    const handleClose = () => {
        setShowModal(false);
    };

    // handle submit
    const handleSubmit = async () => {
        try {
            const userData = JSON.parse(localStorage.getItem("todo_token"));
            const createdBy = userData && userData.user.id;
            const data = { title, description, createdBy };
            if (!title || !description) {
                return toast.error("Please provide title or description");
            }
            const todo = await TodoServices.createTodo(data);
            setShowModal(false);
            getUserTask()
            toast.success("Task created Successfully");
            setTitle("");
            setDescription("");
            console.log(todo);
        } catch (error) {
            console.log(error);
            toast.error(
                error.response?.data?.message ||
                error.message ||
                "Something went wrong",
            );
        }
    };

    return (
        <>
            {showModal && (
                <div tabIndex="-1" role="dialog" className="modal-overlay">
                    <div role="document" className="modal-wrapper">
                        <div className="modal-container">
                            {/* Header */}
                            <div className="modal-header">
                                <h2 className="modal-title">Add New Task</h2>

                                <button
                                    className="close-btn"
                                    aria-label="close"
                                    onClick={handleClose}
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            {/* Body */}
                            <div className="modal-body">
                                <div className="input-group">
                                    <label>Title</label>

                                    <input
                                        type="text"
                                        className="modal-input"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="Enter task title"
                                    />
                                </div>

                                <div className="input-group">
                                    <label>Description</label>

                                    <textarea
                                        rows={3}
                                        className="modal-textarea"
                                        placeholder="Add your description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    ></textarea>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="close-action-btn"
                                    onClick={handleClose}
                                >
                                    Close
                                </button>

                                <button
                                    type="button"
                                    className="create-btn"
                                    onClick={handleSubmit}
                                >
                                    Create
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PopModal;

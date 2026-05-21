import React, { useState } from 'react'
import TodoServices from '../Services/TodoServices'
import toast from 'react-hot-toast'
import './PopModal.css'

const EditTodo = ({ task, setShowModal, getUserTask }) => {
    const [title, setTitle] = useState(task?.title)
    const [description, setDescription] = useState(task?.description)
    const [isCompleted, setIsCompleted] = useState(task?.isCompleted)

    const handleClose = () => {
        setShowModal(false)
    }

    const handelSelectChange = (e) => {
        setIsCompleted(e.target.value)
    }

    // id
    const id = task?._id


    const handleSubmit = async () => {
        try {
            const userData = JSON.parse(localStorage.getItem("todo_token"));
            const createdBy = userData && userData.user.id;
            const data = { title, description, createdBy, isCompleted };
            if (!title || !description) {
                return toast.error("Please provide title or description");
            }
            await TodoServices.updateTodo(id, data);
            setShowModal(false);
            getUserTask();
            toast.success("Task Updated Successfully");
            setTitle("");
            setDescription("");
        } catch (error) {
            console.log(error);
            toast.error(
                error
            );
        }
    }
    return (

        <>
            {task && (
                <div tabIndex="-1" role="dialog" className="modal-overlay">
                    <div role="document" className="modal-wrapper">
                        <div className="modal-container">
                            {/* Header */}
                            <div className="modal-header">
                                <h5 className="modal-title">Update Your Task</h5>
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

                            <div className='edit-status-wrapper'>
                                <select className='edit-status-select' onChange={handelSelectChange}>
                                    <option defaultValue={false}>Select Status</option>
                                    <option value={true}>Completed</option>
                                    <option value={false}> Incomplete</option>
                                </select>
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
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default EditTodo

import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Layout/Navbar';
import PopModal from '../../components/PopModal';
import { FaPlus } from 'react-icons/fa';
import TodoServices from '../../Services/TodoServices';
import Card from '../../components/Card/Card';
import Spinner from '../../components/Spinner';
import './HomePage.css'; // Ensure proper styles path assignment

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [description, setDescription] = useState('');
  const [allTask, setAllTask] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]); // Keeps search tracking clear from core tasks
  const [loading, setLoading] = useState(false);

  const openModalHandler = () => {
    setShowModal(true);
  };

  // Fixed Local Memory Filtering State Machine
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (!query.trim()) {
      setFilteredTasks(allTask);
      return;
    }

    const matchedList = allTask.filter(item =>
      item?.title?.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredTasks(matchedList);
  };

  const getUserTask = async () => {
    const userData = JSON.parse(localStorage.getItem("todo_token"));
    const id = userData && userData?.user.id;

    setLoading(true);
    try {
      const { data } = await TodoServices.getAllTodo(id);
      setAllTask(data?.todos || []);
      setFilteredTasks(data?.todos || []); // Populate both arrays simultaneously
    } catch (error) {
      console.error("Fetch Tasks Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserTask();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <div className='add-task'>
          <h1>Your Tasks</h1>

          <input
            type="search"
            placeholder='Search your tasks...'
            onChange={handleSearch}
            value={searchQuery}
          />

          <button onClick={openModalHandler} className='btn'>
            Create Task <FaPlus />
          </button>
        </div>

        {loading ? (
          <Spinner />
        ) : (
          filteredTasks && (
            <Card allTask={filteredTasks} getUserTask={getUserTask} />
          )
        )}

        <PopModal
          showModal={showModal}
          setShowModal={setShowModal}
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          getUserTask={getUserTask}
        />
      </div>
    </>
  );
};

export default HomePage;
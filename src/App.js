import React, { useState, useEffect } from 'react';
import {Header} from './components/Header';
import { InputTask } from './components/InputTask';
import { TaskList } from './components/TaskList';
import styles from './App.module.css';

function App() {
  const [tasksList, setTaskList] = useState([]);
  const [newValue, setNewValue] = useState('');
  const [editTask, setEditTask] = useState(null);
  const [sortFilter, setSortFilter] = useState(false);
  const [search, setSearch] = useState('');

  const toSearchTask = tasksList.filter((task) => task.text.includes(search));
  
  const toFileterButton = () => {
    if(sortFilter) {
      return [...tasksList].sort((a, b) => a['text'].localeCompare(b['text']));
    } else if(search) {
      return toSearchTask;
    }
    return tasksList;
    
  }
  const sortedTaskList = toFileterButton();

  useEffect(() => {
    fetch('http://localhost:3000/tasks')
      .then((res) => res.json())
      .then((data) => setTaskList(data))
  }, [tasksList]);

  return (
    <div className={styles.App}>
      <Header/>

      <InputTask 
        input={newValue}
        setInput={setNewValue}
        tasks={tasksList}
        newTask={setTaskList}
        editTask={editTask}
        setEditTask={setEditTask}
      />
      <button onClick={() => setSortFilter(!sortFilter)} className={sortFilter ? styles.FilterBtnActived : styles.FilterBtn}>Filter from A-Z</button>

      <input className={styles.SearchInput} placeholder='search for task' type='text' value={search} onChange={(e) => setSearch(e.target.value)}/>

      <TaskList 
        tasksList={sortedTaskList}
        setTaskList={setTaskList}
        setEditTask={setEditTask}
      />

    </div>
  );
}

export default App;

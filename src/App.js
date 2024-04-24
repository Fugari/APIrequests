import { useEffect, useState } from 'react';
import styles from './App.module.css';

function App() {
  const [todo, setTodo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((todoData) => todoData.json())
      .then((loadedData) => setTodo(loadedData))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className={styles.DataContainer}>
      <h3>ToDo List</h3>
      {isLoading 
        ? <div className={styles.loader}></div> 
        : todo.map(({ id, title }) => (
          <div key={id}> {title} </div>
        ))
      }
    </div>
  );
}

export default App;

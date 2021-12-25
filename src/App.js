import React, { useEffect, useState, useCallback } from 'react';

// React-Custom_Hooks_Function-Calling_Custom_Hook_From_Component
import useHTTP from './hooks/use-http';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';

function App() {
  const [tasks, setTasks] = useState([]);

  // Data specific login is kept on the main function
  // It will be called by our custom hook as an argument, whenever it is needed
  // React-Custom_Hooks_Function-Calling_Custom_Hook_From_Component
  const transformTasks = useCallback(taskObj => {
    const loadedTasks = [];

    for (const taskKey in taskObj) {
      loadedTasks.push({ id: taskKey, text: taskObj[taskKey].text });
    }

    setTasks(loadedTasks);
  // Here, we don't need to put any dependency.
  // Because state updating function "setTasks" will
  // never change. Other than that, nothing changes.
  }, [])

  // Here this function can just pass a single keyword for the object argument
  // Other object keys are set to have default values and this is the reason they are 
  // left out blank, it will get the default value that are
  // assigned in "use-http.js"
  // here "SendRequest" is a returned function whenever needed
  // "transformTasks is a function hoisted from "use-http.js" to "App.js".
  // Because original function resides on this level.
  // React-Custom_Hooks_Function-Calling_Custom_Hook_From_Component
  const fetchLink = 'https://react-custom-hooks-fetch-api-default-rtdb.firebaseio.com/tasks.json';
  // Here, when we destructure with "sendRequest: fetchTasks", we assign an alias
  // for the sendRequest key.
  const { isLoading, error, sendRequest: fetchTasks } = useHTTP({ url: fetchLink },
    transformTasks
  );

  useEffect(() => {
    // "fetchTasks" function literally resides in
    // our custom hook and is returned by it
    // whenever it is requested like in this case.
    // This useEffect is used to have a GET request on page load.
    // The function is then called from our custom hook, and it is
    // returned from that hook to the "App" component.
    fetchTasks();
  }, []);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      {/* "fetchTasks" function literally resides in */}
      {/* our custom hook and is returned by it */}
      {/* whenever it is requested like in this case. */}
      {/* This function is passed as props to "Tasks" component. */}
      {/* Function is then hoisted to "App" component which is then*/}
      {/* returned from our custom hook */}
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;

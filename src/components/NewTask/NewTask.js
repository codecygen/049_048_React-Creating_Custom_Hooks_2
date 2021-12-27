// React-Custom_Hooks_Function-Calling_Custom_Hook_From_Component
import useHTTP from '../../hooks/use-http';

import Section from '../UI/Section';
import TaskForm from './TaskForm';

const NewTask = (props) => {
  const { isLoading, error, sendRequest: sendTaskRequest } = useHTTP();

  const createTask = (taskText, taskData) => {
    const generatedId = taskData.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };

    props.onAddTask(createdTask);
  }

  const enterTaskHandler = async (taskText) => {
    sendTaskRequest(
      {
        url: 'https://react-custom-hooks-fetch-api-default-rtdb.firebaseio.com/tasks.json',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: { text: taskText }
      // Here createTask function is applyData(data) argument
      // of sendRequest function in "use-http.js". As you can see
      // "applyData(data)" function only takes 2 arguments which is carried
      // out to createTask(taskData) function that is alias of "applyData(data)"
      // function. But in "createTask(taskData)" we don't only accept taskData
      // but also taskText as an argument. So the bind method down below creates
      // a derivative of the function "createTask" which will allow "taskText" to
      // be taken as a first argument, and then the default "tasData" will be taken
      // as an argument. For more information about bind method check
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind
      }, createTask.bind(null, taskText)
    );
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
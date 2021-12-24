import { useState } from "react";

const useHTTP = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Only necessary for GET request
    const [tasks, setTasks] = useState([]);

    const enterTaskHandler = async (taskText, postReq = true) => {
        setIsLoading(true);
        setError(null);

        let fetchArgument;

        if (!postReq) {
            fetchArgument = {
                method: 'POST',
                body: JSON.stringify({ text: taskText }),
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        } else {
            fetchArgument = {
                method: 'GET'
            }
        }

        try {
            const response = await fetch(
                'https://react-custom-hooks-fetch-api-default-rtdb.firebaseio.com/tasks.json',
                fetchArgument
            );

            if (!response.ok) {
                throw new Error('Request failed!');
            }

            const data = await response.json();

            if (postReq) {
                const generatedId = data.name; // firebase-specific => "name" contains generated id
                const createdTask = { id: generatedId, text: taskText };
                props.onAddTask(createdTask);

            } else {
                const loadedTasks = [];
                for (const taskKey in data) {
                    loadedTasks.push({ id: taskKey, text: data[taskKey].text });
                }
                setTasks(loadedTasks);
            }

        } catch (err) {
            setError(err.message || 'Something went wrong!');
        }
        setIsLoading(false);

        if (postReq) {
            return;
        } else {
            return;
        }
    };
};

export default useHTTP;
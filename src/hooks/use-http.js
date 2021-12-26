// React-Custom_Hooks_Function_File
import { useState, useCallback } from "react";

const useHTTP = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Here sendRequest function is returned to the components "App.js"
    // and "NewTask.js". So we can accept "requestConfig" as a parameter here
    // instead of accepting from "useHTTP" up top. This way, useCallback function
    // does not have to be used as a "useCallback" dependency parameter.
    const sendRequest = useCallback(async (requestConfig, applyData) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(
                requestConfig.url, {
                method: requestConfig.method ? requestConfig.method : 'GET',
                headers: requestConfig.headers ? requestConfig.headers : {},
                body: requestConfig.body ? JSON.stringify(requestConfig.body) : null
            }
            );

            if (!response.ok) {
                throw new Error('Request failed!');
            }

            const data = await response.json();

            applyData(data);

        } catch (err) {
            setError(err.message || 'Something went wrong!');
        }
        setIsLoading(false);

        // Arguments of the function, does not need to be used as a dependency
        // parameter because function parameters does not have any sideEffect on 
        // the overall logic of the function, meaning it would always return the 
        //same value for same input if nothing else is impacting the logic.
    }, []);

    // This is a modern way of writing a Javascript code
    // if key and value pairs are same, you can write the object
    // like this.
    return {
        isLoading,
        error,
        sendRequest
    };
};

export default useHTTP;
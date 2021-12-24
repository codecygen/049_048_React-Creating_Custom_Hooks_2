import { useState } from "react";

const useHTTP = (requestConfig, applyData) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = async (taskText, postReq = true) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(
                requestConfig.url, {
                    method: requestConfig.method,
                    headers: requestConfig.headers,
                    body: JSON.stringify(requestConfig.body)
                }
            );

            if (!response.ok) {
                throw new Error('Request failed!');
            }

            const data = await response.json();

        } catch (err) {
            setError(err.message || 'Something went wrong!');
        }
        setIsLoading(false);
    };
};

export default useHTTP;
import { useCallback, useState } from "react";

export const useHttpClient = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      const BASE_URL = "https://grocery-e-commerce-backend.herokuapp.com/";
      // const BASE_URL = "http://localhost:8080/";
      setLoading(true);
      try {
        const response = await fetch(BASE_URL + url, {
          method: method,
          body: body,
          headers: headers,
        });

        const responseData = await response.json();

        if (responseData.status === "false")
          throw new Error(responseData.token);

        setLoading(false);

        return responseData;
      } catch (e) {
        setError(e.message);
        setLoading(false);
      }
    },
    []
  );
  return { sendRequest, loading, error };
};

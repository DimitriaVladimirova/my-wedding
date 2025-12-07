import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";

const baseUrl = "http://localhost:3030";

export default function useRequest(initialUrl, initialState) {
  const { user, isAuthenticated } = useContext(UserContext);
  const [data, setData] = useState(initialState);

  const request = async (url, method, bodyData, config = {}) => {
    const options = {};

    if (method) {
      options.method = method;
    }

    if (bodyData) {
      options.headers = {
        ...options.headers,
        "content-type": "application/json",
      };
      options.body = JSON.stringify(bodyData);
    }

    if (config.accessToken || isAuthenticated) {
      options.headers = {
        ...options.headers,
        "X-Authorization": config.accessToken || user.accessToken,
      };
    }

    if (config.admin) {
      options.headers = {
        ...options.headers,
        "X-Admin": "true",
      };
    }

    const controller = new AbortController(); 
    options.signal = controller.signal; 

    request.abort = () => controller.abort();

    const response = await fetch(`${baseUrl}${url}`, options);

    if (!response.ok) {
      let message = response.statusText;
      try {
        const errorData = await response.json();
        if (errorData?.message) {
          message = errorData.message;
        }
      } catch (e) {}
      throw new Error(message);
    }

    if (response.status === 204) {
      return {};
    }

    return await response.json();
  };

  useEffect(() => {
    if (!initialUrl) return;

    let cancelled = false;

    request(initialUrl)
      .then((result) => {
       if (!cancelled) setData(result)
      })
      .catch((err) => {
        if (!cancelled) alert(err.message || err);
      });

      return () => {
        cancelled = true;
        request.abort?.();
      }
  }, [initialUrl]);

  return {
    request,
    data,
    setData,
  };
}

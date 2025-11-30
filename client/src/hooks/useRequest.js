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

    request(initialUrl)
      .then((result) => setData(result))
      .catch((err) => alert(err.message || err));
  }, [initialUrl]);

  return {
    request,
    data,
    setData,
  };
}

import React from "react";
import CryptoJS from "crypto-js";

type Props = {
  url: string;
  method: string;
  body: any;
};

const Api = async (props: Props) => {
  const baseUrl = "https://no23.lavina.tech"; // Update with your base URL
  const userKey = localStorage.getItem("key") || ""; // Provide a default value if key is null
  const userSecret = localStorage.getItem("secret") || ""; // Provide a default value if secret is null

  const { url, method, body } = props;

  const stringToSign = `${method}${url}${
    method === "GET" ? "" : JSON.stringify(body)
  }${userSecret}`;
  const sign = CryptoJS.MD5(stringToSign).toString();

  const headers = {
    "Content-Type": "application/json",
    Key: userKey,
    Sign: sign,
  };

  const requestOptions: RequestInit = {
    method: method,
    headers: headers,
  };

  if (method !== "GET" && method !== "HEAD") {
    requestOptions.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${baseUrl}${url}`, requestOptions);
    const responseData = await response.json();
    return responseData; // Return the response data
  } catch (error) {
    console.error(error);
    throw error; // Throw the error to be handled by the caller
  }
};

export default Api;

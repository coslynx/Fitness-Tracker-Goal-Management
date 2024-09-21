"use client";

import axios from "axios";
import { getCookie } from "cookies-next";
import { API_URL } from "@/config/index";

const client = axios.create({
  baseURL: API_URL,
});

client.interceptors.request.use(
  (config) => {
    const token = getCookie("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default client;
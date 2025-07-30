import axios from "axios";

import { AppRoutes } from "@/constants/routes";

const baseUrl =
  import.meta.env.MODE === "development"
    ? `${import.meta.env.VITE_BASE_URL}/api/auth`
    : "/api/auth";

axios.defaults.withCredentials = true;

const AuthService = {
  signUp: async (username, email, password) => {
    try {
      const response = await axios.post(`${baseUrl}${AppRoutes.signUp}`, {
        username,
        email,
        password,
      });

      return { message: response.data.message };
    } catch (error) {
      console.error(error);
      throw error.response.data.message;
    }
  },
  signIn: async (email, password) => {
    try {
      const response = await axios.post(`${baseUrl}${AppRoutes.signIn}`, {
        email,
        password,
      });

      return { user: response.data.user, message: response.data.message };
    } catch (error) {
      console.error(error);
      throw error.response.data.message;
    }
  },
  signOut: async () => {
    try {
      const response = await axios.post(`${baseUrl}${AppRoutes.signOut}`);

      return { message: response.data.message };
    } catch (error) {
      console.error(error);
      throw error.response.data.message;
    }
  },
  forgotPassword: async (email) => {
    try {
      const response = await axios.post(
        `${baseUrl}${AppRoutes.forgotPassword}`,
        {
          email,
        }
      );

      return { message: response.data.message };
    } catch (error) {
      console.error(error);
      throw error.response.data.message;
    }
  },
  resetPassword: async (token, password) => {
    try {
      const response = await axios.post(
        `${baseUrl}${AppRoutes.resetPassword}/${token}`,
        {
          token,
          password,
        }
      );

      return { message: response.data.message };
    } catch (error) {
      console.error(error);
      throw error.response.data.message;
    }
  },
  verifyEmail: async (code) => {
    try {
      const response = await axios.post(`${baseUrl}${AppRoutes.verifyEmail}`, {
        token: code,
      });

      return { user: response.data.user, message: response.data.message };
    } catch (error) {
      console.error(error);
      throw error.response.data.message;
    }
  },
  verifyToken: async () => {
    try {
      const response = await axios.get(`${baseUrl}${AppRoutes.verifyToken}`, {
        withCredentials: true,
      });

      return { user: response.data.user, message: response.data.message };
    } catch (error) {
      if (error.response.status === 401) {
        console.warn(error);
      } else {
        console.error(error);
      }
      throw error.response.data.message;
    }
  },
};

export { AuthService };

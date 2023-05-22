import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const UserContext = createContext({
  user: null,
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // check if user is already stored in cookies
    const user = cookies.get("user");
    try {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URl}/api/login/`,
        {
          email,
          password,
        },
        {
          headers: {
            Origin: "https://scheduling-platform.vercel.app",
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.data.status !== "success") {
        toast.error("Invalid credentials");
        return;
      }
      setUser({
        email: response.data.email,
        username: response.data.username,
        firstName: response.data.first_name,
        lastName: response.data.last_name,
        userId: response.data.user_id,
      });
      cookies.set("user", {
        email: response.data.email,
        username: response.data.username,
        firstName: response.data.first_name,
        lastName: response.data.last_name,
        userId: response.data.user_id,
      });
      navigate("/");
    } catch (error) {
      toast.error("There was an error");
      console.error(error);
    }
  };

  const register = async (firstName, lastName, email, password, username) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URl}/api/register/`,
        {
          email,
          password,
          first_name: firstName,
          last_name: lastName,
          username: username,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data.error) {
        toast.error(response.data.error);
        return;
      }

      if (response.data.status !== "success") {
        toast.error("Registration failed");
        return;
      }
      setUser({
        email: response.data.email,
        username: response.data.username,
        firstName: response.data.first_name,
        lastName: response.data.last_name,
        userId: response.data.user_id,
      });
      cookies.set("user", {
        email: response.data.email,
        username: response.data.username,
        firstName: response.data.first_name,
        lastName: response.data.last_name,
        userId: response.data.user_id,
      });
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("There was an error");
    }
  };

  const logout = async () => {
    const csrfToken = cookies.get("csrftoken");
    await axios.post(
      `${process.env.REACT_APP_BACKEND_URl}/api/logout/`,
      {},
      {
        headers: {
          "X-CSRFToken": csrfToken,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    // remove cookies
    cookies.remove("csrftoken");
    cookies.remove("user");
    setUser(null);
    navigate("/");
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default function useUser() {
  return useContext(UserContext);
}

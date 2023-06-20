import axios from "axios";
import { appUrl } from "./config";
const token = localStorage.getItem("token"); // Get the token from local storage
export const login = async (username, password) => {
  try {
    const { data } = await axios.post(`${appUrl}/auth/login`, {
      username,
      password,
    });
    return data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("An error occurred during login.");
    }
  }
};

export const register = async (
  firstName,
  lastName,
  username,
  password,
  roleId,
  centerVoterId
) => {
  try {
    const { data } = await axios.post(`${appUrl}/auth/register`, {
      firstName,
      lastName,
      username,
      password,
      roleId,
      centerVoterId,
    });
    return data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("An error occurred during login.");
    }
  }
};
export const updateTable = async (tableName) => {
  try {
    const { data } = await axios.patch(
      `${appUrl}/auth/updateTableName`,
      {
        tableName,
      },
      {
        headers: {
          Authorization: token, // Add the Authorization header with the token
        },
      }
    );
    return data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("An error occurred during login.");
    }
  }
};

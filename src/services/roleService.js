import axios from "axios";
import { appUrl } from "./config";
const token = localStorage.getItem("token"); // Get the token from local storage

const getRoles = async () => {
  try {
    const { data } = await axios.get(`${appUrl}/roles/all`, {
      headers: {
        Authorization: token, // Add the Authorization header with the token
      },
    });
    return data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      console.log(error);
    }
  }
};

export { getAllRoles };

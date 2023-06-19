import axios from "axios";
import { appUrl } from "./config";
const token = localStorage.getItem("token"); // Get the token from local storage

const register = async (description, image, reportTypeId) => {
  try {
    // Create a new FormData object
    const formData = new FormData();
    formData.append("description", description);
    formData.append("file", image);
    formData.append("reportTypeId", reportTypeId);
    const { data } = await axios.post(`${appUrl}/report/register`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
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

const getAll = async (votingCenterId = null, reportTypeId = null) => {
  try {
    const { data } = await axios.get(`${appUrl}/report/all`, {
      params: {
        votingCenterId,
        reportTypeId,
      },
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

export { register, getAll };

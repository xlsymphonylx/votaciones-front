import axios from "axios";
import { appUrl } from "./config";
const token = localStorage.getItem("token"); // Get the token from local storage

const getAllVotingCenters = async (municipalityId = null) => {
  try {
    const { data } = await axios.get(`${appUrl}/votingCenter/all`, {
      headers: {
        Authorization: token, // Add the Authorization header with the token
      },
      params: {
        municipalityId,
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

export { getAllVotingCenters };

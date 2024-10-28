import axios from "axios";
// Function to get all plans
export const getAllPlans = async () => {
  try {
    const response = await axios.get("http://192.168.145.108:5000/api/plans/all-plans");
    return response; // This will return the response object
  } catch (error) {
    // console.error("Error fetching plans :", error);
    throw error; // Re-throw error for further handling
  }
};

export const getUserPlans = async (userId: string) => {
  try {
    const response = await axios.get(`http://192.168.145.108:5000/api/plans/users/${userId}/plans`);
    return response.data; // Return the data directly
  } catch (error) {
    // console.error("Error fetching plans:", error);
    throw error; // Re-throw error for further handling
  }
};

export const getplanbyID = async (planId: string) => {
  try {
    const response = await axios.get(`http://192.168.145.108:5000/api/plans/${planId}`);
    return response.data; // Return the data directly
  } catch (error) {
    // console.error("Error fetching plans:", error);
    throw error; // Re-throw error for further handling
  }
};

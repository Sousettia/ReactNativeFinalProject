import axios from "axios";
// Function to get all plans
export const getAllPlans = async () => {
  try {
    const response = await axios.get("http://192.168.1.192:5000/api/plans/all-plans");
    return response; // This will return the response object
  } catch (error) {
    console.error("Error fetching plans :", error);
    throw error; // Re-throw error for further handling
  }
};

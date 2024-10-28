import axios from "axios";

// Function to get all plans
export const getAllPlans = async () => {
  try {
    const response = await axios.get(
      "http://192.168.145.108:5000/api/plans/all-plans"
    );
    return response;
  } catch (error) {
    console.error("Error fetching plans:", error);
    throw error;
  }
};

// Function to create a plan for a user
export const createPlan = async (userId, planData) => {
  try {
    const response = await axios.post(
      `http://192.168.145.108:5000/api/plans/users/${userId}/plans`,
      planData
    );
    return response;
  } catch (error) {
    console.error("Error creating plan:", error);
    throw error;
  }
};

// Function to get all plans for a specific user
export const getUserPlans = async (userId) => {
  try {
    const response = await axios.get(
      `http://192.168.145.108:5000/api/plans/users/${userId}/plans`
    );
    return response;
  } catch (error) {
    console.error("Error fetching user plans:", error);
    throw error;
  }
};

// Function to delete a specific plan for a user
export const deletePlan = async (userId, planId) => {
  try {
    await axios.delete(
      `http://192.168.145.108:5000/api/plans/users/${userId}/plans/${planId}`
    );
  } catch (error) {
    console.error("Error deleting plan:", error);
    throw error;
  }
};

// Function to add a plan to a user
export const addPlanToUser = async (userId, planId) => {
  try {
    await axios.post(
      `http://192.168.145.108:5000/api/plans/users/${userId}/plans/${planId}`
    );
  } catch (error) {
    console.error("Error add plan to user:", error);
    throw error;
  }
};

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../redux-toolkit/store";
import { getAllPlans } from "../services/plan-service";
// Define the Plan interface based on the formatted plans structure
interface Plan {
  id: string;
  title: string;
  budget: number;
  date: string;
  description: string;
}

// Define a type for the slice state
interface PlanSliceState {
  plans: Plan[] | null;
  loading: boolean;
  error: string | null;
}

// Define the initial state using that type
const initialState: PlanSliceState = {
  plans: null,
  loading: false,
  error: null,
};

// Step 2: Create the async thunk for fetching plans
export const fetchPlans = createAsyncThunk(
  "plans/fetchPlans",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllPlans();
      // Map through the API response to match the formatted structure
      const formattedPlans = response.data.map((plan: any) => ({
        id: plan.planId,
        title: plan.planName,
        budget: plan.budget,
        date: new Date(plan.dateOnTrip).toLocaleDateString("en-GB"),
        description: plan.description,
      }));
      return formattedPlans;
    } catch (error: any) {
      // Return a custom error message if something goes wrong
      return rejectWithValue(error.response?.data || "Failed to fetch plans");
    }
  }
);

export const planSlice = createSlice({
  name: "plan",
  initialState,
  reducers: {
    setPlans(state, action: PayloadAction<Plan[] | null>) {
      state.plans = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle the pending state (when fetchPlans is triggered)
      .addCase(fetchPlans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Handle the fulfilled state (when fetchPlans is successful)
      .addCase(fetchPlans.fulfilled, (state, action) => {
        state.loading = false;
        state.plans = action.payload;
      })
      // Handle the rejected state (when fetchPlans fails)
      .addCase(fetchPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setPlans } = planSlice.actions;

// Correct selector for the plan state
export const selectPlans = (state: RootState) => state.plan.plans;
export const selectPlansLoading = (state: RootState) => state.plan.loading;
export const selectPlansError = (state: RootState) => state.plan.error;
export default planSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../redux-toolkit/store";
import { getProfile } from "../services/auth-service"; // Import the API service

// Define a type for the slice state
interface AuthState {
  profile: any | null;
  isLogin: boolean;
  isLoading: boolean;
  error: string | null; // Add error state
}

// Define the initial state using that type
const initialState: AuthState = {
  isLogin: false,
  isLoading: false,
  profile: null,
  error: null, // Initial error state
};

// Async thunk to fetch the profile from API
export const fetchProfile = createAsyncThunk("auth/profile", async (_, { rejectWithValue }) => {
  try {
    const response = await getProfile();
    return response.data; // Assuming the API returns profile data in `response.data`
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLogin(state, action: PayloadAction<any | null>) {
      state.isLogin = action.payload;
    },
    setIsLoading(state, action: PayloadAction<any | null>) {
      state.isLoading = action.payload;
    },
    setProfile(state, action: PayloadAction<any | null>) {
      state.profile = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Clear any previous errors when fetching starts
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload; // Set the fetched profile data
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string; // Set the error if fetching fails
      });
  }, 
});

// Export actions
export const { setIsLoading, setIsLogin, setProfile } = authSlice.actions;

// Selector to access auth state
export const selectAuthState = (state: RootState) => state.authState;

export default authSlice.reducer;

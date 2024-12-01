import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "@/lib/supabaseClient";

// Initial state for the auth slice
// Define a type for the user
interface User {
  id: string;
  email: string;
}

// Define a type for the Thunk's Fulfilled Payload
interface AuthPayload {
  id: string;
  email: string;
}

// Correct initialState type
const initialState: {
  user: User | null;
  loading: boolean;
  error: string | null;
} = {
  user: null,
  loading: false,
  error: null,
};

export const signIn = createAsyncThunk<
  AuthPayload,
  { email: string; password: string }
>("auth/signIn", async ({ email, password }, thunkAPI) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;

    const user = data.user;
    if (!user) throw new Error("No user data returned from sign-in");

    return { id: user.id, email: user.email || "" };
  } catch (error: unknown) {
    return thunkAPI.rejectWithValue((error as Error).message);
  }
});

export const signUp = createAsyncThunk<
  AuthPayload,
  { email: string; password: string }
>("auth/signUp", async ({ email, password }, thunkAPI) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;

    const user = data.user;
    if (!user) throw new Error("No user data returned from sign-up");

    return { id: user.id, email: user.email || "" };
  } catch (error: unknown) {
    return thunkAPI.rejectWithValue((error as Error).message);
  }
});

export const signInWithGoogle = createAsyncThunk<AuthPayload>(
  "auth/signInWithGoogle",
  async (_, thunkAPI) => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });
      if (error) throw error;

      const userResponse = await supabase.auth.getUser();
      const user = userResponse.data?.user;

      if (!user) throw new Error("No user data returned from Google sign-in");

      return { id: user.id, email: user.email || "" };
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue((error as Error).message);
    }
  }
);

export const signInWithGitHub = createAsyncThunk<AuthPayload>(
  "auth/signInWithGitHub",
  async (_, thunkAPI) => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
      });
      if (error) throw error;

      const userResponse = await supabase.auth.getUser();
      const user = userResponse.data?.user;

      if (!user) throw new Error("No user data returned from GitHub sign-in");

      return { id: user.id, email: user.email || "" };
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue((error as Error).message);
    }
  }
);

// Update Auth Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signOut(state) {
      supabase.auth.signOut();
      state.user = null;
    },
    setUser(state, action: { payload: User }) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Sign In
    builder.addCase(signIn.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Sign Up
    builder.addCase(signUp.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Google Sign In
    builder.addCase(signInWithGoogle.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signInWithGoogle.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(signInWithGoogle.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // GitHub Sign In
    builder.addCase(signInWithGitHub.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signInWithGitHub.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(signInWithGitHub.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

// Export actions and reducer
export const { signOut, setUser } = authSlice.actions;
export default authSlice.reducer;

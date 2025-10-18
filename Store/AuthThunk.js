import {createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Constants from "expo-constants";
import {
  setUser,
  setSession,
  clearUser,
  setLoading,
  setError,
} from "./UserSlice";

export const loadUser = createAsyncThunk(
    'user/loadUser',
    async(_, {dispatch}) =>{
        try{
            const userData = await AsyncStorage.getItem("user");
            const sessionData = await AsyncStorage.getItem("session");
            if(userData && sessionData){
                const parsedUser = JSON.parse(userData);
                dispatch(setUser(parsedUser));
                dispatch(setSession(JSON.parse(sessionData)));
                return parsedUser;
            }
            return null;
        } catch(error){
            dispatch(setError("Failed to load userdata"));
            throw error;
        }
    }
);



export const signUp =  createAsyncThunk(
    'user/signUp',
    async({email,password,name}, {dispatch}) => {
        try{
            dispatch(setLoading(true));
            dispatch(setError(null));

            const response = await axios.post(
                `http://10.194.210.176:3000/api/auth/signup`,
                {email,password,name}
            );

            const {user} = response.data;
            await AsyncStorage.removeItem("user");
            await AsyncStorage.setItem("user", JSON.stringify(user));

            dispatch(setUser(user));
            dispatch(setError(false))
            return { success: true, user: user };
        } catch(error){
            const errorMessage = error.response?.data?.error || "Failed to sign up";
            dispatch(setError(true));
            return { success: false, error: errorMessage };
        } finally {
            dispatch(setLoading(false));
        }
    }
);



export const signIn = createAsyncThunk(
  "user/signIn",
  async ({ email, password }, { dispatch, rejectWithValue }) => {

    try {
      
      dispatch(setLoading(true));

      const response = await axios.post(
        `http://10.194.210.176:3000/api/auth/signin`,
        { email, password }
      );
      console.warn("Response:",response)
      if (response.data && response.data.user) {
        const { user, session } = response.data;

        console.warn(user)
        console.warn(session)
        await AsyncStorage.setItem("user", JSON.stringify(user));
        if (session) {
          await AsyncStorage.setItem("session", JSON.stringify(session));
        }

        dispatch(setUser(user));
        if (session) dispatch(setSession(session));
        dispatch(setError(false))
        return {
          success: true,
          user: response.data.user,
          session: response.data.session,
        };
      } else {
        return rejectWithValue({ error: "Invalid response from server" });
      }
    } catch (error) {
      return rejectWithValue({
        error: error.response?.data?.error || "Connection failed",
      });
    } finally {
      dispatch(setLoading(false));
    }
  }
);



export const signOut = createAsyncThunk(
  "user/signOut",
  async (_, { dispatch }) => {
    try {
      await AsyncStorage.removeItem("user");
      await AsyncStorage.removeItem("session");
      dispatch(clearUser());
      return { success: true };
    } catch (error) {
      dispatch(setError("Failed to sign out"));
      return { success: false };
    }
  }
);
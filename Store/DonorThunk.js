import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const submitDonor=createAsyncThunk(
    "donor/submitDonor",
    async(donorData, {rejectWithValue}) =>{
        try{
            const response= await axios.post(
                "http://192.168.1.192:3000/api/donor",
                donorData
            );
            return response.data;
        }
        catch(error){
            return rejectWithValue(
                error.response?.data?.error || "Failed to register donor"
            );
        }
    }
);


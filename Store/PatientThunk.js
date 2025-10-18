import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const submitPatient=createAsyncThunk(
    "patient/submitPatient",
    async(patientData, {rejectWithValue}) =>{
        try{
            const response= await axios.post(
                "http://10.194.210.176:3000/api/patient",
                patientData
            );
            return response.data;
        }
        catch(error){
            return rejectWithValue(
                error.response?.data?.error || "Failed to register patient"
            );
        }
    }
);
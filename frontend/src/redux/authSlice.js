import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        loading: false,
        user: null,  // user starts as null
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setUser: (state, action) => {
            console.log("User set in Redux:", action.payload);  // Log to check if user is set correctly

            if(action.payload==null){
                state.user = action.payload;
            }
            else{
                state.user = action.payload.user;
                state.totalRecruiterLogins = action.payload.totalRecruiterLogins;
                state.totalStudentLogins = action.payload.totalStudentLogins;
                state.totalActiveUsers = action.payload.totalActiveUsers;
            }
            
        }
    }
});

export const { setLoading, setUser } = authSlice.actions;
export default authSlice.reducer;

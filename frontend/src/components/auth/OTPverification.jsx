import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { toast } from 'sonner';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { useDispatch } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice'; // Added setUser here
import { Loader2 } from 'lucide-react';

const OTPVerification = () => {
    const [otp, setOtp] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoadingState] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Retrieve email passed from login page
    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.email) {
            setEmail(location.state.email);
        }
    }, [location]);

    const handleOTPChange = (e) => {
        setOtp(e.target.value);
    };

   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        setLoadingState(true);
        dispatch(setLoading(true));

        const res = await axios.post(`${USER_API_END_POINT}/verify-otp`, { email, otp } , {withCredentials : true});

        console.log("OTP Response:", res.data);  // Log the entire response to check if user is in res.data

        if (res.data.success) {
            // Ensure res.data.user contains user data
            //console.log("User data:", res.data.user);  // Check user data

            // Dispatch the user data to the Redux store
            dispatch(setUser(res.data));  // Correct user data

            toast.success("OTP verified successfully");

            // Redirect to home page after successful verification
            navigate("/"); 
        }
    } catch (error) {
        toast.error(error.response?.data?.message || "Verification failed");
    } finally {
        setLoadingState(false);
        dispatch(setLoading(false)); // Reset loading state
    }
};

    

    return (
        <div className="flex items-center justify-center max-w-7xl mx-auto">
            <form onSubmit={handleSubmit} className="w-1/2 border border-gray-200 rounded-md p-4 my-10">
                <h1 className="font-bold text-xl mb-5">OTP Verification</h1>
                <div className="my-2">
                    <Label>Email</Label>
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        disabled
                        required
                    />
                </div>
                <div className="my-2">
                    <Label>OTP</Label>
                    <Input
                        type="text"
                        value={otp}
                        onChange={handleOTPChange}
                        placeholder="Enter OTP"
                        required
                    />
                </div>
                {loading ? (
                    <Button className="w-full my-4">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                    </Button>
                ) : (
                    <Button type="submit" className="w-full my-4">
                        Verify OTP
                    </Button>
                )}
            </form>
        </div>
    );
};

export default OTPVerification;

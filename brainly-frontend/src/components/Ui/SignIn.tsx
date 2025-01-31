import { motion } from "framer-motion";
import { Button } from "./Button";
import { Input } from "./Input";
import { useRef } from "react";
import axios from "axios";
import { BackendURL } from "../config";
import { useNavigate } from "react-router-dom";

export const SignIn =  ({ toggle }:any)=> {
    const navigate = useNavigate()
    const usernameref = useRef<HTMLInputElement>()
    const passwordref = useRef<HTMLInputElement>()
    const signin = async (e: any) => {
        e.preventDefault();
        const name = usernameref.current?.value;
        const password = passwordref.current?.value;
    
        if (!name || !password) {
            console.log("Please enter both username and password.");
            return;
        }
    
        try {
            const response = await axios.post(`${BackendURL}/api/v1/signin`, {
                name,
                password
            });
    
            console.log("Sign-in successful:", response.data);
            const braineryToken = response.data.token
            localStorage.setItem("token",braineryToken)
            navigate('/dashboard')
        } catch (error: any) {
            console.error("Sign-in failed:", error.response?.data?.message || error.message);
        }
    };
    
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <h2 className="text-3xl font-bold text-center mb-4 text-purple-600">Sign In</h2>
        <form className="space-y-4" onSubmit={signin}>
          <Input referrance={usernameref} placeholder="Username"  />
          <Input referrance={passwordref} placeholder="Password"  />
          <Button variant="primary" size="lg" title="Sign In" className="w-full rounded-4xl" />
        </form>
        <p className="text-center text-sm mt-4">
          Don't have an account? 
          <span className="text-purple-600 cursor-pointer font-bold" onClick={toggle}> Sign Up</span>
        </p>
      </motion.div>
    );
  }
  
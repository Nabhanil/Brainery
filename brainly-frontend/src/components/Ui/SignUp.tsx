import { motion } from "framer-motion";
import axios from "axios";
import { Button } from "./Button";
import { Input } from "./Input";
import { useRef } from "react";
import { BackendURL } from "../config";


export const SignUp =({ toggle }:any)=> {
    const userref = useRef<HTMLInputElement>()                             
    const passwordref = useRef<HTMLInputElement>()                             
    const signup = async (e: any) => {
        e.preventDefault();
        const name = userref.current?.value;
        const password = passwordref.current?.value;
    
        if (!name || !password) {
            console.log("Username or password is missing.");
            return;
        }
    
        try {
            const response = await axios.post(`${BackendURL}/api/v1/signup`, {
                name,
                password
            });
    
            if(response.data.respnse){
                console.log("signed up successfully")
                
            }
        
        } catch (error: any) {
            console.error("Signup failed:", error.response?.data || error.message);
        }
    };
    
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <h2 className="text-3xl font-bold text-center mb-4 text-purple-600">Sign Up</h2>
        <form className="space-y-4" onSubmit={signup}>
          <Input referrance={userref} placeholder="Username"  />
          <Input referrance={passwordref} placeholder="Password"  />
          <Button variant="primary" size="lg" title="Sign Up" className="w-full rounded-4xl" onClick={()=>{signup}}/>
        </form>
        <p className="text-center text-sm mt-4">
          Already have an account? 
          <span className="text-purple-600 cursor-pointer font-bold" onClick={toggle}> Sign In</span>
        </p>
      </motion.div>
    );
  }
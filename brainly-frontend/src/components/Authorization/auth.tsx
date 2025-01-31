import { useState } from "react";
import { motion } from "framer-motion";
import { SignIn } from "../Ui/SignIn";
import { SignUp } from "../Ui/SignUp";




export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(true);

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-500 to-indigo-600">
      <motion.div className="w-96 p-6 bg-white shadow-lg rounded-3xl">
        {isSignUp ? <SignUp toggle={() => setIsSignUp(false)} /> : <SignIn toggle={() => setIsSignUp(true)} />}
      </motion.div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { IconBrandAppleFilled, IconBrandGoogleFilled } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import signInUser from "../api/sign-in"; // Adjust the import path as necessary

export const SignInForm: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [submitError, setSubmitError] = useState(""); // New state for submit error
    const [isLoading, setIsLoading] = useState(false); // New state for loading

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validatePassword = (password: string) => {
        return password.length >= 6; // Simple validation, adjust as needed
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setEmailError("");
        setPasswordError("");
        setSubmitError(""); // Reset submit error on submit
        setIsLoading(true); // Set loading state to true

        const isEmailValid = validateEmail(email);
        const isPasswordValid = validatePassword(password);

        if (!isEmailValid) {
            setEmailError("Please enter a valid email address.");
        }
        if (!isPasswordValid) {
            setPasswordError("Password must be at least 6 characters long.");
        }

        if (isEmailValid && isPasswordValid) {
            try {
                const data = await signInUser({ email, password });
                console.log("Form submitted successfully", data);
                // Add your success handling logic here, like redirecting or storing tokens
            } catch (error) {
                setSubmitError("An error occurred during sign in. Please try again." + error); // Set error message
            } finally {
                setIsLoading(false); // Reset loading state
            }
        } else {
            setIsLoading(false); // Reset loading state if validation fails
        }
    };

    const handleBlur = (field: "email" | "password") => {
        if (field === "email") {
            setEmailError("");
        } else {
            setPasswordError("");
        }
    };

    const ErrorPopup = ({ message }: { message: string }) => (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute left-0 top-full mt-0.5 bg-destructive text-destructive-foreground p-1.5 rounded-md shadow-lg z-10 w-full text-sm animate-fadeIn">
            <div className="absolute left-3 -top-1 w-2 h-2 bg-destructive rotate-45 transform -translate-x-1/2"></div>
            <span className="relative z-10 text-error">{message}</span>
        </motion.div>
    );

    return (
        <div className="flex w-full min-h-screen items-center justify-center bg-background p-4">
            <form onSubmit={handleSubmit} className="w-full max-w-[430px] bg-card text-card-foreground rounded-lg shadow-lg p-6 space-y-4" noValidate>
                <h1 className="text-2xl font-bold text-center mb-6">Sign in to your account</h1>

                <div className="relative pb-5">
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Email
                    </label>
                    <input id="email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} onBlur={() => handleBlur("email")} placeholder="Email" className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring" autoComplete="email" />
                    <AnimatePresence>{emailError && <ErrorPopup message={emailError} />}</AnimatePresence>
                </div>

                <div className="relative pb-5">
                    <label htmlFor="password" className="block text-sm font-medium mb-1">
                        Password
                    </label>
                    <input id="password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} onBlur={() => handleBlur("password")} placeholder="Password" className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring" autoComplete="current-password" />
                    <AnimatePresence>{passwordError && <ErrorPopup message={passwordError} />}</AnimatePresence>
                </div>

                <button
                    type="submit"
                    className={`w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 transition duration-300 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={isLoading} // Disable button when loading
                >
                    {isLoading ? "Signing In..." : "Sign In"}
                </button>

                <AnimatePresence>{submitError && <ErrorPopup message={submitError} />}</AnimatePresence>

                <div className="relative flex items-center">
                    <div className="flex-grow border-t border-border"></div>
                    <span className="flex-shrink mx-4 text-muted-foreground">Or continue with</span>
                    <div className="flex-grow border-t border-border"></div>
                </div>

                <div className="space-y-4">
                    <button type="button" className="w-full flex items-center justify-center px-4 py-2 border border-input rounded-md shadow-sm text-sm font-medium text-foreground bg-background hover:bg-accent hover:text-accent-foreground">
                        <IconBrandGoogleFilled className="w-5 h-5 mr-2" />
                        <span>Continue with Google</span>
                    </button>
                    <button type="button" className="w-full flex items-center justify-center px-4 py-2 border border-input rounded-md shadow-sm text-sm font-medium text-foreground bg-background hover:bg-accent hover:text-accent-foreground">
                        <IconBrandAppleFilled className="w-5 h-5 mr-2" />
                        <span>Continue with Apple</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

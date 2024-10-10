"use client";

import React, { useState } from "react";
import { IconBrandAppleFilled, IconBrandGoogleFilled } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";

export const SignInForm: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const validateUsername = (username: string) => {
        return username.length >= 3; // Simple validation, adjust as needed
    };

    const validatePassword = (password: string) => {
        return password.length >= 6; // Simple validation, adjust as needed
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setUsernameError("");
        setPasswordError("");

        const isUsernameValid = validateUsername(username);
        const isPasswordValid = validatePassword(password);

        if (!isUsernameValid) {
            setUsernameError("Username must be at least 3 characters long.");
        }
        if (!isPasswordValid) {
            setPasswordError("Password must be at least 6 characters long.");
        }

        if (isUsernameValid && isPasswordValid) {
            console.log("Form submitted successfully");
            // Add your sign-in logic here
        }
    };

    const handleBlur = (field: "username" | "password") => {
        if (field === "username") {
            setUsernameError("");
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
                    <label htmlFor="username" className="block text-sm font-medium mb-1">
                        Username
                    </label>
                    <input id="username" name="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} onBlur={() => handleBlur("username")} placeholder="Username" className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring" autoComplete="username" />
                    <AnimatePresence>{usernameError && <ErrorPopup message={usernameError} />}</AnimatePresence>
                </div>

                <div className="relative pb-5">
                    <label htmlFor="password" className="block text-sm font-medium mb-1">
                        Password
                    </label>
                    <input id="password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} onBlur={() => handleBlur("password")} placeholder="Password" className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring" autoComplete="current-password" />
                    <AnimatePresence>{passwordError && <ErrorPopup message={passwordError} />}</AnimatePresence>
                </div>

                <button type="submit" className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 transition duration-300">
                    Sign In
                </button>

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

"use client";

import React, { useState } from "react";
import { IconBrandAppleFilled, IconBrandGoogleFilled } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";

export function SignUpForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password: string) => {
        if (password.length < 8) {
            return "Password must be at least 8 characters long.";
        }
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/;
        if (!passwordRegex.test(password)) {
            return "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.";
        }
        return "";
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const isEmailValid = validateEmail(email);
        const passwordValidationMessage = validatePassword(password);

        setEmailError(isEmailValid ? "" : "Please enter a valid email address.");
        setPasswordError(passwordValidationMessage);

        if (isEmailValid && !passwordValidationMessage) {
            console.log("Form submitted successfully");
        }
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setEmailError(validateEmail(e.target.value) ? "" : "Please enter a valid email address.");
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setPasswordError(validatePassword(e.target.value));
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
                <h1 className="text-2xl font-bold text-center mb-6">Create an account</h1>

                <div className="relative pb-3">
                    {" "}
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Email
                    </label>
                    <input id="email" name="email" type="email" value={email} onChange={handleEmailChange} onBlur={() => handleBlur("email")} placeholder="Email" className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring" autoComplete="email" />
                    <AnimatePresence>{emailError && <ErrorPopup message={emailError} />}</AnimatePresence>
                </div>

                <div className="relative pb-5 mt-2">
                    {" "}
                    <label htmlFor="password" className="block text-sm font-medium mb-1">
                        Password
                    </label>
                    <input id="password" name="password" type="password" value={password} onChange={handlePasswordChange} onBlur={() => handleBlur("password")} placeholder="Password" className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring" autoComplete="new-password" />
                    <AnimatePresence>{passwordError && <ErrorPopup message={passwordError} />}</AnimatePresence>
                </div>

                <div>
                    <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                        First Name
                    </label>
                    <input id="firstName" name="firstName" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring" autoComplete="given-name" />
                </div>

                <div>
                    <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                        Last Name
                    </label>
                    <input id="lastName" name="lastName" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring" autoComplete="family-name" />
                </div>

                <button type="submit" className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 transition duration-300">
                    Sign Up
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
}

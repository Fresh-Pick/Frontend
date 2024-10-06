"use client";

import React, { useState } from "react";
import { IconBrandAppleFilled, IconBrandGoogleFilled } from "@tabler/icons-react";
import signUpUser from "../api/sign-up"; // Adjust the import path as necessary

export const SignUpForm: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        await signUpUser({ email, password, firstName, lastName });
    };

    return (
        <div className="flex w-full h-screen items-center justify-center">
            <form onSubmit={handleSubmit} className="flex w-full max-w-[430px] flex-col gap-2">
                <div className="overflow-hidden rounded-xl border border-neutral-200 p-2 shadow-sm dark:border-neutral-900">
                    <div className="flex w-full flex-col items-start justify-start gap-4 rounded-xl p-3 pb-4">
                        <div>
                            <h1 className="font-font text-lg">Create an account</h1>
                        </div>
                        <div className="w-full">
                            <label htmlFor="email" className="text-sm">
                                Email
                            </label>
                            <input name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="mt-1 h-10 w-full rounded-md border px-1 placeholder-neutral-400 outline-none focus:ring-2 focus:ring-neutral-800 dark:border-neutral-800 dark:placeholder-neutral-500" />
                        </div>
                        <div className="w-full">
                            <label htmlFor="password" className="text-sm">
                                Password
                            </label>
                            <input name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="mt-1 h-10 w-full rounded-md border px-1 placeholder-neutral-400 outline-none focus:ring-2 focus:ring-neutral-800 dark:border-neutral-800 dark:placeholder-neutral-500" />
                        </div>
                        <div className="w-full">
                            <label htmlFor="firstName" className="text-sm">
                                First Name
                            </label>
                            <input name="firstName" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" className="mt-1 h-10 w-full rounded-md border px-1 placeholder-neutral-400 outline-none focus:ring-2 focus:ring-neutral-800 dark:border-neutral-800 dark:placeholder-neutral-500" />
                        </div>
                        <div className="w-full">
                            <label htmlFor="lastName" className="text-sm">
                                Last Name
                            </label>
                            <input name="lastName" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" className="mt-1 h-10 w-full rounded-md border px-1 placeholder-neutral-400 outline-none focus:ring-2 focus:ring-neutral-800 dark:border-neutral-800 dark:placeholder-neutral-500" />
                        </div>
                        <div className="mt-2.5 w-full">
                            <button type="submit" className="h-10 w-full rounded-md bg-neutral-900 font-medium text-white dark:bg-white dark:text-neutral-950">
                                Submit
                            </button>
                        </div>

                        <div className="relative mt-6 w-full">
                            <div className="absolute left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-neutral-400 dark:bg-black dark:text-neutral-500">Or</div>
                            <div className="border-b border-neutral-300 dark:border-neutral-800"></div>
                        </div>
                        <div className="mt-6 flex w-full flex-col gap-4">
                            <button className="font-regular flex h-10 w-full items-center justify-center gap-2 rounded-md bg-neutral-900 text-white dark:bg-white dark:text-neutral-950">
                                <IconBrandGoogleFilled /> <div>Continue with Google</div>
                            </button>
                            <button className="font-regular flex h-10 w-full items-center justify-center gap-2 rounded-md bg-neutral-900 text-white dark:bg-white dark:text-neutral-950">
                                <IconBrandAppleFilled /> <div>Continue with Apple</div>
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

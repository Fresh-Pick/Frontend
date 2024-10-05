import { IconBrandAppleFilled, IconBrandGoogleFilled } from "@tabler/icons-react";
import { Account } from "./account";

export const SignInForm = () => {
    // you can grab url path from next/headers package in server component and insert defaultTab value based on that (if its /sign-in - 0, if it's /sign-up then 1, you got what I mean)
    return (
        <div className="flex w-full flex-col items-center justify-start">
            <Account firstTab={<Tab1 />} secondTab={<Tab2 />} defaultTab={0} />
        </div>
    );
};

const Tab1 = () => (
    <div className="flex w-full flex-col items-start justify-start gap-4 rounded-xl p-3 pb-4">
        <div>
            <h1 className="font-font text-lg">Sign in to your account</h1>
        </div>
        <div className="w-full">
            <label htmlFor="username" className="text-sm">
                Username
            </label>
            <input name="username" placeholder="Username" type="text" className="mt-1 h-10 w-full rounded-md border px-1 placeholder-neutral-400 outline-none focus:ring-2 focus:ring-neutral-800 dark:border-neutral-800 dark:placeholder-neutral-500" />
        </div>
        <div className="w-full">
            <label htmlFor="password" className="text-sm">
                Password
            </label>
            <input name="password" type="password" placeholder="Password" className="mt-1 h-10 w-full rounded-md border px-1 placeholder-neutral-400 outline-none focus:ring-2 focus:ring-neutral-800 dark:border-neutral-800 dark:placeholder-neutral-500" />
        </div>
        <div className="mt-2.5 w-full">
            <button className="h-10 w-full rounded-md bg-neutral-900 font-medium text-white dark:bg-white dark:text-neutral-950">Submit</button>
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
                <IconBrandAppleFilled /> <div>Continue with Google</div>
            </button>
        </div>
    </div>
);

const Tab2 = () => (
    <div className="flex w-full flex-col items-start justify-start gap-4 rounded-xl p-3 pb-4">
        <div>
            <h1 className="font-font text-lg">Create an account</h1>
        </div>
        <div className="w-full">
            <label htmlFor="username" className="text-sm">
                Username
            </label>
            <input name="username" placeholder="Username" type="text" className="mt-1 h-10 w-full rounded-md border px-1 placeholder-neutral-400 outline-none focus:ring-2 focus:ring-neutral-800 dark:border-neutral-800 dark:placeholder-neutral-500" />
        </div>
        <div className="w-full">
            <label htmlFor="password" className="text-sm">
                Password
            </label>
            <input name="password" type="password" placeholder="Password" className="mt-1 h-10 w-full rounded-md border px-1 placeholder-neutral-400 outline-none focus:ring-2 focus:ring-neutral-800 dark:border-neutral-800 dark:placeholder-neutral-500" />
        </div>
        <div className="mt-2.5 w-full">
            <button className="h-10 w-full rounded-md bg-neutral-900 font-medium text-white dark:bg-white dark:text-neutral-950">Submit</button>
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
                <IconBrandAppleFilled /> <div>Continue with Google</div>
            </button>
        </div>
    </div>
);

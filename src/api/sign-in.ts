import axios from "axios";

interface SignInData {
    email: string;
    password: string;
}

const signInUser = async ({ email, password }: SignInData) => {
    const payload = {
        email,
        password,
    };

    try {
        const response = await axios.post("http://127.0.0.1:8000/api/v1/users/auth/sign-in/", payload, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });
        console.log("User signed in successfully:", response.data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || "An error occurred during sign in";
            console.error("Error signing in the user:", errorMessage);
        } else {
            console.error("Error signing in the user:", (error as Error).message);
            throw error;
        }
    }
};

export default signInUser;

import axios from "axios";

interface SignUpData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

const signUpUser = async ({ email, password, firstName, lastName }: SignUpData) => {
    const payload = {
        email,
        password,
        first_name: firstName,
        last_name: lastName,
    };

    try {
        const response = await axios.post("http://127.0.0.1:8000/api/v1/users/auth/sign-up/", payload, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log("User signed up successfully:", response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Error signing up the user:", error.response?.data);
        } else {
            console.error("Error signing up the user:", (error as Error).message);
        }
    }
};

export default signUpUser;

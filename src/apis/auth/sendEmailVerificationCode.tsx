import axios from "axios"

export const sendEmailVerificationCode = async ( email: string ) => {
    const data = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + "/auth/sendcode", { email });
    return data.data;
}
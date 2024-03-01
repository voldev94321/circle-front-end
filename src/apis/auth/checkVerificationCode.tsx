import axios from "axios"

export const checkVerificationCode = async ( email: string, code: string ) => {
    const data = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + "/auth/checkcode", { email, code });
    return data.data;
}
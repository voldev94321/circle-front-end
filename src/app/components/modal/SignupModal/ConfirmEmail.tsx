import React from "react";
import TextInput from "../../input/TextInput";
import PrimaryButton from "../../button/PrimaryButton";
import { sendEmailVerificationCode } from "@/apis/auth/sendEmailVerificationCode";
import { toast } from "react-toastify";
import { checkVerificationCode } from "@/apis/auth/checkVerificationCode";

interface ConfirmEmailProps {
    email: string,
    onSubmit: any
}

const ConfirmEmail = ({ email, onSubmit }: ConfirmEmailProps) => {
    const [code, setCode] = React.useState("");

    const onVerify = async () => {
        const result = await checkVerificationCode(email, code);
        if(result.success){
            toast.success("You are now ready to use!");
            onSubmit();
        } else {
            toast.error("Verification Failed!");
        }
    }

    const onResend = async () => {
        const result = await sendEmailVerificationCode(email);
        if(result.success){
            toast.info('We sent 6-digit codes to your email.');
        }
    }

    return <div className="w-full flex flex-col gap-3">
        <div>
        We’ve sent the verification code to your email <span className="text-primary">{email}</span>.
        </div>
        <div className="relative">
            <TextInput placeholder="Verification Code" value={code} setValue={setCode} type="text"/>
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-primary text-xs bg-opacity-10 bg-front p-1 rounded-md cursor-pointer" onClick={onResend}>
                Resend
            </div>
        </div>
        <PrimaryButton onClick={onVerify}>Verify</PrimaryButton>
    </div>;
}

export default ConfirmEmail;
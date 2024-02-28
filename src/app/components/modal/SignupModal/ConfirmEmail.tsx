import React from "react";
import TextInput from "../../input/TextInput";
import PrimaryButton from "../../button/PrimaryButton";

interface ConfirmEmailProps {
    email: string,
    onSubmit: any
}

const ConfirmEmail = ({ email, onSubmit }: ConfirmEmailProps) => {
    const [code, setCode] = React.useState("");

    const onVerify = () => {
        onSubmit();
    }

    return <div className="w-full flex flex-col gap-3">
        <div>
        We’ve sent the verification code to your email <span className="text-primary">{email}</span>.
        </div>
        <TextInput placeholder="Verification Code" value={code} setValue={setCode} type="text"/>
        <PrimaryButton onClick={onVerify}>Verify</PrimaryButton>
    </div>;
}

export default ConfirmEmail;
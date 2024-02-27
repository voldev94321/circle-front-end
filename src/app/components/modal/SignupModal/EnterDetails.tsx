import React from "react";
import TextInput from "../../input/TextInput";
import CheckBox from "../../input/CheckBox";
import Link from "next/link";
import PrimaryButton from "../../button/PrimaryButton";

const EnterDetails = () => {
    const [userName, setUserName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [isAgreeTerm, setIsAgreeTerm] = React.useState(false);

    return (<div className="w-full flex flex-col gap-3">
        <TextInput type="text" placeholder="Username" setValue={setUserName} value={userName}/>
        <div>You can use letters, numbers, periods, and underscores</div>
        <TextInput type="text" placeholder="Email" setValue={setEmail} value={email}/>
        <TextInput type="text" placeholder="Password" setValue={setPassword} value={password}/>
        <TextInput type="text" placeholder="Confirm Password" setValue={setConfirmPassword} value={confirmPassword}/>
        <CheckBox value={isAgreeTerm} setValue={setIsAgreeTerm}>
            <div>I have read and agree to the <Link href="" className="text-primary"> Privacy Policy</Link> *</div>
        </CheckBox>
        <PrimaryButton>Sign Up</PrimaryButton>
    </div>);
}

export default EnterDetails;
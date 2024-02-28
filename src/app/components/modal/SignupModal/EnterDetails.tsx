import React from "react";
import TextInput from "../../input/TextInput";
import CheckBox from "../../input/CheckBox";
import Link from "next/link";
import PrimaryButton from "../../button/PrimaryButton";

interface EnterDetailsPros {
    onSubmit: any
}

const EnterDetails = ({onSubmit}: EnterDetailsPros) => {
    const [userName, setUserName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [isAgreeTerm, setIsAgreeTerm] = React.useState(false);

    const handleClick = () => {
        onSubmit(userName, email, password);
    }

    return (<div className="w-full flex flex-col gap-3">
        <TextInput type="text" placeholder="Username" setValue={setUserName} value={userName}/>
        <div>You can use letters, numbers, periods, and underscores</div>
        <TextInput type="text" placeholder="Email" setValue={setEmail} value={email}/>
        <TextInput type="password" placeholder="Password" setValue={setPassword} value={password}/>
        <TextInput type="password" placeholder="Confirm Password" setValue={setConfirmPassword} value={confirmPassword}/>
        <CheckBox value={isAgreeTerm} setValue={setIsAgreeTerm}>
            <div className="text-xs">I have read and agree to the <Link href="" className="text-primary"> Privacy Policy</Link> *</div>
        </CheckBox>
        <PrimaryButton onClick={handleClick}>Sign Up</PrimaryButton>
    </div>);
}

export default EnterDetails;
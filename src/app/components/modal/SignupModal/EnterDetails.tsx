import React from "react";
import TextInput from "../../input/TextInput";
import CheckBox from "../../input/CheckBox";
import Link from "next/link";
import PrimaryButton from "../../button/PrimaryButton";
import { validateEmail, validateUsername } from "@/utils/validator";

interface EnterDetailsPros {
  onSubmit: any;
}

const EnterDetails = ({ onSubmit }: EnterDetailsPros) => {
  const [userName, setUserName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [isAgreeTerm, setIsAgreeTerm] = React.useState(false);

  const [isValidUserName, setIsValidUserName] = React.useState(true);
  const [isValidEmail, setIsValidEmail] = React.useState(true);
  const [passwordError, setPasswordError] = React.useState("");

  const handleClick = () => {
    const checkEmailIsValid = validateEmail(email);
    const checkUserNameIsValid = validateUsername(userName);
    let isPasswordError = true;

    if(password == ""){
      setPasswordError("Password should not be empty!");
    } else if(password != confirmPassword) {
      setPasswordError("Password does not match!");
    } else {
      setPasswordError("");
      isPasswordError = false;
    }

    setIsValidUserName(checkUserNameIsValid);
    setIsValidEmail(checkEmailIsValid);

    if( checkEmailIsValid && checkUserNameIsValid && !isPasswordError ){
        onSubmit(userName, email, password);
    }
  };

  return (
    <div
      className="w-full flex flex-col gap-3"
    >
      <TextInput
        type="text"
        placeholder="Username"
        setValue={setUserName}
        value={userName}
      />
      <div className={`${!isValidUserName && "text-dangerous"}`}>You can use letters, numbers, periods, and underscores</div>
      <TextInput
        type="text"
        placeholder="Email"
        setValue={setEmail}
        value={email}
      />
      { !isValidEmail && <div className="text-dangerous">Email is required and must be a valid email address</div> }
      <TextInput
        type="password"
        placeholder="Password"
        setValue={setPassword}
        value={password}
      />
      <TextInput
        type="password"
        placeholder="Confirm Password"
        setValue={setConfirmPassword}
        value={confirmPassword}
      />
      { passwordError && <div className="text-dangerous">{passwordError}</div>}
      <CheckBox value={isAgreeTerm} setValue={setIsAgreeTerm}>
        <div className="text-xs">
          I have read and agree to the{" "}
          <Link href="" className="text-primary">
            {" "}
            Privacy Policy
          </Link>{" "}
          *
        </div>
      </CheckBox>
      <PrimaryButton onClick={handleClick} disabled={!isAgreeTerm}>Sign Up</PrimaryButton>
    </div>
  );
};

export default EnterDetails;

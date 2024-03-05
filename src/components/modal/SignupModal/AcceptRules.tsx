import PrimaryButton from "../../button/PrimaryButton";

interface AcceptRules {
    onSubmit: any
}

const AcceptRules = ({onSubmit}: AcceptRules) => {
    return (
        <div className="w-full flex flex-col gap-3">
            <div>
                With an account on this Circle server, you’ll be able to follow any other person on the network, regardless of where their account is hosted.
            </div>
            <PrimaryButton onClick={onSubmit}>Agree Terms</PrimaryButton>
        </div>
    )
}

export default AcceptRules;
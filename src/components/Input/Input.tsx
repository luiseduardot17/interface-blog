import { ChangeEvent } from "react";

interface InputProps {
    value?: string
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input = (props: InputProps) => {
    return (
        <div>
            <input type="text" value={props.value ?? ''} onChange={props.onChange} className="form-control" id="input1" placeholder="Search for posts" />
        </div>
    )
}

export default Input
import { React } from 'react';
import { useNavigate } from "react-router-dom";

const Button  = (props) => {
    const {name, disabled, filePath, event} = props;
    const navigate = useNavigate();

    if (filePath) {
        return (
            <button type='button' disabled={disabled} onClick={() => navigate(filePath)}>
                {name}
            </button>
        );
    } else {
        return (
            <button type='button' disabled={disabled} onClick={event}>
                {name}
            </button>
        )
    }
}

export default Button;
import { React } from 'react';

const Input = (props) => {
    const {value, placeholder, setQuery, setInput} = props;

    const captureInput = (event) => {
        if (event.keyCode === 13) {
            setQuery(event.target.value);
            setInput("");
        }
    }

    const handleInputChange = (event) => {
        setInput(event.target.value);
    }

    return (
        <input
            type="text"
            size="16"
            value={value}
            placeholder={placeholder}
            onKeyUp={captureInput}
            onChange={handleInputChange}
        />
    )
}

export default Input;
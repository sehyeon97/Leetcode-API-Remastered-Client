import { React } from 'react';

const Message = (props) => {

    const {content, error} = props;

    if (!error) {
        const items = content.split(",");
        return (
            <p>
                Easy: {items[0]}<br/>
                Medium: {items[1]}<br/>
                Hard: {items[2]}<br/>
            </p>
        );
    } else {
        return <p>{content}</p>
    }

}

export default Message;
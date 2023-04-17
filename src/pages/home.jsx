import { useState, useEffect, useContext } from 'react';
import Container, { Flex, FlexItem, Header } from "../styles/home";
import Input from "../components/Input";
import Button from "../components/Button";
import { UsernameContext } from '../context/UsernameContext';

const Home = () => {
    const { username, setUsername } = useContext(UsernameContext);
    const [input, setInput] = useState("");
    const [validatedUser, setValidatedUser] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        // make sure it's a valid leetcode username
        if (username.length > 0) {
            verifyUsername(username);
        }
    }, [username, validatedUser])

    const verifyUsername = async (name) => {
        const response = await fetch("http://localhost:4000/leetcode/verify/" + name);
        const data = await response.text();
        console.log(data);
        if (data === "VALID") {
            setValidatedUser(true);
            setErrorMessage("Click next to continue");
            return true;
        } else {
            setValidatedUser(false);
            setErrorMessage("Invalid username");
            return false;
        }
    }

    return (
        <Container>
            <Flex>
                <FlexItem>
                    <Header>
                        Leetcode username
                    </Header>
                </FlexItem>
                <FlexItem>
                    <Input value={input} placeholder="Username" setQuery={setUsername} setInput={setInput}/>
                </FlexItem>
                <FlexItem>
                    <Button name="Next" disabled={!validatedUser} filePath="/menu"/>
                </FlexItem>
                <FlexItem>
                    <p style={{color: validatedUser ? 'green' : 'red'}}>{errorMessage}</p>
                </FlexItem>
            </Flex>
        </Container>
    );
}

export default Home;
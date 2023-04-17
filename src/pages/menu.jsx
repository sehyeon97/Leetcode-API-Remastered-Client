import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import Container, { FlexRow, Item, Header, Footer } from '../styles/menu';
import { UsernameContext } from '../context/UsernameContext';
import { ThemeContext } from '../context/ThemeContext.js';
import Message from '../components/Message';
import Button from '../components/Button';

const Menu = () => {
    const { username, setUsername } = useContext(UsernameContext);
    const { isDark, setIsDark } = useContext(ThemeContext);

    //used to create
    const [dataFromLeetcode, setDataFromLeetcode] = useState("");
    const [dataExists, setDataExists] = useState(false);
    const [message, setAddMessage] = useState("");

    //used to retrieve
    const [fetchedFromLeetcode, setFetchedFromLeetcode] = useState("");
    const [fetchedFromDatabase, setFetchedFromDatabase] = useState("");

    //used to update
    const [updateWithLeetcodeSuccess, setUpdateWithLeetcodeSuccess] = useState("");
    const [updateMessage, setUpdateWithInputMessage] = useState("");
    const [easy, setEasy] = useState(0);
    const [medium, setMedium] = useState(0);
    const [hard, setHard] = useState(0);

    // used to delete
    const [deleteMessage, setDeleteMessage] = useState("");
    const navigate = useNavigate();

    const toggleDarkMode = () => {
        setIsDark(!isDark);
    }

    // add problems solved from leetcode to the database
    const addFromLeetcode = async () => {
        const query = `http://localhost:4000/leetcode/problems/${username}`;
        const response = await fetch(query);
        const data = await response.json();
        console.log(data);

        if (data) {
            setDataFromLeetcode("Username already exists in database");
            setDataExists(true);
        } else {
            setDataFromLeetcode(data.easy + "," + data.medium + "," + data.hard);
        }
    }

    // add user input to database
    const sendInputToServer = async () => {
        const response = await fetch('http://localhost:4000/problems', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "username": username,
                "easy": easy,
                "medium": medium,
                "hard": hard
            })
        });
        const data = await response.text();
        if (data === "Username already exists") {
            setAddMessage("Username already exists. Failed to add new data");
        } else {
            setAddMessage("Data added successfully");
        }
    };

    const setEasyCount = (event) => {
        setEasy(event.target.value);
    }

    const setMediumCount = (event) => {
        setMedium(event.target.value);
    }

    const setHardCount = (event) => {
        setHard(event.target.value);
    }

    // retrieve problems solved from leetcode
    const fetchFromLeetcode = async () => {
        const query = `http://localhost:4000/leetcode/problems/${username}`;
        const response = await fetch(query);
        const data = await response.json();

        setFetchedFromLeetcode(data.easy + "," + data.medium + "," + data.hard);
    }

    // retrieve problems solved from database
    const fetchFromDatabase = async () => {
        const query = `http://localhost:4000/problems/${username}`;
        const response = await fetch(query);
        const data = await response.json();

        setFetchedFromDatabase(data.Easy + "," + data.Medium + ',' + data.Hard);
    }

    // update problems solved using Leetcode
    const updateWithLeetcode = async () => {
        const query = `http://localhost:4000/leetcode/problems/update/${username}`;
        const response = await fetch(query, {
            method: 'put'
        });
        const data = await response.text();
        console.log("updated data: " + data);
        if (data === "success") {
            setUpdateWithLeetcodeSuccess("Successfully updated problems solved with Leetcode");
        } else {
            setUpdateWithLeetcodeSuccess("Could not update your data");
        }
    }

    // update problems solved by user input
    const updateWithUserInput = async () => {
        const query = `http://localhost:4000/problems/${username}`;
        const response = await fetch(query, {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "username": username,
                "easy": easy,
                "medium": medium,
                "hard": hard
            })
        });
        const data = await response.text();
        if (data === "Success") {
            setUpdateWithInputMessage("Successfully updated");
        } else {
            setUpdateWithInputMessage("Unsuccessful")
        }
    }

    // delete user from database
    const deleteUser = async () => {
        const query = `http://localhost:4000/problems/${username}`;
        const response = await fetch(query, {
            method: 'delete'
        });
        const data = await response.text();
        setDeleteMessage(data);
        setUsername("");
        navigate('/');
    }

    return (
        <FlexRow background={isDark ? "black" : "white"} color={isDark ? "white" : "black"}>
            <Header>
                <h2>Leetcode problems solved</h2>
                <p>
                    First column lets you add problems solved to the database<br/>
                    Second column lets you retrieve problems solved directly from leetcode or the database<br/>
                    Third column lets you update your problems solved in the database<br/>
                    Fourth column deletes your data from the database
                </p>
            </Header>
            <Container>
                <Item>
                    <div>
                        <button onClick={addFromLeetcode} disabled={dataExists}>Add from Leetcode and Show</button>
                        <Message content={dataFromLeetcode} error={dataExists}></Message>
                    </div>
                    <div>
                        <p>Add to Database with My Inputs</p>
                        <form>
                            <p>{message}</p>
                            <label>Easy: </label>
                            <input type="text" onChange={setEasyCount}/><br />
                            <label>Normal: </label>
                            <input type="text" onChange={setMediumCount}/><br />
                            <label>Hard: </label>
                            <input type="text" onChange={setHardCount}/><br />
                            <Button name="Add" disabled={false} event={sendInputToServer}></Button>
                        </form>
                    </div>
                </Item>
                <Item>
                    <div>
                        <button onClick={fetchFromLeetcode}>Retrieve from Leetcode</button>
                        <Message content={fetchedFromLeetcode}></Message>
                    </div>
                    <div>
                        <button onClick={fetchFromDatabase}>Retrieve from Database</button>
                        <Message content={fetchedFromDatabase}></Message>
                    </div>
                </Item>
                <Item>
                    <div>
                        <button onClick={updateWithLeetcode}>Update Database Using Leetcode</button>
                        <Message content={updateWithLeetcodeSuccess}></Message>
                    </div>
                    <div>
                        <p>Update Database Using My Inputs</p>
                        <form>
                            <p>{updateMessage}</p>
                            <label>Easy: </label>
                            <input type="text" onChange={setEasyCount}/><br />
                            <label>Normal: </label>
                            <input type="text" onChange={setMediumCount}/><br />
                            <label>Hard: </label>
                            <input type="text" onChange={setHardCount}/><br />
                            <Button name="Update" disabled={false} event={updateWithUserInput}></Button>
                        </form>
                    </div>
                </Item>
                <Item>
                    <div>
                        <p>{deleteMessage}</p>
                        <Button name="Delete me from Database" disabled={false} event={deleteUser}></Button>
                    </div>
                </Item>
            </Container>
            <Footer>
                <Button name="Change Username" disabled={false} filePath="/"/>
                <button onClick={toggleDarkMode}>Dark Mode On/Off</button>
            </Footer>
        </FlexRow>
    );
}

export default Menu;
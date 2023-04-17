import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UsernameContext } from './context/UsernameContext';

import Home from './pages/home';
import Menu from './pages/menu';
import { ThemeContext } from './context/ThemeContext';

const setSessionName = (key, value) => {
  try {
    window.localStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
  }
}

const getSessionName = (key, defaultValue) => {
  try {
    window.localStorage.clear();
    const value = window.localStorage.getItem(key);
    return value ? value : defaultValue;
  } catch (e) {
    return defaultValue;
  }
}

function App() {
  const [username, setUsername] = useState(() => getSessionName("Username", ""));
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setSessionName("Username", username);
    console.log(username);
  }, [username])

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      <UsernameContext.Provider value={{ username, setUsername }}>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                    <Route path='menu' element={<Menu />} />
            </Routes>
        </BrowserRouter>
      </UsernameContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;

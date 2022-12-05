import Register from './pages/Register'
import Login from './pages/Login'
import './style.scss'
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

function App(){

    const {currentUser} = useContext(AuthContext)

    console.log(currentUser);
    return(
        <BrowserRouter>
            <Routes>
                <Route index element = {<Home/>}/>
                <Route path= 'login' element = {<Login/>}/>
                <Route path= 'register' element = {<Register/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
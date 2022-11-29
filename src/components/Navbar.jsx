import React from 'react'

const Navbar = () => {
    return (
        <div className="navbar">
            <span className="logo">Fly Chat</span>
            <div className="user">
                <img src="https://i0.wp.com/calmatters.org/wp-content/uploads/2022/05/Senior-Grads-Zintan-CJN-CM-02.jpg?fit=1200%2C800&ssl=1" alt=""/>
                <span>John</span>
                <button>Logout</button>
            </div>
        </div>
    )
}

export default Navbar

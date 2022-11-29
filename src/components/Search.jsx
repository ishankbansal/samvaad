import React from 'react'

const Search = () => {
    return (
        <div className="search">
            <div className="searchForm">
                <input type="text" placeholder="Find a user"/>
            </div>
            <div className="userChat">
                <img src="https://i0.wp.com/calmatters.org/wp-content/uploads/2022/05/Senior-Grads-Zintan-CJN-CM-02.jpg?fit=1200%2C800&ssl=1" alt=""/>
                <div className="userChatInfo">
                    <span>Jane</span>
                </div>
            </div>
        </div>
    )
}

export default Search

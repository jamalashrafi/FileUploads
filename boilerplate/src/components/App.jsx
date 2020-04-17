import React from "react";
import Header from "./Header.jsx";


export default ({ children }) => {
    
        return (
            <div>
                <Header />
                {children}
            </div>
        )
    
}
import React from "react";
import { User } from "../model/Model";
import { Link } from "react-router-dom";

interface NavbarProps{
    user: User | undefined;
}
const Navbar: React.FC<NavbarProps> = (props: NavbarProps) => {

    const loginLogout = () => {
        if(props.user){
            return <Link to='/logout' style={{float: 'right'}}>{props.user.userName}</Link>
        }else{
            return <Link to='/login' style={{float: 'right'}}>Login</Link>
        }
    }
    return (
        <div className="navbar">
            <Link to='/'>Home</Link>
            <Link to='/profile'>Profile</Link>
            <Link to='/spaces'>Spaces</Link>
            {loginLogout()}
        </div>
    );
}

export {Navbar};
import React, { Component } from "react";
import {Link} from 'react-router-dom'

function RenderNav() {
    return (
        <div id="left-sidebar" className="sidebar ">
            <h5 className="brand-name">Go to</h5>
            <nav id="left-sidebar-nav" className="sidebar-nav">
                <div className="">
                    <ul className="metismenu">
                        <li className="">
                            <Link aria-current="page" className="list-a text-decoration-none" to="dashboard"><i className="fa fa-home"></i>Dashboard</Link>
                        </li>
                        <li className="">
                            <Link className="list-a text-decoration-none" to="users" aria-current="page"><i className="fa fa-users"></i>Users</Link>
                        </li>
                        <li className="">
                            <Link className="list-a text-decoration-none" to="donation"><i className="fa fa-heart"></i>Donation</Link>
                        </li>
                        <li className="">
                            <Link className="list-a text-decoration-none" to="contact"><i className="fa fa-share"></i>Contact</Link>
                        </li>
                        <li className="">
                            <Link aria-current="page" className="text-decoration-none" to="#"><i className="fa fa-id-card"></i>Accounts&nbsp;&nbsp;<i className="fa fa-caret-down"></i></Link>
                            <ul className="list-unstyled">
                                <li className="">
                                    <Link aria-current="page" className="list-a text-decoration-none" to="login"><i className="fa fa-sign-in"></i>Login</Link>
                                </li>
                                <li className="">
                                    <Link aria-current="page" className="list-a text-decoration-none" to="login"><i className="fa fa-sign-out"></i>Logout</Link>
                                </li>
                                <li className="">
                                    <Link aria-current="page" className="list-a text-decoration-none" to="register"><i className="fa fa-user-plus"></i>Register</Link>
                                </li>
                            </ul>
                        </li>
                        <li className="">
                            <Link className="list-a text-decoration-none" to="about"><i className="fa fa-info"></i>About</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
} 


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    
    render() {
        return(
            <div style={{display: 'block'}}>
                <div id="header_top" className="header_top false">
                    <div className="container">
                        <div className="hleft">
                            <div className="dropdown">
                                <p className="nav-link icon menu_toggle"><i className="fa fa-align-left"></i></p>
                            </div>
                        </div>
                    </div>
                </div>
                <RenderNav/>
            </div>
        )
    }
}
export default Header
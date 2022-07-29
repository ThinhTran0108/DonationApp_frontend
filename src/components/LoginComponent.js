
import React, {Component} from "react";
import {Link} from 'react-router-dom';

class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return(
            <div className="auth">
                <div className="auth_left">
                    <div className="card">
                        <div className="text-center my-2">
                            <Link className="header-brand" to="#!"><i className="fa fa-heart"></i></Link>
                        </div>
                        <div className="card-body">
                            <div className="card-title text-center">Login to your account</div>
                            <div className="form-group">
                                <label className="form-label">Username</label>
                                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Username"/>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Password
                                    <Link className="float-right small" to="/forgotpassword">I forgot password</Link>
                                </label>
                                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                            </div>
                            <div className="form-group">
                                <label className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input"/>
                                    <span className="custom-control-label">Remember me</span>
                                </label>
                            </div>
                            <div className="form-footer">
                                <Link className="btn btn-primary btn-block" to="/">Click to login</Link>
                            </div>
                        </div>
                        <div className="text-center text-muted my-2">Don't have account yet? 
                            <Link to="/register">Sign Up</Link>
                        </div>
                    </div>
                </div>
                <div className="auth_right">
                    <div className="carousel slide" data-ride="carousel" data-interval="3000">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src="assets/images/slider1.svg" className="img-fluid" alt="login page"/>
                                    <div className="px-4 mt-4">
                                        <h4>Fully Responsive</h4>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                                    </div>
                            </div>
                            <div className="carousel-item">
                                <img src="assets/images/slider2.svg" className="img-fluid" alt="login page"/>
                                <div className="px-4 mt-4">
                                    <h4>Quality Code and Easy Customizability</h4>
                                    <p>There are many variations of passages of Lorem Ipsum available.</p>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <img src="assets/images/slider3.svg" className="img-fluid" alt="login page"/>
                                <div className="px-4 mt-4">
                                    <h4>Cross Browser Compatibility</h4>
                                    <p>Overview We're a group of women who want to learn JavaScript.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        )
    }
}
export default LogIn
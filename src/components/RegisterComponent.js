import React from "react";
import {Link} from 'react-router-dom';

function Register(props) {
    return(
        <div className="auth">
            <div className="auth_left">
                <div className="card">
                    <div className="text-center my-2">
                        <Link className="header-brand" to="#!"><i className="fa fa-heart"></i></Link>
                    </div>
                    <div className="card-body">
                        <div className="card-title text-center">Create new account</div>
                        <div className="form-group">
                            <label className="form-label">Username</label>
                            <input type="text" className="form-control" name="username" placeholder="Username"/>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" name="email" placeholder="Email"/>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Password</label>
                            <input type="password" name="password" className="form-control" placeholder="Password"/>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control" placeholder="Confirm Password"/>
                        </div>
                        <div className="form-group">
                            <label className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input"/>
                                <span className="custom-control-label">Agree the <a href="#!">terms and policy</a></span>
                            </label>
                        </div>
                        <div className="form-footer">
                            <Link className="btn btn-primary btn-block" to="/login">Click new account</Link>
                        </div>
                    </div>
                    <div className="text-center text-muted my-2">Already have account? 
                        <Link to="/login">Sign In</Link>
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
export default Register
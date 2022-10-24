
import React, {useState} from "react";
import PropTypes from 'prop-types';
import { Form, Label, Input, FormFeedback} from 'reactstrap';
import { baseUrl } from "../../shared/baseUrl";

async function login(credentials) {
    return fetch(baseUrl + 'auth/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(credentials)
    })
    .then(data => data.json())
}
async function signup(credentials) {
    return fetch(baseUrl + 'auth/signup', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(credentials)
    })
    .then(data => data.json())
}
async function forgotPassword(credentials) {
    return fetch(baseUrl + 'auth/forgotpassword', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(credentials)
    })
    .then(data => data.json())
}
export default function Login({ setUser }) {
    const [displayLoginForm, setDisplayLoginForm] = useState(true);
    const [displayForgotPasswordForm, setDisplayForgotPasswordForm] = useState(false);
    const [displaySignupForm, setDisplaySignupForm] = useState(false);
    const [username, setUsername] = useState('superadmin');
    const [email, setEmail] = useState();
    const [password, setPassword] = useState('aA123456');
    const [messageResponse, setMessageResponse] = useState({errorMessage: '', message: ''});
    const [valueErrors, setValueError] = useState({username: '', email:'', password: ''});
    
    const handleInputChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        switch (true) {
            case (name === 'username' && value.length < 3):
                setValueError({...valueErrors, username: 'Tên đăng nhập chứa tối thiểu 3 kí tự'});
                setMessageResponse({errorMessage: '', message: ''});
                break;
            case (name === 'username' && value.length >= 3):
                setValueError({...valueErrors, username: ''});
                setMessageResponse({errorMessage: '', message: ''});
                break;
            case (name === 'password' && value.length < 8):
                setValueError({...valueErrors, password: 'Mật khẩu chứa tối thiểu 8 kí tự'});
                setMessageResponse({errorMessage: '', message: ''});
                break;
            case (name === 'password' && value.length >= 8):
                setValueError({...valueErrors, password: ''});
                setMessageResponse({errorMessage: '', message: ''});
                break;
            case (name === 'email' && emailRegex.test(value.toLowerCase()) === false):
                setValueError({...valueErrors, email: 'Email chưa đúng'});
                setMessageResponse({errorMessage: '', message: ''});
                break;
            case (name === 'email' && emailRegex.test(value.toLowerCase()) === true):
                setValueError({...valueErrors, email: ''});
                setMessageResponse({errorMessage: '', message: ''});
                break;
            default:
        }
        if (name === 'username') {
            setUsername(value);
        } else if (name === 'password') {
            setPassword(value);
        } else if (name === 'email') {
            setEmail(value);
        }
    }
    
    const handleLogin = async e => {
        e.preventDefault();
        const data = await login({username, password});
        if (data.errorMessage) {
            return setMessageResponse({...messageResponse, errorMessage: data.errorMessage});
        } else {
            return setUser({username: data.username, isAdmin: data.isAdmin});
        }
    }
    const handleSignup = async e => {
        e.preventDefault();
        const data = await signup({username, email});
        return setMessageResponse({errorMessage: data.errorMessage, message : data.message});
    }
    const handleForgotPassword = async e => {
        e.preventDefault();
        const data = await forgotPassword({username});
        return setMessageResponse({errorMessage: data.errorMessage, message : data.message});
    }
    return(
        <div className="auth" style={{backgroundColor: 'rgb(241, 241, 241)'}}>
            <div className="auth_left">
                <div className="card">
                    {displayLoginForm && 
                        <Form onSubmit={handleLogin}>
                            <div className="text-center my-2">
                                <div className="header-brand"><i className="fas fa-heartbeat fa-lg text-pink"></i></div>
                            </div>
                            <div className="card-body">
                                <div className="card-title text-center">Login to your account</div>
                                <div className="form-group">
                                    <Input type="hidden" className="form-control" valid={messageResponse.message ? true : false} invalid={messageResponse.errorMessage ? true : false}/>
                                    <div className="text-center text-success">{messageResponse.message}</div>
                                    <FormFeedback className="text-center">{messageResponse.errorMessage}</FormFeedback>
                                </div>
                                <div className="form-group">
                                    <Label className="form-label">Username</Label>
                                    <Input type="text" className="form-control" name="username" placeholder="Username" value={username} valid={valueErrors.username === ''} invalid={valueErrors.username !== ''} onChange={(e) => handleInputChange(e)}/>
                                    <FormFeedback>{valueErrors.username}</FormFeedback>
                                </div>
                                <div className="form-group">
                                    <Label className="form-label">Password
                                        <a className="float-right small text-decoration-none" href="#!" onClick={() => {setDisplayForgotPasswordForm(true); setDisplayLoginForm(false); setDisplaySignupForm(false); setMessageResponse({errorMessage: '', message: ''});}}>I forgot password</a>
                                    </Label>
                                    <Input type="password" className="form-control" name="password" placeholder="Password" value={password} valid={valueErrors.password === ''} invalid={valueErrors.password !== ''} onChange={(e) => handleInputChange(e)}/>
                                    <FormFeedback>{valueErrors.password}</FormFeedback>
                                </div>
                                <div className="form-footer">
                                    <button type="submit" className="btn btn-dark btn-block border-0 bg-pink">Click to login</button>
                                </div>
                            </div>
                            <div className="text-center text-muted my-2">Don't have account yet?&nbsp;<a href="#!" className="text-decoration-none" onClick={() => {setDisplayForgotPasswordForm(false); setDisplayLoginForm(false); setDisplaySignupForm(true); setMessageResponse({errorMessage: '', message: ''})}}>Sign Up</a>
                            </div>
                        </Form>
                    }
                    {displayForgotPasswordForm && 
                        <Form onSubmit={handleForgotPassword}>
                            <div className="text-center my-2">
                                <div className="header-brand"><i className="fas fa-heartbeat fa-lg text-pink"></i></div>
                            </div>
                            <div className="card-body">
                                <div className="card-title text-center">Forgot password</div>
                                <small class="text-muted">Enter your username and your password will be reset and emailed to you.</small>
                                <div className="form-group">
                                    <Input type="hidden" className="form-control" valid={messageResponse.message ? true : false} invalid={messageResponse.errorMessage ? true : false}/>
                                    <div className="text-center text-success">{messageResponse.message}</div>
                                    <FormFeedback className="text-center">{messageResponse.errorMessage}</FormFeedback>
                                </div>
                                <div className="form-group">
                                    <Label className="form-label">Username</Label>
                                    <Input type="text" className="form-control" name="username" placeholder="Username" valid={valueErrors.username === ''} invalid={valueErrors.username !== ''} onChange={(e) => handleInputChange(e)}/>
                                    <FormFeedback>{valueErrors.username}</FormFeedback>
                                </div>
                                <div className="form-footer">
                                    <button type="submit" className="btn btn-dark btn-block border-0 bg-pink" >Send me new password</button>
                                </div>
                            </div>
                            <div className="text-center text-muted my-2">Forget it,&nbsp;<a href="#!" className="text-decoration-none" onClick={() => {setDisplayForgotPasswordForm(false); setDisplayLoginForm(true); setDisplaySignupForm(false); setMessageResponse({errorMessage: '', message: ''})}}>Send me back</a>&nbsp;to Sign in screen.
                            </div>
                        </Form>
                    }
                    { displaySignupForm &&
                        <Form onSubmit={handleSignup}>
                            <div className="text-center my-2">
                                <div className="header-brand"><i className="fas fa-heartbeat fa-lg text-pink"></i></div>
                            </div>
                            <div className="card-body">
                                <div className="card-title text-center">Create new account</div>
                                <div className="form-group">
                                    <Input type="hidden" className="form-control" valid={messageResponse.message ? true : false} invalid={messageResponse.errorMessage ? true : false}/>
                                    <div className="text-center text-success">{messageResponse.message}</div>
                                    <FormFeedback className="text-center">{messageResponse.errorMessage}</FormFeedback>
                                </div>
                                <div className="form-group">
                                    <Label className="form-label">Username</Label>
                                    <Input type="text" className="form-control" name="username" placeholder="Username" valid={valueErrors.username === ''} invalid={valueErrors.username !== ''} onChange={(e) => handleInputChange(e)}/>
                                    <FormFeedback>{valueErrors.username}</FormFeedback>
                                </div>
                                <div className="form-group">
                                    <Label className="form-label">Email</Label>
                                    <Input type="email" className="form-control" name="email" placeholder="Email" valid={valueErrors.email === ''} invalid={valueErrors.email !== ''} onChange={(e) => handleInputChange(e)}/>
                                    <FormFeedback>{valueErrors.email}</FormFeedback>
                                </div>
                                <div className="form-footer">
                                    <button type="submit" className="btn btn-dark btn-block border-0 bg-pink" href="/login">Click new account</button>
                                </div>
                            </div>
                            <div className="text-center text-muted my-2">Already have account?&nbsp;<a href="#!" className="text-decoration-none" onClick={() => {setDisplayForgotPasswordForm(false); setDisplayLoginForm(true); setDisplaySignupForm(false); setMessageResponse({errorMessage: '', message: ''})}}>Sign In</a></div>
                        </Form>
                    }
                </div>
            </div>
            <div className="auth_right">
                <div id="myCarousel" className="carousel carousel-dark slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item w-100 active" data-bs-interval="3000">
                            <img src="assets/images/backdrop.jpeg" className="img-fluid rounded-circle" alt="backdrop1"/>
                        </div>
                        <div className="carousel-item w-100" data-bs-interval="3000">
                            <img src="assets/images/traitimmomo.jpeg" className="img-fluid" alt="backdrop2"/>
                        </div>
                        <div className="carousel-item w-100" data-bs-interval="3000">
                            <div className="row clearfix">
                                <div className="col-sm-4 text-center small">
                                    <h6 className="text-pink">Quyên góp nhanh chóng, dễ dàng</h6>
                                    <p>Chỉ với vài chạm, bạn đã góp phần giúp đỡ 1 hoàn cảnh khó khăn có cuộc sống tốt đẹp hơn.</p>
                                </div>
                                <div className="col-sm-3 text-center">
                                    <img src="assets/images/gioithieu.jpeg" className="img-fluid rounded" alt="backdrop3"/>
                                </div>
                                <div className="col-sm-4 text-center small">
                                    <h6 className="text-pink">Minh bạch, công khai mọi khoản đóng góp</h6>
                                    <p>Mọi thông tin về hoạt động đóng góp, tài trợ đều được công khai và cập nhật liên tục.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="carousel-control-prev" style={{bottom: '0', top: '200px'}} type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon"></span>
                    </button>
                    <button className="carousel-control-next" style={{bottom: '0', top: '200px'}} type="button" data-bs-target="#myCarousel" data-bs-slide="next">
                        <span className="carousel-control-next-icon"></span>
                    </button>
                </div>
                <div className="row text-center" style={{margin: "3rem 4rem"}}>
                    <h4 className="text-pink">Trái tim MoMo - Việc tốt không khó</h4>
                    <p>Trái Tim MoMo là nền tảng giúp bạn dễ dàng chung tay quyên góp tiền cùng hàng triệu người, giúp đỡ các hoàn cảnh khó khăn trên khắp cả nước.</p>
                </div>
            </div>
        </div> 
    )
}
Login.propTypes = {
    setUser: PropTypes.func.isRequired
}
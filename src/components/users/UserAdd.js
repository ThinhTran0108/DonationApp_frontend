import React from 'react';
import { useState } from "react";
import {Link} from 'react-router-dom';
import { baseUrl } from '../../shared/baseUrl';
import { Form, Label, Input, FormFeedback, Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

function UserAdd(props) {
    const [userData, setUserData] = useState({
        username: '',
        fullname: '',
        password: '',
        confirmPassword: '',
        gender: 'male',
        address: '',
        mobile: '',
        email: '',
        imageUserUrl: 'https://avatars.design/wp-content/uploads/2021/04/01-Alan.jpg',
        isAdmin: false
    });
    const [valueErrors, setValueError] = useState({
        username: '',
        fullname: '',
        password: '',
        confirmPassword: '',
        mobile: '',
        email: '',
        imageUserUrl: ''
    });
    const [error, setError] = useState('');
    const [display, setDisplay] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [messageResponse, setMessageResponse] = useState({errorMessage: '', message: ''});

    const handleInputChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        
        setUserData(userData => ({ ...userData, [name]: value}));
        const urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const mobileRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
        const mediumPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;
        switch (true) {
            case (name === 'username' && value.length >= 3):
                setValueError({...valueErrors, username: ''})
                break;
            case (name === 'username' && value.length < 3):
                setValueError({...valueErrors, username: 'Tên đăng nhập chứa tối thiểu 3 kí tự'})
                break;
            case (name === 'fullname' && value.length >= 3):
                setValueError({...valueErrors, fullname: ''})
                break;
            case (name === 'fullname' && value.length < 3):
                setValueError({...valueErrors, fullname: 'Họ tên chứa tối thiểu 3 kí tự'})
                break;
            // Mật khẩu chứa tối thiểu 8 kí tự bao gồm tối thiểu 1 chữ thường, 1 chữ hoa và 1 chữ số
            case (name === 'password' && value.length >= 8 && mediumPasswordRegex.test(value) === true):
                setValueError({...valueErrors, password: ''})
                break;
            case (name === 'password' && mediumPasswordRegex.test(value) === false):
                setValueError({...valueErrors, password: 'Mật khẩu phải có ít nhất 1 chữ thường, 1 chữ hoa và 1 chữ số'});
                break;
            case (name === 'password' && value.length < 8):
                setValueError({...valueErrors, password: 'Mật khẩu chứa tối thiểu 8 kí tự'})
                break;
            // Xác nhận mật khẩu phải giống mật khẩu mới
            case (name === 'confirmPassword' && value === userData.password):
                setValueError({...valueErrors, confirmPassword: ''})
                break;
            case (name === 'confirmPassword' && value !== userData.password):
                setValueError({...valueErrors, confirmPassword: 'Mật khẩu không khớp'})
                break;
            case ( name === 'imageUserUrl' && urlRegex.test(value) === true):
                setValueError({...valueErrors, imageUserUrl: ''})
                break;
            case (name === 'imageUserUrl' && urlRegex.test(value) === false):
                setValueError({...valueErrors, imageUserUrl: 'Hình ảnh phải là link URL'})
                break;
            case (name === 'email' && emailRegex.test(value.toLowerCase()) === true):
                setValueError({...valueErrors, email: ''})
                break;
            case (name === 'email' && emailRegex.test(value.toLowerCase()) === false):
                setValueError({...valueErrors, email: 'Email chưa đúng'})
                break;
            case (name === 'mobile' && mobileRegex.test(value) === true):
                setValueError({...valueErrors, mobile: ''})
                break;
            case (name === 'mobile' && mobileRegex.test(value) === false):
                setValueError({...valueErrors, mobile: 'Số điện thoại chưa đúng'})
                break;
            default:
        }
    }
    const resetInfo = (e) => {
        const resetUserData = {
            username: '',
            password: '',
            confirmPassword: '',
            fullname: '',
            gender: 'male',
            address: '',
            mobile: '',
            email: '',
            imageUserUrl: 'https://avatars.design/wp-content/uploads/2021/04/01-Alan.jpg',
            isAdmin: false}
        setUserData(resetUserData);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(baseUrl + 'user/add', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({"userData": userData})
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error ' + response.status + ': ' + response.statusText);
            }
            return response.json()
        })
        .then(data => {
            if (data.errorMessage) {
                setModalOpen(true);
                setMessageResponse({errorMessage: data.errorMessage, message: ''});
            } else {
                setModalOpen(true);
                setMessageResponse({errorMessage: '', message: data.message});
            }
        })
        .catch((err) => {
            setError('There are some errors when loading database. Please try again!');
            setDisplay(false);
        })
    }
    return(
        <div>
            <div className="section-body">
                <div className="container-fluid">
                    <div className="page-header">
                        <div className="left ml-4">
                            <h1 className="page-title">User Management</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="section-body">
                <div className="container-fluid">
                    <div className="d-flex justify-content-between align-items-center">
                        <ul className="nav nav-tabs page-header-tab">
                            <li className="nav-item"><a className="nav-link active" href="#!" style={{backgroundColor: '#F1F1F1', borderColor: '#F1F1F1 #F1F1F1 #fff'}} onClick={()=> setError('')}>New User</a></li>
                        </ul>
                        <div className="header-action">
                            <Link className="btn btn-sm active" to="/user-add"><i className="fa fa-user-plus"></i> Add new</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="section-body">
                <div className="container-fluid">
                    <div className="tab-content">
                        <div className="tab-pane fade show active">
                            <div className="card mb-0">
                                <div className="form-group">
                                    <Input type="hidden" className="form-control" valid={error === ''} invalid={error !== ''}/>
                                    <FormFeedback className="text-center">{error}</FormFeedback>
                                </div>
                                { display &&
                                    <div className="card-body">
                                        <Form onSubmit={handleSubmit} >
                                            <div className="row clearfix">
                                                <div className="col-12 col-md-4">
                                                    <div className="form-group">
                                                        <Label className="form-label">Username</Label>
                                                        <Input type="text" className="form-control" name="username" placeholder="Enter your username..." 
                                                            value={userData.username} 
                                                            valid={valueErrors.username === ''} 
                                                            invalid={valueErrors.username !== ''}
                                                            onChange={handleInputChange} 
                                                        />
                                                        <FormFeedback>{valueErrors.username}</FormFeedback>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-md-4">
                                                    <div className="form-group">
                                                        <Label className="form-label">Fullname</Label>
                                                        <Input type="text" className="form-control" name="fullname" placeholder="Enter your fullname..." 
                                                            value={userData.fullname}
                                                            valid={valueErrors.fullname === ''} 
                                                            invalid={valueErrors.fullname !== ''} 
                                                            onChange={handleInputChange} 
                                                        />
                                                        <FormFeedback>{valueErrors.fullname}</FormFeedback>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-md-4">
                                                    <div className="form-group">
                                                        <Label className="form-label">Password</Label>
                                                        <Input type="password" className="form-control" name="password" placeholder="Enter your password..." 
                                                            value={userData.password}
                                                            valid={valueErrors.password === ''} 
                                                            invalid={valueErrors.password !== ''} 
                                                            onChange={handleInputChange} 
                                                        />
                                                        <FormFeedback>{valueErrors.password}</FormFeedback>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-md-4">
                                                    <div className="form-group">
                                                        <Label className="form-label">Confirm password</Label>
                                                        <Input type="password" className="form-control" name="confirmPassword" placeholder="Enter again your password..." 
                                                            value={userData.confirmPassword}
                                                            valid={valueErrors.confirmPassword === ''} 
                                                            invalid={valueErrors.confirmPassword !== ''} 
                                                            onChange={handleInputChange} 
                                                        />
                                                        <FormFeedback>{valueErrors.confirmPassword}</FormFeedback>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-md-4">
                                                    <div className="form-group">
                                                        <Label className="form-label">Email</Label>
                                                        <Input type="email" className="form-control" name="email"  placeholder="Enter your email..." 
                                                            value={userData.email}
                                                            valid={valueErrors.email === ''}
                                                            invalid={valueErrors.email !== ''}
                                                            onChange={handleInputChange} 
                                                        />
                                                        <FormFeedback>{valueErrors.email}</FormFeedback>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-md-4">
                                                    <div className="form-group">
                                                        <Label className="form-label">Address</Label>
                                                        <Input type="text" className="form-control" name="address" placeholder="Enter your address..." 
                                                            value={userData.address} 
                                                            onChange={handleInputChange} />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-md-4">
                                                    <div className="form-group">
                                                        <Label className="form-label">Mobile</Label>
                                                        <Input type="text" className="form-control" name="mobile" placeholder="Enter your mobile..." 
                                                            value={userData.mobile} 
                                                            valid={valueErrors.mobile === ''}
                                                            invalid={valueErrors.mobile !== ''}
                                                            onChange={handleInputChange} 
                                                        />
                                                        <FormFeedback>{valueErrors.mobile}</FormFeedback>
                                                    </div>
                                                </div>
                                                <div className='col-12 col-md-4'>
                                                    <div className="form-group">
                                                        <Label className="form-label">Avatar</Label>
                                                        <Input type="url" className="form-control" name="imageUserUrl" placeholder="Paste URL address of avatar image..."
                                                            value={userData.imageUserUrl} 
                                                            valid={valueErrors.imageUserUrl === ''} 
                                                            invalid={valueErrors.imageUserUrl !== ''} 
                                                            onChange={handleInputChange} />
                                                        <FormFeedback>{valueErrors.imageUserUrl}</FormFeedback>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-md-4">
                                                    <div className="form-group">
                                                        <div className="row clearfix">
                                                            <div className='col-6'>
                                                                <div className="form-group">
                                                                <Label className="form-label">Gender</Label>
                                                                <Input type="select" className="form-control show-tick" name="gender" 
                                                                    value={userData.gender} 
                                                                    onChange={handleInputChange}
                                                                >
                                                                    <option value="male">Male</option>
                                                                    <option value="female">Female</option>
                                                                    <option value="other">Other</option>
                                                                </Input>
                                                                </div>
                                                            </div>
                                                            <div className='col-6'>
                                                                <div className="form-group">
                                                                    <Label className="form-label">Role</Label>
                                                                    <Input type="select" className="form-control show-tick" name="isAdmin" 
                                                                        value={userData.isAdmin}
                                                                        onChange={handleInputChange}
                                                                    >
                                                                        <option value="false">User</option>
                                                                        <option value="true">Admin</option>
                                                                    </Input>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col-12 col-md-6'>
                                                    <div className='row clearfix'>
                                                        <div className="col-8">
                                                            <Label className="form-label">Preview</Label>
                                                            <div class="card" style={{height: '250px'}}>
                                                            {userData.imageUserUrl && 
                                                                <img className="card-img-top w-100 h-100" src={userData.imageUserUrl} alt="avatar"/>
                                                            }
                                                            </div>
                                                        </div>
                                                        <div className="col-4">
                                                            <div className="form-group">
                                                                <Label className="form-label">&nbsp;</Label>
                                                                <input disabled={userData.username !== '' && valueErrors.username === '' && userData.fullname !== '' && valueErrors.fullname === '' && userData.password !== '' && valueErrors.password === '' && userData.confirmPassword !== '' && valueErrors.confirmPassword === '' && valueErrors.imageUserUrl === '' && userData.email !== '' && valueErrors.email === '' && userData.mobile !== '' && valueErrors.mobile === '' ? false : true} className="btn btn-outline-primary w-100" type="submit" value="Add"/>
                                                            </div>
                                                            <div className="form-group">
                                                                <button type="button" className="btn btn-outline-danger w-100" onClick={resetInfo}>Reset</button>
                                                            </div>
                                                            <div className="form-group">
                                                                <Link type="button" className="btn btn-outline-secondary w-100" data-dismiss="modal" to="/user">Close</Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Form>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal isOpen={modalOpen}>
                <ModalHeader>Notification</ModalHeader>
                <ModalBody style={{height: '100px'}}>
                    <div className="container-fluid">{messageResponse.errorMessage ? messageResponse.errorMessage : messageResponse.message}</div>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" className="float-right mx-2">
                        {messageResponse.message !== '' && <Link to="/user" className="text-white text-decoration-none" onClick={() => {setModalOpen(false); setMessageResponse({errorMessage: '', message: ''})}}>Close</Link>}
                        {messageResponse.errorMessage !== '' && <div  className="text-white " onClick={() => {setModalOpen(false); setMessageResponse({errorMessage: '', message: ''})}}>Close</div>}
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    )
};
export default UserAdd

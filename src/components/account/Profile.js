import React from 'react';
import { useState, useEffect } from "react";
import { Form, Label, Input, FormFeedback, Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { baseUrl } from '../../shared/baseUrl';

function Profile(props) {
    const [userData, setUserData] = useState({
        username: '',
        fullname: '',
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
        gender: 'Male',
        address: '',
        mobile: '',
        email: '',
        imageUserUrl: ''
    });
    const [valueErrors, setValueError] = useState({
        fullname: '',
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
        email: '',
        imageUserUrl: '',
        mobile: ''
    });
    const [editable, setEditable] = useState(false);
    const [display, setDisplay] = useState('info');
    const [error, setError] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [messageResponse, setMessageResponse] = useState({errorMessage: '', message: ''});

    useEffect(() => {
        fetch(baseUrl + `user/updateinfo/${props.username}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error ' + response.status + ': ' + response.statusText);
            }
            return response.json()
        })
        .then((data) => {
            setUserData({
                username: data.user.username,
                fullname: data.user.fullname,
                oldPassword: '',
                newPassword: '',
                confirmPassword: '',
                gender: data.user.gender,
                address: data.user.address,
                mobile: data.user.mobile,
                email: data.user.email,
                imageUserUrl: data.user.imageUserUrl,
            });
        })
        .catch((err) => {
            setError('There are some errors when loading database. Please try again!');
            setDisplay(null);
        });
    }, [props.username, editable]);
    const handleInputChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setUserData(userData => ({ ...userData, [name]: value}))
        
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
        const mobileRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
        const mediumPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;
        switch (true) {
            case ( name === 'fullname' && value.length >= 3):
                setValueError({...valueErrors, fullname: ''});
                break;
            case (name === 'fullname' && value.length < 3):
                setValueError({...valueErrors, fullname: 'H??? t??n ch???a t???i thi???u 3 k?? t???'});
                break;
            // M???t kh???u c?? kh??ng tr??ng v???i m???t kh???u m???i v?? ch???a t???i thi???u 8 k?? t??? 
            case ( name === 'oldPassword' && value.length >= 8 && value !== userData.newPassword):
                setValueError({...valueErrors, oldPassword: ''});
                break;
            case (name === 'oldPassword' && value.length < 8):
                setValueError({...valueErrors, oldPassword: 'M???t kh???u ch???a t???i thi???u 8 k?? t???'});
                break;
            case ( name === 'oldPassword' && value === userData.newPassword):
                setValueError({...valueErrors, newPassword: 'M???t kh???u m???i kh??ng ???????c tr??ng v???i m???t kh???u c??'});
                break;
            // M???t kh???u m???i kh??ng tr??ng v???i m???t kh???u c??, ch???a t???i thi???u 8 k?? t??? bao g???m t???i thi???u 1 ch??? th?????ng, 1 ch??? hoa v?? 1 ch??? s???
            case ( name === 'newPassword' && value.length >= 8 && value !== userData.oldPassword && mediumPasswordRegex.test(value) === true):
                setValueError({...valueErrors, newPassword: ''});
                break;
            case ( name === 'newPassword' && mediumPasswordRegex.test(value) === false):
                setValueError({...valueErrors, newPassword: 'M???t kh???u m???i ph???i c?? ??t nh???t 1 ch??? th?????ng, 1 ch??? hoa v?? 1 ch??? s???'});
                break;
            case (name === 'newPassword' && value.length < 8):
                setValueError({...valueErrors, newPassword: 'M???t kh???u ch???a t???i thi???u 8 k?? t???'});
                break;
            case ( name === 'newPassword' && value === userData.oldPassword):
                setValueError({...valueErrors, newPassword: 'M???t kh???u m???i kh??ng ???????c tr??ng v???i m???t kh???u c??'});
                break;
            // X??c nh???n m???t kh???u ph???i gi???ng m???t kh???u m???i
            case ( name === 'confirmPassword' && value === userData.newPassword):
                setValueError({...valueErrors, confirmPassword: ''});
                break;
            case (name === 'confirmPassword' && value !== userData.newPassword):
                setValueError({...valueErrors, confirmPassword: 'M???t kh???u kh??ng kh???p'});
                break;
            case ( name === 'email' && emailRegex.test(value.toLowerCase()) === true):
                setValueError({...valueErrors, email: ''});
                break;
            case (name === 'email' && emailRegex.test(value.toLowerCase()) === false):
                setValueError({...valueErrors, email: 'Email ch??a ????ng'});
                break;
            case ( name === 'imageUserUrl' && (value === '' || urlRegex.test(value) === true)):
                setValueError({...valueErrors, imageUserUrl: ''});
                break;
            case (name === 'imageUserUrl' && urlRegex.test(value) === false):
                setValueError({...valueErrors, imageUserUrl: 'H??nh ?????i di???n ph???i l?? link URL'});
                break;
            case ( name === 'mobile' && mobileRegex.test(value) === true):
                setValueError({...valueErrors, mobile: ''});
                break;
            case (name === 'mobile' && mobileRegex.test(value) === false):
                setValueError({...valueErrors, mobile: 'S??? ??i???n tho???i ch??a ????ng'});
                break;
            default:
        }
    }
    const resetInfo = (e) => {
        const resetUserData = {
            username: userData.username,
            fullname: '',
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
            gender: 'Male',
            address: '',
            mobile: '',
            email: '',
            imageUserUrl: '',
        }
        setUserData(resetUserData);
    }
    const handleEdit = (e) => {
        setEditable(!editable);
        setValueError({
            fullname: '',
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
            email: '',
            imageUserUrl: '',
            mobile: ''
        })
    }
    const handleChangeInfo = (e) => {
        e.preventDefault();
        fetch(baseUrl + 'user/updateinfo', {
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
                setEditable(false);
                setModalOpen(true);
                setMessageResponse({errorMessage: '', message: data.message});
            }
        })
        .catch((err) => {
            setError('There are some errors when loading database. Please try again!');
            setDisplay(null);
        })
    }
    const handleChangePassword = (e) => {
        e.preventDefault();
        fetch(baseUrl + 'auth/updatepassword', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({"username": userData.username, "oldPassword": userData.oldPassword ,"newPassword": userData.newPassword})
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
                setEditable(false);
                setModalOpen(true);
                setMessageResponse({errorMessage: '', message: data.message});
            }
        })
        .catch((err) => {
            setError('There are some errors when loading database. Please try again!');
            setDisplay(null);
        })
    }
    return(
        <div>
            <div className="section-body">
                <div className="container-fluid">
                    <div className="page-header">
                        <div className="left ml-4">
                            <h1 className="page-title">Profile</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="section-body">
                <div className="container-fluid">
                    <div className="d-flex justify-content-between align-items-center">
                        <ul className="nav nav-tabs page-header-tab">
                            <li className="nav-item"><a className={display === 'info' ? "nav-link active" : "nav-link"} data-toggle="tab" href="#!" style={{backgroundColor: '#F1F1F1', borderColor: '#F1F1F1 #F1F1F1 #fff'}} onClick={() => {setDisplay('info'); setError('')}}>Change Info</a></li>
                            <li className="nav-item"><a className={display === 'password' ? "nav-link active" : "nav-link"} data-toggle="tab" href="#!" style={{backgroundColor: '#F1F1F1', borderColor: '#F1F1F1 #F1F1F1 #fff'}} onClick={() => {setDisplay('password'); setError('')}}>Change Password</a></li> 
                        </ul>
                    </div>
                </div>
            </div>
            <div className="section-body">
                <div className="container-fluid">
                    <div className="tab-content">
                        <div className="tab-pane fade show active" id="userInfo" role="tabpanel">
                            <div className="card mb-0" style={{minHeight: '100vh'}}>
                                <div className="form-group">
                                    <Input type="hidden" className="form-control" valid={error === ''} invalid={error !== ''}/>
                                    <FormFeedback className="text-center">{error}</FormFeedback>
                                </div>
                                { display === 'info' &&
                                    <div className="card-body">
                                        <Form onSubmit={handleChangeInfo} >
                                        <div className="row clearfix">
                                                <div className="col-12 col-md-4">
                                                    <div className="form-group">
                                                        <Label className="form-label">Username</Label>
                                                        <Input type="text" className="form-control" name="username" placeholder="Enter your username..." 
                                                            value={userData.username} 
                                                            readOnly='readOnly'
                                                            onChange={handleInputChange} 
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-md-4">
                                                    <div className="form-group">
                                                        <Label className="form-label">Fullname</Label>
                                                        <Input type="text" className="form-control" name="fullname" placeholder="Enter your fullname..." 
                                                            value={userData.fullname}
                                                            readOnly={editable === true ? false : 'readOnly'}
                                                            valid={valueErrors.fullname === ''} 
                                                            invalid={valueErrors.fullname !== ''} 
                                                            onChange={handleInputChange} 
                                                        />
                                                        <FormFeedback>{valueErrors.fullname}</FormFeedback>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-md-4">
                                                    <div className="form-group">
                                                        <Label className="form-label">Email</Label>
                                                        <Input type="email" className="form-control" name="email"  placeholder="Enter your email..." 
                                                            value={userData.email}
                                                            readOnly={editable === true ? false : 'readOnly'}
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
                                                            readOnly={editable === true ? false : 'readOnly'}
                                                            onChange={handleInputChange} />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-md-4">
                                                    <div className="form-group">
                                                        <Label className="form-label">Mobile</Label>
                                                        <Input type="text" className="form-control" name="mobile" placeholder="Enter your mobile..." 
                                                            value={userData.mobile} 
                                                            readOnly={editable === true ? false : 'readOnly'}
                                                            valid={valueErrors.mobile === ''}
                                                            invalid={valueErrors.mobile !== ''}
                                                            onChange={handleInputChange} 
                                                        />
                                                        <FormFeedback>{valueErrors.mobile}</FormFeedback>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-md-4">
                                                    <div className="form-group">
                                                        <Label className="form-label">Gender</Label>
                                                        <Input type="select" className="form-control show-tick" name="gender" 
                                                            value={userData.gender} 
                                                            readOnly={editable === true ? false : 'readOnly'}
                                                            onChange={handleInputChange}
                                                        >
                                                            <option value="male">Male</option>
                                                            <option value="female">Female</option>
                                                            <option value="other">Other</option>
                                                        </Input>
                                                    </div>
                                                </div>
                                                <div className='col-12 col-md-4'>
                                                    <div className="form-group">
                                                        <Label className="form-label">Avatar</Label>
                                                        <Input type="url" className="form-control" name="imageUserUrl" placeholder="Paste URL address of avatar image..."
                                                            value={userData.imageUserUrl} 
                                                            readOnly={editable === true ? false : 'readOnly'}
                                                            valid={valueErrors.imageUserUrl === ''} 
                                                            invalid={valueErrors.imageUserUrl !== ''} 
                                                            onChange={handleInputChange} />
                                                        <FormFeedback>{valueErrors.imageUserUrl}</FormFeedback>
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
                                                            <Label className="form-label">&nbsp;</Label>
                                                            {editable === true ? 
                                                                <div className='row clearfix'>
                                                                    <div className="col-12">
                                                                        <div className="form-group">
                                                                            <input disabled={ userData.fullname !== '' && valueErrors.fullname === '' && valueErrors.imageUserUrl === '' && userData.email !== '' && valueErrors.email === '' && userData.mobile !== '' && valueErrors.mobile === '' ? false : true} className="btn btn-outline-primary w-100" type="submit" value="Update"/>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12">
                                                                        <div className="form-group">
                                                                            <button type="button" className="btn btn-outline-danger w-100" onClick={resetInfo}>Reset</button>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12">
                                                                        <div className="form-group">
                                                                            <button type="button" className="btn btn-outline-secondary w-100" onClick={handleEdit}>Close</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            :
                                                                <div className='row clearfix'>
                                                                    <div className="col-12">
                                                                        <div className="form-group">
                                                                            <button type="button" className="btn btn-outline-success w-100" onClick={handleEdit}>Edit</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Form>
                                    </div>
                                }
                                { display === 'password' &&
                                    <div className="card-body">
                                        <Form onSubmit={handleChangePassword} >
                                            <div className="row clearfix">
                                                <div className="col-12 col-md-4">
                                                    <div className="form-group">
                                                        <Label className="form-label">Username</Label>
                                                        <Input type="text" className="form-control" name="username" value={userData.username} readonly='readonly'/>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-md-4">
                                                    <div className="form-group">
                                                        <Label className="form-label">Old password</Label>
                                                        <Input type="password" className="form-control" name="oldPassword" placeholder='Enter your old password...'
                                                            value={userData.oldPassword} 
                                                            readOnly={editable === true ? false : 'readOnly'}
                                                            valid={valueErrors.oldPassword === ''}
                                                            invalid={valueErrors.oldPassword !== ''}
                                                            onChange={(e) => handleInputChange(e)} 
                                                        />
                                                        <FormFeedback>{valueErrors.oldPassword}</FormFeedback>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-md-4">
                                                    <div className="form-group">
                                                        <Label className="form-label">New password</Label>
                                                        <Input type="password" className="form-control" name="newPassword" placeholder='Enter your new password...'
                                                            value={userData.newPassword} 
                                                            readOnly={editable === true ? false : 'readOnly'}
                                                            valid={valueErrors.newPassword === ''}
                                                            invalid={valueErrors.newPassword !== ''}
                                                            onChange={(e) => handleInputChange(e)} 
                                                        />
                                                        <FormFeedback>{valueErrors.newPassword}</FormFeedback>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-md-4">
                                                    <div className="form-group">
                                                        <Label className="form-label">Confirm new password</Label>
                                                        <Input type="password" className="form-control" name="confirmPassword" placeholder='Enter again your new password...'
                                                            value={userData.confirmPassword} 
                                                            readOnly={editable === true ? false : 'readOnly'}
                                                            valid={valueErrors.confirmPassword === ''}
                                                            invalid={valueErrors.confirmPassword !== ''}
                                                            onChange={(e) => handleInputChange(e)} 
                                                        />
                                                        <FormFeedback>{valueErrors.confirmPassword}</FormFeedback>
                                                    </div>
                                                </div>
                                                {editable &&
                                                    <div className="col-12 col-md-4">
                                                        <Label className="form-label">&nbsp;</Label>
                                                        <div className='row clearfix'>
                                                            <div className='col-6'>
                                                                <div className="form-group">
                                                                    <input disabled={userData.oldPassword !== '' && valueErrors.oldPassword === '' && userData.newPassword !== '' && valueErrors.newPassword === '' && userData.confirmPassword !== '' && valueErrors.confirmPassword === '' ? false : true} className="btn btn-outline-primary w-100" type="submit" value="Update"/>
                                                                </div>
                                                            </div>
                                                            <div className='col-6'>
                                                                <div className="form-group">
                                                                    <button type="button" className="btn btn-outline-danger w-100" onClick={resetInfo}>Reset</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>}
                                                {editable &&
                                                    <div className="col-12 col-md-4">
                                                        <Label className="form-label">&nbsp;</Label>
                                                        <div className='row clearfix'>
                                                            <div className="col-6">
                                                                <div className="form-group">
                                                                    <button type="button" className="btn btn-outline-secondary w-100" onClick={handleEdit}>Close</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>}
                                                {!editable &&    
                                                    <div className="col-12 col-md-4">
                                                        <Label className="form-label">&nbsp;</Label>
                                                        <div className='row clearfix'>
                                                            <div className="col-6">
                                                                <div className="form-group">
                                                                    <button type="button" className="btn btn-outline-success w-100" onClick={handleEdit}>Edit</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>}
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
                        <div  className="text-white " onClick={() => {setModalOpen(false); setMessageResponse({errorMessage: '', message: ''})}}>Close</div>
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    )
};
export default Profile

import React from 'react';
import { useState, useMemo, useEffect } from "react";
import {Link} from 'react-router-dom';
import Pagination from "../pagination/Pagination";
import { baseUrl } from '../../shared/baseUrl';
import {Input, FormFeedback, Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

function UserList(props) {
    const [userData, setUserData] = useState([]);
    const [checkedBoxes, setCheckedBoxes] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [searchType, setSearchType] = useState('');
    const [display, setDisplay] = useState(true);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [PageSize, setPageSize] = useState(5);
    const [totalCount, setTotalCount] = useState(userData.length);
    const [modalOpen, setModalOpen] = useState(false);
    const [messageResponse, setMessageResponse] = useState({errorMessage: '', message: ''});
    
    useEffect(() => {
        fetch(baseUrl + 'user')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error ' + response.status + ': ' + response.statusText);
            }
            return response.json();
        })
        .then((data) => {
            setUserData(data.users.reverse());
        })
        .catch((err) => {
            setError('There are some errors when loading database. Please try again!');
            setDisplay(false);
        })
    }, [confirmDelete]);
    const toggleCheckbox = (e, username) => {
        if(e.target.checked) {
            setCheckedBoxes(checkedBoxes => [...checkedBoxes, username]);
        } else {		
            setCheckedBoxes(checkedBoxes.filter(x => x !== username));
        }
    }
    const confirmDeleteItems = (e) => {
        setConfirmDelete(true);
        setMessageResponse({errorMessage: '', message: 'Are you sure you want to delete these users?'}); 
    }
    const deleteItems = (e) => {
        e.preventDefault();
        fetch(baseUrl + 'user/delete', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({'usernames' : checkedBoxes}),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error ' + response.status + ': ' + response.statusText);
            }
            return response.json();
        })
        .then((data) => {
            setConfirmDelete(false);
            if (data.errorMessage) {
                setModalOpen(true);
                setMessageResponse({errorMessage: data.errorMessage, message: ''});
            } else {
                setCheckedBoxes([]);
                setModalOpen(true);
                setMessageResponse({errorMessage: '', message: data.message});
                setUserData(userData.filter(item => !checkedBoxes.includes(item.username)));
            }
        })
        .catch((err) => {
            setError('There are some errors when loading database. Please try again!');
            setUserData([]);
            setDisplay(false);
        })
    }
    const sortFunction = (e) => {
        let newData
        const sortType = e.target.value;
        switch (true) {
            case (sortType === 'username'):
                newData = userData.sort((a,b) => a.username.localeCompare(b.username));
                break;
            case (sortType === 'fullname'):
                newData = userData.sort((a,b) => a.fullname.localeCompare(b.fullname));
                break;
            case (sortType === 'email'):
                newData = userData.sort((a,b) => a.email.localeCompare(b.email));
                break;
            case (sortType === 'gender'):
                newData = userData.sort((a,b) => a.gender.localeCompare(b.gender));
                break;
            case (sortType === 'address'):
                newData = userData.sort((a,b) => a.address.localeCompare(b.address));
                break;
            case (sortType === 'mobile'):
                newData = userData.sort((a,b) => a.mobile.localeCompare(b.mobile));
                break;
            default:
                newData = userData;
        }
        setUserData([...newData]);
    }
    const dataWithPagination = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        const newData = userData.filter((x) => {
            if (searchType === "fullname") {  
                return(x.fullname.toLowerCase().includes(keyword.toLowerCase()))
            } else if (searchType === "username") {
                return (x.username.toLowerCase().includes(keyword.toLowerCase()))
            } else if (searchType === "email") {
                return (x.email.toLowerCase().includes(keyword.toLowerCase()))
            } else if (searchType === "address") {
                return (x.address.toLowerCase().includes(keyword.toLowerCase()))
            } else if (searchType === "mobile") {
                return (x.mobile.toLowerCase().includes(keyword.toLowerCase()))
            } else if (searchType === "isAdmin") {
                return (x.isAdmin === true)
            } else if (searchType === "isUser") {
                return (x.isAdmin === false)
            } else {
                return x
            }
            });
        setTotalCount(newData.length);
        if (PageSize >= newData.length) {setCurrentPage(1)}
        return newData.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, PageSize, userData, keyword, searchType]);
    
    return(
        <div>
            <div className="page-header">
                <div className="left ml-4">
                    <h1 className="page-title">User Management</h1>
                    <Link className="btn btn-sm active" to="/user-add"><i className="fas fa-user-plus"></i> Add</Link>
                    <button className="btn btn-sm active" onClick={confirmDeleteItems}><i className="fas fa-trash"></i> Delete</button>
                </div>
            </div>
            <div className="tab-content">
                <div className="tab-pane show active">
                    <div className="card mb-0" style={{minHeight: '100vh'}}>
                        <div className="card-header">
                            <div className="header-action">
                                <div className="small ml-1">
                                    <a href="#!" className={searchType === '' ? "text-decoration-none" : "text-decoration-none text-secondary"} onClick={()=> setSearchType('')}>All ({userData.length})</a> |&nbsp;
                                    <a href="#!" className={searchType === 'isAdmin' ? "text-decoration-none" : "text-decoration-none text-secondary"} onClick={()=> setSearchType('isAdmin')}>Admin ({userData.filter((x) => x.isAdmin === true).length})</a> |&nbsp;
                                    <a href="#!" className={searchType === 'isUser' ? "text-decoration-none" : "text-decoration-none text-secondary"} onClick={()=> setSearchType('isUser')}>User ({userData.filter((x) => x.isAdmin === false).length})</a>
                                </div>
                            </div>
                            <div className="card-options">
                                <div className="input-group">
                                    <input type="text" className="form-control form-control-sm" style={{width: '200px'}} placeholder="Enter keyword..." name="keyword" onChange={(e)=> setKeyword(e.target.value)}/>
                                    <select className="custom-select" style={{width: '140px'}} name="searchType" onChange={(e) => setSearchType(e.target.value)}>
                                        <option value="">Search by</option>
                                        <option value="username">Username</option>
                                        <option value="fullname">Fullname</option>
                                        <option value="email">Email</option>
                                        <option value="address">Address</option>
                                        <option value="mobile">Mobile</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="card-header">
                            <div className="header-action">
                                <div className="input-group">
                                    <select className="custom-select" name="sortType" onChange={sortFunction}>
                                        <option value="">Sort by</option>
                                        <option value="username">Username</option>
                                        <option value="fullname">Fullname</option>
                                        <option value="email">Email</option>
                                        <option value="gender">Gender</option>
                                        <option value="address">Address</option>
                                        <option value="mobile">Mobile</option>
                                    </select>
                                    <select className="custom-select" name="pageSize" onChange={(e) => setPageSize(parseInt(e.target.value))}>
                                        <option value={PageSize}>Show</option>
                                        <option value="3">3 rows</option>
                                        <option value="5">5 rows</option>
                                        <option value="10">10 rows</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <Input type="hidden" className="form-control" valid={error === ''} invalid={error !== ''}/>
                                <FormFeedback className="text-center">{error}</FormFeedback>
                            </div>
                            { display &&
                                <div className="pagination-wrapper">
                                    <div className="table-responsive">
                                        <table className="table table-striped table-hover table-vcenter text-nowrap mb-0">
                                            <thead>
                                                <tr>
                                                    <th className="w20 text-center">#</th>
                                                    <th></th>
                                                    <th>User</th>
                                                    <th>Gender</th>
                                                    <th>Mobile</th>
                                                    <th>Address</th>
                                                    <th>Role</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {dataWithPagination.map((userData) => {
                                                    return (
                                                        <tr key={userData._id}>
                                                            <td className="text-center">
                                                                <input type="checkbox" checked={checkedBoxes.filter((x) => x === userData.username).length >0 ? true : false} onChange={(e) => toggleCheckbox(e, userData.username)}/>
                                                            </td>
                                                            <td className="text-center" style={{minWidth: '60px'}}>
                                                                <img src={userData.imageUserUrl} alt="Avatar" className="avatar"/>
                                                            </td>
                                                            <td style={{maxWidth: '300px'}}>
                                                                <h6 className="mb-0">{userData.fullname} <span style={{lineHeight: '15px'}} className={userData.status === 'online' ? 'tag tag-success rounded-pill' : 'tag tag-info rounded-pill'}>{userData.status}</span></h6>
                                                                <small className="font-12"><em>{userData.username}</em></small> | <span className="font-12"><em>{userData.email}</em></span>
                                                            </td>
                                                            <td>{userData.gender}</td>
                                                            <td>{userData.mobile === '' ? '' : `(${userData.mobile.slice(0, 4)}) ${userData.mobile.slice(4, 7)}-${userData.mobile.slice(7, 10)}`}</td>
                                                            <td style={{maxWidth: '200px'}}className="text-truncate">{userData.address}</td>
                                                            <td>
                                                                <span className={userData.isAdmin ? 'tag tag-teal' : 'tag tag-yellow'}>{userData.isAdmin ? "Admin" : "User"}</span>
                                                            </td>
                                                            <td>
                                                                <Link to={`/history/${userData.username}`}>
                                                                    <button className="btn btn-icon" title="Edit"><i className="fa fa-history"></i></button>
                                                                </Link>
                                                                <Link to={`/user-edit/${userData.username}`}>
                                                                    <button className="btn btn-icon" title="Edit"><i className="far fa-edit"></i></button>
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                    <Pagination
                                        className="pagination-bar"
                                        currentPage={currentPage}
                                        totalCount={totalCount}
                                        pageSize={PageSize}
                                        onPageChange={page => setCurrentPage(page)}
                                    />
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Modal isOpen={confirmDelete}>
                <ModalHeader>Notification</ModalHeader>
                <ModalBody style={{height: '100px'}}>
                    <div className="container-fluid">{messageResponse.errorMessage ? messageResponse.errorMessage : messageResponse.message}</div>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" className="float-right mx-2" onClick={deleteItems}>Continue</Button>
                    <Button color="secondary" className="float-right mx-2">
                        <div  className="text-white " onClick={() => {setConfirmDelete(false); setMessageResponse({errorMessage: '', message: ''})}}>Close</div>
                    </Button>
                </ModalFooter>
            </Modal>
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

export default UserList

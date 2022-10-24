import React from 'react';
import { useState, useMemo, useEffect } from "react";
import Pagination from "./pagination/Pagination";
import dateFormat from 'dateformat';
import { baseUrl } from '../shared/baseUrl';
import {Input, FormFeedback, Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

function DonationConfirmation(props) {
    const [donationData, setDonationData] = useState([]);

    const [keyword, setKeyword] = useState('');
    const [searchType, setSearchType] = useState('');
    const [display, setDisplay] = useState(true);

    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [PageSize, setPageSize] = useState(5);
    const [totalCount, setTotalCount] = useState(donationData.length);
    const [modalOpen, setModalOpen] = useState(false);
    const [messageResponse, setMessageResponse] = useState({errorMessage: '', message: ''});

    useEffect(() => {
        fetch(baseUrl + 'donation')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error ' + response.status + ': ' + response.statusText);
            }
            return response.json();
        })
        .then((data) => {
            setDonationData(data.donations.reverse());
        })
        .catch((err) => {
            setError('There are some errors when loading database. Please try again!');
            setDisplay(false);
        })
    }, [messageResponse]);
    const handleConfirm = (e, id, value) => {
        e.preventDefault();
        fetch(baseUrl + 'donation/confirm', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({"confirmData": {donationId : id, value: value, username: props.username, confirmDate: new Date().toISOString()}})
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error ' + response.status + ': ' + response.statusText);
            }
            return response.json();
        })
        .then((data) => {
            if (data.errorMessage) {
                setModalOpen(true);
                setMessageResponse({errorMessage: data.errorMessage, message: ''});
            } else {
                setMessageResponse({errorMessage: '', message: data.message});
            }
        })
        .catch((err) => {
            setModalOpen(true);
            setMessageResponse({errorMessage: err, message: ''});
        })
    }
    const sortFunction = (e) => {
        let newData
        const sortType = e.target.value;
        switch (true) {
            case (sortType === 'username'):
                newData = donationData.sort((a,b) => a.username.localeCompare(b.username));
                break;
            case (sortType === 'fullname'):
                newData = donationData.sort((a,b) => a.fullname.localeCompare(b.fullname));
                break;
            case (sortType === 'eventName'):
                newData = donationData.sort((a,b) => a.eventName.localeCompare(b.eventName));
                break;
            case (sortType === 'eventId'):
                newData = donationData.sort((a,b) => a.eventId.localeCompare(b.eventId));
                break;
            case (sortType === 'amount'):
                newData = donationData.sort((a,b) => a.amount - b.amount);
                break;
            case (sortType === 'donationDate'):
                newData = donationData.sort((a,b) => new Date(a.donationDate).getTime() - new Date(b.donationDate).getTime());
                break;
            default:
                newData = donationData;
        }
        setDonationData([...newData]);
    }
    const dataWithPagination = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        const newData = donationData.filter((x) => {
            if (searchType === "username") {  
                return(x.username.toLowerCase().includes(keyword.toLowerCase()))
            } else if (searchType === "eventId") {
                return (x.eventId.toLowerCase().includes(keyword.toLowerCase()))
            } else if (searchType === "amount") {
                return (x.amount === keyword)
            } else if (searchType === "donationDate") {
                return (new Date(x.donationDate).getTime() === new Date(keyword).getTime())
            } else if (searchType === "pending") {
                return (x.donationStatus === 'pending')
            } else if (searchType === "successful") {
                return (x.donationStatus === 'successful')
            } else if (searchType === "failed") {
                return (x.donationStatus === 'failed')
            } else {
                return x
            }
            });
        setTotalCount(newData.length);
        if (PageSize >= newData.length) {setCurrentPage(1)}
        return newData.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, PageSize, donationData, keyword, searchType]);
    
    return(
        <div>
            <div className="page-header">
                <div className="left ml-4">
                    <h1 className="page-title">Donation Confirmation</h1>
                </div>
            </div>
            <div className="tab-content">
                <div className="tab-pane show active">
                    <div className="card mb-0" style={{minHeight: '100vh'}}>
                        <div className="card-header">
                            <div className="header-action">
                                <div className="small ml-1">
                                    <a href="#!" className={searchType === '' ? "text-decoration-none" : "text-decoration-none text-secondary"} onClick={()=> setSearchType('')}>All ({donationData.length})</a> |&nbsp;
                                    <a href="#!" className={searchType === 'successful' ? "text-decoration-none" : "text-decoration-none text-secondary"} onClick={()=> setSearchType('successful')}>Successful ({donationData.filter((x) => x.donationStatus === 'successful').length})</a> |&nbsp;
                                    <a href="#!" className={searchType === 'pending' ? "text-decoration-none" : "text-decoration-none text-secondary"} onClick={()=> setSearchType('pending')}>Pending ({donationData.filter((x) => x.donationStatus === 'pending').length})</a> |&nbsp;
                                    <a href="#!" className={searchType === 'failed' ? "text-decoration-none" : "text-decoration-none text-secondary"} onClick={()=> setSearchType('failed')}>Failed ({donationData.filter((x) => x.donationStatus === 'failed').length})</a>
                                </div>
                            </div>
                            <div className="card-options">
                                <div className="input-group">
                                    <input type="text" className="form-control form-control-sm" style={{width: '200px'}} placeholder="Enter keyword..." name="keyword" onChange={(e)=> setKeyword(e.target.value)}/>
                                    <select className="custom-select" style={{width: '140px'}} name="searchType" onChange={(e) => setSearchType(e.target.value)}>
                                        <option value="">Search by</option>
                                        <option value="username">Username</option>
                                        <option value="eventId">Event ID</option>
                                        <option value="amount">Amount</option>
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
                                        <option value="eventName">Event Name</option>
                                        <option value="eventId">Event ID</option>
                                        <option value="amount">Amount</option>
                                        <option value="donationDate">Date</option>
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
                                                    <th className="w60"></th>
                                                    <th>Event</th>
                                                    <th className="w60"></th>
                                                    <th>User</th>
                                                    <th>Amount</th>
                                                    <th>Date</th>
                                                    <th>Status</th>
                                                    <th>Confirm</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {dataWithPagination.map((donationData) => {
                                                    return (
                                                        <tr key={donationData._id}>
                                                            <td className="text-center" style={{minWidth: '60px'}}>
                                                                <img src={donationData.imageEventUrl} alt="Avatar" className="avatar rounded-0"/>
                                                            </td>
                                                            <td style={{maxWidth: '250px'}}>
                                                                <h6 className="mb-0 text-truncate">{donationData.eventName} </h6>
                                                                <span className="font-12"><em>{donationData.eventId}</em></span>
                                                            </td>
                                                            <td className="text-center" style={{minWidth: '60px'}}>
                                                                <img src={donationData.imageUserUrl} alt="Avatar" className="avatar"/>
                                                            </td>
                                                            <td style={{maxWidth: '150px'}}>
                                                                <h6 className="mb-0">{donationData.fullname} </h6>
                                                                <span className="font-12"><em>{donationData.username}</em></span>
                                                            </td>
                                                            <td>
                                                                <span>{donationData.amount.toLocaleString()}đ</span>
                                                            </td>
                                                            <td>{dateFormat(donationData.donationDate,"dd/mm/yyyy")}</td>
                                                            <td>
                                                                <span className={donationData.donationStatus === 'successful' ? 'tag tag-success' : donationData.donationStatus === 'failed' ? 'tag tag-indigo' : 'tag tag-yellow'}>{donationData.donationStatus}</span>
                                                            </td>
                                                            <td>
                                                                {donationData.donationStatus === 'pending' && <div>
                                                                    <span onClick={(e) => handleConfirm(e, donationData._id, 1)}>
                                                                        <span className="btn btn-icon text-success" title="Select"><i className="fa fa-check"></i></span>
                                                                    </span>
                                                                    <span onClick={(e) => handleConfirm(e, donationData._id, 0)}>
                                                                        <span className="btn btn-icon text-danger" title="Select"><i className="fa fa-times"></i></span>
                                                                    </span>
                                                                </div>}
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
            <Modal isOpen={modalOpen}>
                <ModalHeader>Notification</ModalHeader>
                <ModalBody style={{height: '100px'}}>
                    <div className="container-fluid">{messageResponse.errorMessage ? messageResponse.errorMessage : messageResponse.message}</div>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" className="float-right mx-2 text-white" onClick={() => {setModalOpen(false); setMessageResponse({errorMessage: '', message: ''})}}>Close</Button>
                </ModalFooter>
            </Modal>
      </div>
    )
};

export default DonationConfirmation

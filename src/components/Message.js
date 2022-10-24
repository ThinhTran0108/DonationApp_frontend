import React from "react";
import { useState, useEffect, useMemo } from "react";
import dateFormat from 'dateformat';
import Pagination from "./pagination/Pagination";
import { baseUrl } from '../shared/baseUrl';
import {Input, Form, FormFeedback, Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

function Message(props) {
    const [feedbackData, setFeedbackData] = useState([]);
    const [userRequest, setUserRequest] = useState({request: '', requestDate: ''});
    const [userResponse, setUserResponse] = useState({response: '', responseDate: ''});
    const [replyBox, setReplyBox] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [searchType, setSearchType] = useState('');
    const [display, setDisplay] = useState(true);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [PageSize, setPageSize] = useState(5);
    const [totalCount, setTotalCount] = useState(feedbackData.length);
    const [modalOpen, setModalOpen] = useState(false);
    const [messageResponse, setMessageResponse] = useState({errorMessage: '', message: ''});
    
    useEffect(() => {
        fetch(baseUrl + `feedback/data`, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({"userData": {isAdmin: props.isAdmin, username: props.username}})
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error ' + response.status + ': ' + response.statusText);
            }
            return response.json();
        })
        .then((data) => {
            setFeedbackData(data.feedbacks.reverse());
        })
        .catch((err) => {
            setError('There are some errors when loading database. Please try again!');
            setDisplay(false);
        });
    }, [messageResponse, props.isAdmin, props.username]);
    const toggleReplyBox = (e, id) => {
        if(replyBox.filter(x => x === id).length > 0) {
            setReplyBox(replyBox.filter(x => x !== id));
        } else {			
            setReplyBox(replyBox => [...replyBox, id]);
        }
      }
    const sortFunction = (e) => {
        let newData
        const sortType = e.target.value;
        switch (true) {
            case (sortType === 'username'):
                newData = feedbackData.sort((a,b) => a.username.localeCompare(b.username));
                break;
            case (sortType === 'requestDate'):
                newData = feedbackData.sort((a,b) => new Date(a.requestDate).getTime() - new Date(b.requestDate).getTime());
                break;
            default:
                newData = feedbackData;
        }
        setFeedbackData([...newData]);
    }
    const handleInputChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        if (name === 'request') {
            setUserRequest({request: value, requestDate: new Date().toISOString()});
        }
        if (name === 'response') {
            setUserResponse({response: value, responseDate: new Date().toISOString()});
        }
    }
    const handleRequest = (e) => {
        e.preventDefault();
        fetch(baseUrl + 'feedback/request', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({"feedbackData": {username: props.username, request: userRequest.request, requestDate: userRequest.requestDate}})
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
                e.target.reset();
                setMessageResponse({errorMessage: '', message: data.message});
            }
        })
        .catch((err) => {
            setError('There are some errors when loading database. Please try again!');
            setDisplay(null);
        })
    }
    const handleResponse = (e, id) => {
        e.preventDefault();
        fetch(baseUrl + 'feedback/response', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({"feedbackData": {username: props.username, id: id, response: userResponse.response, responseDate: userResponse.responseDate, read: props.isAdmin ? true : false}})
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
                e.target.reset();
                setMessageResponse({errorMessage: '', message: data.message});
            }
        })
        .catch((err) => {
            setError('There are some errors when loading database. Please try again!');
            setDisplay(null);
        })
    }
    const handleRead = (e, id, value) => {
        e.preventDefault();
        fetch(baseUrl + 'feedback/markasread', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({"data": {id: id, read: value}})
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
                setMessageResponse({errorMessage: '', message: data.message});
            }
        })
        .catch((err) => {
            setError('There are some errors when loading database. Please try again!');
            setDisplay(null);
        })
    }
    const dataWithPagination = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        const newData = feedbackData.filter((x) => {
            if (searchType === "username") {  
                return(x.username.toLowerCase().includes(keyword.toLowerCase()))
            } else if (searchType === "request") {
                return (x.request.toLowerCase().includes(keyword.toLowerCase()))
            } else if (searchType === "read") {
                return (x.read === true)
            } else if (searchType === "unread") {
                return (x.read === false)
            } else {
                return x
            }
        });
        setTotalCount(newData.length);
        if (PageSize >= newData.length) {setCurrentPage(1)}
        return newData.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, PageSize, feedbackData, keyword, searchType]);
    
    return(
        <div>
            <div className="page-header">
                <div className="left ml-4">
                    <h1 className="page-title">Message</h1>
                </div>
            </div>
            <div className="tab-content">
                <div className="tab-pane show active">
                    <div className="card mb-0" style={{minHeight: '100vh'}}>
                        <div className="card-header">
                            <div className="header-action">
                                <div className="small ml-1">
                                    <a href="#!" className={searchType === '' ? "text-decoration-none" : "text-decoration-none text-secondary"} onClick={()=> setSearchType('')}>All ({feedbackData.length})</a> |&nbsp;
                                    <a href="#!" className={searchType === 'read' ? "text-decoration-none" : "text-decoration-none text-secondary"} onClick={()=> setSearchType('read')}>{props.isAdmin ? 'Read' : 'Answered'} ({feedbackData.filter((x) => x.read === true).length})</a> |&nbsp;
                                    <a href="#!" className={searchType === 'unread' ? "text-decoration-none" : "text-decoration-none text-secondary"} onClick={()=> setSearchType('unread')}>{props.isAdmin ? 'Unread' : 'Unanswered'} ({feedbackData.filter((x) => x.read === false).length})</a>
                                </div>
                            </div>
                            <div className="card-options">
                                <div className="input-group">
                                    <input type="text" className="form-control form-control-sm" style={{width: '200px'}} placeholder="Enter keyword..." name="keyword" onChange={(e)=> setKeyword(e.target.value)}/>
                                    <select className="custom-select" style={{width: '140px'}} name="searchType" onChange={(e) => setSearchType(e.target.value)}>
                                        <option value="">Search by</option>
                                        <option value="username">Username</option>
                                        <option value="request">Request</option>
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
                                        <option value="requestDate">Request Date</option>
                                    </select>
                                    <select className="custom-select" name="pageSize" onChange={(e) => setPageSize(parseInt(e.target.value))}>
                                        <option value={PageSize}>Show</option>
                                        <option value="3">3 comments</option>
                                        <option value="5">5 comments</option>
                                        <option value="10">10 comments</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        {!props.isAdmin && <div className="card-body">
                            <Form className="well" onSubmit={handleRequest}>
                                <div className="form-group">
                                    <Input type='textarea' rows="2" className="form-control no-resize" name="request" placeholder="Enter here for request..." onChange={handleInputChange}/>
                                </div>
                                <button className="btn btn-outline-success float-right"><i className="fas fa-send"></i> Submit</button>
                            </Form>
                        </div>}
                        <div className="card-header">
                            <h3 className="card-title">Timeline Response</h3>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <Input type="hidden" className="form-control" valid={error === ''} invalid={error !== ''}/>
                                <FormFeedback className="text-center">{error}</FormFeedback>
                            </div>
                            { display && 
                            <div className="pagination-wrapper">
                                {dataWithPagination.map((feedback) => {
                                    return (
                                        <div className="timeline_item ">
                                            <img className="tl_avatar" src={feedback.imageUserUrl} alt="avatar"/>
                                            <h6>
                                                {feedback.username}&nbsp;
                                                <i className={feedback.isAdmin ? 'fas fa-circle fa-xs text-cyan' : 'fas fa-circle fa-xs text-warning'}></i>
                                                <small className="float-right text-right my-1">
                                                    {dateFormat(feedback.requestDate,"dd/mm/yyyy hh:mm")}&nbsp;
                                                    <a href="#!" onClick={(e) => handleRead(e, feedback._id, !feedback.read)}>
                                                    <i className={feedback.read ? "far fa-envelope-open" : "fas fa-envelope"}></i></a>
                                                </small>
                                            </h6>
                                            <div className="msg">
                                                <p>{feedback.request}</p>
                                                <button className={replyBox.filter((x) => x === feedback._id).length >0 ? "btn text-muted": "btn text-muted collapsed"} onClick={(e) => toggleReplyBox(e, feedback._id)}>
                                                    <i class="fa fa-comments"></i>&nbsp;
                                                    {feedback.response.length === 1 ? feedback.response.length +' reply' : feedback.response.length > 1 ? feedback.response.length +' replies': ' reply'}
                                                </button>
                                                <div className={replyBox.filter((x) => x === feedback._id).length >0 ? "p-4 section-gray mt-2 collapse show" : "p-4 section-gray mt-2 collapse"}>
                                                    <h6>
                                                        {props.username}&nbsp;
                                                        <i className={props.isAdmin ? 'fas fa-circle fa-xs text-cyan' : 'fas fa-circle fa-xs text-warning'}></i>
                                                    </h6>
                                                    <Form className="well" onSubmit={(e) => handleResponse(e, feedback._id)}>
                                                        <div className="form-group">
                                                            <Input type='textarea' rows="2" className="form-control no-resize" placeholder="Enter here for response..." name="response" onChange={handleInputChange}/>
                                                        </div>
                                                        <button className="btn btn-outline-success">
                                                            <i className="fas fa-send"></i> Submit
                                                        </button>
                                                    </Form>
                                                    {feedback.response.length > 0 && 
                                                        <ul className="recent_comments list-unstyled mt-4 mb-0">
                                                            {feedback.response.map(response => {
                                                                return (
                                                                    <li>
                                                                        <div className="avatar_img">
                                                                            <img className="avatar" src={response.imageUserUrl} alt="avatar"/>
                                                                        </div>
                                                                        <div className="comment_body">
                                                                            <h6>
                                                                                {response.username}&nbsp;
                                                                                <i className={response.isAdmin ? 'fas fa-circle fa-xs text-cyan' : 'fas fa-circle fa-xs text-warning'}></i>
                                                                                <small className="float-right text-right font-12 my-1">{dateFormat(response.responseDate,"dd/mm/yyyy hh:mm")}</small>
                                                                            </h6>
                                                                            <p>{response.response}</p>
                                                                        </div>
                                                                    </li>
                                                                )
                                                            })}
                                                        </ul>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
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
                    <Button color="secondary" className="float-right mx-2">
                        <div  className="text-white " onClick={() => {setModalOpen(false); setMessageResponse({errorMessage: '', message: ''})}}>Close</div>
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}
export default Message
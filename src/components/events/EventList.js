import React from 'react';
import { useState, useMemo, useEffect } from "react";
import {Link} from 'react-router-dom';
import Pagination from "../pagination/Pagination";
import {Input, Label, Form, FormFeedback, Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { baseUrl } from '../../shared/baseUrl';

function EventList(props) {
  const [eventData, setEventData] = useState([]);
  const [checkedBoxes, setCheckedBoxes] = useState([]);
  const [cardCollapseList, setCardCollapseList] = useState([]);
  const [donation, setDonation] = useState({isOpen: false, eventId: '', eventName: '', imageEventUrl: ''});
  const [donationData, setDonationData] = useState({amount: 0, message: ''})
  const [itemSelected, setItemSelected] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [searchType, setSearchType] = useState('');
  const [display, setDisplay] = useState(true);
  const [showList, setShowList] = useState(1);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [PageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(eventData.length);
  const [modalOpen, setModalOpen] = useState(false);
  const [messageResponse, setMessageResponse] = useState({errorMessage: '', message: ''});

  useEffect(() => {
    fetch(baseUrl + 'event')
    .then((response) => {
        if (!response.ok) {
          throw new Error('Error ' + response.status + ': ' + response.statusText);
        }
        return response.json();
      })
    .then((data) => {
      setEventData(data.events.reverse());
    })
    .catch((err) => {
      setError('There are some errors when loading database. Please try again!');
      setDisplay(false);
    })
  }, [confirmDelete]);
  const toggleCheckbox = (e, eventId) => {
    if(e.target.checked) {
      setCheckedBoxes(checkedBoxes => [...checkedBoxes, eventId]);
      setItemSelected(itemSelected => [...itemSelected, eventId]);
    } else {			
      setCheckedBoxes(checkedBoxes.filter(x => x !== eventId));
      setItemSelected(itemSelected.filter(x => x !== eventId));
    }
  }
  const toggleCardCollapse = (e, eventId) => {
    if(e.target.checked) {
      setCardCollapseList(cardCollapseList => [...cardCollapseList, eventId]);
    } else {			
      setCardCollapseList(cardCollapseList.filter(x => x !== eventId));
    }
  }
  const donationGuide = (e, eventId, eventName, imageEventUrl) => {
    e.preventDefault();
    setDonation({isOpen: true, eventId: eventId, eventName: eventName, imageEventUrl: imageEventUrl});
  }
  const handleInputChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setDonationData(donationData => ({ ...donationData, [name]: value}));
  }
  const handleDonation = (e) => {
    e.preventDefault();
    fetch(baseUrl + 'donation', {
      method: 'POST',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({'donationData' : {username: props.username, eventId: donation.eventId, amount: donationData.amount, message: donationData.message, donationDate: new Date().toISOString()}})
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
        setDonation({isOpen: false, eventId: '', eventName: '', imageEventUrl: ''});
        setModalOpen(true);
        setMessageResponse({errorMessage: data.errorMessage, message: ''});
      } else {
        setDonation({isOpen: false, eventId: '', eventName: '', imageEventUrl: ''});
        setDonationData({amount: 0, message: ''});
        setModalOpen(true);
        setMessageResponse({errorMessage: '', message: data.message});
      }
    })
    .catch((err) => {
      setModalOpen(true);
      setMessageResponse({errorMessage: err, message: ''});
    })
  }
  const confirmDeleteItems = (e) => {
    setConfirmDelete(true);
    setMessageResponse({errorMessage: '', message: 'Are you sure you want to delete these events?'}); 
  }
  const deleteItems = (e) => {
    e.preventDefault();
    fetch(baseUrl + 'event/delete', {
      method: 'POST',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({'eventIds' : checkedBoxes})
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
        setModalOpen(true);
        setMessageResponse({errorMessage: '', message: data.message});
        setEventData(eventData.filter(item => !checkedBoxes.includes(item.eventId)));
      }
    })
    .catch((err) => {
      setError('There are some errors when loading database. Please try again!');
      setEventData([]);
      setDisplay(false);
    })
  }
  const sortFunction = (e) => {
    let newData
    const sortType = e.target.value;
    switch (true) {
      case (sortType === 'eventId'):
        newData = eventData.sort((a,b) => a.eventId.localeCompare(b.eventId));
        break;
      case (sortType === 'eventName'):
        newData = eventData.sort((a,b) => a.eventName.localeCompare(b.eventName));
        break;
      case (sortType === 'donationCounter'):
        newData = eventData.sort((a,b) => a.donationCounter - b.donationCounter);
        break;
      case (sortType === 'realDonation'):
        newData = eventData.sort((a,b) => a.realDonation - b.realDonation);
        break;
      case (sortType === 'percenDonation'):
        newData = eventData.sort((a,b) => a.percenDonation - b.percenDonation);
        break;
      case (sortType === 'endDate'):
        newData = eventData.sort((a,b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime());
        break;
      default:
        newData = eventData;
    }
    setEventData([...newData])
  }
  const dataWithPagination = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    const newData = eventData.filter((x) => {
      if (searchType === "eventName") {  
        return(x.eventName.toLowerCase().includes(keyword.toLowerCase()))
      } else if (searchType === "eventId") {
        return (x.eventId.toLowerCase().includes(keyword.toLowerCase()))
      } else if (searchType === "isEnded") {
        return (new Date(x.endDate) < new Date().getTime())
      } else if (searchType === "onGoing") {
        return (new Date(x.endDate) >= new Date().getTime())
      } else {
        return x
      }
      });
    setTotalCount(newData.length);
    if (PageSize >= newData.length) {setCurrentPage(1)}
    return newData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, PageSize, eventData, keyword, searchType]);
  const toggleListOrGrid = (value) => {
    if (value === 0) {
      setShowList (0);
    }
    else if (value === 1) {
      setShowList(1);
      setCardCollapseList([]);
    }
    else if (value === 2) {
      setShowList(1);
      setCardCollapseList(eventData.map(x => x.eventId));
    }
  }
  return(
    <div>
      <div className="page-header">
        <div className="left ml-4">
          <h1 className="page-title">Event Management</h1>
          {props.isAdmin && 
            <Link className="btn btn-sm active" to="/event-add"><i className="fas fa-plus"></i> Add</Link>
          }
          {props.isAdmin && 
            <button className="btn btn-sm active" onClick={confirmDeleteItems}><i className="fas fa-trash"></i> Delete</button>
          }
        </div>
      </div>
      <div className="tab-content">
        <div className="tab-pane show active">
          <div className="card mb-0">
            <div className="card-header">
              <div className="header-action">
                <div className="small ml-1">
                  <a href="#!" className={searchType === '' ? "text-decoration-none" : "text-decoration-none text-secondary"} onClick={()=> setSearchType('')}>All ({eventData.length})</a> |&nbsp;
                  <a href="#!" className={searchType === 'isEnded' ? "text-decoration-none" : "text-decoration-none text-secondary"} onClick={()=> setSearchType('isEnded')}>Ended ({eventData.filter((x) => new Date(x.endDate).getTime() < new Date().getTime()).length})</a> |&nbsp;
                  <a href="#!" className={searchType === 'onGoing' ? "text-decoration-none" : "text-decoration-none text-secondary"} onClick={()=> setSearchType('onGoing')}>Ongoing ({eventData.filter((x) => new Date(x.endDate).getTime() >= new Date().getTime()).length})</a>
                </div>
              </div>
              <div className="card-options">
                <div className="input-group">
                  <input type="text" className="form-control form-control-sm" style={{width: '200px'}} placeholder="Enter keyword..." name="keyword" onChange={(e)=> setKeyword(e.target.value)}/>
                  <select className="custom-select" style={{width: '140px'}} name="searchType" onChange={(e) => setSearchType(e.target.value)}>
                    <option value="">Search by</option>
                    <option value="eventName">Event Name</option>
                    <option value="eventId">Event ID</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="card-header">
              <div className="header-action">
                <div className="input-group">
                  <select className="custom-select" name="sortType" onChange={sortFunction}>
                    <option value="">Sort by</option>
                    <option value="eventId">Event ID</option>
                    <option value="eventName">Name</option>
                    <option value="donationCounter">Total benefactors</option>
                    <option value="realDonation">Total donation</option>
                    <option value="percenDonation">% success</option>
                    <option value="endDate">End Date</option>
                  </select>
                  <select className="custom-select" name="pageSize" onChange={(e) => setPageSize(parseInt(e.target.value))}>
                    <option value={PageSize}>Show</option>
                    {showList === 0 && <option value="3">3 rows</option>}
                    {showList === 0 && <option value="5">5 rows</option>}
                    {showList === 0 && <option value="10">10 rows</option>}
                    {showList === 1 && <option value="3">3 items</option>}
                    {showList === 1 && <option value="6">6 items</option>}
                    {showList === 1 && <option value="12">12 items</option>}
                  </select>
                </div>
              </div>
              <div className="card-options">
                <div className="input-group">
                  <button className='btn p-0' onClick={() => toggleListOrGrid(0)}><i className="fas fa-list"></i></button>
                  <button className='btn px-3' onClick={() => toggleListOrGrid(1)}><i className="fas fa-th-large"></i></button>
                  <button className='btn p-0' onClick={() => toggleListOrGrid(2)}><i className="far fa-newspaper"></i></button>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="form-group">
                <Input type="hidden" className="form-control" valid={error === ''} invalid={error !== ''}/>
                <FormFeedback className="text-center">{error}</FormFeedback>
              </div>
              { display && showList === 0 &&
                <div className="pagination-wrapper">
                  <div className="table-responsive">
                    <table className="table table-striped table-hover table-vcenter mb-0">
                      <thead>
                        <tr>
                          <th>Event</th>
                          <th>Donation</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {dataWithPagination.map((eventData) => {
                          let daysLeft = Math.floor((new Date(eventData.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
                          return (
                            <tr className={checkedBoxes.filter((x) => x === eventData.eventId).length >0 ? 'bg-warning bg-gradient' : ''} key={eventData._id}>
                              <td style={{maxWidth: '500px'}}>
                                <h6 className="mb-0 d-inline-block text-truncate w-100 font-16"><span style={{lineHeight: '20px'}} className='tag tag-success rounded text-dark'>{eventData.eventId}</span> {eventData.eventName}</h6>
                                <div className="block-ellipsis" style={{fontSize: '13px'}}>{eventData.eventContent}</div>
                              </td>
                              <td style={{minWidth: '250px'}}>
                                <div className="clearfix">
                                  <div className="float-left">
                                    <h6 className="text-center font-12">
                                      <strong>{eventData.percenDonation}%</strong> | {eventData.donationCounter.toLocaleString()} &nbsp;donations</h6>
                                  </div>
                                  <div className="float-right">
                                    <span className={daysLeft > 0 ? 'tag tag-lime mb-1 font-8 text-dark' : 'tag tag-gray-success mb-1 font-8'}>{daysLeft > 0 ? `${daysLeft} days left` : 'Ended'}</span>
                                  </div>
                                </div>
                                <div className="progress progress-xs" style={{height: '0.5rem'}}>
                                  <div className={eventData.percenDonation >= 100 ? "progress-bar progress-bar-striped progress-bar-animated bg-orange" : "progress-bar progress-bar-striped progress-bar-animated bg-pink"} style={{width: `${eventData.percenDonation}%`, height: '100%'}}></div>
                                </div>
                                <div className="float-left">
                                  <span className="font-10">{eventData.realDonation.toLocaleString()}đ</span>
                                </div>
                                <div className="float-right">
                                  <small className="text-muted">{eventData.expectedDonation.toLocaleString()}đ</small>
                                </div>
                              </td>
                              {props.isAdmin ? 
                                <td style={{minWidth: '100px'}}>
                                  <Label className="custom-switch">
                                    <Input type="checkbox" className="custom-switch-input" value="1" checked={checkedBoxes.filter((x) => x === eventData.eventId).length >0 ? true : false} onChange={(e) => toggleCheckbox(e, eventData.eventId)}/>
                                    <span className="btn btn-icon" title="Select"><i className="far fa-check-square"></i></span>
                                  </Label>
                                  <Link to={`/event-add/${eventData.eventId}`}>
                                    <button className="btn btn-icon mt-n1" title="Edit"><i className="far fa-edit"></i></button>
                                  </Link>
                                </td> 
                              :
                                <td>
                                  <span className="tag tag-yellow rounded-pill text-center text-dark" style={{width: '100px'}} onClick={(e) => donationGuide(e, eventData.eventId, eventData.eventName, eventData.imageEventUrl)}>Donate Now</span>
                                </td>
                              }
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
              { display && showList === 1 &&
              <div className="pagination-wrapper">
                <div className="row">
                  {dataWithPagination.map((eventData) => { 
                    let daysLeft = Math.floor((new Date(eventData.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
                    return (
                      <div className="col-lg-4 col-md-12 p-3">
                        <div className={itemSelected.filter((x) => x === eventData.eventId).length >0 ? "border-2 border-warning card" : "card"}>
                          <div className="card-header">
                            <div className="card-title block-ellipsis"><strong>{eventData.eventName}</strong></div>
                          </div>
                          
                          <div className="card-body">
                            <div className="card-body text-center d-flex align-items-center justify-content-center">
                              <div className="mt-0" style={{maxWidth: "500px"}}>
                                <img src={eventData.imageEventUrl} alt="..." className="img-fluid mb-4" style={{maxWidth: "100%"}}/>
                                <div className='block-ellipsis'>
                                  <p className="text-muted">{eventData.eventContent}</p>
                                </div>
                                
                              </div>
                            </div>
                            <div className="card-header">
                            <div className="header-action">
                              <div className="input-group">
                                <span className="tag tag-yellow rounded-pill text-center text-dark" style={{width: '100px'}} onClick={(e) => donationGuide(e, eventData.eventId, eventData.eventName, eventData.imageEventUrl)}>Donate Now</span>
                              </div>
                            </div>
                            <div className="card-options">
                              <Label className="custom-switch m-0">
                                <Input type="checkbox" className="custom-switch-input" value="1" checked={cardCollapseList.filter((x) => x === eventData.eventId).length >0 ? true : false}  onChange={(e) => toggleCardCollapse(e, eventData.eventId)}/>
                                <span className="btn btn-icon" title="View"><i className={ cardCollapseList.filter((x) => x === eventData.eventId).length >0 ? "far fa-eye" : "far fa-eye-slash"}></i></span>
                              </Label>
                              {props.isAdmin && 
                                <Label className="custom-switch">
                                  <Input type="checkbox" className="custom-switch-input" value="1" checked={checkedBoxes.filter((x) => x === eventData.eventId).length >0 ? true : false} onChange={(e) => toggleCheckbox(e, eventData.eventId)}/>
                                  <span className="btn btn-icon" title="Select"><i className="far fa-check-square"></i></span>
                                </Label>}
                              {props.isAdmin &&
                                <Link to={`/event-add/${eventData.eventId}`}>
                                  <button className="btn btn-icon" title="Edit"><i className="far fa-edit"></i></button>
                                </Link>}
                            </div>
                          </div>
                            {cardCollapseList.filter((x) => x === eventData.eventId).length >0 ? 
                              <div className="row mt-3">
                                <div className="col-7 py-1">
                                  <strong><span className="tag tag-cyan mr-2">{eventData.eventId}</span></strong>
                                  <span className={daysLeft > 0 ? 'tag tag-lime mb-1 font-8 text-dark' : 'tag tag-gray-success mb-1 font-8'}>{daysLeft > 0 ? `${daysLeft} days left` : 'Ended'}</span>
                                </div>
                                <div className="col-5 py-1">
                                  <div className="avatar-list avatar-list-stacked">
                                    <img className="avatar avatar-sm" src="https://avatars.design/wp-content/uploads/2021/02/avatar6-1.jpg" data-toggle="tooltip" data-original-title="Avatar Name" alt="fake_url"/>
                                    <img className="avatar avatar-sm" src="https://avatars.design/wp-content/uploads/2021/02/avatar2-1.jpg" data-toggle="tooltip" data-original-title="Avatar Name" alt="fake_url"/>
                                    <img className="avatar avatar-sm" src="https://avatars.design/wp-content/uploads/2021/04/11-Julie.jpg" data-toggle="tooltip" data-original-title="Avatar Name" alt="fake_url"/>
                                    <img className="avatar avatar-sm" src="https://avatars.design/wp-content/uploads/2021/04/07-Derrick.jpg" data-toggle="tooltip" data-original-title="Avatar Name" alt="fake_url"/>
                                    <img className="avatar avatar-sm" src="https://avatars.design/wp-content/uploads/2021/04/06-David.jpg" data-toggle="tooltip" data-original-title="Avatar Name" alt="fake_url"/>
                                    <span className="avatar pt-1 bg-white" style={{width: '50px'}}>{eventData.donationCounter >5 ? '+'+ (eventData.donationCounter -5) : '+' + eventData.donationCounter}</span>
                                  </div>
                                </div>
                                <div className="col-7 py-1">Expected:</div>
                                <div className="col-5 py-1">{eventData.expectedDonation.toLocaleString()}đ</div>
                                <div className="col-7 py-1">Donation:</div>
                                <div className="col-5 py-1">{eventData.realDonation.toLocaleString()}đ</div>
                                {/* <div className="card-footer"> */}
                                  <div className="clearfix">
                                    <div className="float-left">
                                      <strong>{eventData.percenDonation}%</strong>
                                    </div>
                                    <div className="float-right">
                                      <small className="text-muted">% success</small>
                                    </div>
                                  </div>
                                  <div className="progress progress-xs px-0 mx-2" style={{height: '0.5rem', width: '22rem'}}>
                                    <div className={eventData.percenDonation >= 100 ? "progress-bar progress-bar-striped progress-bar-animated bg-orange" : "progress-bar progress-bar-striped progress-bar-animated bg-pink"} style={{width: `${eventData.percenDonation}%`, height: '100%'}}></div>
                                  </div>
                                {/* </div> */}
                              </div>
                            : ''}
                          </div>
                        </div>
                      </div>
                    )
                  })}
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
      <Modal isOpen={donation.isOpen}>
        <ModalHeader className="d-block text-white" style={{height: '50px', backgroundColor: 'rgb(232, 118, 159)'}}>
          <p className="float-left mx-2 mt-n2">Hướng dẫn quyên góp</p>
          <Link to="/event" className="text-decoration-none float-right mx-3 mt-n2" onClick={() => {setDonation({isOpen: false, eventId: '', eventname: '', imageEventUrl: ''}); setDonationData({amount: 0, message: ''})}}><i className="fa fa-times"></i></Link>
        </ModalHeader>
        <ModalBody>
          <div className="card">
            <div className="card-body text-center d-flex align-items-center justify-content-center">
              <div style={{maxWidth: '400px'}}>
                <img src={donation.imageEventUrl} alt="..." className="img-fluid mb-4 mt-4" style={{maxWidth: '100%'}}/>
                <h5 className="mb-2">Cảm ơn bạn đã thực hiện quyên góp cho đợt quyên góp "{donation.eventName}"</h5>
                <p className="text-muted">Bạn vui lòng chuyển khoản nhanh 24/7 theo hướng dẫn sau:</p>
                <ul className="text-start">
                  <li className="text-muted"> STK: 0123 xxxx xxxx</li>
                  <li className="text-muted"> Ngân hàng: ABCDE Bank</li>
                  <li className="text-muted"> Nội dung chuyển khoản: {donation.eventId}_số tiền quyên góp_số điện thoại liên hệ</li>
                </ul>
                <p className="text-muted">Sau khi đã chuyển khoản thành công, vui lòng điền form xác nhận bên dưới.</p>
                <h5 className="mb-2">Một lần nữa xin chân thành cảm ơn bạn!</h5>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Form onSubmit={handleDonation} className="col-12">
            <div className="col-12">
              <div className="form-group">
                <Label className="form-label">Số tiền quyên góp</Label>
                <Input type="number" className="form-control" name="amount" value={donationData.amount} onChange={handleInputChange}/>
              </div>
            </div>
            <div className="col-12">
              <div className="form-group">
                <Label className="form-label">Nội dung lời nhắn</Label>
                <Input type="textarea" className="form-control" name="message" placeholder="Enter your message..." rows={3} value={donationData.message} onChange={handleInputChange}/>
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <input type="submit" className="btn btn-primary mt-2" value="Xác nhận đã quyên góp"/>
              </div>
            </div>
          </Form>
        </ModalFooter>
      </Modal>
    </div>
  )
  
}
export default EventList
import React from "react";
import { useState, useEffect } from "react";
import {Link} from 'react-router-dom';
import dateFormat from 'dateformat';
import {Input, Form, FormFeedback, Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { baseUrl } from "../shared/baseUrl";

function Dashboard(props) {
    const [questionList, setQuestionList] = useState([
        {id: 1, question: 'Trái tim Momo là gì?', answer: 'Trái tim MoMo là tính năng gây quỹ từ thiện của MoMo. Các dự án được đăng tải trong Trái Tim MoMo đều là những dự án đã được lựa chọn cẩn trọng bởi đội ngũ MoMo, và được bảo trợ bởi các tổ chức uy tín.'},
        {id: 2, question: 'MoMo có thu lợi nhuận từ việc gây quỹ không?', answer: 'MoMo hoàn toàn không thu lợi nhuận từ việc gây quỹ. Ngoại trừ phí chuyển khoản ngân hàng, 100% số tiền của người dùng được chuyển tới cho các tổ chức bảo trợ.'},
        {id: 3, question: 'Sau bao lâu từ khi quyên góp, tiền sẽ được chuyển đến tay hoàn cảnh?', answer: 'Trong vòng 1 tuấn kể từ khi dự án quyên góp thành công, tiền sẽ được chuyển tới đối tác. Trong những trường hợp khẩn cấp, chúng tôi có thể chuyển sớm hơn.'},
        {id: 4, question: 'Ai có thể gây quỹ trên Trái Tim MoMo?', answer: 'Để có thể gây quỹ trên MoMo, hoàn cảnh cần được bảo trợ bởi một tổ chức có pháp nhân là Quỹ, tổ chức phi chính phủ, Doanh nghiệp xã hội hoặc một cơ quan nhà nước có chức năng tiếp nhận tài trợ.'},
        {id: 5, question: 'Nếu hoàn cảnh gây quỹ không thành công thì sao?', answer: 'MoMo vẫn sẽ chuyển số tiền tương ứng với số Heo Vàng đã quyên góp. Trong một số trường hợp, chúng tôi sẽ kéo dài thêm thời gian gây quỹ'},
        {id: 6, question: 'Làm thế nào để liên hệ và gửi hoàn cảnh tới MoMo?', answer: 'Tổ chức đủ điều kiện vui lòng gửi email thông tin của tổ chức tới địa chỉ donation@mservice.com.vn để được nhận hướng dẫn.'},
    ]);
    const [userRequest, setUserRequest] = useState({request: '', requestDate: ''});
    const [donationHistoryData, setDonationHistoryData] = useState([]);
    const [cardCollapseList, setCardCollapseList] = useState([]);
    const [display, setDisplay] = useState(true);
    const [userReport, setUserReport] = useState({totalUser: 0, user: 0, admin: 0, male: 0, online: 0})
    const [eventReport, setEventReport] = useState({totalEvent: 0, ongoing: 0, ended: 0, totalDonation: 0, totalBenefactors: 0})
    const [error, setError] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [messageResponse, setMessageResponse] = useState({errorMessage: '', message: ''});
    
    useEffect(() => {
        fetch(baseUrl + `donation`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error ' + response.status + ': ' + response.statusText);
            }
            return response.json();
        })
        .then((data) => {
            setDonationHistoryData(data.donations.slice(-5).reverse());
        })
        .catch((err) => {
            setError('There are some errors when loading database. Please try again!');
            setDisplay(false);
        });
        fetch(baseUrl + 'event')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error ' + response.status + ': ' + response.statusText);
            }
            return response.json();
        })
        .then((data) => {
            let ongoing = 0, totalDonation = 0, totalBenefactors = 0;
            for (let item of data.events) {
                if (new Date(item.endDate).getTime() >= new Date().getTime()) {ongoing += 1}
                totalDonation += item.realDonation;
                totalBenefactors += item.donationCounter;
            }
            setEventReport({totalEvent: data.events.length, ongoing: ongoing, ended: data.events.length - ongoing, totalDonation: totalDonation, totalBenefactors: totalBenefactors})
        })
        .catch((err) => {
            setError('There are some errors when loading database. Please try again!');
            setDisplay(false);
        })
    }, []);
    const toggleCardCollapse = (id) => {
        if(cardCollapseList.filter(x => x === id).length === 0) {
          setCardCollapseList(cardCollapseList => [...cardCollapseList, id]);
        } else {			
          setCardCollapseList(cardCollapseList.filter(x => x !== id));
        }
    }
    const handleInputChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        if (name === 'request') {
            setUserRequest({request: value, requestDate: new Date().toISOString()});
        }
    }
    const handleRequest = (e) => {
        const feedbackData = {username: props.username, request: userRequest.request, requestDate: userRequest.requestDate}
        e.preventDefault();
        fetch(baseUrl + 'feedback/request', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({"feedbackData": feedbackData})
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
            <div className="section-body" style={{height: '100%', backgroundColor: 'rgb(253, 242, 248)'}}>
                <div className="container-fluid">
                    <div className="row clearfix">
                        <div className="col-lg-12 mt-3">
                            <div className="mb-4 ">
                                <h4><strong>Welcome {props.username}!</strong></h4>
                                <small>Have a nice day!</small>
                            </div>
                        </div>
                    </div>
                    <div className="row clearfix">
                        {props.isAdmin && <div className="col-4 col-md-3 col-lg-2">
                            <div className="card" style={{height: '80px'}}>
                                <div className="card-body">
                                    <Link className="my_sort_cut text-decoration-none text-muted small mt-n3" to="user"><i className="fas fa-users text-blue"></i><span>Users</span></Link>
                                </div>
                            </div>
                        </div>}
                        <div className="col-4 col-md-3 col-lg-2">
                            <div className="card" style={{height: '80px'}}>
                                <div className="card-body">
                                    <Link className="my_sort_cut text-decoration-none text-muted small mt-n3" to="event"><i className="fas fa-heartbeat text-pink"></i><span>Events</span></Link>
                                </div>
                            </div>
                        </div>
                        {props.isAdmin && <div className="col-4 col-md-3 col-lg-2">
                            <div className="card" style={{height: '80px'}}>
                                <div className="card-body ribbon">
                                    <div className="ribbon-box cyan">2+</div>
                                    <Link className="my_sort_cut text-decoration-none text-muted small mt-n3" to="donation"><i className="far fa-gem text-warning"></i><span>Donations</span></Link>
                                </div>
                            </div>
                        </div>}
                        <div className="col-4 col-md-3 col-lg-2">
                            <div className="card" style={{height: '80px'}}>
                                <div className="card-body ribbon">
                                    <div className="ribbon-box cyan">8+</div>
                                    <Link className="my_sort_cut text-decoration-none text-muted small mt-n3" to="contact"><i className="fas fa-comments text-lime"></i><span>Messages</span></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-4 col-md-3 col-lg-2">
                            <div className="card" style={{height: '80px'}}>
                                <div className="card-body">
                                    <Link className="my_sort_cut text-decoration-none text-muted small mt-n3" to="profile"><i className="far fa-user text-blue"></i><span>Profile</span></Link>
                                </div>
                            </div>
                        </div>
                        {props.isAdmin && <div className="col-4 col-md-3 col-lg-2">
                            <div className="card" style={{height: '80px'}}>
                                <div className="card-body">
                                    <Link className="my_sort_cut text-decoration-none text-muted small mt-n3" to="history"><i className="fas fa-hand-holding-heart text-pink"></i><span>History</span></Link>
                                </div>
                            </div>
                        </div>}
                    </div>
                    
                </div>
            </div>
            <div className="section-body" style={{height: '400px', backgroundColor: 'rgb(253, 242, 248)'}}>
                <div className="container-fluid h-100">
                    <div className="row clearfix h-100">
                        <div className="col-12 col-md-6">
                            <h4 className="text-pink text-center mt-4"><strong>Nền tảng quyên góp từ thiện Trái tim MoMo</strong></h4>
                            <p className="text-center mt-4">Trái Tim MoMo là nền tảng giúp bạn dễ dàng chung tay quyên góp tiền cùng hàng triệu người, giúp đỡ các hoàn cảnh khó khăn trên khắp cả nước.</p>
                            <div className="row clearfix ml-3">
                                <div className="col-4 border-left border-4 border-danger"><strong>{eventReport.totalEvent}+</strong></div>
                                <div className="col-4 border-left border-4 border-danger"><strong>{Math.ceil(eventReport.totalDonation/1000000)}+ triệu</strong></div>
                                <div className="col-4 border-left border-4 border-danger"><strong>{Math.ceil(eventReport.totalBenefactors/1000)}+ ngàn</strong></div>
                            </div>
                            <div className="row clearfix ml-3">
                                <div className="col-4 small">dự án đã được gây quỹ thành công</div>
                                <div className="col-4 small">đồng được quyên góp</div>
                                <div className="col-4 small">lượt quyên góp</div>
                            </div>
                            <button className='btn bg-lime mt-3 ml-3'><Link to="/event" className="text-decoration-none text-white small"><strong>Quyên góp</strong></Link></button>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="backgroundImage"></div>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div className="section-body bg-white">
                <div className="container-fluid">            
                    <div className="row clearfix">
                        <div className="tab-content mt-3">
                            <div className="tab-pane show active">
                                <div className="card border-0">
                                    <div className="card-body">
                                        {questionList.map(question => {
                                            return (
                                                <div className="card m-0 border-0 border-bottom d-block clearfix">
                                                    <div className="my-3 ml-3 float-start">
                                                        <strong>{question.question}</strong>
                                                    </div>
                                                    <div className="float-end mt-2">
                                                        <div onClick={() => toggleCardCollapse(question.id)}>
                                                            <span >{cardCollapseList.filter((x) => x === question.id).length >0 ? <i className="fas fa-chevron-up"></i> : <i className="fas fa-chevron-down"></i>}</span>
                                                        </div>
                                                    </div>
                                                    <div className="my-1 ml-3 float-start">
                                                        {cardCollapseList.filter((x) => x === question.id).length >0 ? 
                                                            <p className="mt-2 mr-5 text-start">{question.answer}</p>
                                                        : ''}
                                                    </div>
                                                </div>
                                            )
                                        })}
                                        <Form className="mt-3" onSubmit={handleRequest}>
                                            <div className="input-group">
                                                <Input type="text" className="form-control form-control-sm" placeholder="Send your question..." name="request" onChange={handleInputChange}/>
                                                <span className="input-group-btn ml-2">
                                                    <Button className="btn btn-sm btn-default" type="submit"><span className="fas fa-send">
                                                    </span></Button>
                                                </span>
                                            </div>
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="section-body" style={{height: '100%', backgroundColor: 'rgb(253, 242, 248)'}}>
                <div className="container-fluid">            
                    <div className="row clearfix">
                        <div className="tab-content mt-3">
                            <div className="tab-pane show active" id="user-list" role="tabpanel">
                                <div className="card  border-0">
                                    <div className="card-header" style={{backgroundColor: 'rgb(253, 242, 248)'}}>    
                                        <h3 className="card-title"><strong>Latest Donation</strong></h3>
                                    </div>
                                    <div className="card-body">
                                        <div className="form-group">
                                            <Input type="hidden" className="form-control" valid={error === ''} invalid={error !== ''}/>
                                            <FormFeedback className="text-center">{error}</FormFeedback>
                                        </div>
                                        { display &&
                                            <div className="table-responsive">
                                                <table className="table table-hover table-striped text-nowrap table-vcenter mb-0">
                                                    <thead>
                                                        <tr>
                                                            <th className="text-center"></th>
                                                            <th>User</th>
                                                            <th>Event</th>
                                                            <th>Amount</th>
                                                            <th>Message</th>
                                                            <th>Date</th>
                                                            <th>Status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    {donationHistoryData.map((historyData) => {
                                                        return (
                                                            <tr key={historyData._id}>
                                                                <td style={{minWidth: '50px'}}>
                                                                    <img src={historyData.imageUserUrl} alt="Avatar" className="avatar"/>
                                                                </td>
                                                                <td style={{maxWidth: '150px'}}>
                                                                    <h6 className="mb-0">{historyData.fullname} </h6>
                                                                    <small><em>{historyData.username}</em></small>
                                                                </td>
                                                                <td style={{maxWidth: '350px'}}>
                                                                    <h6 className="mb-0 text-truncate">{historyData.eventName} </h6>
                                                                    <small><em>{historyData.eventId}</em></small>
                                                                </td>
                                                                <td>{historyData.amount.toLocaleString()}đ</td>
                                                                <td>{historyData.message}</td>
                                                                <td>{dateFormat(historyData.donationDate,"dd/mm/yyyy")}</td>
                                                                <td>
                                                                    <span className={historyData.donationStatus === 'successful' ? 'tag tag-success' : historyData.donationStatus === 'failed' ? 'tag tag-indigo' : 'tag tag-yellow'}>{historyData.donationStatus}</span>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}
                                                    </tbody>
                                                </table>
                                            </div>
                                        }
                                    </div>
                                </div>
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
}
export default Dashboard

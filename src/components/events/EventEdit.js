import React from 'react';
import { useState, useEffect } from "react";
import {Link, useParams} from 'react-router-dom';
import { Form, Label, Input, FormFeedback, Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { baseUrl } from '../../shared/baseUrl';

function EventEdit(props) {
    const params = useParams();
    const [eventData, setEventData] = useState({
        eventId: '',
        eventName: '',
        imageEventUrl: '',
        eventContent: '',
        expectedDonation: 1000,
        endDate: new Date().toISOString()
    });
    const [valueErrors, setValueError] = useState({
        eventName: '',
        imageEventUrl: '',
        eventContent: '',
        expectedDonation: ''
    });
    const [error, setError] = useState(null);
    const [display, setDisplay] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [messageResponse, setMessageResponse] = useState({errorMessage: '', message: ''});

    useEffect(() => {
        fetch(baseUrl + `event/edit/${params.eventId}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error ' + response.status + ': ' + response.statusText);
            }
            return response.json();
          })
        .then((data) => {
            setEventData({
                eventId: data.event.eventId,
                eventName: data.event.eventName,
                imageEventUrl: data.event.imageEventUrl,
                eventContent: data.event.eventContent,
                expectedDonation: data.event.expectedDonation,
                endDate: new Date(data.event.endDate).toISOString()
            });
        })
        .catch((err) => {
            setError('There are some errors when loading database. Please try again!');
            setDisplay(false);
        })
    }, [params.eventId]);
    
    const handleInputChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        setEventData(eventData => ({ ...eventData, [name]: value}));

        const urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
        
        switch (true) {
            case ( name === 'eventName' && value.length >= 3):
                setValueError({...valueErrors, eventName: ''})
                break;
            case (name === 'eventName' && value.length < 3):
                setValueError({...valueErrors, eventName: 'Tên đợt quyên góp chứa tối thiểu 3 kí tự'})
                break;
            case ( name === 'imageEventUrl' && urlRegex.test(value) === true):
                setValueError({...valueErrors, imageEventUrl: ''})
                break;
            case (name === 'imageEventUrl' && urlRegex.test(value) === false):
                setValueError({...valueErrors, imageEventUrl: 'Hình ảnh quyên góp phải là link URL'})
                break;
            case ( name === 'eventContent' && value.length >= 3):
                setValueError({...valueErrors, eventContent: ''})
                break;
            case (name === 'eventContent' && value.length < 3):
                setValueError({...valueErrors, eventContent: 'Nội dung chứa tối thiểu 3 kí tự'})
                break;
            case ( name === 'expectedDonation' && value > 1000):
                setValueError({...valueErrors, expectedDonation: ''})
                break;
            case (name === 'expectedDonation' && value <= 1000):
                setValueError({...valueErrors, expectedDonation: 'Số tiền dự kiến phải lớn hơn 1000'})
                break;
            default:
        }
    }
    const resetEvent = (e) => {
        const resetEventData = {
            eventId: '',
            eventName: '',
            imageEventUrl: '',
            eventContent: '',
            expectedDonation: 1000,
            endDate: new Date().toISOString(),}
        setEventData(resetEventData);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(baseUrl + 'event/edit', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({"eventData": eventData})
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
                            <h1 className="page-title">Event Management</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="section-body">
                <div className="container-fluid">
                    <div className="d-flex justify-content-between align-items-center">
                        <ul className="nav nav-tabs page-header-tab">
                            <li className="nav-item"><a className="nav-link active" href="#!" style={{backgroundColor: '#F1F1F1', borderColor: '#F1F1F1 #F1F1F1 #fff'}} onClick={() => {setDisplay(true); setError('')}}>Change Info</a></li>
                        </ul>
                        <div className="header-action">
                            <Link className="btn btn-sm active" to="/event-add"><i className="fa fa-plus"></i> Add new</Link>
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
                                                <div className="col-sm-12 col-md-8">
                                                    <div className="row clearfix">
                                                        <div className="col-12 col-md-6">
                                                            <div className="form-group">
                                                                <Label className="form-label">Event ID</Label>
                                                                <Input type="text" className="form-control" name="eventId" 
                                                                readonly='readonly' value={eventData.eventId} />
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-md-6">
                                                            <div className="form-group">
                                                                <Label className="form-label">Event Image</Label>
                                                                <Input type="url" className="form-control" name="imageEventUrl" placeholder="Paste URL address of event image..."
                                                                    value={eventData.imageEventUrl} 
                                                                    valid={valueErrors.imageEventUrl === ''} 
                                                                    invalid={valueErrors.imageEventUrl !== ''} 
                                                                    onChange={handleInputChange} />
                                                                <FormFeedback>{valueErrors.imageEventUrl}</FormFeedback>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="form-group">
                                                                <Label className="form-label">Expected Donation</Label>
                                                                <Input type="number" className="form-control" name="expectedDonation"     
                                                                    value={eventData.expectedDonation} 
                                                                    valid={valueErrors.expectedDonation === ''} 
                                                                    invalid={valueErrors.expectedDonation !== ''} 
                                                                    onChange={handleInputChange} />
                                                                <FormFeedback>{valueErrors.expectedDonation}</FormFeedback>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="form-group">
                                                                <Label className="form-label">End date</Label>
                                                                <Input type="date" className="form-control" name="endDate"
                                                                    value={eventData.endDate.substring(0,10)} 
                                                                    onChange={handleInputChange} />
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="form-group">
                                                                <Label className="form-label">Event Name</Label>
                                                                <Input type="textarea" className="form-control" name="eventName" placeholder="Enter name of event..." rows={3}
                                                                    value={eventData.eventName} 
                                                                    valid={valueErrors.eventName === ''} 
                                                                    invalid={valueErrors.eventName !== ''} 
                                                                    onChange={handleInputChange} />
                                                                <FormFeedback>{valueErrors.eventName}</FormFeedback>
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="form-group">
                                                                <Label className="form-label">Event Content</Label>
                                                                <Input type="textarea" className="form-control" name="eventContent" placeholder="Enter summary of event content..." rows={10}
                                                                    value={eventData.eventContent} 
                                                                    valid={valueErrors.eventContent === ''} 
                                                                    invalid={valueErrors.eventContent !== ''} 
                                                                    onChange={handleInputChange} />
                                                                <FormFeedback>{valueErrors.eventContent}</FormFeedback>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-12 col-md-4">
                                                    <div className="row clearfix">
                                                        <div className="col-8 col-md-12">
                                                            <Label className="form-label">Preview</Label>
                                                            <div class="card" style={{height: '250px'}}>
                                                                {eventData.imageEventUrl && 
                                                                <img className="card-img-top w-100 h-100" src={eventData.imageEventUrl} alt="avatar"/>
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="col-4 col-md-12">
                                                            <div className="form-group">
                                                                <Label className="form-label">&nbsp;</Label>
                                                                <input disabled={ eventData.eventName !== '' && valueErrors.eventName === '' && eventData.imageEventUrl !== '' && valueErrors.imageEventUrl === '' && eventData.eventContent !== '' && valueErrors.eventContent === '' && eventData.expectedDonation >= 1000 && valueErrors.expectedDonation === '' ? false : true} className="btn btn-outline-primary w-100" type="submit" value="Update"/>
                                                            </div>
                                                            <div className="form-group">
                                                                <button type="button" className="btn btn-outline-danger w-100" onClick={resetEvent}>Reset</button>
                                                            </div>
                                                            <div className="form-group">
                                                                <Link type="button" className="btn btn-outline-secondary w-100" to="/event">Close</Link>
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
                    <Button color="secondary" className="float-right mt-5 mx-2">
                        {messageResponse.message !== '' && <Link to="/event" className="text-white text-decoration-none" onClick={() => {setModalOpen(false); setMessageResponse({errorMessage: '', message: ''})}}>Close</Link>}
                        {messageResponse.errorMessage !== '' && <div  className="text-white " onClick={() => {setModalOpen(false); setMessageResponse({errorMessage: '', message: ''})}}>Close</div>}
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default EventEdit;
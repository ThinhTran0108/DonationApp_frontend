import React from "react";
import {Link} from 'react-router-dom';
import { useParams } from 'react-router-dom';

function DonationAdd(props) {
    let {eventId} = useParams() || null;
    let donationData;
    if (eventId) {
        donationData = props.donationData.filter((data) => data.eventId === eventId)[0];
    } else {
        donationData =  {
            "_id": "",
            "imageEventUrl": "",
            "eventId": "",
            "eventName": "",
            "eventContent": "",
            "expectedDonation": "",
            "realDonation": "",
            "percenDonation": "",
            "donationCounter": "",
            "endDate": "",
            "isEnded": ""
          };
    }
    return(
        <div>
            <div className="page-header">
                <div className="left">
                <h1 className="page-title">Các hoàn cảnh quyên góp</h1>
                <select className="custom-select">
                    <option>Đang diễn ra</option>
                    <option>Đã kết thúc</option>
                </select>
                <div className="input-group xs-hide">
                    <input type="text" className="form-control" placeholder="Search..."/>
                </div>
                </div>
            </div>
            <div className="tab-content mt-3">
                <div className="tab-pane show active" id="user-add" role="tabpanel">
                    <div className="card">
                        {/* Header user list */}
                        <div className="card-header">
                            <div className="header-action">
                                <Link className="btn btn-outline-secondary active" id="user-tab" data-toggle="tab" to="/donation-add">Add New</Link>
                            </div>
                            <div className="card-options">
                                <form>
                                <div className="input-group">
                                    <input type="text" className="form-control form-control-sm" placeholder="Search something..." name="s"/>
                                    <span className="input-group-btn ml-2">
                                    <button className="btn btn-sm btn-default" type="submit"><span className="fa fa-search"></span></button>
                                    </span>
                                </div>
                                </form>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="row clearfix">
                                <div className="col-sm-12 col-md-4">
                                    <div className="form-group">
                                        <input type="text" className="form-control" name="eventId" value={donationData.eventId} placeholder="Event ID *"/>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-4">
                                    <div className="form-group">
                                        <input type="text" className="form-control" name="eventName" value={donationData.eventName} placeholder="eventName *"/>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-4">
                                    <div className="form-group">
                                        <input type="text" className="form-control" name="imageEventUrl" value={donationData.imageEventUrl} placeholder="Image URL"/>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group">
                                        <textarea type="text" className="form-control" name="eventContent" value={donationData.eventContent} placeholder="Content summary of event" rows={5}/>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-4">
                                    <div className="form-group">
                                        <input type="text" className="form-control" name="expectedDonation" value={donationData.expectedDonation} placeholder="Expected amount of donation *"/>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-4">
                                    <div className="form-group">
                                        <input type="text" className="form-control" name="endDate" value={donationData.endDate} placeholder="End date *"/>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <button type="button" className="btn btn-primary col-6">Add</button>
                                    <Link type="button" className="btn btn-secondary col-6" data-dismiss="modal" to="/donation">CLOSE</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default DonationAdd
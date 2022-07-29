import React, {Component} from "react";
import {Link} from 'react-router-dom';

const RenderTableEvent = ({donationData}) => {
  return(
    <tr>
      <td className="text-center" style={{minWidth: '60px'}}>
        <img src="../assets/images/image1.jpg" data-toggle="tooltip" data-placement="top" alt="Avatar" className="avatar" data-original-title="Avatar Name"/>
      </td>
      <td style={{minWidth: '200px'}}>
        <h6 className="mb-0 d-inline-block text-truncate w350">{donationData.eventName}</h6>
        <span className="d-inline-block w350">{donationData.eventId}</span>
        <hr className="my-1 w350"/>
        <span className="d-inline-block text-truncate w350">{donationData.eventContent}</span>
      </td>
      <td className="text-center">{donationData.donationCounter.toLocaleString()}</td>
      <td className="text-end">{donationData.realDonation.toLocaleString()}đ</td>
      <td className="text-end">{donationData.expectedDonation.toLocaleString()}đ</td>
      <td className="text-center"><span className="tag tag-info">{donationData.percenDonation}%</span></td>
      <td className="text-center">{donationData.endDate}</td>
      <td>
        <Link to={`/donation-add/${donationData.eventId}`}>
          <button className="btn btn-icon" title="Edit"><i className="fa fa-edit"></i></button>
        </Link>
        <button type="button" className="btn btn-icon js-sweetalert" title="Delete" data-type="confirm"><i className="fa fa-trash-o text-danger"></i></button>
      </td>
    </tr>
  )
}
const RenderThumbnailEvent = ({donationData}) => {
  return(
    <div className="col-12 col-md-6 col-lg-4 my-2 px-3">
      <div className="card">
      <img src="../assets/images/image1.jpg" className="card-img-top" alt="fake_url"/>
      <div className="card-body">
        <h5 className="mb-4 text-truncate">{donationData.eventName}</h5>
        <div className="row mb-4">
          <div className="col-5"><strong>Event ID:</strong></div>
          <div className="col-7">{donationData.eventId}</div>

          <div className="col-5"><strong>Content:</strong></div>
          <div className="col-7 d-inline-block text-truncate">{donationData.eventContent}</div>
        </div>
        <div className="row">
          <div className="col-5"><strong>Count:</strong></div>
          <div className="col-7">{donationData.donationCounter.toLocaleString()}</div>
          
          <div className="col-5"><strong>Real:</strong></div>
          <div className="col-7">{donationData.realDonation.toLocaleString()}đ</div>
          
          <div className="col-5"><strong>Expected:</strong></div>
          <div className="col-7">{donationData.expectedDonation.toLocaleString()}đ</div>
          
          <div className="col-5"><strong>End date:</strong></div>
          <div className="col-7">{donationData.endDate}</div>
        </div>
        <hr/>
        <div className="row align-items-center mb-4">
          <div className="col-5">
            <strong>Donate</strong>
          </div>
          <div className="col-7">
            <select className="custom-select custom-select-sm">
              <option value="true">Public</option>
              <option value="true">Private</option>
              <option value="true">Friends</option>
            </select>
          </div>
        </div>
        <div className="row align-items-center mb-4">
          <div className="col-5">
            <strong>Action</strong>
          </div>
          <div className="col-7">
          <Link to={`/donation-add/${donationData.eventId}`}>
            <button className="btn btn-icon" title="Edit"><i className="fa fa-edit"></i></button>
          </Link>
          
          <button type="button" className="btn btn-icon js-sweetalert" title="Delete" data-type="confirm"><i className="fa fa-trash-o text-danger"></i></button>
          </div>
        </div>
        <div className="row align-items-center">
          <div className="col-5">
            <strong>Collaborators</strong>
          </div>
          <div className="col-7">
            <ul className="list-inline avatar-list">
              <li className="avatar-list-item inlineblock">
                <img className="avatar avatar-sm" src="../assets/images/image1.jpg" alt="avatar"/>
              </li>
              <li className="avatar-list-item inlineblock">
                <img className="avatar avatar-sm" src="../assets/images/image1.jpg" alt="avatar"/>
              </li>
              <li className="avatar-list-item inlineblock">
                <img className="avatar avatar-sm" src="../assets/images/image1.jpg" alt="avatar"/>
              </li>
              <li className="avatar-list-item inlineblock">
                <img className="avatar avatar-sm" src="../assets/images/image1.jpg" alt="avatar"/>
              </li>
              <li className="avatar-list-item inlineblock">
                <img className="avatar avatar-sm" src="../assets/images/image1.jpg" alt="avatar"/>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    </div>
    
  )
}


class Donation extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    const displayTableEvent = this.props.donationData.map((x) => {
      return (<RenderTableEvent donationData = {x}/>)
    });
    const displayThumbnailEvent = this.props.donationData.map((x) => {
      return (<RenderThumbnailEvent donationData = {x}/>)
    });
    return(
      <div>
        <div className="page-header">
          <div className="left">
            <h1 className="page-title">Users</h1>
            <select className="custom-select">
              <option>Year</option><option>Month</option>
              <option>Week</option>
            </select>
            <div className="input-group xs-hide">
                <input type="text" className="form-control" placeholder="Search..."/>
            </div>
          </div>
        </div>
        <div className="tab-content mt-3">
          <div className="tab-pane show active" id="user-list" role="tabpanel">
            <div className="card">
              {/* Header donation list */}
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
                {/* Table donation list */}
                <div className="table-responsive">
                  <table className="table table-striped table-hover table-vcenter mb-0">
                    <thead>
                      <tr>
                        <th className="text-center">#</th>
                        <th className="">Name</th>
                        {/* <th className="w-25">Content</th> */}
                        <th className="text-center">Count</th>
                        <th className="text-end">Real</th>
                        <th className="text-end">Expected</th>
                        <th className="text-center">Percen</th>
                        <th className="text-center">End Date</th>
                        <th className="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {displayTableEvent}
                    </tbody>
                  </table>
                </div>
                {/* Thumbnail donation list */}
                <div className="row clearfix">
                  {displayThumbnailEvent}
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Donation
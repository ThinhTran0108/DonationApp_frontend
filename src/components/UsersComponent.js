import React, {Component} from "react";
import {Link} from 'react-router-dom';

const RenderUser = ({userData}) => {
  return(
    <tr>
      <td><img src="../assets/images/xs/avatar1.jpg" data-toggle="tooltip" data-placement="top" alt="Avatar" className="avatar" data-original-title="Avatar Name"/></td>
      <td><h6 className="mb-0">{userData.fullname} <small>({userData.username})</small></h6><span>{userData.email}</span></td>
      <td>{userData.gender}</td>
      <td>{userData.mobile}</td>
      <td>{userData.address}</td>
      <td>28 Jun, 2015</td>
      <td><span className="tag tag-info">{userData.isAdmin ? "Admin" : "User"}</span></td>
      <td>
      <Link to={`/user-add/${userData._id}`}>
        <button className="btn btn-icon" title="Edit"><i className="fa fa-edit"></i></button>
      </Link>
        <button type="button" className="btn btn-icon js-sweetalert" title="Delete" data-type="confirm"><i className="fa fa-trash-o text-danger"></i></button>
      </td>
    </tr>
  )
}
class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    const displayUser = this.props.userData.map((x) => {
      return (<RenderUser userData = {x}/>)
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
              {/* Header user list */}
              <div className="card-header">
                <div className="header-action">
                  <Link className="btn btn-outline-secondary active" id="user-tab" data-toggle="tab" to="/user-add">Add New</Link>
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
              {/* Table user list */}
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-striped table-hover table-vcenter text-nowrap mb-0">
                    <thead>
                      <tr>
                        <th className="w60">Name</th>
                        <th></th>
                        <th>Gender</th>
                        <th>Mobile</th>
                        <th>Address</th>
                        <th>Created Date</th>
                        <th>Role</th>
                        <th className="w100">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {displayUser}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Users
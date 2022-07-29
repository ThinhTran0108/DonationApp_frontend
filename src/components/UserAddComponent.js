import React from "react";
import {Link} from 'react-router-dom';
import { useParams } from 'react-router-dom';

function UserAdd(props) {
    let {userId} = useParams() || null;
    let userData;
    if (userId) {
        userData = props.userData.filter((data) => data._id === userId)[0];
    } else {
        userData =  {
            "_id": "",
            "username": "",
            "password": "",
            "fullname": "",
            "email": "",
            "gender": "",
            "mobile": "",
            "address": "",
            "imageUserUrl": "",
            "isAdmin": ""
          };
    }
    
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
                <div className="tab-pane show active" id="user-add" role="tabpanel">
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
                        <div className="card-body">
                            <div className="row clearfix">
                                <div className="col-sm-12 col-md-4">
                                    <div className="form-group">
                                        <input type="text" className="form-control" name="username" value={userData.username} placeholder="Username *"/>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-4">
                                    <div className="form-group">
                                        <input type="text" className="form-control" name="password" value={userData.password} placeholder="Password *"/>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-4">
                                    <div className="form-group">
                                        <input type="text" className="form-control" value={userData.password} placeholder="Confirm Password *"/>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-4">
                                    <div className="form-group">
                                        <input type="text" className="form-control" name="fullname" value={userData.fullname} placeholder="Full Name"/>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-4">
                                    <div className="form-group">
                                        <select className="form-control show-tick" name="gender" value={userData.gender}>
                                            <option selected>Select Gender</option>
                                            <option value="Nam">Male</option>
                                            <option value="Nữ">Female</option>
                                            <option value="Khác">Other</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-4">
                                    <div className="form-group">
                                        <input type="text" className="form-control" name="imageUserUrl" value={userData.imageUserUrl} placeholder="Image URL"/>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-4">
                                    <div className="form-group">
                                        <input type="text" className="form-control" name="email" value={userData.email} placeholder="Email *"/>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-4">
                                    <div className="form-group">
                                        <input type="text" className="form-control" name="address" value={userData.address} placeholder="Address"/>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-4">
                                    <div className="form-group">
                                        <input type="text" className="form-control" name="mobile" value={userData.mobile} placeholder="Mobile No"/>
                                    </div>
                                </div>
                                
                                <div className="col-sm-12 col-md-4">
                                    <div className="form-group">
                                        <select className="form-control show-tick" name="isAdmin" value={userData.isAdmin}>
                                            <option selected>Select Role Type</option>
                                            <option value="true">Admin</option>
                                            <option value="false">User</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <button type="button" className="btn btn-primary col-6">Add</button>
                                    <Link type="button" className="btn btn-secondary col-6" data-dismiss="modal" to="/users">CLOSE</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
    
}
export default UserAdd
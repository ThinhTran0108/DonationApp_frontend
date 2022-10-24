import React, {useState} from 'react';
import Dashboard from './Dashboard';
import Footer from './Footer';
import Message from './Message';
import EventList from './events/EventList';
import EventAdd from './events/EventAdd';
import EventEdit from './events/EventEdit';
import UserList from './users/UserList';
import UserAdd from './users/UserAdd';
import UserEdit from './users/UserEdit';
import UserDonationHistory from './users/UserDonationHistory';
import DonationConfirmation from './DonationConfirmation';

import Profile from './account/Profile';
import DonationHistory from './account/DonationHistory';

import {Routes, Route, Link, Navigate} from 'react-router-dom';

function Main (props) {
  const [hideNav, setHideNav] = useState(true);
  
  const handleLogout = e => {
    e.preventDefault();
    return props.setUser({username: '', isAdmin: ''})
  }

  // Log in with ADMIN account
  if (props.isAdmin) {
    return (
      <div className="font-montserrat">
        <div id="main_content">
          <div id="toggleNav" className={hideNav ? "offcanvas-active" : ''}>
            <div id="header_top" className="header_top false">
              <div className="container">
                  <div className="hleft">
                      <div className="dropdown">
                          <p className="nav-link icon menu_toggle" onClick={() => setHideNav(!hideNav)}><i className="fa fa-align-left"></i></p>
                      </div>
                  </div>
                  <div className="hright">
                    <p className="nav-link icon"><Link className="list-a text-decoration-none text-success" to="dashboard"><i className="fas fa-home fa-fw"></i></Link></p>
                    <p className="nav-link icon mt-1"><Link className="list-a text-decoration-none text-gray" to="signout" onClick={handleLogout}><i className="fas fa-sign-out-alt fa-fw"></i></Link></p>
                  </div>
              </div>
            </div>
            <div id="left-sidebar" className="sidebar ml-n2">
              <h5 className="brand-name">Go to</h5>
              <nav id="left-sidebar-nav" className="sidebar-nav">
                <div>
                  <ul className="metismenu">
                    <li>
                      <div className="small"><i className="fa fa-users"></i>User Management</div>
                      <ul className="list-unstyled">
                        <li>
                          <Link className="list-a text-decoration-none" to="user" onClick={() => setHideNav(!hideNav)}><i className="fa fa-database"></i>Users</Link>
                        </li>
                        <li>
                          <Link className="list-a text-decoration-none" to="user-add" onClick={() => setHideNav(!hideNav)}><i className="fa fa-plus"></i>Add User</Link>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <div className="small"><i className="fas fa-heartbeat"></i>Event Management</div>
                      <ul className="list-unstyled">
                        <li>
                          <Link className="list-a text-decoration-none" to="event" onClick={() => setHideNav(!hideNav)}><i className="fa fa-database"></i>Events</Link>
                        </li>
                        <li>
                          <Link className="list-a text-decoration-none" to="event-add" onClick={() => setHideNav(!hideNav)}><i className="fa fa-plus"></i>Add Event</Link>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <Link className="list-a text-decoration-none" to="donation" onClick={() => setHideNav(!hideNav)}><i className="far fa-gem"></i>Donations</Link>
                    </li>
                    <li>
                      <Link className="list-a text-decoration-none" to="contact" onClick={() => setHideNav(!hideNav)}><i className="fas fa-comments"></i>Message</Link>
                    </li>
                    <li>
                      <div className="small"><i className="far fa-id-card"></i>Account</div>
                      <ul className="list-unstyled">
                        <li>
                          <Link className="list-a text-decoration-none" to="profile" onClick={() => setHideNav(!hideNav)}><i className="far fa-user"></i>Profile</Link>
                        </li>
                        <li>
                          <Link className="list-a text-decoration-none" to="history" onClick={() => setHideNav(!hideNav)}><i className="fas fa-hand-holding-heart"></i>Donation History</Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
            <div className="page">
              <Routes>
                <Route path="contact" element={<Message username={props.username} isAdmin={props.isAdmin} />}/>

                <Route path="event" element={<EventList username={props.username} isAdmin={props.isAdmin}/>}/>
                <Route path="event-add" element={<EventAdd username={props.username}/>}/>
                <Route path="event-add/:eventId" element={<EventEdit username={props.username}/>}/>

                <Route path="user" element={<UserList username={props.username}/>}/>
                <Route path="user-add" element={<UserAdd username={props.username}/>}/>
                <Route path="user-edit/:username" element={<UserEdit username={props.username}/>}/>

                <Route path="donation" element={<DonationConfirmation username={props.username}/>} />

                <Route path="profile" element={<Profile username={props.username}/>}/>
                <Route path="history" element={<DonationHistory username={props.username}/>}/>
                <Route path="history/:username" element={<UserDonationHistory username={props.username}/>}/>

                <Route path='/' element={<Dashboard isAdmin={props.isAdmin} username={props.username}/>}/>
                <Route path="*" element={<Navigate to="/" replace />}/>
              </Routes>
            </div>
            <Footer/>
          </div>
        </div>
      </div>
        
    )
  } 
  // Log in with USER account
  else {
    return (
      <div className="font-montserrat">
        <div id="main_content">
          <div id="toggleNav" className={hideNav ? "offcanvas-active" : ''}>
            <div id="header_top" className="header_top false">
                <div className="container">
                    <div className="hleft">
                        <div className="dropdown">
                            <p className="nav-link icon menu_toggle" onClick={() => setHideNav(!hideNav)}><i className="fa fa-align-left"></i></p>
                        </div>
                    </div>
                    <div className="hright">
                      <p className="nav-link icon"><Link className="list-a text-decoration-none text-success" to="dashboard"><i className="fas fa-home fa-fw"></i></Link></p>
                      <p className="nav-link icon mt-1"><Link className="list-a text-decoration-none text-gray" to="signout" onClick={handleLogout}><i className="fas fa-sign-out-alt fa-fw"></i></Link></p>
                    </div>
                </div>
            </div>
            <div id="left-sidebar" className="sidebar ml-n2">
              <h5 className="brand-name">Go to</h5>
              <nav id="left-sidebar-nav" className="sidebar-nav">
                <div>
                  <ul className="metismenu">
                    <li>
                      <Link className="list-a text-decoration-none" to="event" onClick={() => setHideNav(!hideNav)}><i className="fas fa-heartbeat"></i>Events</Link>
                    </li>
                    <li>
                      <Link className="list-a text-decoration-none" to="contact" onClick={() => setHideNav(!hideNav)}><i className="fas fa-comments"></i>Message</Link>
                    </li>
                    <li>
                      <Link className="list-a text-decoration-none" to="profile" onClick={() => setHideNav(!hideNav)}><i className="far fa-user"></i>Profile</Link>
                    </li>
                    <li>
                      <Link className="list-a text-decoration-none" to="history" onClick={() => setHideNav(!hideNav)}><i className="fas fa-hand-holding-heart"></i>Donation History</Link>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
            <div className="page">
              <Routes>
                <Route path="contact" element={<Message username={props.username} isAdmin={props.isAdmin}/>}/>

                <Route path="event" element={<EventList username={props.username} isAdmin={props.isAdmin}/>}/>

                <Route path="profile" element={<Profile username={props.username}/>}/>
                <Route path="history" element={<DonationHistory username={props.username}/>}/>
                
                <Route path='/' element={<Dashboard isAdmin={props.isAdmin} username={props.username}/>}/>
                <Route path="*" element={<Navigate to="/" replace />}/>
              </Routes>
            </div>
            <Footer/>
          </div>
        </div>
      </div>
    )
  }
}

export default Main;
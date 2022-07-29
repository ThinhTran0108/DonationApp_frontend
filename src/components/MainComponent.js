import React, {Component} from 'react';
import Dashboard from './DashboardComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import Login from './LoginComponent';
import Register from './RegisterComponent';
import Donation from './DonationComponent';
import DonationAdd from './DonationAddComponent';
import Users from './UsersComponent';
import UserAdd from './UserAddComponent';
import Portfolio from './PortfolioComponent';
import Pricing from './PricingComponent';
import Services from './ServicesComponent';

// import { STAFFS } from '../shared/staffs';
// import { DEPARTMENTS } from '../shared/staffs';
import {Routes, Route, Navigate} from 'react-router-dom';

class Main extends Component{
    constructor(props){
        super(props);
        this.state = {
            userData: [
                {
                "_id": "62d50efbdec31f2e006c6dc0",
                "username": "nguyenvana",
                "password": "abcd1234",
                "fullname": "Nguyễn Văn A",
                "email": "nguyenvana@email.com",
                "gender": "Nam",
                "mobile": "0123456789",
                "address": "Quận 3",
                "imageUserUrl": "null",
                "isAdmin": false
              },{
                "_id": "62d51057dec31f2e006c6dc2",
                "username": "nguyenvanb",
                "password": "abcd1234",
                "fullname": "Nguyễn Văn B",
                "email": "nguyenvanb@email.com",
                "gender": "Nam",
                "mobile": "null",
                "address": "null",
                "imageUserUrl": "null",
                "isAdmin": false
              },{
                "_id": "62d51093dec31f2e006c6dc3",
                "username": "admin1",
                "password": "abcd1234",
                "fullname": "Admin C",
                "email": "\badminc@email.com",
                "gender": "Nam",
                "mobile": "0123456789",
                "address": "Quận 5",
                "imageUserUrl": "null",
                "isAdmin": true
              },{
                "_id": "62d510cfdec31f2e006c6dc4",
                "username": "nguyenvand",
                "password": "abcd1234",
                "fullname": "Nguyễn Văn D",
                "email": "nguyenvand@email.com",
                "gender": "Nữ",
                "mobile": "null",
                "address": "Quận 1",
                "imageUserUrl": "null",
                "isAdmin": false
              },{
                "_id": "62d510fadec31f2e006c6dc5",
                "username": "nguyenvane",
                "password": "abcd1234",
                "fullname": "Nguyễn Văn E",
                "email": "nguyenvane@email.com",
                "gender": "Khác",
                "mobile": "0123456789",
                "address": "nulll",
                "imageUserUrl": "null",
                "isAdmin": false
              },{
                "_id": "62d51123dec31f2e006c6dc6",
                "username": "admin2",
                "password": "abcd1234",
                "fullname": "Admin F",
                "email": "adminf@email.com",
                "gender": "Nam",
                "mobile": "0123456789",
                "address": "Quận 1",
                "imageUserUrl": "null",
                "isAdmin": true
              },{
                "_id": "62d511eedec31f2e006c6dc7",
                "username": "nguyenvang",
                "password": "abcd1234",
                "fullname": "Nguyễn Văn G",
                "email": "nguyenvang@email.com",
                "gender": "Nữ",
                "mobile": "0123456789",
                "address": "Quận 10",
                "imageUserUrl": "null",
                "isAdmin": false
              },{
                "_id": "62d51207dec31f2e006c6dc8",
                "username": "nguyenvanh",
                "password": "abcd1234",
                "fullname": "Nguyễn Văn H",
                "email": "nguyenvanh@email.com",
                "gender": "Nam",
                "mobile": "null",
                "address": "Quận 10",
                "imageUserUrl": "null",
                "isAdmin": false
              },{
                "_id": "62d5121adec31f2e006c6dc9",
                "username": "nguyenvani",
                "password": "abcd1234",
                "fullname": "Nguyễn Văn I",
                "email": "nguyenvani@email.com",
                "gender": "Nam",
                "mobile": "null",
                "address": "Quận 10",
                "imageUserUrl": "null",
                "isAdmin": false
              },{
                "_id": "62d51228dec31f2e006c6dca",
                "username": "nguyenvank",
                "password": "abcd1234",
                "fullname": "Nguyễn Văn K",
                "email": "nguyenvank@email.com",
                "gender": "Nam",
                "mobile": "null",
                "address": "Quận 10",
                "imageUserUrl": "null",
                "isAdmin": false
              }
            ],
            donationData: [
                {
                  "_id": "62d51308dec31f2e006c6dcf",
                  "imageEventUrl": "null",
                  "eventId": "event001",
                  "eventName": "Hỗ trợ quyên góp nhà tình thương XXX",
                  "eventContent": "hỗ trợ nhà tình thương XXX mùa Tết, cùng chung tay xây dựng một Tết sum vầy.",
                  "expectedDonation": 20000000,
                  "realDonation": 2000000,
                  "percenDonation": 10,
                  "donationCounter": 5,
                  "endDate": "2023-01-01",
                  "isEnded": false
                },
                {
                  "_id": "62d513d6dec31f2e006c6dd0",
                  "imageEventUrl": "null",
                  "eventId": "event002",
                  "eventName": "Hỗ trợ quyên góp trại trẻ mồ côi ABC",
                  "eventContent": "hỗ trợ trại trẻ mồ côi ABC",
                  "expectedDonation": 40000000,
                  "realDonation": 2000000,
                  "percenDonation": 5,
                  "donationCounter": 10,
                  "endDate": "2023-01-01",
                  "isEnded": false
                },
                {
                  "_id": "62d5140adec31f2e006c6dd1",
                  "imageEventUrl": "null",
                  "eventId": "event003",
                  "eventName": "Hỗ trợ quyên góp trung tâm dạy nghề",
                  "eventContent": "hỗ trợ trung tâm dạy nghề",
                  "expectedDonation": 20000000,
                  "realDonation": 1500000,
                  "percenDonation": 75,
                  "donationCounter": 305,
                  "endDate": "2023-01-01",
                  "isEnded": true
                },
                {
                  "_id": "62d51441dec31f2e006c6dd2",
                  "imageEventUrl": "null",
                  "eventId": "event004",
                  "eventName": "Hỗ trợ quyên góp hội người cao tuổi ABC",
                  "eventContent": "hỗ trợ hội người cao tuổi ABC",
                  "expectedDonation": 10000000,
                  "realDonation": 10000,
                  "percenDonation": 1,
                  "donationCounter": 2,
                  "endDate": "2023-01-01",
                  "isEnded": true
                },
                {
                  "_id": "62d514b8dec31f2e006c6dd3",
                  "imageEventUrl": "null",
                  "eventId": "event005",
                  "eventName": "Hỗ trợ xây nhà tình thương tại miền Trung",
                  "eventContent": "hỗ trợ xây nhà tình thương tại miền Trung",
                  "expectedDonation": 100000000,
                  "realDonation": 10000000,
                  "percenDonation": 1,
                  "donationCounter": 505,
                  "endDate": "2023-01-01",
                  "isEnded": "false"
                },
                {
                  "_id": "62d51508dec31f2e006c6dd4",
                  "imageEventUrl": "null",
                  "eventId": "event006",
                  "eventName": "Hỗ trợ xây cầu miền Tây",
                  "eventContent": "hỗ trợ xây cầu miền Tây",
                  "expectedDonation": 20000000,
                  "realDonation": 20000000,
                  "percenDonation": 100,
                  "donationCounter": 1505,
                  "endDate": "2023-01-01",
                  "isEnded": false
                },
                {
                  "_id": "62d517c4dec31f2e006c6dd5",
                  "imageEventUrl": "null",
                  "eventId": "event006",
                  "eventName": "Hỗ trợ xây cầu tỉnh ABC",
                  "eventContent": "hỗ trợ xây cầu tỉnh ABC",
                  "expectedDonation": 20000000,
                  "realDonation": 4000000,
                  "percenDonation": 20,
                  "donationCounter": 135,
                  "endDate": "2023-01-01",
                  "isEnded": false
                },
                {
                  "_id": "62d517fedec31f2e006c6dd6",
                  "imageEventUrl": "null",
                  "eventId": "event006",
                  "eventName": "Hỗ trợ mua sách giáo khoa",
                  "eventContent": "hỗ trợ mua sách giáo khoa",
                  "expectedDonation": 20000000,
                  "realDonation": 2000000,
                  "percenDonation": 10,
                  "donationCounter": 75,
                  "endDate": "2023-01-01",
                  "isEnded": true
                },
                {
                  "_id": "62d51855dec31f2e006c6dd7",
                  "imageEventUrl": "null",
                  "eventId": "event006",
                  "eventName": "Hỗ trợ cứu trợ lũ lụt miền Trung",
                  "eventContent": "hỗ trợ cứu trợ lũ lụt miền Trung",
                  "expectedDonation": 40000000,
                  "realDonation": 2000000,
                  "percenDonation": 5,
                  "donationCounter": 392,
                  "endDate": "2023-01-01",
                  "isEnded": false
                },
                {
                  "_id": "62d51879dec31f2e006c6dd8",
                  "imageEventUrl": "null",
                  "eventId": "event006",
                  "eventName": "Hỗ trợ xây trường học miền Trung",
                  "eventContent": "hỗ trợ xây trường học miền Trung",
                  "expectedDonation": 40000000,
                  "realDonation": 2000000,
                  "percenDonation": 5,
                  "donationCounter": 392,
                  "endDate": "2023-01-01",
                  "isEnded": false
                }
            ]
        }
        
    }
    
    render(){
        return (
            <div className="font-montserrat">
                <div id="main_content">
                    <div id="toggleNav" className="offcanvas-active">
                        <Header/>
                        <div className="page">
                            <div className="section-body">
                                <Routes>
                                    <Route path="about" element={<About/> }/>
                                    <Route path="contact" element={<Contact/>}/>

                                    <Route path="donation" element={<Donation donationData={this.state.donationData}/>}/>
                                    <Route path="donation-add" element={<DonationAdd/>}/>
                                    <Route path="donation-add/:eventId" element={<DonationAdd donationData={this.state.donationData}/>}/>

                                    <Route path="users" element={<Users userData={this.state.userData}/>}/>
                                    <Route path="user-add" element={<UserAdd />}/>
                                    <Route path="user-add/:userId" element={<UserAdd userData={this.state.userData}/>}/>

                                    <Route path="login" element={<Login/>}/>
                                    <Route path="register" element={<Register/>}/>
                                    <Route path="portfolio" element={<Portfolio/>}/>
                                    <Route path="pricing" element={<Pricing/>}/>
                                    <Route path="services" element={<Services/>}/>
                                    <Route path='/' element={<Dashboard/>}/>
                                    <Route path="*" element={<Navigate to="/" replace />}/>
                                </Routes>
                            </div>
                        </div>
                        <Footer/>
                    </div>
                </div>
            </div>
            
        )
    }
}

export default Main;
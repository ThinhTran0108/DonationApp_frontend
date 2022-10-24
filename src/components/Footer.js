import React from "react";

function Footer(props) {
    return(
        <div className="section-body bg-dark bg-gradient mb-0">
            <footer className="footer">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 col-md-1"></div>
                        <div className="col-12 col-md-4">
                            <ul className="list-unstyled mb-3">
                                <li className="">
                                    <a href="#!" className="text-decoration-none">
                                        <h6 className="text-white"><strong>Trái tim MOMO</strong></h6>
                                    </a>
                                </li>
                                <li className="">
                                    <a href="#!" className="text-decoration-none">
                                        <h6 className="text-white"><strong>Tin tức cộng đồng</strong></h6>
                                    </a>
                                </li>
                                <li className="">
                                    <a href="#!" className="text-decoration-none">
                                        <h6 className="text-white"><strong>Thông tin quyên góp</strong></h6>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-6 col-md-3">
                            <h6 className="text-white small"><strong>Chăm sóc khách hàng</strong></h6>
                            <ul className="list-unstyled text-start mb-3">
                                <li className="small"><a href="#!" className="text-decoration-none text-white"><i className="fas fa-map"></i>&nbsp;&nbsp;Quận 1, TP. HCM</a></li>
                                <li className="small"><a href="#!" className="text-decoration-none text-white"><i className="fas fa-phone"></i>&nbsp;&nbsp;1900 9999 <i>(miễn phí)</i></a></li>
                                <li className="small"><a href="#!" className="text-decoration-none text-white"><i className="fas fa-envelope"></i>&nbsp;&nbsp;hotro@momo.com.vn</a></li>
                            </ul>
                        </div>
                        <div className="col-6 col-md-3 text-md-right">
                            <h6 className="text-white text-center small "><i className="far fa-copyright"></i><strong> Copyright 2022</strong></h6>
                            <ul className="list-inline mb-3 mt-n2 text-center">
                                <li className="list-inline-item mx-2"><span className="avatar mb-1" style={{height: '0px'}}><img src="assets/images/google.png" className="img-fluid rounded" style={{height: '30px'}} alt="google"/></span></li>
                                <li className="list-inline-item mx-2"><span className="avatar mb-1" style={{height: '0px'}}><img src="assets/images/facebook.png" className="img-fluid rounded" style={{height: '30px'}} alt="facebook"/></span></li>
                                <li className="list-inline-item mx-2"><span className="avatar" style={{height: '0px'}}><img src="assets/images/youtube.jpeg" className="img-fluid rounded mt-n1" style={{height: '30px'}} alt="youtube"/></span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
export default Footer
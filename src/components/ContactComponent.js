import React from "react";

function Contact(props) {
    return(
        <div id="contact" className="container-fluid bg-grey">
            <h2 className="text-center">PHẢN HỒI</h2>
            <div className="row">
                <div className="col-xs-12 col-sm-6 col-md-6">
                    <p>Hãy gửi câu hỏi của bạn và chúng tôi sẽ trả lời trong vòng 24 giờ.</p>
                    <p class="pl-5"><i class="fa fa-map-marker" style={{fontSize: '18px'}}></i>&nbsp;&nbsp;Quận 1, TP. HCM</p>
                    <p class="pl-5"><i class="fa fa-phone" style={{fontSize: '18px'}}></i>&nbsp;&nbsp;1900 9999 <em>(miễn phí)</em></p>
                    <p class="pl-5"><i class="fa fa-envelope" style={{fontSize: '18px'}}></i>&nbsp;&nbsp;hotro@momo.com.vn</p>
                    <ul class="flex list-none flex-wrap justify-center space-x-3 ml-3 md:justify-start">
                        <li class="inline-block">
                            {/* Facebook */}
                            <a href="#!" target="_blank" rel="noreferrer">
                                <span style={{boxSizing: 'border-box', display: 'inline-block', overflow: 'hidden',width: 'initial', height: 'initial', background: 'none', opacity: '1',border: '0', margin: '0', padding: '0', position: 'relative', maxWidth: '100%'}}>
                                    <span style={{boxSizing: 'border-box', display: 'block', width: 'initial',height: 'initial', background: 'none', opacity: '1', border: '0', margin: '0', padding: '0', maxWidth: '100%'}}>
                                        <img style={{display: 'block', maxWidth: '100%', width: 'initial', height: 'initial',background: 'none', opacity: '1', border: '0', margin: '0', padding: '0'}} alt="" aria-hidden="true" src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2726%27%20height=%2726%27/%3e"/>
                                    </span>
                                    <img alt="Facebook" src="https://static.mservice.io/styles/desktop/images/social/facebook.svg" decoding="async" data-nimg="intrinsic" style={{position:'absolute', top: '0', left: '0', bottom: '0', right: '0', boxSizing: 'border-box', padding: '0', border:'none', margin:'auto', display:'block', width: '0',height:'0', minWidth: '100%', maxWidth: '100%', minHeight: '100%',maxHeight: '100%'}} srcset="https://static.mservice.io/styles/desktop/images/social/facebook.svg 1x, https://static.mservice.io/styles/desktop/images/social/facebook.svg 2x"/>
                                </span>
                            </a>
                        </li>
                        <li class="inline-block">
                            {/* Linkedin */}
                            <a href="#!" target="_blank" rel="noreferrer">
                                <span style={{boxSizing: 'border-box', display: 'inline-block', overflow: 'hidden',width: 'initial', height: 'initial', background: 'none', opacity: '1',border: '0', margin: '0', padding: '0', position: 'relative', maxWidth: '100%'}}>
                                    <span style={{boxSizing: 'border-box', display: 'block', width: 'initial',height: 'initial', background: 'none', opacity: '1', border: '0', margin: '0', padding: '0', maxWidth: '100%'}}>
                                        <img style={{display: 'block', maxWidth: '100%', width: 'initial', height: 'initial',background: 'none', opacity: '1', border: '0', margin: '0', padding: '0'}} alt="" aria-hidden="true" src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2726%27%20height=%2726%27/%3e"/>
                                    </span>
                                    <img alt="Linkedin" src="https://static.mservice.io/styles/desktop/images/social/linkedin.svg" decoding="async" data-nimg="intrinsic" style={{position:'absolute', top: '0', left: '0', bottom: '0', right: '0', boxSizing: 'border-box', padding: '0', border:'none', margin:'auto', display:'block', width: '0',height:'0', minWidth: '100%', maxWidth: '100%', minHeight: '100%',maxHeight: '100%'}} srcset="https://static.mservice.io/styles/desktop/images/social/linkedin.svg 1x, https://static.mservice.io/styles/desktop/images/social/linkedin.svg 2x"/>
                                </span>
                            </a>
                        </li>
                        <li class="inline-block">
                            {/* Youtube */}
                            <a href="#!" target="_blank" rel="noreferrer">
                                <span style={{boxSizing: 'border-box', display: 'inline-block', overflow: 'hidden',width: 'initial', height: 'initial', background: 'none', opacity: '1',border: '0', margin: '0', padding: '0', position: 'relative', maxWidth: '100%'}}>
                                    <span style={{boxSizing: 'border-box', display: 'block', width: 'initial',height: 'initial', background: 'none', opacity: '1', border: '0', margin: '0', padding: '0', maxWidth: '100%'}}>
                                        <img style={{display: 'block', maxWidth: '100%', width: 'initial', height: 'initial',background: 'none', opacity: '1', border: '0', margin: '0', padding: '0'}} alt="" aria-hidden="true" src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2726%27%20height=%2726%27/%3e"/>
                                    </span>
                                    <img alt="Youtube" src="https://static.mservice.io/styles/desktop/images/social/youtube.svg" decoding="async" data-nimg="intrinsic" style={{position:'absolute', top: '0', left: '0', bottom: '0', right: '0', boxSizing: 'border-box', padding: '0', border:'none', margin:'auto', display:'block', width: '0',height:'0', minWidth: '100%', maxWidth: '100%', minHeight: '100%',maxHeight: '100%'}} srcset="https://static.mservice.io/styles/desktop/images/social/youtube.svg 1x, https://static.mservice.io/styles/desktop/images/social/youtube.svg 2x"/>
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-6">
                    <div className="row m-2">
                        <div className="col-sm-12 form-group">
                            <input className="form-control" id="fullname" name="fullname" placeholder="Họ tên của bạn" type="text" required/>
                        </div>
                    </div>
                    <div className="row m-2">
                        <div className="col-sm-12 form-group">
                            <textarea className="form-control" id="userRquest" name="userRquest" placeholder="Hãy để lại câu hỏi của bạn" rows="5"></textarea>
                        </div>
                    </div>
                    <div className="row m-2">
                        <div className="col-sm-12 form-group">
                            <button className="btn btn-default btn-outline-secondary pull-right" type="submit">Gửi</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
}
export default Contact
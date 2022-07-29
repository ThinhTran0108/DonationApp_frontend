import React, {Component} from 'react';
import {Link} from 'react-router-dom';

const RenderEvent = ({donationData}) => {
    return(
        <div class="group relative d-flex flex-col flex-nowrap overflow-hidden rounded-xl border border-gray-200 bg-white text-gray-700 transition shadow-sm hover:shadow-xl " key={donationData.eventId}>
            <div class=" relative panel-heading">
                <span style={{boxSizing: 'border-box', display: 'block', overflow: 'hidden', width: 'initial', height: 'initial', background: 'none', opacity: '1', border: '0px', margin: '0px', padding: '0px', position: 'absolute', inset: '0px'}}>
                    <img alt={donationData.eventName} src="/assets/images/image1.jpg" style={{position: 'absolute', inset: '0px', boxSizing: 'border-box', padding: '0px', border: 'none', margin: 'auto', display: 'block', width: '0px', height: '0px', minWidth: '100%', maxWidth: '100%', minHeight: '100%', maxHeight: '100%', objectFit: 'cover'}}/>
                </span>
            </div>
            <div class="min-h-1 flex-1 px-2">
                <h5 class="text-md text-center font-bold leading-snug transition">{donationData.eventName}</h5>
                <p class="text-sm text-center leading-snug transition">{donationData.eventContent}</p>
            </div>
            <div class="panel-body">
                <div class="mb-4 px-4 pt-0">
                    <div class=" mb-1 flex flex-nowrap items-center space-x-2">
                        <div class="shrink-0">
                            <div class="overflow-hidden rounded-full border border-gray-200 p-1">
                                <div class="relative h-11 w-11 md:h-7 md:w-7">
                                    <span style={{boxSizing: 'border-box', display: 'block', overflow: 'hidden', width: 'initial', height: 'initial', background: 'none', opacity: '1', border: '0px', margin: '0px', padding: '0px', position: 'absolute', inset: '0px'}}>
                                        <img alt="Quỹ Hy Vọng" sizes="100vw" src="/assets/images/logo.png" decoding="async" data-nimg="fill" style={{position: 'absolute', inset: '0px', boxSizing: 'border-box', padding: '0px', border: 'none', margin: 'auto', display: 'block', width: '0px', height: '0px', minWidth: '100%', maxWidth: '100%', minHeight: '100%', maxHeight: '100%', objectFit: 'cover'}}/>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="flex-1 text-xs leading-4 text-gray-600 md:text-sm">Quỹ Hy Vọng</div>
                        <div class="shrink-0 ">
                            <span class="rounded-3xl px-2 py-1 text-xs text-orange-400">Còn 33 Ngày</span>
                        </div>
                    </div>
                    <div class="dn-money mb-2 flex items-end">
                        <strong class="item-end flex leading-5 text-gray-700">{donationData.realDonation.toLocaleString()}đ</strong><span class="pl-2 text-xs text-gray-500 md:text-sm">/ {donationData.expectedDonation.toLocaleString('en-GB')}đ</span>
                    </div>
                    <div class="dn-progress my-1 flex h-1.5 w-full overflow-hidden rounded-lg bg-gray-200">
                        <div class="dn-progress-bar h-1.5 rounded-lg bg-momo" style={{width: '1.61%'}}></div>
                    </div>
                    <div class=" mt-2 flex flex-nowrap items-center  justify-between space-x-2 md:space-x-3 ">
                        <div class="grow ">
                            <div class=" text-xs text-gray-500">Lượt quyên góp</div>
                            <div class=" text-sm font-bold text-gray-600">{donationData.donationCounter.toLocaleString()}</div>
                        </div>
                        <div class="grow">
                            <div class=" text-xs text-gray-500">Đạt được</div>
                            <div class=" text-sm font-bold text-gray-600">{donationData.percenDonation}%</div>
                        </div>
                        <div class="grow">
                            <Link to={`/donation-add/${donationData.eventId}`}>
                                <button className="btn btn-icon" title="Edit"><i className="fa fa-edit"></i></button>
                            </Link>
                        </div>
                        <div class="flex grow items-center justify-end">
                            <Link title={donationData.eventName} class="stretched-link" to="#!">
                                <span class="flex h-7 items-center justify-center rounded-md border border-pink-600 px-3 text-xs font-bold text-pink-600 md:group-hover:bg-pink-50">Quyên góp</span>
                            </Link>
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
      this.state = { 
        isShow: {
            question1: false,
            question2: false,
            question3: false,
            question4: false,
            question5: false,
            question6: false
        }
      }
      this.toogleText = this.toogleText.bind(this);
    }

    toogleText = (field) => (evt) => {
      this.setState({
          isShow: { ...this.state.isShow, [field]: !this.state.isShow[field] }
      });
    }
    render () {
      const displayEvent = this.props.donationData.map((x) => {
        return (
            <RenderEvent donationData = {x} />
        )
      });

      return (
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
            <div className="tab-pane fade show active" id="user-list" role="tabpanel">
              <div className="card">
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
                <div class="grid p-4 grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {displayEvent}
                </div>
                {/* Câu hỏi thường gặp */}
                <hr/>
                <div class="py-3 bg-white slideanim">
                  <div class="max-w-6xl mx-auto w-full px-5 md:px-8 lg:px-8 ">
                      <div class="grid grid-cols-1 md:grid-cols-3 md:gap-6" id="section-question">
                          <div class="">
                              <div class="mb-5 text-center md:mt-5 md:text-left">
                                  <h2 class="text-2xl font-bold lg:text-2xl text-pink-600">Câu hỏi thường gặp</h2>
                              </div>
                          </div>
                          <div class="md:col-span-2 md:pl-5">
                              <div class="divide-y divide-gray-200 article-question">
                                  <div class="block">
                                      <button class="question-title relative block w-full text-left p-2 font-semibold text-pine-500 hover:text-opacity-70 cursor-pointer focus:outline-none" onClick={this.toogleText('question1')}>
                                          <div class="float-left">Trái Tim MoMo là gì?</div>
                                        { this.state.isShow.question1 ? <span class="float-right" ><i class="fa fa-angle-up" style={{fontSize: '18px'}}></i></span> : <span class="float-right" ><i class="fa fa-angle-down" style={{fontSize: '18px'}}></i></span> } 
                                      </button>
                                      { this.state.isShow.question1 && (<div class="p-2 text-base soju__prose small text-gray-600">Trái tim MoMo là tính năng gây quỹ từ thiện của MoMo. Các dự án được đăng tải trong Trái Tim MoMo đều là những dự án đã được lựa chọn cẩn trọng bởi đội ngũ MoMo, và được bảo trợ bởi các tổ chức uy tín.</div>) }
                                  </div>
                                  <div class="block">
                                      <button class="question-title relative block w-full text-left p-2 font-semibold text-pine-500 hover:text-opacity-70 cursor-pointer focus:outline-none" onClick={this.toogleText('question2')}>
                                          <div class="float-left">MoMo có thu lợi nhuận từ việc gây quỹ không?</div>
                                          { this.state.isShow.question2 ? <span class="float-right" ><i class="fa fa-angle-up" style={{fontSize: '18px'}}></i></span> : <span class="float-right" ><i class="fa fa-angle-down" style={{fontSize: '18px'}}></i></span> } 
                                      </button>
                                      { this.state.isShow.question2 && (<div class="p-2 text-base soju__prose small text-gray-600">MoMo hoàn toàn không thu lợi nhuận từ việc gây quỹ. Ngoại trừ phí chuyển khoản ngân hàng, 100% số tiền của người dùng được chuyển tới cho các tổ chức bảo trợ.</div>) }
                                  </div>
                                  <div class="block">
                                      <button class="question-title relative block w-full text-left p-2 font-semibold text-pine-500 hover:text-opacity-70 cursor-pointer focus:outline-none" onClick={this.toogleText('question3')}>
                                          <div class="float-left">Sau bao lâu từ khi quyên góp, tiền sẽ được chuyển đến tay hoàn cảnh?</div>
                                          { this.state.isShow.question3 ? <span class="float-right" ><i class="fa fa-angle-up" style={{fontSize: '18px'}}></i></span> : <span class="float-right" ><i class="fa fa-angle-down" style={{fontSize: '18px'}}></i></span> } 
                                      </button>
                                      { this.state.isShow.question3 && (<div class="p-2 text-base soju__prose small text-gray-600">Trong vòng 1 tuấn kể từ khi dự án quyên góp thành công, tiền sẽ được chuyển tới đối tác. Trong những trường hợp khẩn cấp, chúng tôi có thể chuyển sớm hơn.</div>) }
                                  </div>
                                  <div class="block">
                                      <button class="question-title relative block w-full text-left p-2 font-semibold text-pine-500 hover:text-opacity-70 cursor-pointer focus:outline-none" onClick={this.toogleText('question4')}>
                                          <div class="float-left">Ai có thể gây quỹ trên Trái Tim MoMo?</div>
                                          { this.state.isShow.question4 ? <span class="float-right" ><i class="fa fa-angle-up" style={{fontSize: '18px'}}></i></span> : <span class="float-right" ><i class="fa fa-angle-down" style={{fontSize: '18px'}}></i></span> } 
                                      </button>
                                      { this.state.isShow.question4 && (<div class="p-2 text-base soju__prose small text-gray-600">Để có thể gây quỹ trên MoMo, hoàn cảnh cần được bảo trợ bởi một tổ chức có pháp nhân là Quỹ, tổ chức phi chính phủ, Doanh nghiệp xã hội hoặc một cơ quan nhà nước có chức năng tiếp nhận tài trợ.&nbsp;</div>) }
                                  </div>
                                  <div class="block">
                                      <button class="question-title relative block w-full text-left p-2 font-semibold text-pine-500 hover:text-opacity-70 cursor-pointer focus:outline-none" onClick={this.toogleText('question5')}>
                                          <div class="float-left">Nếu hoàn cảnh gây quỹ không thành công thì sao?</div>
                                          { this.state.isShow.question5 ? <span class="float-right" ><i class="fa fa-angle-up" style={{fontSize: '18px'}}></i></span> : <span class="float-right" ><i class="fa fa-angle-down" style={{fontSize: '18px'}}></i></span> } 
                                      </button>
                                      { this.state.isShow.question5 && (<div class="p-2 text-base soju__prose small text-gray-600">MoMo vẫn sẽ chuyển số tiền tương ứng với số Heo Vàng đã quyên góp. Trong một số trường hợp, chúng tôi sẽ kéo dài thêm thời gian gây quỹ</div>) }
                                  </div>
                                  <div class="block">
                                      <button class="question-title relative block w-full text-left p-2 font-semibold text-pine-500 hover:text-opacity-70 cursor-pointer focus:outline-none" onClick={this.toogleText('question6')}>
                                          <div class="float-left">Làm thế nào để liên hệ và gửi hoàn cảnh tới MoMo?</div>
                                          { this.state.isShow.question6 ? <span class="float-right" ><i class="fa fa-angle-up" style={{fontSize: '18px'}}></i></span> : <span class="float-right" ><i class="fa fa-angle-down" style={{fontSize: '18px'}}></i></span> } 
                                      </button>
                                      { this.state.isShow.question6 && (<div class="p-2 text-base soju__prose small text-gray-600">Tổ chức đủ điều kiện vui lòng gửi email thông tin của tổ chức tới địa chỉ <strong><a href="#!">donation@mservice.com.vn</a></strong> để được nhận hướng dẫn.</div>) }
                                  </div>
                              </div>
                          </div>
                      </div>
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
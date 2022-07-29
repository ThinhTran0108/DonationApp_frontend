import React from "react";

function About(props) {
    return(
        <div>
            <div id="about" className="container-fluid">
                <div className="row">
                <div className="col-sm-8">
                    <h2>Nền tảng quyên góp từ thiện Trái tim MoMo</h2><br/>
                    <h4>Quyên góp nhanh chóng, dễ dàng</h4><br/>
                    <p>Chỉ với vài chạm, bạn đã góp phần giúp đỡ 1 hoàn cảnh khó khăn có cuộc sống tốt đẹp hơn.</p>
                    <h4>1000đ cũng là đáng quý</h4><br/>
                    <p>Với mức ủng hộ tối thiểu 1.000 đồng, bạn đã cùng hàng triệu nhà hảo tâm khác của “Trái tim MoMo” giúp đỡ những mảnh đời khó khăn.</p>
                    <h4>Minh bạch, công khai mọi khoản đóng góp</h4><br/>
                    <p>Mọi thông tin về hoạt động đóng góp, tài trợ đều được công khai và cập nhật liên tục.</p>
                    <br/><button className="btn btn-default btn-lg">Xem thêm</button>
                </div>
                <div className="col-sm-4">
                    <span className="glyphicon glyphicon-signal logo"></span>
                </div>
                </div>
            </div>

            <div className="container-fluid bg-grey">
                <div className="row">
                <div className="col-sm-4">
                    <span className="glyphicon glyphicon-globe logo slideanim"></span>
                </div>
                <div className="col-sm-8">
                    <h2>Giá trị</h2><br/>
                    <h4><strong>MISSION:</strong>Vì một Việt Nam tốt đẹp hơn</h4><br/>
                    <p><strong>VISION:</strong> chung tay quyên góp tiền cùng hàng triệu người, giúp đỡ các hoàn cảnh khó khăn trên khắp cả nước</p>
                </div>
                </div>
            </div>
        </div>
    )
}
export default About
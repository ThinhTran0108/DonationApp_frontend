import React from "react";

function Dashboard(props) {
    return(
        <div class="jumbotron text-center">
            <h1>Trái Tim MoMo</h1> 
            <p>Trái Tim MoMo là nền tảng giúp bạn dễ dàng chung tay quyên góp tiền cùng hàng triệu người, giúp đỡ các hoàn cảnh khó khăn trên khắp cả nước.</p> 
            <form>
                <div class="input-group">
                    <input type="email" class="form-control" size="50" placeholder="Email Address" required/>
                    <div class="input-group-btn">
                    <button type="button" class="btn btn-danger">Đăng ký</button>
                    </div>
                </div>
            </form>
        </div>
        )
}
export default Dashboard

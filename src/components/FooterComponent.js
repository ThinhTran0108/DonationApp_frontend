import React from "react";

function Footer(props) {
    return(
        <footer class="overflow-hidden bg-dark mt-auto">
            <div class="max-w-6xl mx-auto w-full px-5 md:px-8 lg:px-8 ">
                <div class="py-8 ">
                    <div class="lg:flex lg:items-start lg:space-x-8">
                        <ul class="grid flex-1 grid-cols-1 gap-y-8 gap-x-8 sm:grid-cols-2">
                            <li class="">
                                <a class="block cursor-pointer whitespace-nowrap text-sm text-white/80 transition-all hover:text-white text-decoration-none" href="#!">
                                    <span class="text-base font-bold text-white hover:text-inherit">Trái Tim MoMo</span> 
                                </a>
                                <a class="block cursor-pointer whitespace-nowrap text-sm text-white/80 transition-all hover:text-white text-decoration-none" href="#!">
                                    <span class="text-base font-bold text-white hover:text-inherit">Tin Tức Cộng Đồng</span> 
                                </a>
                                <a class="block cursor-pointer whitespace-nowrap text-sm text-white/80 transition-all hover:text-white text-decoration-none" href="#!">
                                    <span class="text-base font-bold text-white hover:text-inherit">Hoàn Cảnh Quyên Góp</span> 
                                </a>
                                <a class="block cursor-pointer whitespace-nowrap text-sm text-white/80 transition-all hover:text-white text-decoration-none" href="#!">
                                    <span class="text-base font-bold text-white hover:text-inherit">Blog Cuộc Sống</span> 
                                </a>
                            </li>
                            <li class="">
                                <span class="text-base font-bold text-white hover:text-inherit">Chăm sóc khách hàng</span>
                                <ul class="mt-3 pl-0 space-y-2 text-sm text-white">
                                    <li class="my-1">
                                        <i class="fa fa-map-marker" style={{fontSize: '18px'}}></i>&nbsp;&nbsp;Quận 1, TP. Hồ Chí Minh
                                    </li>
                                    <li class="my-1">
                                        <i class="fa fa-phone" style={{fontSize: '18px'}}></i>&nbsp;&nbsp;1900 9999 <i>(miễn phí)</i>
                                    </li>
                                    <li class="my-1">
                                        <i class="fa fa-envelope" style={{fontSize: '18px'}}></i>&nbsp;&nbsp;hotro@momo.com.vn
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}
export default Footer
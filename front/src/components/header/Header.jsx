import React from "react";
import '../../styles/header.css';
import UserRightMenu from "./rightMenu/User";
import UnUserRightMenu from "./rightMenu/UnUser";

function Header(){
    return(
        <header className="p-3 text-bg-dark fixed-top">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                        <h3><b>Справка</b></h3>
                    </a>
                    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0 leftItem">
                        <li><a href="/faq" className="nav-link px-2 text-white">FAQs</a></li>
                        <li><a href="/help" className="nav-link px-2 text-white">Задать вопрос</a></li>
                    </ul>
                    <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
                        <input type="search" className="form-control form-control-dark text-bg-dark" placeholder="Search..." aria-label="Search"></input>
                    </form>
                    <UnUserRightMenu />
                    {/* <UserRightMenu /> */}
                </div>
            </div>
        </header>
    );
}

export default Header;
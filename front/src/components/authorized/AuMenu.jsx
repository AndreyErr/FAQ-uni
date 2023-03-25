import React from "react";
import MesDialogsLayoutMenu from "./messages/MesDialogsLayoutMenu";

function AuMenu(props){
    return(
        <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark">
            <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
              <span className="fs-4">Привет, ...</span>
            </a>
            <hr></hr>
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="hoverLink">
                    <a href="/me" className={`nav-link text-white ${props.active === 'me' ? 'active' : ''}`} aria-current="page">
                        <i className="fa-solid fa-user pe-none me-2"></i>Я
                    </a>
                </li>
                <li className="hoverLink">
                    <a href="/users" className={`nav-link text-white ${props.active === 'users' ? 'active' : ''}`}>
                        <i className="fa-solid fa-user pe-none me-2"></i>Аккаунты
                    </a>
                </li>
                <li className="hoverLink">
                    <a href="/chat" className={`nav-link text-white ${props.active === 'chat' ? 'active' : ''}`}>
                        <i className="fa-solid fa-user pe-none me-2"></i>Чаты
                    </a>
                </li>
                <li className="hoverLink">
                    <a href="/history" className={`nav-link text-white ${props.active === 'history' ? 'active' : ''}`}>
                        <i className="fa-solid fa-user pe-none me-2"></i>История
                    </a>
                </li>
            </ul>
            <MesDialogsLayoutMenu />
        </div>
    );
}

export default AuMenu;
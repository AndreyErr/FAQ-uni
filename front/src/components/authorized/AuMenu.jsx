import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../..";
import MesDialogsLayoutMenu from "./messages/MesDialogsLayoutMenu";
import ScrollButton from "./ScrollButton";

function AuMenu(props){
    const {user} = useContext(Context)
    return(
        <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark sticky-top" style={{top: '91px'}}>
            <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
              <span className="fs-4">Привет, {user.user['login']}</span>
            </Link>
            <hr></hr>
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="hoverLink">
                    <Link to="/me" className={`nav-link text-white ${props.active === 'me' ? 'active' : ''}`} aria-current="page">
                        <i className="fa-solid fa-user pe-none me-2"></i>Я
                    </Link>
                </li>
                {user.user['status'] === 4 || user.user['status'] === 5 ?
                <li className="hoverLink">
                    <Link to="/users" className={`nav-link text-white ${props.active === 'users' ? 'active' : ''}`}>
                        <i className="fa-solid fa-user pe-none me-2"></i>Аккаунты
                    </Link>
                </li>
                : ''}
                {user.user['status'] === 4 || user.user['status'] === 5 ?
                <li className="hoverLink">
                    <Link to="/FAQs_check" className={`nav-link text-white ${props.active === 'FAQs_check' ? 'active' : ''}`}>
                        <i className="fa-solid fa-user pe-none me-2"></i>FAQs на проверку
                    </Link>
                </li>
                : ''}
                <li className="hoverLink">
                    <Link to="/chat" className={`nav-link text-white ${props.active === 'chat' ? 'active' : ''}`}>
                        <i className="fa-solid fa-user pe-none me-2"></i>Чаты
                    </Link>
                </li>
                {user.user['status'] === 4 || user.user['status'] === 5 ?
                <li className="hoverLink">
                    <Link to="/chat/all" className={`nav-link text-white ${props.active === 'chatall' ? 'active' : ''}`}>
                        <i className="fa-solid fa-user pe-none me-2"></i>Все активные чаты
                    </Link>
                </li>
                : ''}
                <li className="hoverLink">
                    <Link to="/history" className={`nav-link text-white ${props.active === 'history' ? 'active' : ''}`}>
                        <i className="fa-solid fa-user pe-none me-2"></i>История
                    </Link>
                </li>
                {user.user['status'] === 4 || user.user['status'] === 5 ?
                <li className="hoverLink">
                    <Link to="/history/all" className={`nav-link text-white ${props.active === 'historyall' ? 'active' : ''}`}>
                        <i className="fa-solid fa-user pe-none me-2"></i>Вся история
                    </Link>
                </li>
                : ''}
            </ul>
            {/* <MesDialogsLayoutMenu /> */}
            <div className="mt-3 d-grid gap-2"><ScrollButton /></div>
        </div>
    );
}

export default AuMenu;
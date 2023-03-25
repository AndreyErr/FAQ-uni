import React from "react";
import '../../../styles/header.css';

function UserRightMenu(){
    return(
        <div className="dropdown text-end">
            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Привет, ...
            </a>
            <ul className="dropdown-menu text-small">
                <li><a className="dropdown-item" href="/me">Профиль</a></li>
                <li><a className="dropdown-item" href="/chat/new">Задать вопрос</a></li>
                <li><hr className="dropdown-divider"></hr></li>
                <li><a className="dropdown-item" href="!#">Выйти</a></li>
            </ul>
        </div>
    );
}

export default UserRightMenu;
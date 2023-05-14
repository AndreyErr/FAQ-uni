import React, { useContext } from "react";
import { Context } from "../../..";
import '../../../styles/header.css';
import { Link } from "react-router-dom";

function UserRightMenu(props){

    const {user} = useContext(Context)

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem('token')
        window.location.href = '/';
    }

    return(
        <div className="dropdown text-end">
            <Link className="nav-link dropdown-toggle placeholder-glow row" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Привет, {props.name}
            </Link>
            <ul className="dropdown-menu text-small">
                <li><Link className="dropdown-item" to="/me">Профиль</Link></li>
                {user.user['status'] < 3 
                ? <li><Link className="dropdown-item" to="/chat/new">Задать вопрос</Link></li>
                : <li><Link className="dropdown-item" to="/chat">Ответить на вопросы</Link></li>
                }
                <li><hr className="dropdown-divider"></hr></li>
                <li><Link className="dropdown-item" onClick={() => logOut()}>Выйти</Link></li>
            </ul>
        </div>
    );
}

export default UserRightMenu;
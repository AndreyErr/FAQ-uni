import React from "react";
import { Link } from "react-router-dom";
import '../../../styles/mainPage.css';

function MainPageConnectCard(){
    return(
        <div className="feature col card-pos">
            <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3 rounded">
                <i className="fa-solid fa-envelope pad"></i>
            </div>
            <h3 className="fs-2">Вопрос 24 часа</h3>
            <p>Задайте свой вопрос и в течение 24 часов наш сотрудник даст вам ответ на вопрос на почту.</p>
            <Link to="#" className="icon-link d-inline-flex align-items-center">
                <button type="button" className="btn btn-primary">Задать вопрос</button>
            </Link>
        </div>
    );
}

export default MainPageConnectCard;
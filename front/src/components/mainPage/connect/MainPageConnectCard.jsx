import React from "react";
import { Link } from "react-router-dom";
import '../../../styles/mainPage.css';

function MainPageConnectCard(props){
    return(
        <div className="feature col card-pos">
            <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3 rounded">
                <i className={`fa-solid fa-${props.cartType} pad`}></i>
            </div>
            <h3 className="fs-2">{props.title}</h3>
            <p>{props.descr}</p>
            {props.button 
            ?   <Link to="/chat" className="icon-link d-inline-flex align-items-center">
                    <button type="button" className="btn btn-primary">Задать вопрос</button>
                </Link>
            : null}
        </div>
    );
}

export default MainPageConnectCard;
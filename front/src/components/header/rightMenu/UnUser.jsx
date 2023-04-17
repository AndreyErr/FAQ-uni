import React from "react";
import { Link } from "react-router-dom";
import '../../../styles/header.css';

function UnUserRightMenu(){
    return(
        <div className="text-end">
            <Link to="/"><button type="button" className="btn btn-warning">Войти / Регистрация</button></Link>
        </div>
    );
}

export default UnUserRightMenu;
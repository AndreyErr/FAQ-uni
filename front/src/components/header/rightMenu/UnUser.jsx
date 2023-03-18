import React from "react";
import '../../../styles/header.css';

function UnUserRightMenu(){
    return(
        <div className="text-end">
            <a href="/"><button type="button" className="btn btn-warning">Войти / Регистрация</button></a>
        </div>
    );
}

export default UnUserRightMenu;
import React from "react";
import '../../../styles/header.css';

function UnUserRightMenu(){
    return(
        <div className="text-end">
            <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#staticBackdrop1">Войти / Регистрация</button>
        </div>
    );
}

export default UnUserRightMenu;
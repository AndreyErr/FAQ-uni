import React from "react";

function FaqSearchForm(){
    return(
        <div>
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Ваш вопрос" aria-label="Ваш вопрос" aria-describedby="button-addon2"></input>
                <button className="btn btn-outline-secondary" type="button" id="button-addon2">Поиск</button>
            </div>
        </div>
    );
}

export default FaqSearchForm;
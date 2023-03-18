import React from "react";

function FaqSearchForm(){
    return(
        <div>
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Ваш вопрос" aria-label="Ваш вопрос" aria-describedby="button-addon2"></input>
                <button class="btn btn-outline-secondary" type="button" id="button-addon2">Поиск</button>
            </div>
        </div>
    );
}

export default FaqSearchForm;
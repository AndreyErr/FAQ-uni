import React from "react";

function FaqSearchForm(props){
    return(
        <div>
            <div className="input-group mb-3">
                <input value={props.searchStr} onChange={e => props.search(e.target.value)} id="search" type="text" className="form-control" placeholder="Ваш вопрос" aria-label="Ваш вопрос" aria-describedby="button-addon2"></input>
                {props.searchStr != '' ? <button onClick={() => {props.setSearchStr('')}} className="btn btn-light" type="button" id="button-addon2">Отчистить</button> : ''}
            </div>
        </div>
    );
}

export default FaqSearchForm;
import React from "react";

function Loader(){
    return(
        <span>
            <span className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Загрузка...</span>
            </span>
        </span>
    );
}

export default Loader;
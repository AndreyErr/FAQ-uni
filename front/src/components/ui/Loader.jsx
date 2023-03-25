import React from "react";

function Loader(){
    return(
        <div>
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Загрузка...</span>
            </div>
        </div>
    );
}

export default Loader;
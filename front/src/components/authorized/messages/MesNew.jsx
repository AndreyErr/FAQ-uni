import React from "react";
import { Link } from "react-router-dom";

function MesNew(){
    return(
        <div>
            <Link to="/chat/new" className="list-group-item list-group-item-action py-3 lh-sm bg-warning">
              <strong className="mb-1">Новый вопрос</strong>
            </Link>
        </div>
    );
}

export default MesNew;
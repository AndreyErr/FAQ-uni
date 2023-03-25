import React from "react";

function MesDialog(props){
    return(
        <a href={"/chat/" + props.data.id} className="list-group-item list-group-item-action active py-3 lh-sm" aria-current="true">
          <div className="row">
            <div className="col-md-10">
              <strong className="mb-1">{props.data.with}</strong><br></br>
              <small className="text-info">{props.data.dateFinalMessage} {props.data.timeFinalMessage}</small>
            </div>
            <div className="col-md-2">
                <small className="text-danger"><i className="fa-solid fa-circle-dot"></i></small>
            </div>
          </div>
        </a>
    );
}

export default MesDialog;
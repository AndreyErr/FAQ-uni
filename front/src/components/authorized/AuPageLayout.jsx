import React from "react";
import AuAccaunt from "./AuAccaunt";
import AuMenu from "./AuMenu";
import AuUsers from "./users/AuUsers";
import AuMessagesLayout from "./messages/AuMessagesLayout";
import FaqNew from "../faq/FaqNew";

function AuPageLayout(props){

    return(
      <main>
        <div className="container">
          <div className="row g-0 pt-5">
            <div className="col-md-3">
                <AuMenu active={props.type}/>
            </div>
            <div className="col-md-9">
              <FaqNew />
              <div>
                {props.type === 'me' ? <AuAccaunt /> : ''}
                {props.type === 'users' ? <AuUsers /> : ''}
                {props.type === 'chat' ? <AuMessagesLayout /> : ''}
                {props.type === 'history' ? <AuMessagesLayout /> : ''}
               </div>
            </div>
          </div>
        </div>
      </main>
    );
}

export default AuPageLayout;
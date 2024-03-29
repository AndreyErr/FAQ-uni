import React, { useContext, useEffect, useState } from "react";
import AuAccaunt from "./AuAccaunt";
import AuMenu from "./AuMenu";
import AuUsers from "./users/AuUsers";
import AuMessagesLayout from "./messages/AuMessagesLayout";
import FaqNew from "../faq/FaqNew";
import FaqNewType from "../faq/FaqNewType";
import { Context } from "../..";
import { fatchTitles } from "../../http/faqAPI";
import socket from "../../http/socket";
import FaqsCheck from "./FaqsCheck";

function AuPageLayout(props){
  const {user} = useContext(Context)
  const [titleTypes, setTitleTypes] = useState([]);
  const [isTitlesLoading, setIsTitlesLoading] = useState(false)

  useEffect(() => {
    if(user.user['status'] > 2){
      setIsTitlesLoading(true)
      setTimeout(() => {
        fatchTitles().then((result) => {
          setTitleTypes(result.data)
          setIsTitlesLoading(false)
        })
      }, 0)
    }
  }, [])

  socket.removeAllListeners()

    return(
      <main>
        <div className="container">
          <div className="pt-5 "></div>
        </div>
        <div className="container">
          <div className="row g-0">
            <div className="col-md-3">
                <AuMenu active={props.type}/>
            </div>
            <div className="col-md-9">
              {user.user['status'] === 4 || user.user['status'] === 5 
              ?
              <FaqNewType titleT={titleTypes} isTitleLoad={isTitlesLoading} setTitleTypes={setTitleTypes}/>
              : null}
              {user.user['status'] === 3 || user.user['status'] === 4 || user.user['status'] === 5 
              ?
              <FaqNew titleT={titleTypes} isTitleLoad={isTitlesLoading}/>
              : null}
              <div>
                {props.type === 'me' ? <AuAccaunt /> : null}
                {props.type === 'users' ? <AuUsers /> : null}
                {props.type === 'FAQs_check' ? <FaqsCheck /> : null}
                {props.type === 'chat' ? <AuMessagesLayout type={props.type} /> : null}
                {props.type === 'history' ? <AuMessagesLayout type={props.type} /> : null}
                {props.type === 'historyall' ? <AuMessagesLayout type={props.type} /> : null}
                {props.type === 'chatall' ? <AuMessagesLayout type={props.type} /> : null}
               </div>
            </div>
          </div>
        </div>
      </main>
    );
}

export default AuPageLayout;
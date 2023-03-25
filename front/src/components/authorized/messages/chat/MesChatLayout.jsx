import React, { useState } from "react";
import { useParams } from "react-router-dom";
import HelpStatus from "./HelpStatus";
import MesChat from "./MesChat";
import MesForm from "../MesForm";

function MesChatLayout(){

  const params = useParams();

  const [messages, setMessage] = useState([
    {id: 1, date: '2012-01-03', time: '12:00', from: 'aaa', text: 'bbb'},
    {id: 2, date: '2012-01-03', time: '12:00', from: 'aaa', text: 'bbb'},
    {id: 3, date: '2012-01-03', time: '12:00', from: 'aaa', text: 'bbb'},
    {id: 4, date: '2012-01-03', time: '12:00', from: 'aaa', text: 'bbb'},
    {id: 5, date: '2012-01-03', time: '12:00', from: 'aaa', text: 'bbb'},
    {id: 6, date: '2012-01-03', time: '12:00', from: 'aaa', text: 'bbb'},
  ]);

  const createMessage = (newMessage) => {
    setMessage([newMessage, ...messages])
  }

  console.log(params)

  return(
    <div>
      <MesForm create={createMessage} />
      {params.chatId != 'new' ? (
        <div>
          <HelpStatus />
          <MesChat messages={messages}/>
        </div>
      ) : ''}
    </div>
  );
}

export default MesChatLayout;
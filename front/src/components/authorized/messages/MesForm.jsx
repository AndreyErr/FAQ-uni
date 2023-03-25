import React, { useState } from "react";
import MesLoockLike from "./chat/MesLoockLike";

function MesForm({create}){

  const [message, setMessage] = useState({text: ''})
  
  const addNewMessage = (e) => {
    e.preventDefault()
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var hh = today.getHours();
    var min = today.getMinutes();
    today = mm + '/' + dd + '/' + yyyy;
    let nowTime = hh + ':' + min;
    const newMessage = {
      id: Date.now(), 
      date: today, 
      time: nowTime,
      from: 'sdfgdf', 
      text: message.text,
    }
    create(newMessage);
    console.log(newMessage)
    setMessage({text: ''})
  }

  return(
    <div className="p-4 mb-3 bg-light rounded">
      <h4 className="fst-italic text-black">Сообщение</h4>
      <form>
          <div className="mb-3">
              <textarea className="form-control" id="exampleFormControlTextarea1" value={message.text} onChange={e => setMessage({...message, text: e.target.value})} rows="3"></textarea>
              <div id="emailHelp" className="form-text">Вы можете использовать md разметку.</div>
          </div>
          <button type="submit" onClick={addNewMessage} className="btn btn-primary">Отправить</button>
          {message.text.length > 0 ? <MesLoockLike text={message.text}/> : ''}
      </form>
    </div>
  );
}

export default MesForm;
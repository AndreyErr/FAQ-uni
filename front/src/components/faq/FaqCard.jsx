import React, { useContext, useState } from "react";
import '../../styles/faq.css';
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Context } from "../..";
import MesLoockLike from "../authorized/messages/chat/MesLoockLike";
import MessageText from "../ui/MessageText";
import Loader from "../ui/Loader";
import { saveLikeAct, updateFaqAct } from "../../http/faqAPI";
import { Link } from "react-router-dom";

function FaqCard(props){

    const {user} = useContext(Context)
    const [editCartState, setEditCartState] = useState(false);
    const [type, setType] = useState(props.allAboutFaq.typeoffaq);
    const [textQ, setTextQ] = useState(props.allAboutFaq.qwest);
    const [textA, setTextA] = useState(props.allAboutFaq.ans);
    const [error, setError] = useState('')
    const [like, setLike] = useState(0)
    const [isLoading, setIsLoading] = useState(false)

    function ansHelp(){
        if(like == 0){
            return <span><p>Вам помог данный ответ? </p>
            <button onClick={() => {saveLike(1)}} type="button" className="btn btn-success btn-sm me-2"><i className="fa-solid fa-thumbs-up"></i></button>
            <button onClick={() => {saveLike(-1)}} type="button" className="btn btn-danger btn-sm me-2"><i className="fa-solid fa-thumbs-down"></i></button></span>
        }else if(like == 1){
            return <span className="text-primary text-opacity-75">Мы рады, что смогли вам помочь</span>
        }else{
            return <span className="text-primary text-opacity-75">Мы постараемся стать лучше</span>
        }
    }

    let group = ''
    {props.titleTypes.map(types => 
        types.faqtypeid === type ? group = types.title : ''
    )}

    function ansHelpResult(){
        props.allAboutFaq.dateadd = props.allAboutFaq.dateadd.substring(0, props.allAboutFaq.dateadd.length - 14)
        return <span>Доступность ответа для пользователей:
            <span className="text-success text-opacity-75 pe-2 ps-1"><i className="fa-solid fa-thumbs-up"></i> {props.allAboutFaq.likes}</span>
            <span className="text-danger text-opacity-75"><i className="fa-solid fa-thumbs-down"></i> {props.allAboutFaq.dislikes}</span>
            <br></br>
            <span className="text-secondary text-opacity-75 pe-1">Добавил: {props.allAboutFaq.useradd}</span><br></br>
            {props.allAboutFaq.usercheck
            ? <span className="text-secondary text-opacity-75 pe-1">Проверил/изменил: {props.allAboutFaq.usercheck}<br></br></span>
            : ''
            }
            <span className="text-secondary text-opacity-75">Последнее изменение: {props.allAboutFaq.dateadd} {props.allAboutFaq.timeadd}<br></br><br></br></span>
        </span>
    }

    async function saveLike(type){
        try{
            setLike(type)
            await saveLikeAct(props.allAboutFaq.faqid, type)
          }catch(e){
            console.log(e)
            let massageErr = e.response.data.message
            setError(massageErr)
          }
    }

    function showCard(){
        return <div className="card">
            <div className="card-header" id="faqHeading-1">
                <div className="mb-0">
                    <h5 className="faq-title" data-bs-toggle="collapse" data-bs-target={`#faqCollapse-${props.allAboutFaq.faqid}`} aria-expanded="false" aria-controls={`faqCollapse-${props.allAboutFaq.faqid}`}>
                        <b>{props.allAboutFaq.qwest}</b>
                        {user.user['status'] > 3 ? <span><button onClick={() => {props.dFaq(props.allAboutFaq.faqid)}} type="button" className="btn btn-outline-danger btn-sm float-end">{props.type === 'uncheck' ? 'Отказаться' : 'Удалить'}</button></span> : '' }
                    </h5>
                </div>
            </div>
            <div id={`faqCollapse-${props.allAboutFaq.faqid}`} className="collapse" aria-labelledby={`faqHeading-${props.allAboutFaq.faqid}`} data-bs-parent={`#accordion-${props.faqsGroupTitleId}`}>
                <div className="card-body text-start">Ответ:
                    <div><ReactMarkdown>{props.allAboutFaq.ans}</ReactMarkdown></div>
                    <hr></hr>
                    {error.length > 0
                    ? <MessageText text={error} typeOf={'danger'} /> 
                    : ''}
                    {props.search || props.type === 'uncheck' ? <span className="text-muted float-end">Из группы "{props.type === 'uncheck' ? group : props.allAboutFaq.title}"</span> : ''}
                    {user.user['status'] > 3 ? ansHelpResult() : ansHelp()}
                    {user.user['status'] > 3 
                    ?   <span>
                            <button onClick={() => {setEditCartState(true)}} type="button" className="btn btn-outline-primary btn-sm me-2">Изменить</button>
                            {props.type === 'uncheck' ? <button onClick={() => {saveFaqChange()}} type="button" className="btn btn-outline-primary btn-sm me-2">Опубликовать</button> : ''}
                            <button onClick={() => {props.dFaq(props.allAboutFaq.faqid)}} type="button" className="btn btn-outline-danger btn-sm">{props.type === 'uncheck' ? 'Отказаться' : 'Удалить'}</button>
                        </span>
                    : ''}
                </div>
            </div>
        </div>
    }

    function cancelEdit(){
        setType(props.allAboutFaq.typeoffaq)
        setTextQ(props.allAboutFaq.qwest)
        setTextA(props.allAboutFaq.ans)
        setEditCartState(false)
        setError('')
    }

    function editCart(){
        return <div className="card">
        <div className="card-header" id="faqHeading-1">
            <div className="mb-0">
                <h5 className="faq-title" data-bs-toggle="collapse"aria-expanded="false">
                <b><input value={textQ} onChange={e => setTextQ(e.target.value)} id="textQ" className="form-control" type="text" placeholder="Вопрос" aria-label=".form-control-sm example"></input></b>
                </h5>
            </div>
        </div>
        <div id={`faqCollapse-${props.allAboutFaq.faqid}`} className="collapse" aria-labelledby={`faqHeading-${props.allAboutFaq.faqid}`} data-bs-parent="#accordion">
            <div className="card-body text-start">Ответ:
                <div><textarea value={textA} className="form-control" id="textA" rows="3" onChange={e => setTextA(e.target.value)}></textarea></div>
                {textA.length > 0 ? <MesLoockLike text={textA}/> : ''}
                <select value={type} onChange={e => setType(e.target.value)} id="type" className="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
                {props.titleTypes.map(types => 
                  <option key={types.faqtypeid} value={types.faqtypeid}>{types.title}</option>
                )}
                </select>
                <hr></hr>
                {isLoading === true
                ? <Loader />
                : ''}
                {error.length > 0 
                ? error === 'OK' 
                  ? <MessageText text={'Сохранено'} typeOf={'success'} /> 
                  : <MessageText text={error} typeOf={'danger'} /> 
                : ''}
                {user.user['status'] > 3 
                ?   <span>
                        <button onClick={() => {saveFaqChange()}} type="button" className="btn btn-success btn-sm me-2">{props.type === 'uncheck' ? 'Опубликовать' : 'Сохранить изменение'}</button>
                        <button onClick={() => {cancelEdit()}} type="button" className="btn btn-outline-secondary btn-sm me-2">Отменить изменение</button>
                        <button onClick={() => {setError(''); setEditCartState(false)}} type="button" className="btn btn-outline-secondary btn-sm me-2">Назад</button>
                        <button onClick={() => {props.dFaq(props.allAboutFaq.faqid)}} type="button" className="btn btn-outline-danger btn-sm">{props.type === 'uncheck' ? 'Отказаться' : 'Удалить FAQ'}</button>
                    </span>
                : ''}
            </div>
        </div>
    </div>
    }

    function getRandomInRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

    async function saveFaqChange(){
        try{
            setIsLoading(true)
            await updateFaqAct(props.allAboutFaq.faqid, type, textQ, textA).then((result) => {
              setError('OK')
              setIsLoading(false)
            })
            props.setTypeChange(textA + getRandomInRange(1, 10))
          }catch(e){
            console.log(e)
            let massageErr = e.response.data.message
            massageErr += ' ( ' + e.response.data.errors[0]['param'] + ' ) '
            setError(massageErr)
            setIsLoading(false)
          }
    }

    return(
        <div>
            {editCartState 
            ? editCart() : showCard()}
        </div>
    );
}

export default FaqCard;
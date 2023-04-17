import React, { useEffect, useState } from "react";
import { addTypeTitle, deleteTypeTitle, fatchTitles } from "../../http/faqAPI";
import MessageText from "../ui/MessageText";
import Loader from "../ui/Loader";
import MessageToastContainer from "../ui/MessageToastContainer";
import { Link } from "react-router-dom";

function FaqNewType(props){
    const [typeTitle, setTypeTitle] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [stat, setStat] = useState([])
    const [typeOfDeleteAction, setTypeOfDeleteAction] = useState(1)





    async function addTypeTitleAction(event){
        try{
          setIsLoading(true)
          event.preventDefault();
          await addTypeTitle(typeTitle).then((result) => {
            props.setTitleTypes([...props.titleT, result])
            setError('OK')
          })
          setIsLoading(false)
          setTypeTitle('')
        }catch(e){
          let massageErr = e.response.data.message
          console.log(e.response.data)
          setError(massageErr)
          setIsLoading(false)
        }
      }

      async function deleteTypeTitleAction (id) {
        try{
          setIsLoading(true)
            const status = await deleteTypeTitle(id, typeOfDeleteAction)
            if(status == "OK"){
              props.setTitleTypes(props.titleT.filter(item => item.faqtypeid !== id))
            }
            setIsLoading(false)
        }catch(e){
            let massageErr = e.response.data.message
            setStat([massageErr, ...stat])
            setIsLoading(false)
        }
    }


    return(
        <div className="pt-3 pb-3">
            {stat.length > 0 
            ? <MessageToastContainer messages={stat} />
            : ''}
            <div className="d-grid gap-2">
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newFaqT">
                  Изменить тип FAQ
                </button>
            </div>

            <div className="modal fade modal-lg" id="newFaqT" tabIndex="-1" aria-labelledby="newFaqT" data-backdrop="false" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header text-dark">
                    <h1 className="modal-title fs-5" id="newFaqT">Изменить тип FAQ 
                    {props.isTitleLoad ? <Loader /> : ''}
                    {isLoading ? <Loader /> : ''}
                    </h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <form>
                    <div className="modal-body text-dark">
                      <div className="input-group mb-3">
                        <label className="input-group-text" htmlFor="typeTitleValue">При удалении группы, все связанные с ней Faqs</label>
                        <select value={typeOfDeleteAction} onChange={e => setTypeOfDeleteAction(e.target.value)} id="typeTitleValue" className="form-select">
                        <option value='1'>переместить в группу "другое"</option>
                        <option value='2'>удалить</option>
                      </select>
                      </div>
                        <div className="modal-title fs-5" id="staticBackdropLabel">Существующие типы:</div>
                        <table className="table table-striped table-hover">
                          <thead>
                            <tr>
                              <th scope="col">id</th>
                              <th scope="col">Название</th>
                              <th scope="col">Посмотреть</th>
                              <th scope="col">Действие</th>
                            </tr>
                          </thead>
                          <tbody>
                          {props.titleT.map(types => 
                            <tr key={types.faqtypeid}>
                              <th scope="row">{types.faqtypeid}</th>
                              <td>{types.title}</td>
                              <td><Link to={`/faq/${types.faqtypeid}`}><button type="button" className="btn btn-outline-primary btn-sm" data-bs-dismiss="modal">Раздел "{types.title}"</button></Link></td>
                              <td>
                                {types.faqtypeid === 1 
                                ? 'Нет действий'
                                : <button type="button" onClick={() => {deleteTypeTitleAction(types.faqtypeid)}} className="btn btn-outline-danger btn-sm">Удалить</button>}
                                </td>
                            </tr>
                            )}
                          </tbody>
                        </table>
                        <div className="modal-title fs-5" id="staticBackdropLabel">Название нового типа:</div>
                        <div className="mb-3">
                            <textarea value={typeTitle} onChange={e => setTypeTitle(e.target.value)} className="form-control" id="typeTitle" rows="3"></textarea>
                        </div>
                        {isLoading === true
                        ? <Loader />
                        : ''}
                        {error.length > 0 
                        ? error === 'OK' 
                          ? <MessageText text={'Создано'} typeOf={'success'} /> 
                          : <MessageText text={error} typeOf={'danger'} /> 
                        : ''}
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                      <button onClick={addTypeTitleAction} type="button" className="btn btn-success">Создать</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
        </div>
    );
}

export default FaqNewType;
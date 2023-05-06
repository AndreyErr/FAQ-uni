import React, { useContext, useEffect, useMemo, useState } from "react";
import { deleteUser, fatchUsers, searchUsersAct, selectUsersTypes } from "../../../http/userAPI";
import Loader from "../../ui/Loader";
import AuUsersCard from "./AuUsersCard";
import MessageToastContainer from "../../ui/MessageToastContainer";
import { selectConfigData } from "../../../http/anotherAPI";
import { Context } from "../../..";

function AuUsers(){
    const {user} = useContext(Context)
    const [users, setUser] = useState([]);
    const [usersStatuses, setUsersStatuses] = useState([]);
    const [limitForPosts, setLimitForPosts] = useState(5);
    const [pageForPosts, setPageForPosts] = useState(1);
    const [totalPageForUsers, setTotalPageForUsers] = useState(0);
    const [isUsersLoading, setIsUsersLoading] = useState(true)
    const [stat, setStat] = useState([])
    const [mainLogin, setMainLogin] = useState('')
    const [searchStr, setSearchStr] = useState('');
    const [searchUsers, setSearchUsers] = useState([])
    const [searchTimeout, setSearchTimeout] = useState(false)
    const [searchLoader, setSearchLoader] = useState(false)


    useEffect(() => {
        document.title = 'Пользователи';
        setTimeout(() => {
            fatchUsers(limitForPosts, pageForPosts).then((result) => {
                if(user.user['status'] === 5){
                    selectConfigData().then((result) => {
                        setMainLogin(result.data[0])
                    })
                }
                setUser(result.data[0])
                setTotalPageForUsers(getPageCount(result.data[1], limitForPosts))
                setIsUsersLoading(false)
                setStat([])
                //setStat(['', ...stat])
            })
            selectUsersTypes().then((result) => {
                setUsersStatuses(result)
            })
    }, 0)
    }, [pageForPosts])

    let pagesArray = []
    for(let i = 0; i < totalPageForUsers; i++){
        pagesArray.push(i+1)
    }

    const getPageCount = (totalCount, limit) => {
        return Math.ceil(totalCount / limit)
    }

    const changePage = (pageNum) => {
        setIsUsersLoading(true)
        setPageForPosts(pageNum)
        if(pageNum === pageForPosts){
            setIsUsersLoading(false)
        }
    }

    async function dUser (id) {
        try{
            const status = await deleteUser(id)
            if(status.data == "OK"){
                setUser(users.filter(item => item.user_id !== id))
            }
        }catch(e){
            let massageErr = e.response.data.message
            setStat([massageErr, ...stat])
        }
    }

    function search(str){
        setSearchStr(str)
        if(searchTimeout != false){
            clearTimeout(searchTimeout)
        }
        if(str != ''){
            setSearchLoader(true)
            setSearchTimeout(setTimeout(() => {
                try{
                    searchUsersAct(str, 10).then((result) => {
                        setSearchUsers(result.data)
                        setSearchLoader(false)
                    })
                }catch(e){
                    let massageErr = e.response.data.message
                    setStat([massageErr, ...stat])
                    setSearchLoader(false)
                }
            }, 500))
        }else{
            setSearchUsers([])
        }
    }

    function usersSearchResults(){
        if(searchStr != ''){
            if(searchLoader){
                return <div><h4 className="fst-italic text-black">Поиск... {isUsersLoading ? <Loader /> : null}</h4></div>
            }else{
                return <div>
                {searchUsers != 'null' 
                ? <div className="bg-light p-3 border rounded">
                  <h4 className="fst-italic text-black">Результаты поиска</h4>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                              <th scope="col">id</th>
                              <th scope="col">Логин</th>
                              <th scope="col">Статус</th>
                              <th scope="col">Действие / коэффициент выпадения чатов</th>
                            </tr>
                          </thead>
                        <tbody>
                            {searchUsers.map( user =>
                                <AuUsersCard key={user.user_id} data={user} delete={dUser} usersStatuses={usersStatuses} mainLogin={mainLogin} setStat={setStat} stat={stat}/>
                            )} 
                        </tbody>
                    </table>  

                  </div>
                : <p className="fst-italic text-black">Никто не найден</p>}
                </div>
            }
        }else{
            return null
        }
    }
    
    return(
        <div className="p-4 mb-3 bg-light rounded">
            <div className="input-group mb-3">
                <input value={searchStr} onChange={e => search(e.target.value)} id="search" type="text" className="form-control" placeholder="Поиск по login или email" aria-label="Поиск по login или email" aria-describedby="button-addon2"></input>
                {searchStr != '' ? <button onClick={() => {setSearchStr('')}} className="btn btn-outline-primary" type="button" id="button-addon2">Отчистить</button> : null}
            </div>
            {stat.length > 0 
            ? <MessageToastContainer messages={stat} />
            : null}
            {usersSearchResults()}
            <h4 className="fst-italic text-black">Все пользователи {isUsersLoading ? <Loader /> : null}</h4>
            <table className="table table-hover">
                <thead>
                    <tr>
                      <th scope="col">id</th>
                      <th scope="col">Логин</th>
                      <th scope="col">Статус</th>
                      <th scope="col">Действие / коэффициент выпадения чатов</th>
                    </tr>
                  </thead>
                <tbody>
                    {users.map(user => 
                    <AuUsersCard data={user} key={user.user_id} delete={dUser} usersStatuses={usersStatuses} mainLogin={mainLogin} setStat={setStat} stat={stat} />
                    )} 
                </tbody>
            </table>  
            <div className="d-grid gap-2">
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                {pagesArray.map(p => 
                    <li key={p} onClick={() => changePage(p)} className={`page-item ${pageForPosts === p ? 'active' : null}`}><a className="page-link" href="#">{p}</a></li>
                )}
                </ul>
            </nav>
            </div>
        </div>
    );
}

export default AuUsers;
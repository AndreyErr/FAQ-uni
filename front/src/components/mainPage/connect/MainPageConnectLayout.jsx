import React from "react";
import MainPageConnectCard from "./MainPageConnectCard";


function MainPageConnectLayout(props){
    return(
        <div className="container">
            <div className="row">
                <div className="container px-4 py-5">
                    {props.status === 1 || props.status === 2 
                    ? <h2 className="pb-2 border-bottom">Моего вопроса нет в базе знаний, что делать?</h2>
                    : <h2 className="pb-2 border-bottom">Моего вопроса нет в базе знаний, что я ещё могу сделать?</h2>
                    }
                    <div className="justify-content-md-center">
                        {props.status === 1 
                        ? <MainPageConnectCard cartType={'message'} title={'Задать вопрос'} descr={'Задайте вопрос и наш сотрудник ответит вам, как только сможет! Время ответа может доходить до 5 дней.'} button={true} /> 
                        : props.status === 2 
                        ? <MainPageConnectCard cartType={'headset'} title={'Прямой чат'} descr={'Свяжитесь с поддержкой в прямом чате'} button={true}/> 
                        :   <div className="row g-4 py-5 row-cols-1 row-cols-lg-3 justify-content-md-center">
                            <MainPageConnectCard cartType={'message'} title={'Задать вопрос'} descr={'Если вы зарегистрированный пользователь, то вы сможете задайте вопрос в чат, и наш сотрудник ответит вам, как только сможет! Время ответа может доходить до 5 дней.'} button={false}/> 
                            <MainPageConnectCard cartType={'headset'} title={'Прямой чат'} descr={'Если вы премиальный пользователь, то вы можете связаться с поддержкой в прямом чате!'} button={false}/> 
                            </div>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainPageConnectLayout;
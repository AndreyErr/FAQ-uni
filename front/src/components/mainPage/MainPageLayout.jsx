import React, { useContext, useEffect, useState } from "react";
import { Context } from "../..";
import FaqLayout from "../faq/FaqLayout";
import Loader from "../ui/Loader";
import MainPageConnectLayout from "./connect/MainPageConnectLayout";
import MainPageLogin from "./MainPageLogin";
import MainPageTitle from "./MainPageTitle";
import { selectAllFaqs } from "../../http/faqAPI";

function MainPageLayout(props){

    useEffect(() => {
      document.title = 'Помощь';
    }, []);

    const {user} = useContext(Context)

    let loading = props.loadingPageStatus
    const loginLayout = () => {
        if(user.isAuth || loading){
            return ''
        }else{
            return <MainPageLogin />
        }
    }

    return(
        <main>
            <MainPageTitle />
            {loginLayout()}
            <FaqLayout type={'part'} count={5} sort={'top'} blockCount={4}/>
            {user.user['status'] < 3 
            ? <MainPageConnectLayout />
            : ''
            }
        </main>
    );
}

export default MainPageLayout;
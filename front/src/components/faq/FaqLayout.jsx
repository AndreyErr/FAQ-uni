import React, { useContext, useEffect, useState } from "react";
import '../../styles/faq.css';
import FaqCardHolder from "./FaqCardHolder";
import FaqSearchForm from "./FaqSearchForm";
import FaqSearchResult from "./FaqSearchResult";
import { deleteFaq, fatchTitles, searchFaq, selectAllFaqs } from "../../http/faqAPI";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../ui/Loader";
import MessageToastContainer from "../ui/MessageToastContainer";
import LoaderPage from "../ui/LoaderPage";
import { Context } from "../..";

function FaqLayout(props){

const history = useNavigate()
const {user} = useContext(Context)
const [faqs, setFaqs] = useState([])
const [faqsLoading, setIsFaqsLoading] = useState(false);
const [pageLoading, setIsPageLoading] = useState(false);
const [ifNoFaqs, setIfNoFaqs] = useState(false);
const [stat, setStat] = useState([])
const [titleTypes, setTitleTypes] = useState([]);
const [typeChange, setTypeChange] = useState(-1);
const [searchStr, setSearchStr] = useState('');
const [searchFaqs, setSearchFaqs] = useState([])
const [searchTimeout, setSearchTimeout] = useState(false)
const [searchLoader, setSearchLoader] = useState(false)

let type = 'all', count = 5, sort = 'top', blockCount = 0, pageId = -1
if(props.type){type = props.type}
if(props.count){count = props.count}
if(props.sort){sort = props.sort}
if(props.blockCount){blockCount = props.blockCount}
if(props.pageId){pageId = props.pageId}

useEffect(() => {
    document.title = 'FAQs';
    try{
    setIsFaqsLoading(true)
    setIsPageLoading(true)
    search(searchStr)
    setTimeout(() => {
        selectAllFaqs(type, count, sort, blockCount, pageId).then((result) => {
            if(result == 'err'){
                setIfNoFaqs(true)
            }else if(result == 'err_title'){
                history('/faq')
            }else{
                setFaqs(result)
            }
            setIsFaqsLoading(false)
            setIsPageLoading(false)
        })
        if(user.user['status'] > 2){
            fatchTitles().then((result) => {
                setTitleTypes(result.data)
            })
        }
    }, 0)
    }catch(e){
        history('/faq')
    }
}, [typeChange])

async function dFaq (id) {
    try{
        setIsPageLoading(true)
        const status = await deleteFaq(id)
        if(status.data == "OK"){
            let endArr = []
            let index, len;
            for (index = 0, len = faqs.length; index < len; ++index) {
                endArr = [...endArr, [faqs[index][0], faqs[index][1], faqs[index][2].filter(item => item.faqid !== id)]]
            }
            setFaqs(endArr)
            setSearchFaqs(searchFaqs.filter(item => item.faqid !== id))
            setIsPageLoading(false)
        }
    }catch(e){
        let massageErr = e.response.data.message
        setStat([massageErr, ...stat])
        setIsPageLoading(false)
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
                searchFaq(str, 10).then((result) => {
                    setSearchFaqs(result.data)
                    setSearchLoader(false)
                })
            }catch(e){
                let massageErr = e.response.data.message
                setStat([massageErr, ...stat])
                setSearchLoader(false)
            }
        }, 500))
    }else{
        setSearchFaqs([])
    }
}

function faqTitleShow(){
    if(faqsLoading){
        return <Loader />
    }else if(ifNoFaqs){
        return  <div>
                    <h2 className="alert alert-dark mb-5 mt-5">Ни одно faq не создано</h2>
                </div>
    }else{
        if(searchStr != ''){
            if(searchLoader){
                return <div><FaqSearchForm search={search} searchStr={searchStr} setSearchStr={setSearchStr} /><Loader /></div>
            }else{
                return <div><FaqSearchForm search={search} searchStr={searchStr} setSearchStr={setSearchStr} />
                {searchFaqs != 'null' ? <FaqSearchResult faqs={searchFaqs} titleTypes={titleTypes} dFaq={dFaq} setTypeChange={setTypeChange}/>  : <p className="bg-secondary p-4 rounded-bottom">Ничего не найдено</p>}
                </div>
            }
        }else{
            return <div><FaqSearchForm search={search} searchStr={searchStr} setSearchStr={setSearchStr} /></div>
        }
    }
}

    return(
        <div className="container">
            {stat.length > 0 
            ? <MessageToastContainer messages={stat} />
            : ''}
            {pageLoading 
            ? <LoaderPage />
            : ''}
            <div className="row mb-6 text-center px-4 py-5">
                <h2 className="pb-2">{faqsLoading ? <Loader /> : ''}База знаний</h2>
                {faqTitleShow()}
                {ifNoFaqs 
                ? ''
                : faqs.map(title => 
                    <FaqCardHolder key={title[0]} id={title[0]} title={title[1]} faqs={title[2]} dFaq={dFaq} blockCount={blockCount} titleTypes={titleTypes} setTypeChange={setTypeChange}/>
                )}
            </div>
        </div>
    );
}

export default FaqLayout;
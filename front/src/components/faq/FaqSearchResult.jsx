import React from "react";
import '../../styles/faq.css';
import FaqCard from "./FaqCard";

function FaqSearchResult(props){
    const id = 'searchFaqslol'
    return(
        <div className="col-md-12 themed-grid-col bg-secondary p-4 rounded-bottom">
            <h2 className="pb-2">Результаты поиска</h2>
            <div className="faq " id={`accordion-${id}`}>
            {props.faqs.map( faq =>
                    <FaqCard key={faq.faqid} allAboutFaq={faq} dFaq={props.dFaq} titleTypes={props.titleTypes} setTypeChange={props.setTypeChange} faqsGroupTitleId={id} search={true}/>
                )}
            </div>
        </div>
    );
}

export default FaqSearchResult;
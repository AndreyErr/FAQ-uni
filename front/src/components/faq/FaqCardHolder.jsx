import React from "react";
import '../../styles/faq.css';
import FaqCard from "./FaqCard";
import FaqCardLink from "./FaqCardLink";

function FaqCardHolder(props){

    let widthSize = 6
    if(props.blockCount == 1){
        widthSize = 12
    }

    return(
        <div className={`col-md-${widthSize} themed-grid-col`}>
            <div className="faq-title text-center pb-3">
                <h2>{props.title}</h2>
            </div>
            <div className="faq " id={`accordion-${props.id}`}>
                {props.faqs.map( faq =>
                    <FaqCard key={faq.faqid} type={props.type} allAboutFaq={faq} dFaq={props.dFaq} titleTypes={props.titleTypes} setTypeChange={props.setTypeChange} faqsGroupTitleId={props.id}/>
                )}
                {widthSize == 6 
                ? <FaqCardLink faqLink={props.id} title={props.title} />
                : ''
                }
            </div>
        </div>
    );
}

export default FaqCardHolder;
import React from "react";
import '../../styles/faq.css';
import FaqCard from "./FaqCard";
import FaqCardLink from "./FaqCardLink";

function FaqCardHolder(){
    return(
        <div className="col-md-6 themed-grid-col">
            <div className="faq-title text-center pb-3">
                <h2>FAQ</h2>
            </div>
            <div className="faq " id="accordion">
                <FaqCard />
                <FaqCard />
                <FaqCard />
                <FaqCard />
                <FaqCard />
                <FaqCardLink />
            </div>
        </div>
    );
}

export default FaqCardHolder;
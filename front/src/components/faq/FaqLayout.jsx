import React from "react";
import '../../styles/faq.css';
import FaqCardHolder from "./FaqCardHolder";
import FaqSearchForm from "./FaqSearchForm";
import FaqSearchResult from "./FaqSearchResult";

function FaqLayout(){
    return(
        <div className="container">
            <div className="row mb-6 text-center px-4 py-5">
                <h2 className="pb-2">База знаний</h2>
                <FaqSearchForm />
                <FaqSearchResult />
                <FaqCardHolder />
                <FaqCardHolder />
                <FaqCardHolder />
                <FaqCardHolder />
            </div>
        </div>
    );
}

export default FaqLayout;
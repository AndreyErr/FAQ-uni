import React from "react";
import '../../styles/faq.css';
import { Link } from "react-router-dom";

function FaqCardLink(props){
    return(
        <Link to={`/faq/${props.faqLink}`} className="a">
            <div className="card">
                <div className="card-header" id="faqHeading-1">
                    <div className="mb-0">
                        <h5 className="faq-title lead text-primary">Посмотреть больше по теме "{props.title}"</h5>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default FaqCardLink;
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import '../../styles/faq.css';
import FaqLayout from "./FaqLayout";

function FaqTopicPageLayout(){

    const pageId = useParams().topicId
    useEffect(() => {
        document.title = 'FAQs';
    }, [])

    return(
        <main>
            <FaqLayout type={'part'} count={-1} sort={'top'} blockCount={1} pageId={pageId}/>
            <div className="container">
                <div className="d-grid gap-2 mb-5">
                  <Link to="/faq" type="button" className="btn btn-secondary">Ко всем типам</Link>
                </div>
            </div>
        </main>
    );
}

export default FaqTopicPageLayout;
import React, { useEffect, useState } from "react";
import { Link, Navigate, Route, Routes, useNavigate, useParams } from "react-router-dom";
import '../../styles/faq.css';
import FaqCard from "./FaqCard";
import { deleteFaq, selectAllAboutFaqTitle, selectFaqsByType } from "../../http/faqAPI";
import NotFound from "../NotFound";
import LoaderPage from "../ui/LoaderPage";
import Loader from "../ui/Loader";
import MessageToastContainer from "../ui/MessageToastContainer";
import FaqLayout from "./FaqLayout";

function FaqTopicPageLayout(){

    const pageId = useParams().topicId

    return(
        <main>
            <FaqLayout type={'part'} count={-1} sort={'top'} blockCount={1} pageId={pageId}/>
            <div className="d-grid gap-2 mt-5 me-5 ms-5">
              <Link to="/faq" type="button" className="btn btn-secondary">Ко всем типам</Link>
            </div>
        </main>
    );
}

export default FaqTopicPageLayout;
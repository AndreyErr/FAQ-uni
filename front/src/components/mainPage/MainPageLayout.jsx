import React from "react";
import FaqLayout from "../faq/FaqLayout";
import MainPageConnectLayout from "./connect/MainPageConnectLayout";
import MainPageLogin from "./MainPageLogin";
import MainPageTitle from "./MainPageTitle";

function MainPageLayout(){
    return(
        <main>
            <MainPageTitle />
            <MainPageLogin />
            <FaqLayout />
            <MainPageConnectLayout />
        </main>
    );
}

export default MainPageLayout;
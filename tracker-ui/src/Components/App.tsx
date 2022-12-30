import { Routes, Route, useNavigate } from "react-router-dom";

import { MsalProvider } from "@azure/msal-react";
import { IPublicClientApplication } from "@azure/msal-browser";
import { CustomNavigationClient } from "../Utils/NavigationClient";

import { PageLayout } from "./PageLayout";

type AppProps = {
    pca: IPublicClientApplication;
};

function App({ pca }: AppProps) {


    return (
        <MsalProvider instance={pca}>
            <PageLayout />
        </MsalProvider>
    );
}

export default App;
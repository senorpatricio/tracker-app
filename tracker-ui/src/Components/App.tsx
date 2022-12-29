import { Routes, Route, useNavigate } from "react-router-dom";
// Material-UI imports
import Grid from "@mui/material/Grid";

// MSAL imports
import { MsalProvider } from "@azure/msal-react";
import { IPublicClientApplication } from "@azure/msal-browser";
import { CustomNavigationClient } from "../Utils/NavigationClient";

// Sample app imports
import { PageLayout } from "./PageLayout";
import Content from "./Content";
// import { Home } from "./pages/Home";
// import { Profile } from "./pages/Profile";

type AppProps = {
    pca: IPublicClientApplication;
};

function App({ pca }: AppProps) {
    // The next 3 lines are optional. This is how you configure MSAL to take advantage of the router's navigate functions when MSAL redirects between pages in your app
    // const history = useNavigate();
    // const navigationClient = new CustomNavigationClient(history);
    // pca.setNavigationClient(navigationClient);

    return (
        <MsalProvider instance={pca}>
            <PageLayout>
                {/* <Grid container justifyContent="center">
                    <Pages />
                </Grid> */}
            </PageLayout>
        </MsalProvider>
    );
}

// function Pages() {
//     return (
//         <Routes>
//             <Route path="/profile">
//                 {/* <Profile /> */}
//             </Route>
//             <Route path="/todos">
//                 <Content />
//             </Route>
//         </Routes>
//     );
// }

export default App;
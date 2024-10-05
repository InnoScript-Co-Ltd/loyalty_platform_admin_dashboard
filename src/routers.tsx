import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./layouts/default";
import { NotFound } from "./layouts/default/pages/NotFound";
import BlankTemplate from "./layouts/default/pages/BlankTemplate";
import { CountryRoute } from "./modules/country/country.route";


export const routers = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        errorElement: <NotFound />,
        children: [
            ...CountryRoute,
        ]
    },
    {
        path: "auth",
        element: <BlankTemplate />,
        errorElement: <NotFound />,
        children: [
            // {
            //     path: "login",
            //     element: <Login />
            // }
        ]
    }
])
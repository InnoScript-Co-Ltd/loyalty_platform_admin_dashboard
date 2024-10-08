import { paths } from "../../constants/paths"; // Ensure this path is correct
//import CityCreate from "./entry/CityCreate"; // Adjust the import path as necessary
//import CityUpdate from "./entry/CityUpdate"; // Adjust the import path as necessary
import CityList from "./view/CityList"; // Adjust the import path as necessary

export const CityRoute = [
    {
        id: "city-list",
        path: paths.cityList, // Ensure this is defined in your paths constant
        element: <CityList />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "City", url: paths.cityList },
                ],
            };
        },
    },
    // {
    //     id: "city-new",
    //     path: paths.cityCreate, // Ensure this is defined in your paths constant
    //     element: <CityCreate />,
    //     loader: () => {
    //         return {
    //             breadcrumbs: [
    //                 { label: "Dashboard", url: paths.dashboard },
    //                 { label: "City", url: paths.cityList },
    //                 { label: "Create", url: paths.cityCreate },
    //             ],
    //         };
    //     },
    // },
    // {
    //     id: "city-detail",
    //     path: paths.cityDetail, // Ensure this is defined in your paths constant
    //     element: <CityUpdate />,
    //     loader: () => {
    //         return {
    //             breadcrumbs: [
    //                 { label: "Dashboard", url: paths.dashboard },
    //                 { label: "City", url: paths.cityList },
    //             ],
    //         };
    //     },
    // },
];

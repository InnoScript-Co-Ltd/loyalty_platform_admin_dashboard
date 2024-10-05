import { useEffect } from "react";
import BrandLayout from "./components/BrandLayout";

const DefaultLayout: React.FC = () => {
    useEffect(() => {
        // Add your effect logic here
    }, []);

    return (
        <>
            {/* <AppSideBar /> */}
            <BrandLayout />
        </>
    );
};

export default DefaultLayout; // Export it as default

import * as React from "react";
import Box from "@mui/material/Box";
import { createTheme } from "@mui/material/styles";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import type { Router } from "@toolpad/core";
import { navigationList } from "../defaultPaths";
import { Outlet, useNavigate } from "react-router";
import { blue, green, grey } from "@mui/material/colors";
import NotiStack from "../../../components/NotiStack";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppRootState } from "../../../stores";
import { useSnackbar } from "notistack";
import { updateNotification } from "../../../shares/shareSlice";

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: green[500],
    },
  },
});

function Main({ pathname }: { pathname: string }) {
  let list = [];
  const formatted = pathname.split("/").filter(Boolean); // Split by '/' and filter out empty values
  list.push(...formatted); // Push the elements into the array

  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch<AppDispatch>();
  const { variant, msg } = useSelector((state: AppRootState) => state.share.notification);

  React.useEffect(() => {
    // Check if there's a message to show
    if (msg) {
      enqueueSnackbar(msg, { variant }); // Pass options object

      dispatch(updateNotification({
        msg: "",
        variant: "",
        show: false
      }));
    
    }
  }, [msg, variant]);
  
  

  return (
    <Box sx={{ width: "100%", padding: "20px" }}>
      {/* {list && list.map((path, index) => {
        return (
            <Chip sx={{ mr: '3px' }} label={path} key={index} />
        )
      })} */}
      {/* <NotiStack /> */}
      <Outlet />
    </Box>
  );
}

const BRANDING = {
  title: "Loyalty Platfrom",
  logo: <img src="/logo.png" alt="Logo" />,
};

export default function BrandLayout() {

  const [pathname, setPathname] = React.useState("/");
  const navigate = useNavigate();

  const router = React.useMemo<Router>(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  React.useEffect(() => {
    navigate(pathname);
  }, [pathname]);

  return (
    // preview-start
    <AppProvider
      navigation={navigationList}
      router={router}
      theme={demoTheme}
      branding={BRANDING}
    >
      <DashboardLayout>
        <Main pathname={pathname} />
      </DashboardLayout>
    </AppProvider>
    // preview-end
  );
}

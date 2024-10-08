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

  return (
    <Box sx={{ width: "100%", padding: "20px" }}>
      {/* {list && list.map((path, index) => {
        return (
            <Chip sx={{ mr: '3px' }} label={path} key={index} />
        )
      })} */}
      <NotiStack />
      <Outlet />
    </Box>
  );
}

interface DemoProps {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window?: () => Window;
}

const BRANDING = {
  title: "Loyalty Platfrom",
  logo: <img src="/logo.png" alt="Logo" />,
};

export default function BrandLayout(props: DemoProps) {
  const { window } = props;

  const [pathname, setPathname] = React.useState("/");
  const navigate = useNavigate();

  const router = React.useMemo<Router>(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  // Remove this const when copying and pasting into your project.
  const demoWindow = window !== undefined ? window() : undefined;

  React.useEffect(() => {
    navigate(pathname);
  }, [pathname]);

  return (
    // preview-start
    <AppProvider
      navigation={navigationList}
      router={router}
      theme={demoTheme}
      window={demoWindow}
      branding={BRANDING}
    >
      <DashboardLayout>
        <Main pathname={pathname} />
      </DashboardLayout>
    </AppProvider>
    // preview-end
  );
}

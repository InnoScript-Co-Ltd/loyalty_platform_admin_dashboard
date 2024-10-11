import { Box, Button, Card, Grid2, TextField } from "@mui/material";
import { useState } from "react";
import { countryPayload } from "../country.payload";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppRootState } from "../../../stores";
import { COUNTRY_STORE, countryService } from "../country.service";
import { payloadHandler } from "../../../helpers/handler";
import { Breadcrumb } from "../../../components/Breadcrumb";
import ValidationMessage from "../../../components/ValidationMessage";
import { paths } from "../../../constants/paths";

const CountryCreate = () => {
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState<COUNTRY_STORE["create"]>(
    countryPayload.create
  );

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  // const {  } = useSelector((state: AppRootState) => state.share);

  const submitCountryCreate = async () => {
    setLoading(true);
    // const form : COUNTRY_STORE = formBuilder(payload, countryPayload.create);
    console.log(payload);
    const response = await countryService.store(payload, dispatch);
    // if (response.data) {
    //   navigate(`${paths.country}/${response.data.id}`);
    // }
    setLoading(false);
  };

  return (
    <Box>

      <Breadcrumb />

      <Card sx={{ marginTop: "20px", padding: "20px" }}>
        <h2>Country Create</h2>
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 6, md: 3 }}>
            <TextField
              id="outlined-basic"
              label="Country Name"
              fullWidth
              variant="filled"
              placeholder="Enter region name"
              disabled={loading}
              onChange={(e) =>
                payloadHandler(
                  payload,
                  e.target.value,
                  "Name",
                  (updateValue) => {
                    setPayload(updateValue);
                  }
                )
              }
            />
          </Grid2>
          <Grid2 size={{ xs: 6, md: 3 }}>
            <TextField
              id="outlined-basic"
              label="Zip Code"
              fullWidth
              variant="filled"
              disabled={loading}
              onChange={(e) =>
                payloadHandler(
                  payload,
                  e.target.value,
                  "ZipCode",
                  (updateValue) => {
                    setPayload(updateValue);
                  }
                )
              }
            />
          </Grid2>
          <Grid2 size={{ xs: 6, md: 3 }}>
            <TextField
              id="outlined-basic"
              label="Mobile Prefix Number"
              fullWidth
              variant="filled"
              disabled={loading}
              onChange={(e) =>
                payloadHandler(
                  payload,
                  e.target.value,
                  "MobilePrefixNumber",
                  (updateValue) => {
                    setPayload(updateValue);
                  }
                )
              }
            />
          </Grid2>
          <Grid2 size={{ xs: 6, md: 3 }}>
            <TextField
              id="outlined-basic"
              label="FlagIcon"
              fullWidth
              variant="filled"
              disabled={loading}
              onChange={(e) =>
                payloadHandler(
                  payload,
                  e.target.value,
                  "FlagIcon",
                  (updateValue) => {
                    setPayload(updateValue);
                  }
                )
              }
            />
          </Grid2>
        </Grid2>

        {/* footer */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          <Button variant="outlined" onClick={() => navigate(paths.countryList)} >Cancle</Button>
          <Button variant="contained" onClick={submitCountryCreate}>
            Submit
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default CountryCreate;

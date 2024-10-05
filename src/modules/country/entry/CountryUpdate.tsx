import { Box, Button, Card, Grid2, TextField } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { countryPayload } from "../country.payload";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppRootState } from "../../../stores";
import { COUNTRY_UPDATE, countryService } from "../country.service";
import { payloadHandler } from "../../../helpers/handler";
import { paths } from "../../../constants/paths";
import { Breadcrumb } from "../../../components/Breadcrumb";

const CountryUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState<COUNTRY_UPDATE["update"]>(
    countryPayload.update
  );

  const params: any = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { country } = useSelector((state: AppRootState) => state.country);

  const submitCountryUpdate = async () => {
    setLoading(true);
    // const form : COUNTRY_STORE = formBuilder(payload, countryPayload.create);
    const response = await countryService.update(dispatch, params.id, payload);
    if (response.data) {
      navigate(`${paths.countryList}`);
    }
    setLoading(false);
  };

  const lodaingData = useCallback(async () => {
    setLoading(true);
    await countryService.show(dispatch, params.id);
    setLoading(false);
  }, [params.id]);

  useEffect(() => {
    lodaingData();
  }, [lodaingData]);

  useEffect(() => {
    if (country) {
      setPayload(country);
    }
  }, [country]);

  console.log(Object.keys(payload));

  return (
    <Box>

    <Breadcrumb />

      <Card sx={{ marginTop: "20px", padding: "20px" }}>
        <h2>Country Update</h2>

        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 6, md: 3 }}>
            <TextField
              id="outlined-basic"
              label="Country Name"
              fullWidth
              title="Country Name"
              type="text"
              variant="filled"
              placeholder="Enter country name"
              disabled={loading}
              defaultValue={payload.name}
              value={payload ? payload.name : ""}
              onChange={(e) =>
                payloadHandler(
                  payload,
                  e.target.value,
                  "name",
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
              title="Mobile Prefix"
              type="text"
              variant="filled"
              placeholder="Enter mobile prefix"
              fullWidth
              disabled={loading}
              defaultValue={
                payload.mobilePrefixNumber ? payload.mobilePrefixNumber : ""
              }
              value={
                payload.mobilePrefixNumber ? payload.mobilePrefixNumber : ""
              }
              onChange={(e) =>
                payloadHandler(
                  payload,
                  e.target.value,
                  "mobilePrefixNumber",
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
              title="Flag Icon"
              type="text"
              variant="filled"
              placeholder="Enter flag icon"
              disabled={loading}
              defaultValue={payload.flagIcon ? payload.flagIcon : ""}
              value={payload.flagIcon ? payload.flagIcon : ""}
              onChange={(e) =>
                payloadHandler(
                  payload,
                  e.target.value,
                  "flagIcon",
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
          <Button variant="outlined">Cancle</Button>
          <Button variant="contained" onClick={submitCountryUpdate}>
            Submit
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default CountryUpdate;

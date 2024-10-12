import {
  Box,
  Button,
  Card,
  FormControl,
  FormHelperText,
  Grid2,
  Input,
  InputLabel,
} from "@mui/material";
import { useState } from "react";
import { countryPayload } from "../country.payload";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../stores";
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

  const submitCountryCreate = async () => {
    setLoading(true);
    console.log(payload);
    const response = await countryService.store(payload, dispatch);
    if (response.status === 201) {
      navigate(`${paths.countryList}`);
    }
    setLoading(false);
  };

  return (
    <Box>
      <Breadcrumb />

      <Card sx={{ marginTop: "20px", padding: "20px" }}>
        <h2>Country Create</h2>
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 6, md: 3 }}>
            {/* <TextField
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
            /> */}
            <FormControl variant="filled" fullWidth>
              <InputLabel htmlFor="country_name">Country Name</InputLabel>
              <Input
                id="country_name"
                aria-describedby="country_name_text"
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
              <FormHelperText id="country_name_text">
                Enter region name
              </FormHelperText>
            </FormControl>
          </Grid2>
          <Grid2 size={{ xs: 6, md: 3 }}>
            {/* <TextField
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
            /> */}
            <FormControl variant="filled" fullWidth>
              <InputLabel htmlFor="zip_code">Zip Code</InputLabel>
              <Input
                id="zip_code"
                aria-describedby="zip_code_text"
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
              <FormHelperText id="zip_code_text">Enter zip code</FormHelperText>
            </FormControl>
          </Grid2>
          <Grid2 size={{ xs: 6, md: 3 }}>
            {/* <TextField
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
            /> */}
            <FormControl variant="filled" fullWidth>
              <InputLabel htmlFor="mobile_prefix">
                Mobile Prefix Number
              </InputLabel>
              <Input
                id="mobile_prefix"
                aria-describedby="mobile_prefix_text"
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
              <FormHelperText id="mobile_prefix_text">
                Enter Mobile Prefix Number
              </FormHelperText>
            </FormControl>
          </Grid2>
          <Grid2 size={{ xs: 6, md: 3 }}>
            {/* <TextField
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
            /> */}
            <FormControl variant="filled" fullWidth>
              <InputLabel htmlFor="flag_icon">Flag Icon</InputLabel>
              <Input
                id="flag_icon"
                aria-describedby="flag_icon_text"
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
              <FormHelperText id="flag_icon_text">
                Enter Flag Icon
              </FormHelperText>
            </FormControl>
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

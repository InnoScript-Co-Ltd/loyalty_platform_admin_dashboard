import * as React from "react";
import {
  Box,
  Button,
  Card,
  FormControl,
  FormHelperText,
  Grid2,
  Input,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import { statePayload } from "../state.payload"; // Import the state payload
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../stores";
import { STATE_STORE, stateService } from "../state.service"; // Import state service and payload type
import {
  httpErrorHandler,
  httpServiceHandler,
  payloadHandler,
} from "../../../helpers/handler";
import { Breadcrumb } from "../../../components/Breadcrumb";
import ValidationMessage from "../../../components/ValidationMessage"; // For validation messages
import { paths } from "../../../constants/paths";
import { getRequest } from "../../../helpers/api";
import { endpoints } from "../../../constants/endpoints";
import { COUNTRY } from "../../country/country.payload";

const StateCreate = () => {
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState<STATE_STORE["create"]>(
    statePayload.create
  );
  const [countryLists, setCountryLists] = useState<Array<any>>([]);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const submitStateCreate = async () => {
    setLoading(true);
    const response = await stateService.store(payload, dispatch);
    if (response.status === 201) {
      navigate(`${paths.stateList}`);
    }
    setLoading(false);
  };

  const loadingData = React.useCallback(async () => {
    setLoading(true);
    try {
      const response: any = await getRequest(`${endpoints.country}`, null);
      await httpServiceHandler(dispatch, response);
      if (response && "data" in response && response.status === 200) {
        setCountryLists(response.data.countries);
      }
    } catch (error) {
      await httpErrorHandler(error);
    }

    setLoading(false);
  }, []);

  React.useEffect(() => {
    loadingData();
  }, []);

  return (
    <Box>
      <Breadcrumb />
      <Card sx={{ marginTop: "20px", padding: "20px" }}>
        <h2>State Create</h2>

        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 6, md: 3 }}>
            <FormControl variant="filled" fullWidth>
              <InputLabel htmlFor="country_name">Name</InputLabel>
              <Select
                id="country_name"
                aria-describedby="country_name_text"
                disabled={loading}
                label="Country"
                value={payload.countryId || ""}
                onChange={(e: SelectChangeEvent) => {
                  payloadHandler(
                    payload,
                    e.target.value,
                    "countryId",
                    (updateValue) => {
                      setPayload(updateValue);
                    }
                  );
                }}
              >
                {countryLists?.map((country: COUNTRY) => {
                  return (
                    <MenuItem
                      defaultValue={0}
                      key={country.id}
                      value={country.id}
                    >
                      {country.name}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText id="state_country_text">
                Choose country name
              </FormHelperText>
            </FormControl>
          </Grid2>

          <Grid2 size={{ xs: 6, md: 3 }}>
            <FormControl variant="filled" fullWidth>
              <InputLabel htmlFor="state_name">Name</InputLabel>
              <Input
                id="state_name"
                aria-describedby="state_name_text"
                disabled={loading}
                onChange={(e) => {
                  payloadHandler(
                    payload,
                    e.target.value,
                    "name",
                    (updateValue) => {
                      setPayload(updateValue);
                    }
                  );
                }}
              />
              <FormHelperText id="state_name_text">
                Enter state name
              </FormHelperText>
            </FormControl>
          </Grid2>

          <Grid2 size={{ xs: 6, md: 3 }}>
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
            <FormControl variant="filled" fullWidth>
              <InputLabel htmlFor="profile">
                Profile
              </InputLabel>
              <Input
                id="profile"
                aria-describedby="profile"
                disabled={loading}
                onChange={(e) =>
                  payloadHandler(
                    payload,
                    e.target.value,
                    "profile",
                    (updateValue) => {
                      setPayload(updateValue);
                    }
                  )
                }
              />
              <FormHelperText id="profile">
                Choose profile
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
          <Button variant="outlined" onClick={() => navigate(paths.stateList)}>
            Cancle
          </Button>
          <Button variant="contained" onClick={submitStateCreate}>
            Submit
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default StateCreate;

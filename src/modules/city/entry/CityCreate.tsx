import * as React from "react";
import {
  Box,
  Button,
  Card,
  FormControl,
  FormHelperText,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { cityPayload } from "../city.payload"; // Import city payload
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../stores";
import { CITY_STORE, cityService } from "../city.service"; // Import city service
import { payloadHandler } from "../../../helpers/handler";
import { Breadcrumb } from "../../../components/Breadcrumb";
import { getRequest } from "../../../helpers/api";
import { endpoints } from "../../../constants/endpoints";
import { COUNTRY } from "../../country/country.payload"; // Import country and state types
import { STATE } from "../../state/state.payload"; // Assuming there is a state payload
import { paths } from "../../../constants/paths";

const CityCreate = () => {
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState<CITY_STORE["create"]>(
    cityPayload.create
  );
  const [countryLists, setCountryLists] = useState<Array<COUNTRY>>([]);
  const [stateLists, setStateLists] = useState<Array<STATE>>([]);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // Fetch countries asynchronously
  const loadCountries = React.useCallback(async () => {
    setLoading(true);
    try {
      // Fetch countries
      const countryResponse: any = await getRequest(`${endpoints.country}`, null);
      if (countryResponse && countryResponse.status === 200) {
        setCountryLists(countryResponse.data.countries);
      }
    } catch (error) {
      console.error("Error loading countries", error);
    }
    setLoading(false);
  }, []);

  // Fetch states based on selected country
  const loadStates = React.useCallback(async (countryId: number) => {
    setLoading(true);
    try {
      const stateResponse: any = await getRequest(
        `${endpoints.state}?countryId=${countryId}`,
        null
      );
      if (stateResponse && stateResponse.status === 200) {
        setStateLists(stateResponse.data.states);
      }
    } catch (error) {
      console.error("Error loading states", error);
    }
    setLoading(false);
  }, []);

  React.useEffect(() => {
    loadCountries(); // Load countries when component mounts
  }, [loadCountries]);

  // Handle form submission
  const submitCityCreate = async () => {
    setLoading(true);
    const response = await cityService.store(payload, dispatch);
    if (response.status === 201) {
      navigate(`${paths.cityList}`);
    }
    setLoading(false);
  };

  return (
    <Box>
      <Breadcrumb />
      <Card sx={{ marginTop: "20px", padding: "20px" }}>
        <h2>City Create</h2>

        <Grid2 container spacing={2}>
          {/* Country Dropdown */}
          <Grid2 size={{ xs: 6, md: 4 }}>
            <FormControl variant="filled" fullWidth>
              <InputLabel htmlFor="country_name">Country</InputLabel>
              <Select
                id="country_name"
                value={payload.countryId || ""}
                disabled={loading}
                onChange={(e: SelectChangeEvent) => {
                  const countryId = parseInt(e.target.value);
                  payloadHandler(payload, countryId, "countryId", setPayload);
                  loadStates(countryId); // Fetch states for selected country
                }}
              >
                {countryLists?.map((country) => (
                  <MenuItem key={country.id} value={country.id}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Choose country</FormHelperText>
            </FormControl>
          </Grid2>

          {/* State Dropdown */}
          <Grid2 size={{ xs: 6, md: 4 }}>
            <FormControl variant="filled" fullWidth>
              <InputLabel htmlFor="state_name">State</InputLabel>
              <Select
                id="state_name"
                value={payload.stateId || ""}
                disabled={loading || !payload.countryId} // Disable if no country selected
                onChange={(e: SelectChangeEvent) =>
                  payloadHandler(payload, e.target.value, "stateId", setPayload)
                }
              >
                {stateLists?.map((state:STATE) => (
                  <MenuItem key={state.id} value={state.id}>
                    {state.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Choose state</FormHelperText>
            </FormControl>
          </Grid2>

          {/* City Name Field */}
          <Grid2 size={{ xs: 6, md: 4 }}>
            <FormControl variant="filled" fullWidth>
              <TextField
                id="city_name"
                label="City Name"
                value={payload.name || ""}
                disabled={loading}
                onChange={(e) =>
                  payloadHandler(payload, e.target.value, "name", setPayload)
                }
              />
              <FormHelperText>Enter city name</FormHelperText>
            </FormControl>
          </Grid2>
        </Grid2>

        {/* Footer with Cancel and Submit buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          <Button variant="outlined" onClick={() => navigate("/cities")}>
            Cancel
          </Button>
          <Button variant="contained" onClick={submitCityCreate} disabled={loading}>
            Submit
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default CityCreate;

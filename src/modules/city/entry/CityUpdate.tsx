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
import { useCallback, useEffect, useState } from "react";
import { cityPayload } from "../city.payload"; // Payload for city
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppRootState } from "../../../stores";
import { CITY_UPDATE, cityService } from "../city.service"; // City service for handling API requests
import { httpErrorHandler, httpServiceHandler, payloadHandler } from "../../../helpers/handler";
import { paths } from "../../../constants/paths";
import { Breadcrumb } from "../../../components/Breadcrumb";
import { getRequest } from "../../../helpers/api";
import { endpoints } from "../../../constants/endpoints";
import { COUNTRY } from "../../country/country.payload";
import { STATE } from "../../state/state.payload";

const CityUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState<CITY_UPDATE["update"]>(cityPayload.update); // Initial payload for city update
  const [countryLists, setCountryLists] = useState<Array<any>>([]); // List of countries for dropdown
  const [stateLists, setStateLists] = useState<Array<any>>([]); // List of states for dropdown

  const params: any = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { city } = useSelector((state: AppRootState) => state.city); // Select city data from the store

  // Submit function for city update
  const submitCityUpdate = async () => {
    setLoading(true);
    const response: any = await cityService.update(dispatch, params.id, payload); // Update the city
    if (response.status === 204) {
      navigate(`${paths.cityList}`); // Navigate to city list on success
    }
    setLoading(false);
  };

  // Function to load city data and populate country/state dropdowns
  const loadingData = useCallback(async () => {
    setLoading(true);
    try {
      await cityService.show(dispatch, params.id); // Fetch city data
      // Fetch country data for dropdown
      const countryResponse: any = await getRequest(`${endpoints.country}`, null);
      await httpServiceHandler(dispatch, countryResponse);
      if (countryResponse && "data" in countryResponse && countryResponse.status === 200) {
        setCountryLists(countryResponse.data.countries);
      }

      // Fetch state data for dropdown
      const stateResponse: any = await getRequest(`${endpoints.state}`, null);
      await httpServiceHandler(dispatch, stateResponse);
      if (stateResponse && "data" in stateResponse && stateResponse.status === 200) {
        setStateLists(stateResponse.data.states);
      }
    } catch (error) {
      await httpErrorHandler(error);
    }
    setLoading(false);
  }, [dispatch, params.id]);

  useEffect(() => {
    loadingData();
  }, [loadingData]);

  useEffect(() => {
    if (city) {
      setPayload(city); // Set fetched city data into the form payload for editing
    }
  }, [city]);

  return (
    <Box>
      <Breadcrumb />
      <Card sx={{ marginTop: "20px", padding: "20px" }}>
        <h2>City Update</h2>

        <Grid2 container spacing={2}>
          {/* Country Dropdown */}
          <Grid2 size={{ xs: 6, md: 3 }}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel shrink htmlFor="country_name">
                Country Name
              </InputLabel>
              <Select
                id="country_name"
                aria-describedby="country_name_text"
                disabled={loading}
                label="Country"
                value={payload ? payload.countryId : ""}
                onChange={(e: SelectChangeEvent) => {
                  payloadHandler(payload, e.target.value, "countryId", (updateValue) => {
                    setPayload(updateValue);
                  });
                }}
              >
                {countryLists?.map((country: COUNTRY) => (
                  <MenuItem defaultValue={0} key={country.id} value={country.id}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText id="city_country_text">Choose country name</FormHelperText>
            </FormControl>
          </Grid2>

          {/* State Dropdown */}
          <Grid2 size={{ xs: 6, md: 3 }}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel shrink htmlFor="state_name">
                State Name
              </InputLabel>
              <Select
                id="state_name"
                aria-describedby="state_name_text"
                disabled={loading}
                label="State"
                value={payload ? payload.stateId : ""}
                onChange={(e: SelectChangeEvent) => {
                  payloadHandler(payload, e.target.value, "stateId", (updateValue) => {
                    setPayload(updateValue);
                  });
                }}
              >
                {stateLists?.map((state: STATE) => (
                  <MenuItem defaultValue={0} key={state.id} value={state.id}>
                    {state.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText id="city_state_text">Choose state name</FormHelperText>
            </FormControl>
          </Grid2>

          {/* City Name Input */}
          <Grid2 size={{ xs: 6, md: 3 }}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel shrink htmlFor="city_name">City Name</InputLabel>
              <Input
                id="city_name"
                aria-describedby="city_name_text"
                disabled={loading}
                value={payload ? payload.name : ""}
                onChange={(e) => {
                  payloadHandler(payload, e.target.value, "name", (updateValue) => {
                    setPayload(updateValue);
                  });
                }}
              />
              <FormHelperText id="city_name_text">Enter city name</FormHelperText>
            </FormControl>
          </Grid2>
        </Grid2>

        {/* Footer */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          <Button variant="outlined" onClick={() => navigate(paths.cityList)}>
            Cancel
          </Button>
          <Button variant="contained" onClick={submitCityUpdate}>
            Submit
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default CityUpdate;

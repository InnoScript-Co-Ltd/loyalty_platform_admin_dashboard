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

  // const handleFieldChange =
  //   (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
  //     payloadHandler(payload, e.target.value, field, setPayload);
  //   };

  const handleFieldChange =
    (payload: any) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const field = e.target.name;
      payloadHandler(payload, e.target.value, field, setPayload);
    };

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
            <FormControl variant="filled" fullWidth>
              <InputLabel htmlFor="country_name">Country Name</InputLabel>
              <Input
                id="country_name"
                name="Name"
                aria-describedby="country_name_text"
                disabled={loading}
                // onChange={handleFieldChange("Name")}
                onChange={handleFieldChange(payload)}
              />
              <FormHelperText id="country_name_text">
                Enter region name
              </FormHelperText>
            </FormControl>
          </Grid2>
          <Grid2 size={{ xs: 6, md: 3 }}>
            <FormControl variant="filled" fullWidth>
              <InputLabel htmlFor="zip_code">Zip Code</InputLabel>
              <Input
                id="zip_code"
                name="ZipCode"
                aria-describedby="zip_code_text"
                disabled={loading}
                onChange={handleFieldChange(payload)}
                // onChange={handleFieldChange("ZipCode")}
              />
              <FormHelperText id="zip_code_text">Enter zip code</FormHelperText>
            </FormControl>
          </Grid2>
          <Grid2 size={{ xs: 6, md: 3 }}>
            <FormControl variant="filled" fullWidth>
              <InputLabel htmlFor="mobile_prefix">
                Mobile Prefix Number
              </InputLabel>
              <Input
                id="mobile_prefix"
                name="MobilePrefixNumber"
                aria-describedby="mobile_prefix_text"
                disabled={loading}
                onChange={handleFieldChange(payload)}
                // onChange={handleFieldChange("MobilePrefixNumber")}
              />
              <FormHelperText id="mobile_prefix_text">
                Enter Mobile Prefix Number
              </FormHelperText>
            </FormControl>
          </Grid2>
          <Grid2 size={{ xs: 6, md: 3 }}>
            <FormControl variant="filled" fullWidth>
              <InputLabel htmlFor="flag_icon">Flag Icon</InputLabel>
              <Input
                id="flag_icon"
                name="FlagIcon"
                aria-describedby="flag_icon_text"
                disabled={loading}
                onChange={handleFieldChange(payload)}
                // onChange={handleFieldChange("MobilePrefixNumber")}
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
          <Button
            variant="outlined"
            onClick={() => navigate(paths.countryList)}
          >
            Cancle
          </Button>
          <Button variant="contained" onClick={submitCountryCreate}>
            Submit
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default CountryCreate;

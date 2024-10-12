import * as React from "react";
import { Box, Button, Card, Grid2, TextField } from "@mui/material";
import { useState } from "react";
import { cityPayload } from "../city.payload";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppRootState } from "../../../stores";
import { CITY_STORE, cityService } from "../city.service";
import { payloadHandler } from "../../../helpers/handler";
import { Breadcrumb } from "../../../components/Breadcrumb";
import ValidationMessage from "../../../components/ValidationMessage";
import { useSnackbar } from "notistack";

const CityCreate = () => {
    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState<CITY_STORE["create"]>(
        cityPayload.create
    );

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { enqueueSnackbar } = useSnackbar(); // For notifications

  const submitCityCreate = async () => {
    setLoading(true);
    const response = await cityService.store(payload,dispatch);
    setLoading(false);
  };


  return(
<Box>
<Breadcrumb />
<Card sx={{ marginTop: "20px", padding: "20px" }}>
<h2>City Create</h2>
</Card>
</Box>
  );

}

export default CityCreate;
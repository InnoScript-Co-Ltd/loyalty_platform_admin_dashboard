import * as React from "react";
import { Box, Button, Card, Grid2, TextField } from "@mui/material";
import { useState } from "react";
import { statePayload } from "../state.payload"; // Import the state payload
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppRootState } from "../../../stores";
import { STATE_STORE, stateService } from "../state.service"; // Import state service and payload type
import { payloadHandler } from "../../../helpers/handler";
import { Breadcrumb } from "../../../components/Breadcrumb";
import ValidationMessage from "../../../components/ValidationMessage"; // For validation messages
import { useSnackbar } from "notistack"; // For notifications

const StateCreate = () => {
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState<STATE_STORE["create"]>(statePayload.create);
  
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { enqueueSnackbar } = useSnackbar(); // For notifications

  const submitCityCreate = async () => {
    setLoading(true);
    const response = await stateService.store(payload,dispatch);
    setLoading(false);
  };

  return (
    <Box>
    <Breadcrumb />
    <Card sx={{ marginTop: "20px", padding: "20px" }}>
    <h2>State Create</h2>
    </Card>
    </Box>
  );
};

export default StateCreate;

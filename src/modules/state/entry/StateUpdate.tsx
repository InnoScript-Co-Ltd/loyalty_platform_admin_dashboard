import { Box, Button, Card, TextField } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { statePayload } from "../state.payload"; // Similar to cityPayload but for states
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppRootState } from "../../../stores";
import { STATE_UPDATE, stateService } from "../state.service"; // Service for handling state API requests
import { payloadHandler } from "../../../helpers/handler";
import { paths } from "../../../constants/paths";
import { Breadcrumb } from "../../../components/Breadcrumb";

const StateUpdate = () => {
    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState<STATE_UPDATE["update"]>(
        statePayload.update // Initial payload for updating a state
    );

    const params: any = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { state } = useSelector((state: AppRootState) => state.state); // Selecting state data from the store

    // Function to handle form submission and state update
    const submitStateUpdate = async () => {
        setLoading(true);
        const response = await stateService.update(dispatch, params.id, payload);
        if (response.data) {
            navigate(`${paths.stateList}`); // Navigate to the state list page on success
        }
        setLoading(false);
    };

    // Function to load state data based on the ID from params
    const loadingData = useCallback(async () => {
        setLoading(true);
        await stateService.show(dispatch, params.id); // Fetch state data to populate the form
        setLoading(false);
    }, [dispatch, params.id]);

    useEffect(() => {
        loadingData();
    }, [loadingData]);

    useEffect(() => {
        if (state) {
            setPayload(state); // Set the fetched state data into the payload for editing
        }
    }, [state]);

    return (
        <Box sx={{ mt: 3 }}>
         </Box>
    );
};

export default StateUpdate;

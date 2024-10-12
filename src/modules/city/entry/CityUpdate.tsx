import { Box, Button, Card, Grid2, TextField } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { cityPayload } from "../city.payload";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppRootState } from "../../../stores";
import { CITY_UPDATE, cityService } from "../city.service";
import { payloadHandler } from "../../../helpers/handler";
import { paths } from "../../../constants/paths";
import { Breadcrumb } from "../../../components/Breadcrumb";

const CityUpdate = () => {
    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState<CITY_UPDATE["update"]>(
        cityPayload.update
    );

    const params: any = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { city } = useSelector((state: AppRootState) => state.city);

    const submitCountryUpdate = async () => {
        setLoading(true);
        // const form : COUNTRY_STORE = formBuilder(payload, countryPayload.create);
        const response = await cityService.update(dispatch, params.id, payload);
        if (response.data) {
          navigate(`${paths.cityList}`);
        }
        setLoading(false);
      };
    
      const loadingData = useCallback(async () => {
        setLoading(true);
        await cityService.show(dispatch, params.id);
        setLoading(false);
      }, [params.id]);
    
      useEffect(() => {
        loadingData();
      }, [loadingData]);
    
      useEffect(() => {
        if (city) {
          setPayload(city);
        }
      }, [city]);

      return (
        <Box>
        </Box>
      );
    
}

export default CityUpdate;
import { Box, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router";
import { delRequest } from "../helpers/api";
import { baseURL } from "../constants/endpoints";

const UpAndDel = ({ url, fn }: { url: string, fn: any }) => {
  console.log(url);
  
  const navigate = useNavigate();

  const dele = async () => {
    const res: any = await delRequest(`${baseURL}${url}`);
    console.log(res);
    
    if(res.status === 204){
      fn()
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        gap: 3,
      }}
    >
      <Button onClick={() => navigate(url)}>
        <EditIcon />
      </Button>
      <Button color="error" onClick={dele}>
        <DeleteIcon />
      </Button>
    </Box>
  );
};

export default UpAndDel;

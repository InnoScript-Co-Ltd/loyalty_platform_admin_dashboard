import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { paginateOptions } from "../../constants/config";

// Define columns for city table
interface Column {
  id: "id" | "name" | "stateId" | "countryId";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

// Define City Payload
export interface CITY_PAYLOAD {
  create: {
    name: string,
    stateId: number,
    countryId: number,
  },
  update: {
    name: string,
    stateId: number,
    countryId: number,
  },
  paginateParams: {
    page: number,
    per_page: number,
    columns: string,
    search: string,
    order: string,
    sort: string,
  }
}

// Define columns structure for the city table
export const cityColumns: readonly Column[] = [
  { id: "name", label: "City Name", minWidth: 170 },
  { id: "stateId", label: "State ID", minWidth: 150 },
  { id: "countryId", label: "Country ID", minWidth: 150 },
];

// Styled table cell and row (reuse from country and state table)
export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

// City payload example
export const cityPayload: CITY_PAYLOAD = {
  create: {
    name: "",
    stateId: 0, // Foreign key reference to state
    countryId: 0, // Foreign key reference to country
  },
  update: {
    name: "",
    stateId: 0, // Foreign key reference to state
    countryId: 0, // Foreign key reference to country
  },
  paginateParams: {
    page: 1,
    per_page: paginateOptions.rows,
    columns: "id,name,stateId,countryId",
    search: "",
    order: "id",
    sort: "DESC",
  }
};

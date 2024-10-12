import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { paginateOptions } from "../../constants/config";

// Define columns for state table
interface Column {
  id: "id" | "name" | "zipCode" | "profile" | "countryId" | "countryName";
  label: string;
  minWidth?: number;
  align?: "right";
  numeric: boolean,
  disablePadding: boolean,
  format?: (value: number) => string;
}

// Define State Payload
export interface STATE_PAYLOAD {
  create: {
    name: string,
    zipCode?: string,
    profile?: string,
    countryId: number,
    countryName: string,
  },
  update: {
    name: string,
    zipCode?: string,
    profile?: string,
    countryId: number,
    countryName: string,
  },
  pagingParams: {
    PageSize: number,
    CurrentPage: number,
    SortField: any,
    SortDir: any,
    SearchTerm: string
  }
}

// Define columns structure for the state table
export const stateColumns: readonly Column[] = [
  { id: "name", label: "State Name", minWidth: 170 , numeric: false, disablePadding: false, },
  { id: "zipCode", label: "Zip Code", minWidth: 150, numeric: false, disablePadding: false, },
  { id: "profile", label: "Profile", minWidth: 150, numeric: false, disablePadding: false, },
  { id: "countryId", label: "Country ID", minWidth: 150, numeric: false, disablePadding: false, },
  { id: "countryName", label: "Country Name", minWidth: 150, numeric: false, disablePadding: false, },
];

// Styled table cell and row (reuse from country table)
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

// State payload example
export const statePayload: STATE_PAYLOAD = {
  create: {
    name: "",
    zipCode: "",
    profile: "",
    countryId: 0, 
    countryName: "",
  },
  update: {
    name: "",
    zipCode: "",
    profile: "",
    countryId: 0,
    countryName: "",
  },
  pagingParams: {
    PageSize: paginateOptions.rows,
    CurrentPage: 1,
    SortField: "name",
    SortDir: 0,
    SearchTerm: ""
  }
};

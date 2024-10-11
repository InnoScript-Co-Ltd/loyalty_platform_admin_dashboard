import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { paginateOptions } from "../../constants/config";

// Define columns for city table
interface Column {
  id: "id" | "name" | "stateId" | "stateName" | "countryId" | "countryName" ;
  label: string;
  minWidth?: number;
  align?: "right";
  numeric: boolean,
  disablePadding: boolean,
  format?: (value: number) => string;
}

// Define City Payload
export interface CITY_PAYLOAD {
  create: {
    name: string,
    stateId: number,
    stateName: string,
    countryId: number,
    countryName: string,
  },
  update: {
    name: string,
    stateId: number,
    stateName: string,
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

// Define columns structure for the city table
export const cityColumns: readonly Column[] = [
  { id: "name", label: "City Name", minWidth: 170, numeric: false, disablePadding: false, },
  { id: "stateName", label: "State Name", minWidth: 150, numeric: false, disablePadding: false, },
  { id: "countryName", label: "Country Name", minWidth: 150, numeric: false, disablePadding: false, },
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
    stateId: 0,
    stateName: "",
    countryId: 0,
    countryName: "",
  },
  update: {
    name: "",
    stateId: 0,
    stateName: "",
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

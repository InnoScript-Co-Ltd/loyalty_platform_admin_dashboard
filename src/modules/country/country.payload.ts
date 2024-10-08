import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { paginateOptions } from "../../constants/config";

export interface Country_Column {
  id: "id" | "name" | "mobilePrefixNumber" | "flagIcon" | "action";
  label: string;
  minWidth?: number;
  align?: "right";
  numeric: boolean,
  disablePadding: boolean,
  format?: (value: number) => string;
}

export interface COUNTRY_PAYLOAD {
  create : {
    name: string,
    flagIcon: string,
    mobilePrefixNumber: string,
  },
  update: {
    name: string,
    flagIcon: string,
    mobilePrefixNumber: string
  },
  pagingParams: {
    PageSize: number,
    CurrentPage: number,
    SortField: any,
    SortDir: any,
    SearchTerm: string
  }
}

export const columns: readonly Country_Column[] = [
  { id: "name", label: "Name", minWidth: 170, numeric: false, disablePadding: false, },
  { id: 'mobilePrefixNumber', label: "Mobile Prefix", minWidth: 200, numeric: false, disablePadding: false, },
  { id: 'flagIcon', label: 'FlagIcon', minWidth: 200, numeric: false, disablePadding: false, },
  { id: 'action', label: 'Action', minWidth: 20, numeric: false, disablePadding: false, }
];

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
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const countryPayload: COUNTRY_PAYLOAD = {
  create: {
    name: "",
    flagIcon: "",
    mobilePrefixNumber: "",
  },
  update: {
    name: "",
    flagIcon: "",
    mobilePrefixNumber: "",
  },
  pagingParams: {
    PageSize: paginateOptions.rows,
    CurrentPage: 1,
    SortField: "name",
    SortDir: 0,
    SearchTerm: ""
  }
};

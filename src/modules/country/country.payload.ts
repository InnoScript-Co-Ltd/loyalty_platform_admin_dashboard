import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { paginateOptions } from "../../constants/config";

interface Column {
  id: "id" | "name" | "mobilePrefixNumber" | "flagIcon";
  label: string;
  minWidth?: number;
  align?: "right";
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
  paginateParams: {
    page: number,
    per_page: number,
    columns: string,
    search: string,
    order: string,
    sort: string
  }
}

export const columns: readonly Column[] = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: 'mobilePrefixNumber', label: "Mobile Prefix", minWidth: 200 },
  { id: 'flagIcon', label: 'FlagIcon', minWidth: 200 }
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
  paginateParams: {
    page: 1,
    per_page: paginateOptions.rows,
    columns: "id,name,country_code,mobile_prefix,status",
    search: "",
    order: "id",
    sort: "DESC"
  }
};

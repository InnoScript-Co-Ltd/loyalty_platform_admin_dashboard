import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import {
  stateColumns,
  statePayload,
} from "../state.payload"; 
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppRootState } from "../../../stores";
import { stateService } from "../state.service";
import { paginateOptions } from "../../../constants/config";
import { NavigateId } from "../../../shares/NavigateId";
import { paths } from "../../../constants/paths";
import {
  Box,
  Button,
  Input,
  InputAdornment,
  TableSortLabel,
} from "@mui/material";
import { setPaginate } from "../state.slice"; 
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useNavigate } from "react-router";
import UpAndDel from "../../../components/UpAndDel";
import { useSnackbar } from "notistack";
import { StyledTableCell, StyledTableRow } from "../../../components/TableCommon";

const StateTableView = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const dispatch = useDispatch<AppDispatch>();
  const { data, pagingParams } = useSelector(
    (state: AppRootState) => state.state 
  );

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);

    dispatch(
      setPaginate({
        ...pagingParams,
        CurrentPage: newPage + 1,
      })
    );
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    dispatch(
      setPaginate({
        ...pagingParams,
        RowsPerPage: +event.target.value,
        CurrentPage: 1,
      })
    );
  };

  const loadingData = React.useCallback(async () => {
    setLoading(true);
    // await stateService.index(dispatch, pagingParams);
    setLoading(false);
  }, [dispatch, pagingParams]);

  React.useEffect(() => {
    loadingData();
  }, [loadingData]);

  console.log(data);
  

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <Box
        sx={{
          my: "20px",
          px: "20px",
          display: "flex",
          justifyContent: "start",
          gap: 5,
        }}
      >
        <Input
          id="input-with-icon-search"
          placeholder="Search State"
          value={pagingParams.SearchTerm}
          onChange={(e) => {
            dispatch(
              setPaginate({
                ...pagingParams,
                SearchTerm: e.target.value,
              })
            );
          }}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            gap: 3,
          }}
        >
          <Button
            startIcon={<AddCircleOutlineIcon />}
            onClick={() => navigate(paths.stateCreate)}
          >
            Create
          </Button>

          <Button
            onClick={() => {
              dispatch(setPaginate(statePayload.pagingParams));
              setPage(0);
              setRowsPerPage(10);
            }}
            startIcon={<RestartAltIcon />}
            color="secondary"
          >
            Reset
          </Button>
        </Box>
      </Box>

      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {stateColumns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  style={{ minWidth: column.minWidth }}
                  align={column.numeric ? "right" : "left"}
                  padding={column.disablePadding ? "none" : "normal"}
                  sortDirection={pagingParams.SortDir === column.id ? pagingParams.SortField : false}
                >
                  <TableSortLabel
                    active={pagingParams.SortDir === column.id}
                    direction={pagingParams.SortDir === "asc" ? "asc" : "desc"}
                    onClick={() => {
                      dispatch(setPaginate({
                        ...pagingParams,
                        SortField: column.id,
                        SortDir: pagingParams.SortDir === "asc" ? "desc" : "asc",
                      }));
                    }}
                  >
                    {column.label}
                    {pagingParams.SortDir === column.id ? (
                      <Box component="span">
                        {pagingParams.SortDir === "desc"
                          ? "sorted descending"
                          : "sorted ascending"}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.states.map((row: any) => (
              <StyledTableRow
                hover
                role="checkbox"
                tabIndex={-1}
                key={row.id}
              >
                {stateColumns.map((column) => {
                  const value = row[column.id];
                  return (
                    <StyledTableCell key={column.id} align={column.align}>
                      {(() => {
                        switch (column.label) {
                          case "State Name":
                            return (
                              <NavigateId
                                url={`${paths.state}/${row.id}`} 
                                value={value}
                              />
                            );
                          case "Zip Code":
                            return value;
                          case "City Name":
                            return value; 
                          case "Action":
                            return (
                              <UpAndDel
                                url={`${paths.state}/${row.id}`} 
                                fn={loadingData}
                              />
                            );
                          default:
                            return value; // Fallback case
                        }
                      })()}
                    </StyledTableCell>
                  );
                })}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        disabled={loading}
        rowsPerPageOptions={paginateOptions.rowsPerPageOptions}
        component="div"
        count={data.paging.totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default StateTableView;

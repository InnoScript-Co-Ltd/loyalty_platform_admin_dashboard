import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import {
  cityColumns,
  cityPayload,
  StyledTableCell,
  StyledTableRow,
} from "../city.payload";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppRootState } from "../../../stores";
import { cityService } from "../city.service";
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
import { setPaginate } from "../city.slice";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useNavigate } from "react-router";
import UpAndDel from "../../../components/UpAndDel";
import { useSnackbar } from "notistack";

const CityTableView = () => {
  // Local state for pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // Redux dispatch and state selectors
  const dispatch = useDispatch<AppDispatch>();
  const { data, pagingParams } = useSelector(
    (state: AppRootState) => state.city
  );

  // Snackbar for notifications
  const { enqueueSnackbar } = useSnackbar();

  // Navigation
  const navigate = useNavigate();

  // Local loading state
  const [loading, setLoading] = React.useState(false);

  // Handle page change
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);

    dispatch(
      setPaginate({
        ...pagingParams,
        CurrentPage: newPage + 1,
      })
    );
  };

  // Handle rows per page change
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

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setPaginate({
        ...pagingParams,
        SearchTerm: e.target.value,
        CurrentPage: 1, // Reset to first page on search
      })
    );
  };

  // Handle sorting
  const handleSort = (columnId: string) => {
    const isAsc = pagingParams.SortField === columnId && pagingParams.SortDir === "asc";
    dispatch(
      setPaginate({
        ...pagingParams,
        SortField: columnId,
        SortDir: isAsc ? "desc" : "asc",
      })
    );
  };

  // Fetch data
  const loadingData = React.useCallback(async () => {
    setLoading(true);
    await cityService.index(dispatch, pagingParams);
    setLoading(false);
  }, [dispatch, pagingParams]);

  // Fetch data on component mount and when pagingParams change
  React.useEffect(() => {
    loadingData();
  }, [loadingData]);

 // console.log(data);
  

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      {/* Top Actions: Search, Create, Reset */}
      <Box
        sx={{
          my: "20px",
          px: "20px",
          display: "flex",          
          justifyContent: "flex-start",          
          gap: 5,
        }}
      >
        {/* Search Input */}
        <Input
          id="input-with-icon-search"
          placeholder="Search City"
          value={pagingParams.SearchTerm}
          onChange={handleSearchChange}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          sx={{ width: "300px" }}
        />

        {/* Action Buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "left",            
            gap: 3,
          }}
        >
          <Button
            variant="contained"
            startIcon={<AddCircleOutlineIcon />}
            onClick={() => navigate(paths.cityCreate)}
          >
            Create
          </Button>

          <Button
            variant="outlined"
            onClick={() => {
              dispatch(setPaginate(cityPayload.pagingParams));
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

      {/* Table Container */}
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="city table">
        <TableHead>
            <TableRow>
              {cityColumns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  style={{ minWidth: column.minWidth }}
                  align={column.numeric ? "right" : "left"}
                  padding={column.disablePadding ? "none" : "normal"}
                  sortDirection={pagingParams.SortDir === column.id ? pagingParams.SortField : false}
                >
                  <TableSortLabel
                    active={pagingParams.SortDir === column.id}
                    direction={pagingParams.SortDir === 0 ? "asc" : "desc"}
                    onClick={(e) => {
                      dispatch(setPaginate({
                        ...pagingParams,
                        SortField: column.id,
                        SortDir: pagingParams.SortDir === 0 ? 1 : 0
                      }))
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
            {data.cities?.map((row: any) => (
              <StyledTableRow
                hover
                role="checkbox"
                tabIndex={-1}
                key={row.id}
              >
                {cityColumns?.map((column) => {
                  const value = row[column.id];
                  return (
                    <StyledTableCell key={column.id} align={column.align}>
                      {(() => {
                        switch (column.label) {
                          case "City Name":
                            return (
                              <NavigateId
                                url={`${paths.city}/${row.id}`}
                                value={value}
                              />
                            );
                          case "Action":
                            return (
                              <UpAndDel
                                url={`${paths.city}/${row.id}`}
                                fn={loadingData}
                              />
                            );
                          default:
                            return value; // Fallback for other fields
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

      {/* Pagination */}
      <TablePagination
        disabled={loading}
        rowsPerPageOptions={paginateOptions.rowsPerPageOptions}
        component="div"
        count={data?.paging?.totalCount || 0} // Safe access with optional chaining
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default CityTableView;

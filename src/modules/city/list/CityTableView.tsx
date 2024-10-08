import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { cityColumns, cityPayload, StyledTableCell, StyledTableRow } from "../city.payload";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppRootState } from "../../../stores";
import { cityService } from "../city.service";
import { paginateOptions } from "../../../constants/config";
import { NavigateId } from "../../../shares/NavigateId";
import { paths } from "../../../constants/paths";

const CityTableView = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const dispatch = useDispatch<AppDispatch>();
  const { cities, paginateParams } = useSelector(
    (state: AppRootState) => state.city
  );

  const [loading, setLoading] = React.useState(false);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const loadingData = React.useCallback(async () => {
    setLoading(true);
    const response = await cityService.index(dispatch, paginateParams);
    if (response.status === 200) {
      // Handle response or update state as needed
    }
    setLoading(false);
  }, [dispatch, paginateParams]);

  React.useEffect(() => {
    loadingData();
  }, [loadingData]);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {cityColumns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {cities
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: any) => {
                return (
                  <StyledTableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id}
                  >
                    {cityColumns.map((column) => {
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
                              default:
                                return value; // Fallback for other fields
                            }
                          })()}
                        </StyledTableCell>
                      );
                    })}
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        disabled={loading}
        rowsPerPageOptions={paginateOptions.rowsPerPageOptions}
        component="div"
        count={cities.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default CityTableView;

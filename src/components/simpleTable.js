import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "code", label: "ISO\u00a0Code", minWidth: 100 },
  {
    id: "population",
    label: "Population",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "size",
    label: "Size\u00a0(km\u00b2)",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "density",
    label: "Density",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData("0India", "IN", 1324171354, 3287263),
  createData("1China", "CN", 1403500365, 9596961),
  createData("2Italy", "IT", 60483973, 301340),
  createData("3United States", "US", 327167434, 9833520),
  createData("4Canada", "CA", 37602103, 9984670),
  createData("5Australia", "AU", 25475400, 7692024),
  createData("6Germany", "DE", 83019200, 357578),
  createData("7Ireland", "IE", 4857000, 70273),
  createData("8Mexico", "MX", 126577691, 1972550),
  createData("9Japan", "JP", 126317000, 377973),
  createData("10France", "FR", 67022000, 640679),
  createData("11United Kingdom", "GB", 67545757, 242495),
  createData("12Russia", "RU", 146793744, 17098246),
  createData("13Nigeria", "NG", 200962417, 923768),
  createData("14Brazil", "BR", 210147125, 8515767),
  createData("15India", "IN", 1324171354, 3287263),
  createData("16China", "CN", 1403500365, 9596961),
  createData("17Italy", "IT", 60483973, 301340),
  createData("18United States", "US", 327167434, 9833520),
  createData("19Canada", "CA", 37602103, 9984670),
  createData("20Australia", "AU", 25475400, 7692024),
  createData("21Germany", "DE", 83019200, 357578),
  createData("22Ireland", "IE", 4857000, 70273),
  createData("23Mexico", "MX", 126577691, 1972550),
  createData("24Japan", "JP", 126317000, 377973),
  createData("25France", "FR", 67022000, 640679),
  createData("26United Kingdom", "GB", 67545757, 242495),
  createData("27Russia", "RU", 146793744, 17098246),
  createData("28Nigeria", "NG", 200962417, 923768),
  createData("29Brazil", "BR", 210147125, 8515767),
  createData("30India", "IN", 1324171354, 3287263),
  createData("31China", "CN", 1403500365, 9596961),
  createData("32Italy", "IT", 60483973, 301340),
  createData("33United States", "US", 327167434, 9833520),
  createData("34Canada", "CA", 37602103, 9984670),
  createData("35Australia", "AU", 25475400, 7692024),
  createData("36Germany", "DE", 83019200, 357578),
  createData("37Ireland", "IE", 4857000, 70273),
  createData("38Mexico", "MX", 126577691, 1972550),
  createData("39Japan", "JP", 126317000, 377973),
  createData("40France", "FR", 67022000, 640679),
  createData("41United Kingdom", "GB", 67545757, 242495),
  createData("42Russia", "RU", 146793744, 17098246),
  createData("43Nigeria", "NG", 200962417, 923768),
  createData("44Brazil", "BR", 210147125, 8515767),
  createData("45India", "IN", 1324171354, 3287263),
  createData("46China", "CN", 1403500365, 9596961),
  createData("47Italy", "IT", 60483973, 301340),
  createData("48United States", "US", 327167434, 9833520),
  createData("49Canada", "CA", 37602103, 9984670),
  createData("50Australia", "AU", 25475400, 7692024),
  createData("51Germany", "DE", 83019200, 357578),
  createData("52Ireland", "IE", 4857000, 70273),
  createData("53Mexico", "MX", 126577691, 1972550),
  createData("54Japan", "JP", 126317000, 377973),
  createData("55France", "FR", 67022000, 640679),
  createData("56United Kingdom", "GB", 67545757, 242495),
  createData("57Russia", "RU", 146793744, 17098246),
  createData("58Nigeria", "NG", 200962417, 923768),
  createData("59Brazil", "BR", 210147125, 8515767),
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: "440",
  },
});

export default function StickyHeadTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

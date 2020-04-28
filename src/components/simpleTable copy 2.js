import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("01Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("01Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("01Eclair", 262, 16.0, 24, 6.0),
  createData("01Cupcake", 305, 3.7, 67, 4.3),
  createData("01Gingerbread", 356, 16.0, 49, 3.9),
  createData("02Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("02Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("02Eclair", 262, 16.0, 24, 6.0),
  createData("02Cupcake", 305, 3.7, 67, 4.3),
  createData("02Gingerbread", 356, 16.0, 49, 3.9),
  createData("03Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("03Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("03Eclair", 262, 16.0, 24, 6.0),
  createData("03Cupcake", 305, 3.7, 67, 4.3),
  createData("03Gingerbread", 356, 16.0, 49, 3.9),
  createData("04Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("04Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("04Eclair", 262, 16.0, 24, 6.0),
  createData("04Cupcake", 305, 3.7, 67, 4.3),
  createData("04Gingerbread", 356, 16.0, 49, 3.9),
  createData("05Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("05Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("05Eclair", 262, 16.0, 24, 6.0),
  createData("05Cupcake", 305, 3.7, 67, 4.3),
  createData("05Gingerbread", 356, 16.0, 49, 3.9),
  createData("06Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("06Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("06Eclair", 262, 16.0, 24, 6.0),
  createData("06Cupcake", 305, 3.7, 67, 4.3),
  createData("06Gingerbread", 356, 16.0, 49, 3.9),
];

const containerWelcomeStyle = {
  display: "flex",
  flexDirection: "column",
  position: "absolute",
  zIndex: "999",
  width: "100%",
  height: "100%",
  justifyContent: "center",
  alignItems: "center",
  background: "rgba(0, 0, 0, 0.5)",
};
const welcomeStyle = {
  margin: "5px",
  background: "white",
  top: "15%",
  padding: "15px",
  borderRadius: "5px",
  boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.55)",
  textAlign: "center",
  width: "90%",
  height: "90%",
};

export default function DenseTable(props) {
  const classes = useStyles();

  return (
    <>
      {props.isVisible && (
        <div style={containerWelcomeStyle}>
          <div style={welcomeStyle}>
            <div onClick={() => props.hide()}>
              <img src="./img/close.png" />{" "}
            </div>
            <TableContainer component={Paper}>
              <Table
                className={classes.table}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Dessert (100g serving)</TableCell>
                    <TableCell align="right">Calories</TableCell>
                    <TableCell align="right">Fat&nbsp;(g)</TableCell>
                    <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                    <TableCell align="right">Protein&nbsp;(g)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.calories}</TableCell>
                      <TableCell align="right">{row.fat}</TableCell>
                      <TableCell align="right">{row.carbs}</TableCell>
                      <TableCell align="right">{row.protein}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      )}
    </>
  );
}

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
const tableContainerAtyle = {
  height: "90%",
};

export default function SimpleTable(props) {
  const classes = useStyles();

  return (
    <>
      {props.isVisible && (
        <div style={containerWelcomeStyle}>
          <div style={welcomeStyle}>
            <div onClick={() => props.hide()}>
              <img src="./img/close.png" />{" "}
            </div>
            <TableContainer component={Paper} atyle={tableContainerAtyle}>
              <Table className={classes.table} aria-label="table" size="small">
                <TableHead>
                  <TableRow style={{ height: 10 }}>
                    <TableCell>Adreca</TableCell>
                    <TableCell>Codipostal</TableCell>
                    <TableCell>Comarca</TableCell>
                    <TableCell>Correu</TableCell>
                    <TableCell>Denominaci</TableCell>
                    <TableCell>Lat</TableCell>
                    <TableCell>Lng</TableCell>
                    <TableCell>Municipi</TableCell>
                    <TableCell>Nomempresa</TableCell>
                    <TableCell>Num_acreditacio</TableCell>
                    <TableCell>Productes</TableCell>
                    <TableCell>Tel_fon</TableCell>
                    <TableCell>Venda_directa</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.productorsProxim.map((row) => (
                    <TableRow key={row.num_acreditacio}>
                      <TableCell>{row.adreca}</TableCell>
                      <TableCell>{row.codipostal}</TableCell>
                      <TableCell>{row.comarca}</TableCell>
                      <TableCell>{row.correu}</TableCell>
                      <TableCell>{row.denominaci}</TableCell>
                      <TableCell>{row.lat}</TableCell>
                      <TableCell>{row.lng}</TableCell>
                      <TableCell>{row.municipi}</TableCell>
                      <TableCell>{row.nomempresa}</TableCell>
                      <TableCell>{row.num_acreditacio}</TableCell>
                      <TableCell>{row.productes}</TableCell>
                      <TableCell>{row.tel_fon}</TableCell>
                      <TableCell>{row.venda_directa}</TableCell>
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

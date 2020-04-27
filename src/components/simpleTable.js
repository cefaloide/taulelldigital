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

export default function SimpleTable(props) {
  const classes = useStyles();

  return (
    <>
      {props.isVisible && (
        <>
          <div onClick={() => props.hide()}>
            <img src="./img/close.png" />{" "}
          </div>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
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
        </>
      )}
    </>
  );
}

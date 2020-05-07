import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
const tablecontainerStyle = {
  height: "100%",
};

export default function DenseTable(props) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} style={tablecontainerStyle}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Nom empresa</TableCell>
            <TableCell>Denominació</TableCell>
            <TableCell>Municipi</TableCell>
            <TableCell>Adreça</TableCell>
            <TableCell>Codi postal</TableCell>
            <TableCell>Comarca</TableCell>
            <TableCell>Correu</TableCell>
            <TableCell>Teléfon</TableCell>
            <TableCell>Productes</TableCell>
            {/* <TableCell>Venda_directa</TableCell> */}
            {/* <TableCell>Num acreditació</TableCell> */}
            {/* <TableCell>Lat</TableCell> */}
            {/* <TableCell>Lng</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.productorsProxim.map((row) => (
            <TableRow key={row.num_acreditacio}>
              <TableCell>{row.nomempresa}</TableCell>
              <TableCell>{row.denominaci}</TableCell>
              <TableCell>{row.municipi}</TableCell>
              <TableCell>{row.adreca}</TableCell>
              <TableCell>{row.codipostal}</TableCell>
              <TableCell>{row.comarca}</TableCell>
              <TableCell>{row.correu}</TableCell>
              <TableCell>{row.tel_fon}</TableCell>
              <TableCell>{row.productes}</TableCell>
              {/* <TableCell>{row.venda_directa}</TableCell> */}
              {/* <TableCell>{row.num_acreditacio}</TableCell> */}
              {/* <TableCell>{row.lat}</TableCell> */}
              {/* <TableCell>{row.lng}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

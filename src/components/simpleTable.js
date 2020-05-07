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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("0Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("1Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("2Eclair", 262, 16.0, 24, 6.0),
  createData("3Cupcake", 305, 3.7, 67, 4.3),
  createData("4Gingerbread", 356, 16.0, 49, 3.9),
  createData("5Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("6Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("7Eclair", 262, 16.0, 24, 6.0),
  createData("8Cupcake", 305, 3.7, 67, 4.3),
  createData("9Gingerbread", 356, 16.0, 49, 3.9),
  createData("10Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("11Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("12Eclair", 262, 16.0, 24, 6.0),
  createData("13Cupcake", 305, 3.7, 67, 4.3),
  createData("14Gingerbread", 356, 16.0, 49, 3.9),
  createData("15Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("16Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("17Eclair", 262, 16.0, 24, 6.0),
  createData("18Cupcake", 305, 3.7, 67, 4.3),
  createData("19Gingerbread", 356, 16.0, 49, 3.9),
  createData("20Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("21Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("22Eclair", 262, 16.0, 24, 6.0),
  createData("23Cupcake", 305, 3.7, 67, 4.3),
  createData("24Gingerbread", 356, 16.0, 49, 3.9),
  createData("25Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("26Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("27Eclair", 262, 16.0, 24, 6.0),
  createData("28Cupcake", 305, 3.7, 67, 4.3),
  createData("29Gingerbread", 356, 16.0, 49, 3.9),
  createData("30Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("31Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("32Eclair", 262, 16.0, 24, 6.0),
  createData("33Cupcake", 305, 3.7, 67, 4.3),
  createData("34Gingerbread", 356, 16.0, 49, 3.9),
  createData("35Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("36Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("37Eclair", 262, 16.0, 24, 6.0),
  createData("38Cupcake", 305, 3.7, 67, 4.3),
  createData("39Gingerbread", 356, 16.0, 49, 3.9),
  createData("40Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("41Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("42Eclair", 262, 16.0, 24, 6.0),
  createData("43Cupcake", 305, 3.7, 67, 4.3),
  createData("44Gingerbread", 356, 16.0, 49, 3.9),
  createData("45Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("46Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("47Eclair", 262, 16.0, 24, 6.0),
  createData("48Cupcake", 305, 3.7, 67, 4.3),
  createData("49Gingerbread", 356, 16.0, 49, 3.9),
  createData("50Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("51Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("52Eclair", 262, 16.0, 24, 6.0),
  createData("53Cupcake", 305, 3.7, 67, 4.3),
  createData("54Gingerbread", 356, 16.0, 49, 3.9),
  createData("55Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("56Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("57Eclair", 262, 16.0, 24, 6.0),
  createData("58Cupcake", 305, 3.7, 67, 4.3),
  createData("59Gingerbread", 356, 16.0, 49, 3.9),
  createData("60Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("61Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("62Eclair", 262, 16.0, 24, 6.0),
  createData("63Cupcake", 305, 3.7, 67, 4.3),
  createData("64Gingerbread", 356, 16.0, 49, 3.9),
  createData("65Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("66Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("67Eclair", 262, 16.0, 24, 6.0),
  createData("68Cupcake", 305, 3.7, 67, 4.3),
  createData("69Gingerbread", 356, 16.0, 49, 3.9),
];

export default function DenseTable(props) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
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
            <TableCell>Num acreditació</TableCell>
            <TableCell>Lat</TableCell>
            <TableCell>Lng</TableCell>
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
              <TableCell>{row.num_acreditacio}</TableCell>
              <TableCell>{row.lat}</TableCell>
              <TableCell>{row.lng}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

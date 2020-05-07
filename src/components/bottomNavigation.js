import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import ListIcon from "@material-ui/icons/List";
import MapIcon from "@material-ui/icons/Map";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";

const useStyles = makeStyles({
  root: {
    // width: 500,
    width: "100%",
    position: "absolute",
    bottom: "0",
  },
  btns: {
    background: "white",
  },
});

export default function SimpleBottomNavigation(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        onClick={() => props.callShowHideMap("show")}
        label="Mapa"
        icon={<MapIcon />}
        className={classes.btns}
      />
      <BottomNavigationAction
        onClick={() => props.callShowHideList("show")}
        label="Llista"
        icon={<ListIcon />}
        className={classes.btns}
      />
      <BottomNavigationAction
        onClick={() => props.callShowWelcome()}
        label={props.userName}
        icon={<AccountCircleIcon />}
        className={classes.btns}
      />
      <BottomNavigationAction
        label="contacta"
        icon={<ContactSupportIcon />}
        className={classes.btns}
        href=" mailto:joanruedapau@gmail.com?subject=He%20trobat%20dades%20incorrectes"
      />
    </BottomNavigation>
  );
}

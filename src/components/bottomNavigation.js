import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import ListIcon from "@material-ui/icons/List";
import MapIcon from "@material-ui/icons/Map";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles({
  root: {
    // width: 500,
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
      />
      <BottomNavigationAction
        onClick={() => props.callShowHideList("show")}
        label="Llista"
        icon={<ListIcon />}
      />
      <BottomNavigationAction
        onClick={() => props.callShowWelcome()}
        label={props.userName}
        icon={<AccountCircleIcon />}
      />
    </BottomNavigation>
  );
}

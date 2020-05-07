import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import ListIcon from "@material-ui/icons/List";
import MapIcon from "@material-ui/icons/Map";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SimpleBottomNavigation(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
        onClick={handleClickOpen}
        label="contacta"
        icon={<ContactSupportIcon />}
        className={classes.btns}
      />
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Email de contacte"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <a href=" mailto:joanruedapau@gmail.com">joanruedapau@gmail.com</a>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </BottomNavigation>
  );
}

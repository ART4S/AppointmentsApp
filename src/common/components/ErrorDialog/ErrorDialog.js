/* eslint-disable react/display-name */
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Grid,
  Slide,
  makeStyles,
} from "@material-ui/core";
import { Error as ErrorIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: "1.5rem",
  },
  content: {
    paddingBottom: theme.spacing(2),
  },
  text: {
    fontSize: "1.2rem",
  },
  icon: {
    width: 50,
    height: 50,
    color: theme.palette.error.main,
  },
}));

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

export default function ErrorDialog({ title, text, delaySeconds, ...rest }) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(true);

  function handleErrorEnter() {
    setTimeout(() => {
      setOpen(false);
    }, (delaySeconds ?? 3) * 1000);
  }

  return (
    <Dialog
      open={open}
      onEnter={handleErrorEnter}
      TransitionComponent={Transition}
      {...rest}
    >
      <DialogTitle className={classes.title}>{title}</DialogTitle>

      <DialogContent className={classes.content}>
        <Grid container>
          <Grid item xs={10}>
            <DialogContentText className={classes.text}>
              {text}
            </DialogContentText>
          </Grid>

          <Grid item container xs={2} justify="center">
            <ErrorIcon className={classes.icon} />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

/* eslint-disable arrow-body-style */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable react/display-name */
import React from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Typography,
  Grid,
  Slide,
  makeStyles,
} from "@material-ui/core";
import { Error as ErrorIcon } from "@material-ui/icons";
import useLocalization from "common/hooks/useLocalization";

const useStyles = makeStyles((theme) => ({
  title: {
    padding: theme.spacing(0.3, 0),
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

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ErrorPopup({ text, closeDelay, ...dialogProps }) {
  const [open, setOpen] = React.useState(true);

  const classes = useStyles();
  const l = useLocalization();

  return (
    <Dialog
      {...dialogProps}
      open={open}
      TransitionComponent={Transition}
      onEnter={() => setTimeout(() => setOpen(false), closeDelay)}
    >
      <DialogTitle>
        <Typography className={classes.title} variant="h5">
          {l("errors.title")}
        </Typography>
      </DialogTitle>

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

ErrorPopup.propTypes = {
  text: PropTypes.string.isRequired,
  closeDelay: PropTypes.number,
};

ErrorPopup.defaultProps = {
  closeDelay: 3000,
};

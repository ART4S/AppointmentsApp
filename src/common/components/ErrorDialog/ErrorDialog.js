import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Grid,
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

export default function ErrorDialog(props) {
  const { title, text, open, onClose, onEnter } = props;
  const classes = useStyles();

  return (
    <Dialog open={open} onClose={onClose} onEnter={onEnter}>
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

ErrorDialog.defaultProps = {
  onEnter() {},
  onClose() {},
};

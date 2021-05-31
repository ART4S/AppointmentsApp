import { makeStyles } from "@material-ui/core";
import cn from "classnames";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const useStyles = makeStyles((_theme) => ({
  root: {
    textDecoration: "none",
    "&:focus, &:hover, &:visited, &:link, &:active": {
      textDecoration: "none",
    },
  },
}));

export default function RouterLink({ className, ...props }) {
  const classes = useStyles();

  return <Link className={cn(classes.root, className)} {...props} />;
}

RouterLink.propTypes = {
  // eslint-disable-next-line react/require-default-props
  className: PropTypes.string,
};

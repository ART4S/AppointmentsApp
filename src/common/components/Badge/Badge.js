/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import cn from "classnames";
import { makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => {
  const size = theme.spacing(5);

  return {
    root: {
      position: "relative",
    },
    badge: {
      position: "absolute",
      right: -size / 2,
      top: -size / 2,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: size,
      height: size,
      borderRadius: "50%",
      border: `5px solid ${theme.palette.secondary.main}`,
      color: theme.palette.secondary.main,
      backgroundColor: theme.palette.background.default,
      fontWeight: theme.typography.fontWeightBold,
      pointerEvents: "none",
    },
    hidden: {
      display: "none",
    },
  };
});

export default function Badge({ content, children }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={cn(classes.badge, { [classes.hidden]: !content })}>
        {content}
      </div>
      {children}
    </div>
  );
}

Badge.propTypes = {
  content: PropTypes.node,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

Badge.defaultProps = {
  content: undefined,
};

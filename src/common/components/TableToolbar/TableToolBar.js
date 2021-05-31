import React from "react";
import PropTypes from "prop-types";
import { Toolbar, IconButton, makeStyles } from "@material-ui/core";

import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";

const useStyles = makeStyles((_theme) => ({
  root: {
    display: "flex",
    justifyContent: "start",
    width: "100%",
  },
}));

export default function TableToolBar({
  isItemSelected,
  onCreateClick,
  onViewClick,
  onEditClick,
  onDeleteClick,
}) {
  const classes = useStyles();

  return (
    <Toolbar className={classes.root}>
      <IconButton onClick={onCreateClick}>
        <AddIcon />
      </IconButton>

      <IconButton disabled={!isItemSelected} onClick={onViewClick}>
        <VisibilityIcon />
      </IconButton>

      <IconButton disabled={!isItemSelected} onClick={onEditClick}>
        <EditIcon />
      </IconButton>

      <IconButton disabled={!isItemSelected} onClick={onDeleteClick}>
        <DeleteIcon />
      </IconButton>
    </Toolbar>
  );
}

TableToolBar.propTypes = {
  isItemSelected: PropTypes.bool.isRequired,
  onCreateClick: PropTypes.func,
  onViewClick: PropTypes.func,
  onEditClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
};

TableToolBar.defaultProps = {
  onCreateClick: () => {},
  onViewClick: () => {},
  onEditClick: () => {},
  onDeleteClick: () => {},
};

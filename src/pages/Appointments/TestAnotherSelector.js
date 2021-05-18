/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-confusing-arrow */
/* eslint-disable react/destructuring-assignment */
import React from "react";
import { VariableSizeList as List } from "react-window";
import {
  TextField,
  ListSubheader,
  Typography,
  ListItem,
  makeStyles,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import faker from "faker";

function getFirstLetter(word) {
  return word[0].toUpperCase();
}

function createSorter() {
  return (a, b) =>
    getFirstLetter(a.firstName) > getFirstLetter(b.firstName) ? 1 : -1;
}

const OPTIONS = Array.from(Array(1000))
  .map((x) => ({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
  }))
  .sort(createSorter());

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    overflow: "auto",
    maxHeight: 300,
    backgroundColor: theme.palette.background.paper,
    padding: 0,
  },
  listSection: {
    backgroundColor: "inherit",
    padding: 0,
  },
  ul: {
    backgroundColor: "inherit",
    padding: 0,
  },
  group: {
    padding: 0,
  },
  groupHeader: {
    backgroundColor: theme.palette.background.paper,
  },
}));

function createRenderGroup(classes) {
  return function renderGroup({ key, group, children }) {
    return [
      <li key={key}>
        <ul className={classes.ul}>
          <ListSubheader className={classes.groupHeader}>{group}</ListSubheader>

          {React.Children.map(children, (child) => (
            <ListItem key={child.key}>{child}</ListItem>
          ))}
        </ul>
      </li>,
    ];
  };
}

function renderInput(params) {
  return <TextField {...params} variant="outlined" />;
}

function renderOption(option) {
  return <Typography noWrap>{option.firstName}</Typography>;
}

function getItemSize(item) {
  return 55;
}

function renderRow({ data, index, style }) {
  return data[index];
}

function ListBoxComponent({ children }) {
  const classes = useStyles();
  const itemData = React.Children.toArray(children);

  return (
    <List
      itemCount={itemData.length}
      height={300}
      itemSize={(index) => getItemSize(itemData[index])}
      itemData={itemData}
    >
      {renderRow}
    </List>
  );
}

export default function TestAnotherSelector() {
  const classes = useStyles();

  return (
    <Autocomplete
      options={OPTIONS}
      ListboxComponent={ListBoxComponent}
      groupBy={(option) => option.firstName[0].toUpperCase()}
      renderGroup={createRenderGroup(classes)}
      getOptionLabel={(option) => option.firstName}
      renderInput={renderInput}
      renderOption={renderOption}
    />
  );
}

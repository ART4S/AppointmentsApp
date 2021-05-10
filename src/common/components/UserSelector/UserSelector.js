import React from "react";

import { TextField } from "@material-ui/core";

import { Autocomplete } from "@material-ui/lab";
import { matchSorter } from "match-sorter";
import { getFullName } from "utils/userUtils";

export default function UserSelector({
  name,
  users,
  label,
  error,
  helperText,
  onChange,
  ...rest
}) {
  function handleChange(_event, user) {
    onChange(user);
  }

  function getFirstLetter(word) {
    return word && word.charAt(0).toUpperCase();
  }

  function filterOptions(options, { inputValue }) {
    return matchSorter(options, inputValue, {
      keys: [(item) => getFullName(item)],
    }).sort((firstUser, secondUser) => {
      const a = getFirstLetter(firstUser.lastName);
      const b = getFirstLetter(secondUser.lastName);

      if (a > b) return 1;
      if (a < b) return -1;
      return 0;
    });
  }

  return (
    <Autocomplete
      {...rest}
      filterOptions={filterOptions}
      options={users}
      getOptionLabel={(user) => getFullName(user)}
      groupBy={(user) => getFirstLetter(user.lastName)}
      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth
          name={name}
          label={label}
          error={error}
          helperText={helperText}
        />
      )}
      onChange={handleChange}
    />
  );
}

UserSelector.defaultProps = {
  error: false,
  helperText: "",
};

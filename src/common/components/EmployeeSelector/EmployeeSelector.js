import React from "react";
import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { matchSorter } from "match-sorter";
import { getFullName } from "utils/userUtils";
import { employeeService } from "services";

import Progress from "common/components/Progress/Progress";

export default function EmployeeSelector({
  name,
  label,
  error,
  helperText,
  onChange,
  ...autocompleteProps
}) {
  const [employees, setEmployees] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const loading = open && !employees.length;

  React.useEffect(() => {
    if (!loading) {
      return undefined;
    }

    let active = true;

    (async () => {
      const data = await employeeService.getAll();
      if (active) {
        setEmployees(data);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setEmployees([]);
    }
  }, [open]);

  function getFirstLetter(word) {
    return word?.charAt(0)?.toUpperCase();
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
      {...autocompleteProps}
      options={employees}
      filterOptions={filterOptions}
      getOptionLabel={(user) => getFullName(user)}
      groupBy={(user) => getFirstLetter(user.lastName)}
      onOpen={(_event) => setOpen(true)}
      onClose={(_event) => setOpen(false)}
      onChange={(_event, user) => onChange(user)}
      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth
          name={name}
          label={label}
          error={error}
          helperText={helperText}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading && <Progress size={20} />}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}

EmployeeSelector.defaultProps = {
  error: false,
  helperText: "",
};

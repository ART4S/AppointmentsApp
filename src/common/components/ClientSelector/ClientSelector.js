/* eslint-disable react/no-array-index-key */
/* eslint-disable no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Box, TextField, Typography } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import parse from "autosuggest-highlight/parse";
import { debounce } from "lodash";

import clientService from "services/clientService";

import Progress from "../Progress/Progress";

function reducer(state, action) {
  switch (action.type) {
    case "setOpen": {
      return { ...state, open: action.playload };
    }
    case "clearOptions": {
      return { ...state, options: [] };
    }
    default:
      return state;
  }
}

export default function ClientSelector(props) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [options, setOptions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [searchText, setSearchText] = React.useState("");

  const setSearchTextDebounced = React.useCallback(
    debounce(setSearchText, 200),
    [],
  );

  React.useEffect(() => {
    if (!open) {
      return undefined;
    }

    let active = true;

    if (searchText) {
      (async () => {
        setLoading(true);

        const clients = await clientService.search(searchText);

        if (active) {
          setOptions(clients);
          setLoading(false);
        }
      })();
    } else {
      setOptions([]);
    }

    return () => {
      active = false;
    };
  }, [searchText, open]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      {...props}
      open={open}
      loading={loading}
      options={options}
      getOptionLabel={(option) => option.name ?? ""}
      getOptionSelected={(option, value) => option.name === value}
      value={value}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      onChange={(_event, value) => setValue(value)}
      onInputChange={(_event, value) => setSearchTextDebounced(value)}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
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
      renderOption={(option) => {
        const parts = parse(option.name, option.matches);
        return (
          <Typography>
            {parts.map(({ text, highlight }, index) => (
              <Box
                key={index}
                fontWeight={highlight ? "fontWeightBold" : "fontWeightRegular"}
                component="span"
              >
                {text}
              </Box>
            ))}
          </Typography>
        );
      }}
    />
  );
}

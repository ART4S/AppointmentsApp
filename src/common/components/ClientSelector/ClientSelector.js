/* eslint-disable no-else-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
/* eslint-disable react/no-array-index-key */
import React from "react";
import { Box, TextField, Typography } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import { debounce } from "lodash";

import { repeat } from "utils/collectionUtils";
import faker from "faker";

import Progress from "../Progress/Progress";

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

const COUNTRIES = [...new Set(repeat(100, () => faker.address.country()))];

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
        await sleep(200);

        const countries = COUNTRIES.map((x) => ({
          name: x,
          matches: match(x, searchText),
        })).filter((x) => x.matches.length);

        if (active) {
          setOptions(countries);
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

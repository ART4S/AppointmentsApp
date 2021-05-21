/* eslint-disable react/display-name */
import React from "react";
import { Box, TextField, Typography } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { FixedSizeList } from "react-window";
import parse from "autosuggest-highlight/parse";
import { debounce } from "lodash";

import clientService from "services/clientService";

import Progress from "../Progress/Progress";

const ITEMS_PER_PAGE = 10;

const ListBoxComponentContext = React.createContext();

const InnerElementType = React.forwardRef((props, ref) => {
  const { style, children } = props;
  const { onScroll, ...rest } = React.useContext(ListBoxComponentContext);

  return (
    <ul
      ref={ref}
      {...rest}
      style={{ ...style, padding: 0, maxHeight: "inherit" }}
    >
      {children}
    </ul>
  );
});

const OutherElementType = React.forwardRef((props, ref) => {
  const { onScroll: listOnScroll } = React.useContext(ListBoxComponentContext);
  const { onScroll: defaultOnScroll } = props;

  function handleScroll(event) {
    listOnScroll(event);
    defaultOnScroll(event);
  }

  return <div ref={ref} {...props} onScroll={handleScroll} />;
});

function renderRow({ data, index, style }) {
  return React.cloneElement(data[index], {
    style,
  });
}

const ListBoxComponent = React.forwardRef((props, ref) => {
  const { children, ...rest } = props;
  const itemSize = 35;
  const itemData = React.Children.toArray(children);
  const height = Math.min(ITEMS_PER_PAGE - 1, itemData.length) * itemSize;

  return (
    <div ref={ref}>
      <ListBoxComponentContext.Provider value={rest}>
        <FixedSizeList
          height={height}
          itemSize={itemSize}
          itemData={itemData}
          itemCount={itemData.length}
          overscanCount={5}
          innerElementType={InnerElementType}
          outerElementType={OutherElementType}
        >
          {renderRow}
        </FixedSizeList>
      </ListBoxComponentContext.Provider>
    </div>
  );
});

function reducer(state, action) {
  switch (action.type) {
    case "setOpen": {
      return { ...state, open: action.payload };
    }
    case "setOptions": {
      return { ...state, options: action.payload };
    }
    case "clearOptions": {
      return { ...state, options: [] };
    }
    case "setSearchText": {
      return { ...state, searchText: action.payload };
    }
    case "loadClients": {
      return { ...state, loading: true };
    }
    case "loadClientsSucceed": {
      const { currentPage, totalPages, data } = action.payload;
      return {
        ...state,
        loading: false,
        options: data,
        pagination: {
          ...state.pagination,
          currentPage,
          totalPages,
        },
      };
    }
    case "setLoadMore": {
      return { ...state, loadMore: action.payload };
    }
    case "loadMore": {
      return { ...state, loading: true };
    }
    case "loadMoreSucceed": {
      const { currentPage, totalPages, data } = action.payload;
      return {
        ...state,
        loading: false,
        loadMore: false,
        options: [...state.options, ...data],
        pagination: {
          ...state.pagination,
          currentPage,
          totalPages,
        },
      };
    }
    default:
      return state;
  }
}

export default function ClientSelector(props) {
  const [state, dispatch] = React.useReducer(reducer, {
    loading: false,
    loadMore: false,
    open: false,
    searchText: "",
    options: [],
    pagination: {
      currentPage: 0,
      totalPages: 0,
    },
  });

  const setSearchTextDebounced = React.useMemo(
    () =>
      debounce(
        (value) => dispatch({ type: "setSearchText", payload: value }),
        200,
      ),
    [],
  );

  React.useEffect(() => {
    if (!state.open) {
      return undefined;
    }

    let active = true;

    if (state.searchText) {
      (async () => {
        dispatch({ type: "loadClients" });
        const data = await clientService.search(state.searchText, {
          currentPage: 0,
          itemsPerPage: ITEMS_PER_PAGE,
        });
        if (active) {
          dispatch({ type: "loadClientsSucceed", payload: data });
        }
      })();
    } else {
      dispatch({ type: "clearOptions" });
    }

    return () => {
      active = false;
    };
  }, [state.searchText, state.open]);

  React.useEffect(() => {
    if (!state.loadMore) {
      return undefined;
    }

    const { currentPage, totalPages } = state.pagination;

    if (currentPage === totalPages) {
      return undefined;
    }

    let active = true;

    (async () => {
      dispatch({ type: "loadMore" });
      const data = await clientService.search(state.searchText, {
        currentPage: currentPage + 1,
        itemsPerPage: ITEMS_PER_PAGE,
      });
      if (active) {
        dispatch({ type: "loadMoreSucceed", payload: data });
      }
    })();

    return () => {
      active = false;
    };
  }, [state.loadMore, state.pagination, state.searchText]);

  React.useEffect(() => {
    if (!state.open) {
      dispatch({ type: "clearOptions" });
    }
  }, [state.open]);

  function isNearTheBottom(element) {
    return (
      element.scrollHeight - element.scrollTop - element.clientHeight / 4 <=
      element.clientHeight
    );
  }

  function handleScroll(event) {
    dispatch({ type: "setLoadMore", payload: isNearTheBottom(event.target) }); // TODO: causes multiple re-render
  }

  return (
    <Autocomplete
      {...props}
      open={state.open}
      loading={state.loading}
      options={state.options}
      getOptionLabel={(option) => option.name ?? ""}
      ListboxComponent={ListBoxComponent}
      ListboxProps={{
        onScroll: handleScroll,
      }}
      onOpen={() => dispatch({ type: "setOpen", payload: true })}
      onClose={() => dispatch({ type: "setOpen", payload: false })}
      onInputChange={(_event, value) => setSearchTextDebounced(value)}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {state.loading && <Progress size={20} />}
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
                // eslint-disable-next-line react/no-array-index-key
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

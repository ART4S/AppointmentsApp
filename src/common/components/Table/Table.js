import PropTypes from "prop-types";
import cn from "classnames";
import {
  TableContainer as MuiTableContainer,
  Table as MuiTable,
  TableHead as MuiTableHead,
  TableBody as MuiTableBody,
  TableRow as MuiTableRow,
  TableCell as MuiTableCell,
  TableSortLabel as MuiTableSortLabel,
  TablePagination as MuiTablePagination,
  Paper,
  IconButton,
  withStyles,
  makeStyles,
} from "@material-ui/core";

import FirstPageIcon from "@material-ui/icons/FirstPage";
import LastPageIcon from "@material-ui/icons/LastPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

const TableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
}))(MuiTableCell);

function SortLabel({ order, orderBy, column, onSortRequested }) {
  const active = orderBy === column.field;

  return (
    <MuiTableSortLabel
      active={active}
      direction={active ? order : "asc"}
      onClick={() =>
        onSortRequested(
          active && order === "asc" ? "desc" : "asc",
          column.field,
        )
      }
    >
      {column.header}
    </MuiTableSortLabel>
  );
}

function TableHead({ columns, order, orderBy, onSortRequested }) {
  return (
    <MuiTableHead>
      <MuiTableRow>
        {columns.map((column) => (
          <TableCell
            key={column.field}
            style={{ pointerEvents: column.enableSort ? "inherit" : "none" }}
            sortDirection={orderBy === column.field ? order : false}
          >
            {column.enableSort ? (
              <SortLabel
                column={column}
                order={order}
                orderBy={orderBy}
                onSortRequested={onSortRequested}
              />
            ) : (
              column.header
            )}
          </TableCell>
        ))}
      </MuiTableRow>
    </MuiTableHead>
  );
}

const useTableRowStyles = makeStyles((theme) => ({
  hover: {
    cursor: "pointer",
  },
  new: {
    backgroundColor: theme.palette.success.light,
  },
}));

function TableBody({ columns, rows, selectedRow, onSelectedRowChange }) {
  const classes = useTableRowStyles();

  function formatData(row, column) {
    const data = row.data[column.field];
    return column?.formatter?.(data) ?? data;
  }

  return (
    <MuiTableBody>
      {rows.map((row) => (
        <MuiTableRow
          hover
          className={cn({ [classes.new]: !row.visited })}
          key={row.key}
          selected={selectedRow && row.key === selectedRow.key}
          classes={{
            hover: classes.hover,
          }}
          onClick={(_event) => onSelectedRowChange(row)}
        >
          {columns.map((column) => (
            <TableCell key={column.field}>{formatData(row, column)}</TableCell>
          ))}
        </MuiTableRow>
      ))}
    </MuiTableBody>
  );
}

function TablePaginationActions({ count, page, rowsPerPage, onChangePage }) {
  function canGotoPrev() {
    return page > 0;
  }

  function canGotoNext() {
    return page < Math.ceil(count / rowsPerPage) - 1;
  }

  return (
    <div style={{ display: "flex" }}>
      <IconButton
        disabled={!canGotoPrev()}
        onClick={(event) => onChangePage(event, 0)}
      >
        <FirstPageIcon />
      </IconButton>

      <IconButton
        disabled={!canGotoPrev()}
        onClick={(event) => onChangePage(event, page - 1)}
      >
        <KeyboardArrowLeft />
      </IconButton>

      <IconButton
        disabled={!canGotoNext()}
        onClick={(event) => onChangePage(event, page + 1)}
      >
        <KeyboardArrowRight />
      </IconButton>

      <IconButton
        disabled={!canGotoNext()}
        onClick={(event) =>
          onChangePage(event, Math.ceil(count / rowsPerPage) - 1)
        }
      >
        <LastPageIcon />
      </IconButton>
    </div>
  );
}

export default function Table({
  columns,
  rows,
  selectedRow,
  pagination,
  sorting,
  onCurrentPageChange,
  onItemsPerPageChange,
  onSortRequest,
  onSelectedRowChange,
}) {
  return (
    <Paper>
      <MuiTableContainer style={{ overflowX: "auto" }}>
        <MuiTable>
          <TableHead
            columns={columns}
            order={sorting.order}
            orderBy={sorting.field}
            onSortRequested={onSortRequest}
          />

          <TableBody
            columns={columns}
            rows={rows}
            selectedRow={selectedRow}
            onSelectedRowChange={onSelectedRowChange}
          />
        </MuiTable>
      </MuiTableContainer>

      <MuiTablePagination
        component="div"
        rowsPerPageOptions={pagination.availableItemsPerPage}
        count={pagination.totalItems}
        rowsPerPage={pagination.itemsPerPage}
        page={pagination.currentPage}
        SelectProps={{
          MenuProps: { disablePortal: true },
        }}
        ActionsComponent={TablePaginationActions}
        onChangePage={(_event, newPage) => onCurrentPageChange(newPage)}
        onChangeRowsPerPage={(event) =>
          onItemsPerPageChange(parseInt(event.target.value, 10))
        }
      />
    </Paper>
  );
}

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      header: PropTypes.string,
      enableSort: PropTypes.bool,
      formatter: PropTypes.func,
    }),
  ).isRequired,

  rows: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      visited: PropTypes.bool,
      // eslint-disable-next-line react/forbid-prop-types
      data: PropTypes.any.isRequired,
    }),
  ).isRequired,
};

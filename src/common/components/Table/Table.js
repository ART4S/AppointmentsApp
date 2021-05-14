import {
  Box,
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

const TableRow = withStyles((theme) => ({
  hover: {
    cursor: "pointer",
  },
}))(MuiTableRow);

function SortLabel({ order, orderBy, column, onSortRequested }) {
  function createSortHandler(property) {
    return () => onSortRequested(order === "asc" ? "desc" : "asc", property);
  }

  return (
    <MuiTableSortLabel
      active={orderBy === column.field}
      direction={orderBy === column.field ? order : "asc"}
      onClick={createSortHandler(column.field)}
    >
      {column.header}
    </MuiTableSortLabel>
  );
}

function TableHead({ columns, order, orderBy, onSortRequested }) {
  return (
    <MuiTableHead>
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.field}
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
      </TableRow>
    </MuiTableHead>
  );
}

function TableBody({ columns, rows, selectedRow, onSelectedRowChange }) {
  function formatData(row, column) {
    const data = row[column.field];
    const { formatter } = column;
    return formatter ? formatter(data) : data;
  }

  function createClickHandler(row) {
    return () => onSelectedRowChange(row);
  }

  return (
    <MuiTableBody>
      {rows.map((row) => (
        <TableRow
          hover
          key={row.id}
          selected={row === selectedRow}
          onClick={createClickHandler(row)}
        >
          {columns.map((column) => (
            <TableCell key={column.header}>{formatData(row, column)}</TableCell>
          ))}
        </TableRow>
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
      <IconButton disabled={!canGotoPrev()} onClick={(e) => onChangePage(e, 0)}>
        <FirstPageIcon />
      </IconButton>

      <IconButton
        disabled={!canGotoPrev()}
        onClick={(e) => onChangePage(e, page - 1)}
      >
        <KeyboardArrowLeft />
      </IconButton>

      <IconButton
        disabled={!canGotoNext()}
        onClick={(e) => onChangePage(e, page + 1)}
      >
        <KeyboardArrowRight />
      </IconButton>

      <IconButton
        disabled={!canGotoNext()}
        onClick={(e) => onChangePage(e, Math.ceil(count / rowsPerPage) - 1)}
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
        ActionsComponent={TablePaginationActions}
        onChangePage={(_, newPage) => onCurrentPageChange(newPage)}
        onChangeRowsPerPage={(e) =>
          onItemsPerPageChange(parseInt(e.target.value, 10))
        }
      />
    </Paper>
  );
}

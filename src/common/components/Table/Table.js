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

import {
  FirstPage as FirstPageIcon,
  LastPage as LastPageIcon,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@material-ui/icons";

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

function TableHead(props) {
  const { columns, order, orderBy, onSortRequested } = props;

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

function TableBody({ columns, rows, selectedRow, onSelectChange }) {
  function formatData(row, column) {
    const data = row[column.field];
    const { formatter } = column;
    return formatter ? formatter(data) : data;
  }

  function createClickHandler(row) {
    return (_event) => onSelectChange(row);
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

function TablePaginationActions(props) {
  const { count, page, rowsPerPage, onChangePage } = props;

  function handleFirstPageButtonClick(event) {
    onChangePage(event, 0);
  }

  function handleBackButtonClick(event) {
    onChangePage(event, page - 1);
  }

  function handleNextButtonClick(event) {
    onChangePage(event, page + 1);
  }

  function handleLastPageButtonClick(event) {
    onChangePage(event, Math.ceil(count / rowsPerPage) - 1);
  }

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
        onClick={handleFirstPageButtonClick}
      >
        <FirstPageIcon />
      </IconButton>

      <IconButton disabled={!canGotoPrev()} onClick={handleBackButtonClick}>
        <KeyboardArrowLeft />
      </IconButton>

      <IconButton disabled={!canGotoNext()} onClick={handleNextButtonClick}>
        <KeyboardArrowRight />
      </IconButton>

      <IconButton onClick={handleLastPageButtonClick} disabled={!canGotoNext()}>
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
  onSelectChange,
}) {
  function handleChangePage(_event, newPage) {
    onCurrentPageChange(newPage);
  }

  function handleChangeRowsPerPage(event) {
    onItemsPerPageChange(parseInt(event.target.value, 10));
  }

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
            onSelectChange={onSelectChange}
          />
        </MuiTable>
      </MuiTableContainer>

      <MuiTablePagination
        rowsPerPageOptions={pagination.availableItemsPerPage}
        component="div"
        count={pagination.totalItems}
        rowsPerPage={pagination.itemsPerPage}
        page={pagination.currentPage}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        ActionsComponent={TablePaginationActions}
      />
    </Paper>
  );
}

import {
  TableContainer,
  Table as MuiTable,
  TableHead,
  TableBody,
  TableRow as MuiTableRow,
  TableCell as MuiTableCell,
  Paper,
  withStyles,
} from "@material-ui/core";

const DEFAULT_COLUMN_WIDTH = 60;

const TableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
}))(MuiTableCell);

const TableHeaderCell = withStyles((theme) => ({
  head: {
    fontSize: 18,
  },
}))(TableCell);

const TableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(MuiTableRow);

export default function Table({ columns, rows }) {
  function formatData(row, column) {
    const data = row[column.field];
    const formatter = column.formatter;
    return formatter ? formatter(data) : data;
  }

  return (
    <TableContainer component={Paper} style={{ overflowX: "auto" }}>
      <MuiTable>
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <TableHeaderCell
                key={index}
                width={column.width ?? DEFAULT_COLUMN_WIDTH}
              >
                {column.header}
              </TableHeaderCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column, columnIndex) => (
                <TableCell key={columnIndex}>
                  {formatData(row, column)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
}

// TableLoader.jsx
import React from 'react';
import { TableRow, TableCell, Skeleton } from '@mui/material';

const TableLoaderRow = ({ columns }) => {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell key={column.id || column.header}>
          <Skeleton animation="wave" variant="text" />
        </TableCell>
      ))}
    </TableRow>
  );
};

export const TableLoader = ({ columns, rowsNum }) => {
  return [...Array(rowsNum)].map((_, index) => (
    <TableLoaderRow key={index} columns={columns} />
  ));
};

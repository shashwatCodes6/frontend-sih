import React, { useState } from 'react';
import { FixedSizeGrid as Grid } from 'react-window';
import Cell from './Cell';
import { Menu } from './Menu';

const SpreadsheetGrid = () => {
  const [numRows] = useState(1000); 
  const [numCols] = useState(1000);


  return (
    <>
    <Menu/>
    <Grid
      className="overflow-auto"
      columnCount={numCols}
      columnWidth={100}
      height={600} 
      rowCount={numRows}
      rowHeight={30}
      width={1000} 
    >
      {Cell}
    </Grid>
    </>
  );
};

export default SpreadsheetGrid;

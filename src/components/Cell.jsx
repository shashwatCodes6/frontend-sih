const Cell = ({ columnIndex, rowIndex, style }) => (
    <div
      style={style}
      className="border p-2 text-center"
      contentEditable = {true}
    >
      {`R${rowIndex + 1}C${columnIndex + 1}`}
    </div>
  );

  export default Cell
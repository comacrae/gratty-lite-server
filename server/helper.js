function checkNullRows(rows) {
  if (!rows) {
    // if null rows
    return [];
  } else {
    return rows;
  }
}

function getOffset(currentPage = 1, listPerPage) {
  return (currentPage - 1) * [listPerPage];
}

export { checkNullRows, getOffset };

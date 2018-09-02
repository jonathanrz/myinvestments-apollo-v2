import { t } from "i18next"
import React from "react"
import MUITableFooter from "@material-ui/core/TableFooter"
import TablePagination from "@material-ui/core/TablePagination"
import TableRow from "@material-ui/core/TableRow"

function TableFooter({
  totalCount,
  pageSize,
  page,
  onChangePage,
  onChangeRowsPerPage
}) {
  return (
    <MUITableFooter>
      <TableRow>
        <TablePagination
          data-test="pagination"
          count={totalCount}
          rowsPerPage={pageSize}
          page={page}
          onChangePage={onChangePage}
          onChangeRowsPerPage={onChangeRowsPerPage}
          labelRowsPerPage={t("common.tablePagination.rowsPerPage")}
          labelDisplayedRows={p => t("common.tablePagination.displayedRows", p)}
        />
      </TableRow>
    </MUITableFooter>
  )
}

export default TableFooter

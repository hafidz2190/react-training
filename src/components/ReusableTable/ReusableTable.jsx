import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTable, useRowSelect } from 'react-table';
import { Rings as LoadingIndicator } from 'react-loader-spinner';
import EditableText from './EditableText';
import IndeterminateCheckBox from './IndeterminateCheckBox';
import TablePagination from './TablePagination';
import SortingHeader from './SortingHeader';
import './ReusableTable.scss';

const ReusableTable = ({
  data = [],
  columns = [],
  hiddenColumns = [],
  hiddenRowIndexes = [],
  selectable = false,
  multiSelect = false,
  showCheckBoxSelection = false,
  selectedRowIds: _selectedRowIds = {},
  onSelectedRowIdsChange = () => {},
  sortValue = null,
  setSortValue = () => {},
  sortType = null,
  setSortType = () => {},
  disableSort = false,
  showPagination = false,
  pageIndex = 0,
  setPageIndex = () => {},
  pageSize = 10,
  itemsTotal = 0,
  hidePageIndex = false,
  placeholder = 'No Data',
  isLoading = false,
  onInlineEditingChange = () => {},
  onRowClick = () => {},
  onRowDoubleClick = () => {},
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    toggleAllRowsSelected,
    state: {
      selectedRowIds,
    },
  } = useTable(
    {
      columns,
      data,
      initialState: {
        selectedRowIds: _selectedRowIds,
        hiddenColumns,
      },
    },
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((cols) => {
        let newColumns = [];

        if (!(showCheckBoxSelection && selectable && multiSelect)) {
          newColumns = cols;
        } else {
          newColumns = [
            {
              id: 'selection',
              // eslint-disable-next-line react/prop-types
              Header: ({ getToggleAllRowsSelectedProps }) => (
                <div className="check-box-selection">
                  <IndeterminateCheckBox {...getToggleAllRowsSelectedProps()} />
                </div>
              ),
              // eslint-disable-next-line react/prop-types
              Cell: ({ row }) => (
                <div
                  className="check-box-selection"
                  onClick={(e) => { e.stopPropagation(); }}
                  onKeyDown={(e) => { e.stopPropagation(); }}
                  tabIndex={-1}
                  role="button"
                >
                  { /* eslint-disable-next-line react/prop-types */ }
                  <IndeterminateCheckBox {...row.getToggleRowSelectedProps()} />
                </div>
              ),
              headerClassName: 'cell-selection',
              columnClassName: 'cell-selection',
            },
            ...cols,
          ];
        }

        return newColumns;
      });
    },
  );

  useEffect(() => {
    onSelectedRowIdsChange(selectedRowIds);
  }, [onSelectedRowIdsChange, selectedRowIds]);

  const sortClickHandler = (columnId) => {
    setSortValue(columnId);

    if (!sortType || columnId !== sortValue) {
      setSortType(SortingHeader.SortType.ASC);
    } else if (sortType === SortingHeader.SortType.ASC) {
      setSortType(SortingHeader.SortType.DESC);
    } else if (SortingHeader.SortType.DESC) {
      setSortType(null);
    }
  };

  return (
    <div className="reuseable-table">
      <div className={['table-container', showPagination ? 'show-pagination' : ''].join(' ')}>
        <table
          {...getTableProps()}
          className="table-main"
        >
          <thead>
            {
              headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {
                    headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps()}
                        className={column.headerClassName}
                        style={column.headerStyle}
                      >
                        {
                          column.id === 'selection' ? (
                            column.render('Header')
                          ) : (
                            <div className="header-cell">
                              <SortingHeader
                                header={column.render('Header')}
                                columnId={column.id}
                                sortValue={sortValue}
                                sortType={sortType}
                                disabled={disableSort || !!column.disableSort || isLoading}
                                hidden={!!column.hideSort}
                                onClick={() => {
                                  if (column.disableSort) {
                                    return;
                                  }

                                  sortClickHandler(column.id);
                                }}
                              />
                            </div>
                          )
                        }
                      </th>
                    ))
                  }
                </tr>
              ))
            }
          </thead>
          {
            !isLoading && data && data.length > 0 && (
              <tbody {...getTableBodyProps()}>
                {
                  rows.map((row, rowIndex) => {
                    if (hiddenRowIndexes.indexOf(rowIndex) >= 0) {
                      return <></>;
                    }

                    prepareRow(row);

                    let rowClassName = '';

                    if (selectable) {
                      if (row.isSelected) {
                        rowClassName = 'selected';
                      } else {
                        rowClassName = 'selectable';
                      }
                    }

                    return (
                      <tr
                        {...row.getRowProps()}
                        className={rowClassName}
                        onClick={() => {
                          onRowClick(row.index);

                          if (!multiSelect) {
                            toggleAllRowsSelected(false);
                          }

                          row.toggleRowSelected(!row.isSelected);
                        }}
                        onDoubleClick={() => {
                          onRowDoubleClick(row.index);
                        }}
                      >
                        {
                          row.cells.map((cell) => (
                            <td
                              {...cell.getCellProps()}
                              className={cell.column.columnClassName}
                              style={cell.column.columnStyle}
                            >
                              {
                                cell.column.editable ? (
                                  <EditableText
                                    cellRender={cell.render('Cell')}
                                    columnId={cell.column.id}
                                    rowIndex={rowIndex}
                                    value={cell.value}
                                    onChange={onInlineEditingChange}
                                  />
                                ) : cell.render('Cell')
                              }
                            </td>
                          ))
                        }
                      </tr>
                    );
                  })
                }
              </tbody>
            )
          }
        </table>
      </div>
      {
        isLoading && (
          <div className="placeholder">
            <LoadingIndicator color="#005FAC" />
          </div>
        )
      }
      {
        !isLoading && !data?.length && placeholder && (
          <div className="placeholder">
            {placeholder}
          </div>
        )
      }
      {
        showPagination && (
          <div className="pagination-wrapper">
            <TablePagination
              pageIndex={pageIndex}
              totalResults={itemsTotal}
              resultsPerPage={pageSize}
              onPageChange={setPageIndex}
              hidePageIndex={hidePageIndex}
            />
          </div>
        )
      }
    </div>
  );
};

ReusableTable.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  hiddenColumns: PropTypes.array,
  hiddenRowIndexes: PropTypes.array,
  selectable: PropTypes.bool,
  multiSelect: PropTypes.bool,
  showCheckBoxSelection: PropTypes.bool,
  selectedRowIds: PropTypes.object,
  onSelectedRowIdsChange: PropTypes.func,
  sortValue: PropTypes.string,
  setSortValue: PropTypes.func,
  sortType: PropTypes.oneOf(Object.values(SortingHeader.SortType)),
  setSortType: PropTypes.func,
  disableSort: PropTypes.bool,
  showPagination: PropTypes.bool,
  pageIndex: PropTypes.number,
  setPageIndex: PropTypes.func,
  pageSize: PropTypes.number,
  itemsTotal: PropTypes.number,
  hidePageIndex: PropTypes.bool,
  placeholder: PropTypes.any,
  isLoading: PropTypes.bool,
  onInlineEditingChange: PropTypes.func,
  onRowClick: PropTypes.func,
  onRowDoubleClick: PropTypes.func,
};

ReusableTable.defaultProps = {
  data: [],
  columns: [],
  hiddenColumns: [],
  hiddenRowIndexes: [],
  selectable: false,
  multiSelect: false,
  showCheckBoxSelection: false,
  selectedRowIds: {},
  onSelectedRowIdsChange: () => {},
  sortValue: null,
  setSortValue: () => {},
  sortType: null,
  setSortType: () => {},
  disableSort: false,
  showPagination: false,
  pageIndex: 0,
  setPageIndex: () => {},
  pageSize: 10,
  itemsTotal: 0,
  hidePageIndex: false,
  placeholder: 'No Data',
  isLoading: false,
  onInlineEditingChange: () => {},
  onRowClick: () => {},
  onRowDoubleClick: () => {},
};

ReusableTable.SortType = SortingHeader.SortType;

export default ReusableTable;

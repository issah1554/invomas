import React, { useState, useMemo, useEffect, useRef } from "react";
import { Table, Form, Pagination, Card, Button, Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from "../../assets/css/CollapsibleTable.module.css";

type Row = { [key: string]: any; id: number };

type Props = {
  data: Row[];
  rowsPerPage?: number;
};

const CollapsibleTable: React.FC<Props> = ({ data, rowsPerPage = 5 }) => {
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);
  const [page, setPage] = useState(1);
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const [rowsPerPageOption, setRowsPerPageOption] = useState(rowsPerPage);
  const [allExpanded, setAllExpanded] = useState(false);
  const [visibleColumnsCount, setVisibleColumnsCount] = useState<number>(0);
  const tableRef = useRef<HTMLTableElement>(null);

  const columns = data.length > 0 ? Object.keys(data[0]).filter(k => k !== "id") : [];

  // Calculate visible columns dynamically based on table width
  useEffect(() => {
    const handleResize = () => {
      if (!tableRef.current) return;
      const tableWidth = tableRef.current.offsetWidth;
      const minColWidth = 120;
      const maxVisibleCols = Math.max(1, Math.floor(tableWidth / minColWidth));
      setVisibleColumnsCount(Math.min(maxVisibleCols, columns.length));
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [columns]);

  // Sorting
  const sortedData = useMemo(() => {
    let sortable = [...data];
    if (sortConfig) {
      sortable.sort((a, b) => {
        const valA = a[sortConfig.key];
        const valB = b[sortConfig.key];
        if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
        if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return sortable;
  }, [data, sortConfig]);

  // Search
  const filteredData = useMemo(() => {
    return sortedData.filter(row =>
      Object.values(row).some(val => String(val).toLowerCase().includes(search.toLowerCase()))
    );
  }, [sortedData, search]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / rowsPerPageOption);
  const paginatedData = filteredData.slice((page - 1) * rowsPerPageOption, page * rowsPerPageOption);

  const requestSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
    setSortConfig({ key, direction });
  };

  const toggleRow = (id: number) => {
    const newSet = new Set(expandedRows);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setExpandedRows(newSet);
  };

  const toggleAllRows = () => {
    if (allExpanded) setExpandedRows(new Set());
    else setExpandedRows(new Set(data.map(row => row.id)));
    setAllExpanded(!allExpanded);
  };

  const rowsPerPageOptions = [5, 10, 25, 50, 100];

  const isColumnHidden = (index: number) => index >= visibleColumnsCount;
  const hasHiddenColumns = columns.some((_, index) => isColumnHidden(index));

  return (
    <Card className={`mt-3 ${styles.collapsibleCard}`}>
      <Card.Header className={`d-flex justify-content-between align-items-center ${styles.tableToolbar}`}>
        <Form.Control
          type="text"
          placeholder="Search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="rounded-pill"
          style={{ maxWidth: "250px" }}
        />
        <Dropdown>
          <Dropdown.Toggle variant="outline-secondary btn-sm" className="rounded-pill">
            Rows: {rowsPerPageOption}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {rowsPerPageOptions.map(option => (
              <Dropdown.Item
                key={option}
                onClick={() => {
                  setRowsPerPageOption(option);
                  setPage(1);
                }}
              >
                {option}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Card.Header>

      <Card.Body className="p-0">
        <Table ref={tableRef} responsive bordered={false} hover className={`mb-0 align-middle ${styles.modernTable}`}>
          <thead className="table-light">
            <tr>
              <th style={{ width: "60px" }}>
                {hasHiddenColumns && (
                  <div className="d-flex align-items-center gap-2">
                    <h6 className="mb-0">#</h6>
                    <Button variant="link" size="sm" className={`p-0 ${styles.toggleBtn} ${allExpanded ? styles.open : ""}`} onClick={toggleAllRows}>
                      <i className="bi bi-chevron-right"></i>
                    </Button>
                  </div>
                )}
              </th>
              {columns.map((col, index) => (
                <th
                  key={col}
                  onClick={() => requestSort(col)}
                  style={{ cursor: "pointer", display: isColumnHidden(index) ? "none" : "table-cell" }}
                >
                  {col}{" "}
                  {sortConfig?.key === col &&
                    (sortConfig.direction === "asc" ? <i className="bi bi-arrow-up" /> : <i className="bi bi-arrow-down" />)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map(row => {
              const isExpanded = expandedRows.has(row.id);
              return (
                <React.Fragment key={row.id}>
                  <tr>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <h6 className="mb-0">{row.id}</h6>
                        {hasHiddenColumns && (
                          <Button variant="link" size="sm" className={`p-0 ${styles.toggleBtn} ${isExpanded ? styles.open : ""}`} onClick={() => toggleRow(row.id)}>
                            <i className="bi bi-chevron-right"></i>
                          </Button>
                        )}
                      </div>
                    </td>
                    {columns.map((col, index) => (
                      <td key={col} style={{ display: isColumnHidden(index) ? "none" : "table-cell" }}>
                        {row[col]}
                      </td>
                    ))}
                  </tr>
                  {isExpanded && (
                    <tr className={styles.expandedRow}>
                      <td colSpan={visibleColumnsCount + 1}>
                        <div className={styles.expandedContent}>
                          <h6 className="fw-semibold mb-3">Additional Information</h6>
                          <div className="row">
                            {columns.map((col, index) => {
                              if (!isColumnHidden(index)) return null;
                              return (
                                <div key={col} className="col-md-6 mb-2">
                                  <strong>{col}:</strong> {row[col]}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </Table>
      </Card.Body>

      <Card.Footer className="d-flex justify-content-between align-items-center">
        <div>
          Showing {((page - 1) * rowsPerPageOption) + 1} to {Math.min(page * rowsPerPageOption, filteredData.length)} of {filteredData.length} entries
        </div>
        <Pagination className={`mb-0 ${styles.modernPagination}`}>
          <Pagination.First disabled={page === 1} onClick={() => setPage(1)} />
          <Pagination.Prev disabled={page === 1} onClick={() => setPage(p => p - 1)} />
          {Array.from({ length: totalPages }, (_, i) => (
            <Pagination.Item key={i + 1} active={i + 1 === page} onClick={() => setPage(i + 1)}>
              {i + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next disabled={page === totalPages} onClick={() => setPage(p => p + 1)} />
          <Pagination.Last disabled={page === totalPages} onClick={() => setPage(totalPages)} />
        </Pagination>
      </Card.Footer>
    </Card>
  );
};

export default CollapsibleTable;
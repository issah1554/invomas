import React, { useState, useMemo, useEffect, useRef } from "react";
import Pagination from "./Pagination";

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

  // Calculate visible columns dynamically
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
    <div className="bg-main-200/80 backdrop-blur-md rounded-sm shadow-sm border border-main-300 overflow-hidden mt-4">
      {/* Toolbar */}
      <div className="flex justify-between items-center p-4  text-white rounded-t-xl gap-2">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="rounded-sm px-3 py-1 text-sm text-main-800 border-0 ring-main-300 ring focus:ring-2 focus:ring-main-400 focus:border-0 outline-none"
          style={{ maxWidth: "250px" }}
        />

        <div className="relative inline-block">
          <select
            value={rowsPerPageOption}
            onChange={e => { setRowsPerPageOption(Number(e.target.value)); setPage(1); }}
            className="bg-main-200 text-main-600 text-sm px-3 py-1 rounded-sm border-0 ring-main-300 ring focus:ring-2 focus:ring-main-400 focus:border-0 outline-none"
          >
            {rowsPerPageOptions.map(opt => (
              <option key={opt} value={opt}>
                Rows: {opt}
              </option>
            ))}
          </select>          
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table ref={tableRef} className="min-w-full divide-y divide-main-200">
          <thead className="bg-primary-100">
            <tr>
              <th className="px-4 py-2 w-14">
                {hasHiddenColumns && (
                  <div className="flex items-center gap-2">
                    <span>#</span>
                    <button onClick={toggleAllRows} className={`text-main-600 p-1 transform transition-transform ${allExpanded ? "rotate-90" : ""}`}>
                      <i className="bi bi-chevron-right"></i>
                    </button>
                  </div>
                )}
              </th>
              {columns.map((col, idx) => (
                <th
                  key={col}
                  onClick={() => requestSort(col)}
                  className={`px-4 py-2 text-left text-primary-600 text-sm font-semibold cursor-pointer ${isColumnHidden(idx) ? "hidden" : ""}`}
                >
                  {col}{" "}
                  {sortConfig?.key === col && (sortConfig.direction === "asc" ? <i className="bi bi-sort-up"></i> : <i className="bi bi-sort-down"></i>)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map(row => {
              const isExpanded = expandedRows.has(row.id);
              return (
                <React.Fragment key={row.id}>
                  <tr className="hover:bg-main-300">
                    <td className="px-4 py-2 align-top">
                      <div className="flex items-center gap-2">
                        <span>{row.id}</span>
                        {hasHiddenColumns && (
                          <button onClick={() => toggleRow(row.id)} className={`text-main-600 p-1 transform transition-transform ${isExpanded ? "rotate-90" : ""}`}>
                            <i className="bi bi-chevron-right"></i>
                          </button>
                        )}
                      </div>
                    </td>
                    {columns.map((col, idx) => (
                      <td key={col} className={`px-4 py-2 text-sm ${isColumnHidden(idx) ? "hidden" : ""}`}>
                        {row[col]}
                      </td>
                    ))}
                  </tr>
                  {isExpanded && (
                    <tr className="bg-main-50">
                      <td colSpan={visibleColumnsCount + 1} className="px-4 py-2">
                        <div className="space-y-2">
                          {columns.map((col, idx) => {
                            if (!isColumnHidden(idx)) return null;
                            return (
                              <div key={col} className="text-sm">
                                <span className="font-semibold">{col}:</span> {row[col]}
                              </div>
                            );
                          })}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer / Pagination */}
      <div className=" p-4 ">
        <Pagination page={5} pageSize={10} totalItems={100} onChange={page => console.log(page)} showHelper size="sm" rounded="full" />
      </div>

    </div>
  );
};

export default CollapsibleTable;

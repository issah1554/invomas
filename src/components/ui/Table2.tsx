import React, {
  useState,
  useMemo,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import Pagination from "./Pagination";

/* =========================================================
   Types
========================================================= */

type Primitive = string | number | boolean | null | undefined;

export type BaseRow = {
  id: number;
  [key: string]: Primitive | ReactNode;
};

export type Column<T extends BaseRow> = {
  key: keyof T | string; // allows virtual columns
  header: string;
  sortable?: boolean;
  render?: (row: T) => ReactNode;
};

type Props<T extends BaseRow> = {
  data: T[];
  columns: Column<T>[];
  rowsPerPage?: number;
};

/* =========================================================
   Helpers
========================================================= */

function isPrimitive(v: unknown): v is Primitive {
  return (
    typeof v === "string" ||
    typeof v === "number" ||
    typeof v === "boolean" ||
    v == null
  );
}

/* =========================================================
   Component
========================================================= */

export default function CollapsibleTable<T extends BaseRow>({
  data,
  columns,
  rowsPerPage = 5,
}: Props<T>) {
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T;
    direction: "asc" | "desc";
  } | null>(null);

  const [page, setPage] = useState(1);
  const [rowsPerPageOption, setRowsPerPageOption] = useState(rowsPerPage);
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const [allExpanded, setAllExpanded] = useState(false);

  // ✅ CRITICAL FIX: start with all columns visible
  const [visibleColumnsCount, setVisibleColumnsCount] = useState(
    columns.length
  );

  const tableRef = useRef<HTMLTableElement>(null);

  /* =======================
     Responsive column logic
  ======================= */

  useEffect(() => {
    const handleResize = () => {
      if (!tableRef.current) return;

      const tableWidth = tableRef.current.offsetWidth;
      if (tableWidth === 0) return; // prevents hidden-table bug

      const minColWidth = 140;
      const maxVisible = Math.max(1, Math.floor(tableWidth / minColWidth));

      setVisibleColumnsCount(Math.min(maxVisible, columns.length));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [columns.length]);

  const isColumnHidden = (index: number) =>
    visibleColumnsCount > 0 && index >= visibleColumnsCount;

  const hasHiddenColumns = columns.some((_, i) => isColumnHidden(i));

  /* =======================
     Sorting
  ======================= */

  const sortedData = useMemo(() => {
    if (!sortConfig) return [...data];

    return [...data].sort((a, b) => {
      const av = a[sortConfig.key];
      const bv = b[sortConfig.key];

      if (!isPrimitive(av) || !isPrimitive(bv)) return 0;
      if (av == null || bv == null) return 0;

      if (av < bv) return sortConfig.direction === "asc" ? -1 : 1;
      if (av > bv) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  const requestSort = (key: keyof T) => {
    setSortConfig(prev =>
      prev?.key === key
        ? { key, direction: prev.direction === "asc" ? "desc" : "asc" }
        : { key, direction: "asc" }
    );
  };

  /* =======================
     Search (primitive-only)
  ======================= */

  const filteredData = useMemo(() => {
    const q = search.toLowerCase();

    return sortedData.filter(row =>
      Object.values(row).some(
        v => isPrimitive(v) && String(v).toLowerCase().includes(q)
      )
    );
  }, [sortedData, search]);

  useEffect(() => {
    setPage(1);
  }, [search, rowsPerPageOption]);

  /* =======================
     Pagination
  ======================= */

  const paginatedData = filteredData.slice(
    (page - 1) * rowsPerPageOption,
    page * rowsPerPageOption
  );

  /* =======================
     Expand logic
  ======================= */

  const toggleRow = (id: number) => {
    setExpandedRows(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleAllRows = () => {
    setExpandedRows(
      allExpanded ? new Set() : new Set(paginatedData.map(r => r.id))
    );
    setAllExpanded(v => !v);
  };

  /* =======================
     Render
  ======================= */

  return (
    <div className="bg-main-200/80 backdrop-blur-md rounded-sm shadow-lg overflow-hidden mt-4">
      {/* Toolbar */}
      <div className="flex justify-between items-center p-4 gap-2">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="rounded-sm px-3 py-1 text-sm text-main-800 ring ring-main-300 focus:ring-main-400 outline-none"
        />

        <select
          value={rowsPerPageOption}
          onChange={e => setRowsPerPageOption(Number(e.target.value))}
          className="bg-main-200 text-main-600 text-sm px-3 py-1 rounded-sm ring ring-main-300"
        >
          {[5, 10, 25, 50].map(n => (
            <option key={n} value={n}>
              Rows: {n}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table ref={tableRef} className="min-w-full divide-y divide-main-200">
          <thead className="bg-primary-100">
            <tr>
              <th className="px-4 py-2 w-14">
                {hasHiddenColumns && (
                  <button
                    onClick={toggleAllRows}
                    className={`transition-transform ${allExpanded ? "rotate-90" : ""
                      }`}
                  >
                    <i className="bi bi-plus-circle" />
                  </button>
                )}
              </th>

              {columns.map((col, i) => (
                <th
                  key={String(col.key)}
                  onClick={
                    col.sortable && typeof col.key !== "string"
                      ? () => requestSort(col.key)
                      : undefined
                  }
                  className={`px-4 py-2 text-left text-sm font-semibold ${col.sortable ? "cursor-pointer" : ""
                    } ${isColumnHidden(i) ? "hidden" : ""}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {paginatedData.map(row => {
              const expanded = expandedRows.has(row.id);

              return (
                <React.Fragment key={row.id}>
                  <tr className="hover:bg-main-300">
                    <td className="px-4 py-2">
                      {hasHiddenColumns && (
                        <button onClick={() => toggleRow(row.id)}>
                          <i
                            className={`bi ${expanded
                                ? "bi-dash-circle"
                                : "bi-plus-circle"
                              }`}
                          />
                        </button>
                      )}
                    </td>

                    {columns.map((col, i) => (
                      <td
                        key={String(col.key)}
                        className={`px-4 py-2 text-sm ${isColumnHidden(i) ? "hidden" : ""
                          }`}
                      >
                        {col.render
                          ? col.render(row)
                          : typeof col.key !== "string"
                            ? (row[col.key] as ReactNode)
                            : null}
                      </td>
                    ))}
                  </tr>

                  {expanded && (
                    <tr className="bg-main-50">
                      <td
                        colSpan={visibleColumnsCount + 1}
                        className="px-4 py-2 space-y-1"
                      >
                        {columns.map((col, i) =>
                          isColumnHidden(i) ? (
                            <div key={String(col.key)} className="text-sm">
                              <strong>{col.header}:</strong>{" "}
                              {col.render
                                ? col.render(row)
                                : typeof col.key !== "string"
                                  ? (row[col.key] as ReactNode)
                                  : null}
                            </div>
                          ) : null
                        )}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4">
        <Pagination
          page={page}
          pageSize={rowsPerPageOption}
          totalItems={filteredData.length}
          onChange={setPage}
          showHelper
          size="sm"
          rounded="full"
        />
      </div>
    </div>
  );
}

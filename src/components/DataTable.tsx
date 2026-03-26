interface DataTableProps {
  headers: string[];
  rows: (string | number | null)[][];
  title?: string;
}

const DataTable = ({ headers, rows, title }: DataTableProps) => {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-card">
      {title && (
        <div className="px-4 py-3 border-b border-border">
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-secondary">
              {headers.map((h, i) => (
                <th key={i} className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri} className="border-t border-border hover:bg-secondary/50 transition-colors">
                {row.map((cell, ci) => (
                  <td key={ci} className="px-4 py-2.5 text-foreground">
                    {cell === null || cell === "" ? (
                      <span className="text-destructive font-mono text-xs">NaN</span>
                    ) : (
                      String(cell)
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;

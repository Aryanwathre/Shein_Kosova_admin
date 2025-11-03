import React from "react";

export const Table = ({ children }: { children: React.ReactNode }) => (
  <div className="table-wrapper">
    <table className="admin-table">{children}</table>
  </div>
);

export const THead = ({ children }: { children: React.ReactNode }) => (
  <thead className="admin-thead">{children}</thead>
);

export const TBody = ({ children }: { children: React.ReactNode }) => (
  <tbody className="admin-tbody">{children}</tbody>
);

export const TR = ({ children }: { children: React.ReactNode }) => (
  <tr className="admin-tr">{children}</tr>
);

export function TH({
  children,
  style,
  ...props
}: React.HTMLAttributes<HTMLTableCellElement>) {
  return (
    <th style={style} {...props}>
      {children}
    </th>
  );
}

export function TD({
  children,
  style,
  ...props
}: React.HTMLAttributes<HTMLTableCellElement>) {
  return (
    <td style={style} {...props}>
      {children}
    </td>
  );
}

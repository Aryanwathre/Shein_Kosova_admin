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

export const TH = ({ children }: { children: React.ReactNode }) => (
  <th className="admin-th">{children}</th>
);

export const TD = ({ children }: { children: React.ReactNode }) => (
  <td className="admin-td">{children}</td>
);

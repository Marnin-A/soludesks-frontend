import { ReactNode } from 'react';

interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => ReactNode;
  className?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string;
}

export function Table<T>({ columns, data, keyExtractor }: TableProps<T>) {
  return (
    <div>
      <table className="w-full">
        <thead>
          <tr className="border-b border-border-gray">
            {columns.map(column => (
              <th
                key={column.key}
                className={`px-6 py-4 text-left text-sm font-semibold text-text-dark ${column.className || ''}`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={keyExtractor(item)} className="border-b border-border-gray last:border-b-0 hover:bg-bg-gray/50">
              {columns.map(column => (
                <td key={column.key} className={`px-6 py-4 text-sm text-text-gray ${column.className || ''}`}>
                  {column.render ? column.render(item) : ((item as Record<string, unknown>)[column.key] as ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

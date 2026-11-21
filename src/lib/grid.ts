// Column classes for hairline stat grids (gap-px over a border-coloured background), chosen so
// a row never ends with an empty cell. Literal strings so Tailwind can see them.
export function statGridCols(count: number) {
  switch (count) {
    case 1:
      return 'grid-cols-1';
    case 2:
      return 'grid-cols-2';
    case 3:
      return 'grid-cols-1 sm:grid-cols-3';
    default:
      return 'grid-cols-2 lg:grid-cols-4';
  }
}

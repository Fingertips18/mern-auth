import { useCallback, useEffect, useState } from 'react';

const useGrid = (size) => {
  const [grid, setGrid] = useState({
    columns: 0,
    rows: 0,
  });

  const getGrid = useCallback(() => {
    setGrid({
      columns: Math.floor(window.innerWidth / size),
      rows: Math.floor(window.innerHeight / size),
    });
  }, [size]);

  useEffect(() => {
    getGrid();

    window.addEventListener('resize', getGrid);

    return () => window.removeEventListener('resize', getGrid);
  }, [getGrid]);

  return grid;
};

export { useGrid };

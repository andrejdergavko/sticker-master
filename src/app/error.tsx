'use client';
import { useEffect } from 'react';
import { Button } from '@mui/material';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="p-16">
      <h2>Произошла ошибка</h2>
      <Button className="mt-4" variant="contained" onClick={() => reset()}>
        Перезагрузить страницу
      </Button>
    </div>
  );
}

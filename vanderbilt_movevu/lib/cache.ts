/* eslint-disable @typescript-eslint/no-explicit-any */
import parquet from 'parquetjs';
import path from 'path';

// In-memory cache for Parquet data
let cachedData: any[] | null = null;

export async function loadCachedData() {
  if (cachedData) {
    return cachedData;
  }

  // Path to your Parquet file
  const filePath = path.resolve(process.cwd(), '../data/historical_data.parquet');
  const reader = await parquet.ParquetReader.openFile(filePath);
  const cursor = reader.getCursor();
  let record = null;
  const rows = [];

  // Read all rows from the Parquet file
  while ((record = await cursor.next())) {
    rows.push(record);
  }

  await reader.close();
  cachedData = rows; // Cache the data in memory
  return cachedData;
}

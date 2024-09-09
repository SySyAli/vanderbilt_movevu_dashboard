/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { loadCachedData } from '../../../../../lib/cache';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const defaultStartDate = new Date('2017-01-01');
  const defaultEndDate = new Date('2024-07-31');
  const startDate: Date | null = searchParams.get('startDate') ? new Date(searchParams.get('startDate')!) : defaultStartDate;
  const endDate: Date | null = searchParams.get('endDate') ? new Date(searchParams.get('endDate')!) : defaultEndDate;
  
  const data = await loadCachedData();

  const filteredData = data.filter(row => {
    const rideDate = new Date(row.RIDE_DATE);
    return rideDate >= new Date(startDate) && rideDate <= new Date(endDate);
  });

  // Count unique users
  const uniqueUsers = new Set(filteredData.map(row => row.CAMPUS_ID));

  return new Response(JSON.stringify({ data: uniqueUsers.size }), {
    headers: { 'Content-Type': 'application/json' },
  });
}

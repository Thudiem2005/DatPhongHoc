import { useEffect } from 'react';
import AppTabs from '@/components/app-tabs';
import { useBookingStore } from '@/store/bookingStore';

export default function TabsLayout() {
  const loadBookings = useBookingStore(
    (state) => state.loadBookings
  );

  useEffect(() => {
    loadBookings();
  }, []);

  return <AppTabs />;
}
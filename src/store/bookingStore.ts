import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Booking {
  id: string;
  roomId: string;
  roomName: string;
  date: string;
  startTime: string;
  endTime: string;
}

interface BookingState {
  bookings: Booking[];

  loadBookings: () => Promise<void>;
  addBooking: (booking: Booking) => Promise<void>;
  removeBooking: (bookingId: string) => Promise<void>;

  isTimeSlotBooked: (
    roomId: string,
    date: string,
    startTime: string,
    endTime: string
  ) => boolean;
}

const STORAGE_KEY = '@datphonghoc_bookings';

export const useBookingStore = create<BookingState>(
  (set, get) => ({
    bookings: [],

    // Đọc booking đã lưu
    loadBookings: async () => {
      try {
        const savedBookings =
          await AsyncStorage.getItem(STORAGE_KEY);

        if (savedBookings) {
          set({
            bookings: JSON.parse(savedBookings),
          });
        }
      } catch (error) {
        console.log(
          'Lỗi khi đọc lịch đặt:',
          error
        );
      }
    },

    // Thêm booking
    addBooking: async (booking) => {
      const updatedBookings = [
        ...get().bookings,
        booking,
      ];

      set({
        bookings: updatedBookings,
      });

      try {
        await AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(updatedBookings)
        );
      } catch (error) {
        console.log(
          'Lỗi khi lưu lịch đặt:',
          error
        );
      }
    },

    // Xóa booking
    removeBooking: async (bookingId) => {
      const updatedBookings =
        get().bookings.filter(
          (booking) => booking.id !== bookingId
        );

      set({
        bookings: updatedBookings,
      });

      try {
        await AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(updatedBookings)
        );
      } catch (error) {
        console.log(
          'Lỗi khi xóa lịch đặt:',
          error
        );
      }
    },

    // Kiểm tra trùng lịch
    isTimeSlotBooked: (
      roomId,
      date,
      startTime,
      endTime
    ) => {
      const bookings = get().bookings;

      return bookings.some(
        (booking) =>
          booking.roomId === roomId &&
          booking.date === date &&
          booking.startTime === startTime &&
          booking.endTime === endTime
      );
    },
  })
);
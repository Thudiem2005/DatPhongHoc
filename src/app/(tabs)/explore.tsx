import {
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { useBookingStore } from '@/store/bookingStore';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function BookingScreen() {
  const bookings = useBookingStore((state) => state.bookings);
  const removeBooking = useBookingStore(
    (state) => state.removeBooking
  );

  const handleCancelBooking = (bookingId: string) => {
    Alert.alert(
      'Hủy đặt phòng',
      'Bạn có chắc muốn hủy đặt phòng này không?',
      [
        {
          text: 'Không',
          style: 'cancel',
        },
        {
          text: 'Hủy đặt',
          style: 'destructive',
          onPress: () => removeBooking(bookingId),
        },
      ]
    );
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          <ThemedText type="title" style={styles.title}>
            Lịch đặt phòng
          </ThemedText>

          <ThemedText style={styles.subtitle}>
            Các phòng bạn đã đặt
          </ThemedText>

          {bookings.length === 0 ? (
            <ThemedView style={styles.emptyCard}>
              <ThemedText style={styles.emptyIcon}>
                📅
              </ThemedText>

              <ThemedText type="subtitle">
                Chưa có lịch đặt phòng
              </ThemedText>

              <ThemedText style={styles.emptyText}>
                Bạn chưa đặt phòng học nào.
              </ThemedText>
            </ThemedView>
          ) : (
            bookings.map((booking) => (
              <ThemedView
                key={booking.id}
                style={styles.bookingCard}
              >
                <ThemedText type="subtitle">
                  {booking.roomName}
                </ThemedText>

                <ThemedText style={styles.info}>
                  📅 Ngày: {booking.date}
                </ThemedText>

                <ThemedText style={styles.info}>
                  🕐 Thời gian: {booking.startTime} -{' '}
                  {booking.endTime}
                </ThemedText>

                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() =>
                    handleCancelBooking(booking.id)
                  }
                >
                  <ThemedText style={styles.cancelText}>
                    Hủy đặt phòng
                  </ThemedText>
                </TouchableOpacity>
              </ThemedView>
            ))
          )}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  safeArea: {
    flex: 1,
  },

  content: {
    padding: 20,
    gap: 12,
  },

  title: {
    marginTop: 10,
  },

  subtitle: {
    color: '#666666',
    marginBottom: 10,
  },

  bookingCard: {
    padding: 18,
    borderRadius: 14,
    gap: 10,
    borderWidth: 1,
    borderColor: '#dddddd',
  },

  info: {
    fontSize: 14,
  },

  cancelButton: {
    marginTop: 5,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#eeeeee',
    alignItems: 'center',
  },

  cancelText: {
    fontWeight: 'bold',
  },

  emptyCard: {
    padding: 30,
    borderRadius: 14,
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: '#dddddd',
  },

  emptyIcon: {
    fontSize: 35,
  },

  emptyText: {
    color: '#666666',
  },
});
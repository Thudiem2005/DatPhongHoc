import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';

import {
    Alert,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

import { useBookingStore } from '@/store/bookingStore';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { rooms } from '@/data/rooms';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function RoomDetailScreen() {
  const { roomId } = useLocalSearchParams();
   const room = rooms.find(
    (item) => item.id === roomId
  );
  const [selectedTime, setSelectedTime] = useState('');

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );

  const [showDatePicker, setShowDatePicker] = useState(false);

  const addBooking = useBookingStore(
    (state) => state.addBooking
  );

  const isTimeSlotBooked = useBookingStore(
    (state) => state.isTimeSlotBooked
  );

  const checkTimeSlotBooked = (time: string) => {
    const [startTime, endTime] = time.split(' - ');

    return isTimeSlotBooked(
  roomId as string,
  selectedDate,
      startTime,
      endTime
    );
  };

 const handleBooking = () => {
  if (!selectedTime) {
    Alert.alert(
      'Chưa chọn khung giờ',
      'Vui lòng chọn một khung giờ trước khi đặt phòng.'
    );
    return;
  }

  const [startTime, endTime] =
    selectedTime.split(' - ');

  const alreadyBooked = isTimeSlotBooked(
    roomId as string,
    selectedDate,
    startTime,
    endTime
  );

  if (alreadyBooked) {
    Alert.alert(
      'Khung giờ đã được đặt',
      `${room?.name} đã được đặt vào ${selectedTime}. Vui lòng chọn khung giờ khác.`
    );
    return;
  }

  const booking = {
    id: Date.now().toString(),
    roomId: roomId as string,
    roomName: room?.name ?? '',
    date: selectedDate,
    startTime,
    endTime,
  };

  addBooking(booking);

  Alert.alert(
    'Đặt phòng thành công',
    `${room?.name}\nNgày: ${selectedDate}\n${selectedTime}`
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
        {room?.name}
        </ThemedText>

        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowDatePicker(true)}
        >
          <ThemedText style={styles.dateButtonText}>
            📅 Ngày đặt: {selectedDate}
          </ThemedText>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={new Date(selectedDate)}
            mode="date"
            display={
              Platform.OS === 'android'
                ? 'calendar'
                : 'default'
            }
            minimumDate={new Date()}
            onChange={(event, date) => {
              setShowDatePicker(false);

              if (date) {
                setSelectedDate(
                  date.toISOString().split('T')[0]
                );
              }
            }}
          />
        )}

        <ThemedText style={styles.location}>
        📍 {room?.location}
        </ThemedText>

        <ThemedView style={styles.infoCard}>
          <ThemedText type="subtitle">
            Thông tin phòng
          </ThemedText>

        <ThemedText style={styles.info}>
            👥 Sức chứa: {room?.capacity} người
            </ThemedText>

            <ThemedText style={styles.info}>
            📍 Vị trí: {room?.location}
            </ThemedText>

            <ThemedText style={styles.info}>
            🛠 Thiết bị: {room?.equipment.join(', ')}
            </ThemedText>
        </ThemedView>

        <ThemedText
          type="subtitle"
          style={styles.sectionTitle}
        >
          Chọn khung giờ
        </ThemedText>

        <ThemedView style={styles.timeContainer}>

          {/* 08:00 - 09:00 */}
          <TouchableOpacity
            style={[
              styles.timeButton,
              selectedTime === '08:00 - 09:00' &&
                styles.timeButtonSelected,
              checkTimeSlotBooked(
                '08:00 - 09:00'
              ) &&
                styles.timeButtonBooked,
            ]}
            disabled={checkTimeSlotBooked(
              '08:00 - 09:00'
            )}
            onPress={() =>
              setSelectedTime('08:00 - 09:00')
            }
          >
            <ThemedText
              style={[
                styles.timeText,
                selectedTime ===
                  '08:00 - 09:00' &&
                  styles.timeTextSelected,
                checkTimeSlotBooked(
                  '08:00 - 09:00'
                ) &&
                  styles.timeTextBooked,
              ]}
            >
              {checkTimeSlotBooked(
                '08:00 - 09:00'
              )
                ? '08:00 - 09:00 • Đã đặt'
                : '08:00 - 09:00'}
            </ThemedText>
          </TouchableOpacity>

          {/* 09:00 - 10:00 */}
          <TouchableOpacity
            style={[
              styles.timeButton,
              selectedTime === '09:00 - 10:00' &&
                styles.timeButtonSelected,
              checkTimeSlotBooked(
                '09:00 - 10:00'
              ) &&
                styles.timeButtonBooked,
            ]}
            disabled={checkTimeSlotBooked(
              '09:00 - 10:00'
            )}
            onPress={() =>
              setSelectedTime('09:00 - 10:00')
            }
          >
            <ThemedText
              style={[
                styles.timeText,
                selectedTime ===
                  '09:00 - 10:00' &&
                  styles.timeTextSelected,
                checkTimeSlotBooked(
                  '09:00 - 10:00'
                ) &&
                  styles.timeTextBooked,
              ]}
            >
              {checkTimeSlotBooked(
                '09:00 - 10:00'
              )
                ? '09:00 - 10:00 • Đã đặt'
                : '09:00 - 10:00'}
            </ThemedText>
          </TouchableOpacity>

          {/* 10:00 - 11:00 */}
          <TouchableOpacity
            style={[
              styles.timeButton,
              selectedTime === '10:00 - 11:00' &&
                styles.timeButtonSelected,
              checkTimeSlotBooked(
                '10:00 - 11:00'
              ) &&
                styles.timeButtonBooked,
            ]}
            disabled={checkTimeSlotBooked(
              '10:00 - 11:00'
            )}
            onPress={() =>
              setSelectedTime('10:00 - 11:00')
            }
          >
            <ThemedText
              style={[
                styles.timeText,
                selectedTime ===
                  '10:00 - 11:00' &&
                  styles.timeTextSelected,
                checkTimeSlotBooked(
                  '10:00 - 11:00'
                ) &&
                  styles.timeTextBooked,
              ]}
            >
              {checkTimeSlotBooked(
                '10:00 - 11:00'
              )
                ? '10:00 - 11:00 • Đã đặt'
                : '10:00 - 11:00'}
            </ThemedText>
          </TouchableOpacity>

          {/* 13:00 - 14:00 */}
          <TouchableOpacity
            style={[
              styles.timeButton,
              selectedTime === '13:00 - 14:00' &&
                styles.timeButtonSelected,
              checkTimeSlotBooked(
                '13:00 - 14:00'
              ) &&
                styles.timeButtonBooked,
            ]}
            disabled={checkTimeSlotBooked(
              '13:00 - 14:00'
            )}
            onPress={() =>
              setSelectedTime('13:00 - 14:00')
            }
          >
            <ThemedText
              style={[
                styles.timeText,
                selectedTime ===
                  '13:00 - 14:00' &&
                  styles.timeTextSelected,
                checkTimeSlotBooked(
                  '13:00 - 14:00'
                ) &&
                  styles.timeTextBooked,
              ]}
            >
              {checkTimeSlotBooked(
                '13:00 - 14:00'
              )
                ? '13:00 - 14:00 • Đã đặt'
                : '13:00 - 14:00'}
            </ThemedText>
          </TouchableOpacity>

        </ThemedView>

        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleBooking}
        >
          <ThemedText style={styles.confirmText}>
            Xác nhận đặt phòng
          </ThemedText>
        </TouchableOpacity>

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
    padding: 20,
  },
content: {
  paddingBottom: 30,
},
  backButton: {
    fontSize: 16,
    marginBottom: 25,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },

  location: {
    marginTop: 8,
    opacity: 0.6,
  },

  infoCard: {
    marginTop: 25,
    padding: 18,
    borderRadius: 18,
    backgroundColor: '#ffffff',
    elevation: 3,
  },

  info: {
    marginTop: 15,
    fontSize: 15,
  },

  sectionTitle: {
    marginTop: 30,
    marginBottom: 15,
  },

  timeContainer: {
    gap: 10,
  },

timeButton: {
  padding: 15,
  borderRadius: 12,
  backgroundColor: '#eeeeee',
},

timeButtonSelected: {
  backgroundColor: '#1976D2',
},
timeButtonBooked: {
  backgroundColor: '#d9d9d9',
  opacity: 0.6,
},
timeText: {
  textAlign: 'center',
  fontSize: 15,
},

timeTextSelected: {
  color: '#ffffff',
  fontWeight: 'bold',
},
timeTextBooked: {
  color: '#777777',
},
  bookButton: {
    height: 50,
    marginTop: 30,
    borderRadius: 14,
    backgroundColor: '#1976D2',
    justifyContent: 'center',
    alignItems: 'center',
  },

  bookButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  confirmButton: {
  backgroundColor: '#1976D2',
  paddingVertical: 14,
  borderRadius: 10,
  alignItems: 'center',
  marginTop: 16,
},

confirmText: {
  color: '#ffffff',
  fontSize: 16,
  fontWeight: 'bold',
},
dateText: {
  marginTop: 8,
  marginBottom: 10,
  fontSize: 14,
},
dateButton: {
  backgroundColor: '#eeeeee',
  paddingVertical: 12,
  paddingHorizontal: 15,
  borderRadius: 10,
  marginTop: 8,
  marginBottom: 10,
},

dateButtonText: {
  fontSize: 14,
  fontWeight: '600',
},
});
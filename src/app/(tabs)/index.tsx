import { useState } from 'react';
import { router } from 'expo-router';

import {
  Alert,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { rooms } from '@/data/rooms';
import { useBookingStore } from '@/store/bookingStore';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
  // Danh sách booking
  const bookings = useBookingStore(
    (state) => state.bookings
  );

  // Lọc phòng còn trống
  const [showAvailableOnly, setShowAvailableOnly] =
    useState(false);

  // Lọc theo sức chứa
  const [selectedCapacity, setSelectedCapacity] =
    useState<number | null>(null);

  // Tìm kiếm
  const [searchText, setSearchText] =
    useState('');

  // Danh sách phòng sau khi lọc
  const filteredRooms = rooms.filter((room) => {
    // 1. Lọc phòng còn trống
    if (
      showAvailableOnly &&
      bookings.some(
        (booking) => booking.roomId === room.id
      )
    ) {
      return false;
    }

    // 2. Lọc theo sức chứa
    if (
      selectedCapacity !== null &&
      room.capacity < selectedCapacity
    ) {
      return false;
    }

    // 3. Lọc theo tên phòng
    if (
      searchText.trim() !== '' &&
      !room.name
        .toLowerCase()
        .includes(searchText.trim().toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >

          {/* ================= HEADER ================= */}
          <ThemedView style={styles.header}>
            <ThemedText style={styles.greeting}>
              Xin chào 👋
            </ThemedText>

            <ThemedText
              type="title"
              style={styles.title}
            >
              Đặt Phòng Học
            </ThemedText>

            <ThemedText style={styles.subtitle}>
              Tìm và đặt phòng học nhanh chóng
            </ThemedText>
          </ThemedView>

          {/* ================= SEARCH ================= */}
          <TextInput
            style={styles.searchInput}
            placeholder="🔍  Tìm kiếm phòng học..."
            placeholderTextColor="#888"
            value={searchText}
            onChangeText={setSearchText}
          />

          {/* ================= FILTER ================= */}
          <ThemedView style={styles.filterContainer}>

            {/* Tất cả */}
            <TouchableOpacity
              style={
                !showAvailableOnly
                  ? styles.filterActive
                  : styles.filterButton
              }
              onPress={() => {
                setShowAvailableOnly(false);
              }}
            >
              <ThemedText
                style={
                  !showAvailableOnly
                    ? styles.filterActiveText
                    : styles.filterText
                }
              >
                Tất cả
              </ThemedText>
            </TouchableOpacity>

            {/* Còn trống */}
            <TouchableOpacity
              style={
                showAvailableOnly
                  ? styles.filterActive
                  : styles.filterButton
              }
              onPress={() => {
                setShowAvailableOnly(
                  !showAvailableOnly
                );
              }}
            >
              <ThemedText
                style={
                  showAvailableOnly
                    ? styles.filterActiveText
                    : styles.filterText
                }
              >
                Còn trống
              </ThemedText>
            </TouchableOpacity>

            {/* Sức chứa */}
            <TouchableOpacity
              style={
                selectedCapacity !== null
                  ? styles.filterActive
                  : styles.filterButton
              }
              onPress={() => {
                Alert.alert(
                  'Chọn sức chứa',
                  'Bạn muốn tìm phòng có sức chứa bao nhiêu người?',
                  [
                    {
                      text: '4 người',
                      onPress: () =>
                        setSelectedCapacity(4),
                    },
                    {
                      text: '6 người',
                      onPress: () =>
                        setSelectedCapacity(6),
                    },
                    {
                      text: '8 người',
                      onPress: () =>
                        setSelectedCapacity(8),
                    },
                    {
                      text: '10 người',
                      onPress: () =>
                        setSelectedCapacity(10),
                    },
                    {
                      text: 'Bỏ lọc',
                      onPress: () =>
                        setSelectedCapacity(null),
                      style: 'cancel',
                    },
                  ]
                );
              }}
            >
              <ThemedText
                style={
                  selectedCapacity !== null
                    ? styles.filterActiveText
                    : styles.filterText
                }
              >
                {selectedCapacity !== null
                  ? `${selectedCapacity} người`
                  : 'Sức chứa'}
              </ThemedText>
            </TouchableOpacity>

          </ThemedView>

          {/* ================= ROOM TITLE ================= */}
          <ThemedView style={styles.sectionHeader}>
            <ThemedText type="subtitle">
              Phòng học
            </ThemedText>

            <ThemedText style={styles.roomCount}>
              {filteredRooms.length} phòng
            </ThemedText>
          </ThemedView>

          {/* ================= ROOM LIST ================= */}

          {filteredRooms.length === 0 ? (

            /* Không tìm thấy phòng */
            <ThemedView style={styles.emptyRoom}>

              <ThemedText
                style={styles.emptyRoomIcon}
              >
                🔍
              </ThemedText>

              <ThemedText type="subtitle">
                Không tìm thấy phòng
              </ThemedText>

              <ThemedText
                style={styles.emptyRoomText}
              >
                Không có phòng phù hợp với điều kiện
                tìm kiếm.
              </ThemedText>

            </ThemedView>

          ) : (

            /* Danh sách phòng */
            filteredRooms.map((room) => {

              const hasBooking = bookings.some(
                (booking) =>
                  booking.roomId === room.id
              );

              return (
                <ThemedView
                  key={room.id}
                  style={styles.roomCard}
                >

                  {/* Room header */}
                  <ThemedView
                    style={styles.roomTop}
                  >

                    <ThemedView>

                      <ThemedText
                        type="subtitle"
                      >
                        {room.name}
                      </ThemedText>

                      <ThemedText
                        style={styles.status}
                      >
                        {hasBooking
                          ? '🔴 Đã có lịch đặt'
                          : '🟢 Còn lịch trống'}
                      </ThemedText>

                      <ThemedText
                        style={styles.location}
                      >
                        📍 {room.location}
                      </ThemedText>

                    </ThemedView>

                    {/* Badge */}
                    <ThemedView
                      style={[
                        styles.availableBadge,
                        hasBooking &&
                          styles.availableBadgeBooked,
                      ]}
                    >
                      <ThemedText
                        style={[
                          styles.availableText,
                          hasBooking &&
                            styles.availableTextBooked,
                        ]}
                      >
                        {hasBooking
                          ? 'Đã đặt'
                          : 'Còn trống'}
                      </ThemedText>
                    </ThemedView>

                  </ThemedView>

                  {/* Capacity */}
                  <ThemedText style={styles.info}>
                    👥 Tối đa {room.capacity} người
                  </ThemedText>

                  {/* Equipment */}
                  <ThemedText style={styles.info}>
                    🛠 {room.equipment.join(', ')}
                  </ThemedText>

                  {/* Book button */}
                  <TouchableOpacity
                    style={styles.bookButton}
                    onPress={() =>
                      router.push({
                        pathname: '/room-detail',
                        params: {
                          roomId: room.id,
                        },
                      })
                    }
                  >
                    <ThemedText
                      style={styles.bookButtonText}
                    >
                      Đặt phòng
                    </ThemedText>
                  </TouchableOpacity>

                </ThemedView>
              );
            })

          )}

        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

/* ================================================= */
/* ===================== STYLE ===================== */
/* ================================================= */

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

  safeArea: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 30,
  },

  /* ---------- Header ---------- */

  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },

  greeting: {
    fontSize: 16,
    marginBottom: 6,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },

  subtitle: {
    fontSize: 15,
    marginTop: 6,
    opacity: 0.7,
  },

  /* ---------- Search ---------- */

  searchInput: {
    height: 50,
    marginHorizontal: 20,
    marginTop: 15,
    paddingHorizontal: 18,
    borderRadius: 14,
    backgroundColor: '#f1f1f1',
    fontSize: 15,
  },

  /* ---------- Filter ---------- */

  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 15,
    gap: 10,
  },

  filterActive: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#1976D2',
  },

  filterActiveText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },

  filterButton: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#eeeeee',
  },

  filterText: {
    color: '#333333',
  },

  /* ---------- Section ---------- */

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 25,
    marginBottom: 12,
  },

  roomCount: {
    fontSize: 14,
    opacity: 0.6,
  },

  /* ---------- Room card ---------- */

  roomCard: {
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 18,
    borderRadius: 18,
    backgroundColor: '#ffffff',

    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.08,
    shadowRadius: 5,

    elevation: 3,
  },

  roomTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  status: {
    fontSize: 13,
    marginTop: 5,
  },

  location: {
    marginTop: 5,
    fontSize: 13,
    opacity: 0.6,
  },

  /* ---------- Available badge ---------- */

  availableBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: '#E8F5E9',
  },

  availableBadgeBooked: {
    backgroundColor: '#FFEBEE',
  },

  availableText: {
    color: '#2E7D32',
    fontSize: 12,
    fontWeight: 'bold',
  },

  availableTextBooked: {
    color: '#C62828',
  },

  /* ---------- Room information ---------- */

  info: {
    marginTop: 10,
    fontSize: 14,
    opacity: 0.75,
  },

  /* ---------- Book button ---------- */

  bookButton: {
    marginTop: 15,
    height: 45,
    borderRadius: 12,
    backgroundColor: '#1976D2',
    justifyContent: 'center',
    alignItems: 'center',
  },

  bookButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },

  /* ---------- Empty ---------- */

  emptyRoom: {
    marginHorizontal: 20,
    marginTop: 20,
    padding: 30,
    borderRadius: 18,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },

  emptyRoomIcon: {
    fontSize: 35,
    marginBottom: 10,
  },

  emptyRoomText: {
    marginTop: 8,
    textAlign: 'center',
    opacity: 0.6,
  },

});
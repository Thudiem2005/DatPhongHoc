import { Room } from '../types/room';

export const rooms: Room[] = [
  {
    id: '1',
    name: 'Phòng A101',
    capacity: 6,
    location: 'Tòa A - Tầng 1',
    equipment: ['Wi-Fi', 'Máy chiếu', 'Điều hòa'],
  },
  {
    id: '2',
    name: 'Phòng A102',
    capacity: 10,
    location: 'Tòa A - Tầng 1',
    equipment: ['Wi-Fi', 'Máy chiếu'],
  },
  {
    id: '3',
    name: 'Phòng B201',
    capacity: 4,
    location: 'Tòa B - Tầng 2',
    equipment: ['Wi-Fi', 'Điều hòa'],
  },
  {
    id: '4',
    name: 'Phòng B202',
    capacity: 8,
    location: 'Tòa B - Tầng 2',
    equipment: ['Wi-Fi', 'Máy chiếu', 'Điều hòa'],
  },
];
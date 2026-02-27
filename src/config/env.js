// src/config/env.js
import { Platform } from 'react-native';

// Öz kompyuterinizin yerli IP-sini bura yazın (cmd -> ipconfig)
// Əgər emulyatordursa Android üçün 10.0.2.2 qalmalıdır.
const LOCAL_IP = "192.168.1.100"; // Real cihaz üçün bunu dəyişin!

const ENV = {
  dev: {
    API_URL: Platform.select({
      ios: "http://localhost:8000/api/v1", // iOS Simulator
      android: "http://10.0.2.2:8000/api/v1", // Android Emulator
    }),
  },
  prod: {
    API_URL: "https://api.tripsify.app/v1", // Real server
  }
};

// Hələlik 'dev' rejimindəyik
const currentEnv = ENV.dev;

export default currentEnv;

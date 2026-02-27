import client from './core/client';

export const authService = {
  // Login funksiyası (backend-də bu, emailə OTP göndərir)
  login: (data) => client.post('/auth/login/', data),

  // *** DÜZƏLİŞ BURADADIR ***
  // Əvvəl bura '/auth/send-otp/' yazılmışdı, amma backend-də elə bir yer yoxdur.
  // Backend-dəki SendEmailOTPView '/auth/login/' url-inə bağlıdır.
  sendOtp: (data) => client.post('/auth/login/', data), 

  register: (data) => client.post('/auth/register/', data),
  verifyOtp: (data) => client.post('/auth/verify_otp/', data),
  
  sendPhoneOtp: (data) => client.post('/auth/send_phone_otp/', data),
  sendWhatsAppOtp: (data) => client.post('/auth/send_whatsapp_otp/', data),
};

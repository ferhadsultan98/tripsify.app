import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ScreenHeader from "../../components/common/ScreenHeader";
import Select from "../../components/common/Select";
import PhoneInput from "../../components/common/PhoneInput";
import { spacing } from "../../styles/spacing";
import { fontFamily } from "../../styles/fonts";
import EmailIcon from "../../../assets/images/email.svg";
import { useTheme } from "../../context/ThemeContext";

// API & Hooks
import { authService } from "../../api/auth";
import { commonService } from "../../api/common";
import useApi from "../../hooks/useApi";

const SignUpFormScreen = ({ navigation }) => {
  const { theme } = useTheme();

  // --- State ---
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState(""); // Ölkə ID-si burada saxlanılır
  const [city, setCity] = useState(""); // Şəhər ID-si və ya adı
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneCountryCode, setPhoneCountryCode] = useState("994");
  const [agreed, setAgreed] = useState(false);

  // Data State
  const [countryOptions, setCountryOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);

  // UI State
  const [errors, setErrors] = useState({});

  const registerApi = useApi(authService.register);
  const countriesApi = useApi(commonService.getCountries);
  const citiesApi = useApi(commonService.getCities);

  useEffect(() => {
    const loadCountries = async () => {
      console.log("🔄 [1] Ölkələr sorğusu göndərilir...");

      const { data, error } = await countriesApi.request();

      if (error) {
        console.error("❌ [1] Ölkə API Xətası:", error);
        return;
      }

      if (data) {
        const listData = Array.isArray(data)
          ? data
          : data.results || data.data || [];

        console.log(`📊 Tapılan ölkə sayı: ${listData.length}`);

        if (listData.length > 0) {
          const formatted = listData.map((item) => {
            const nameLabel =
              typeof item.name === "object" && item.name !== null
                ? item.name.en || Object.values(item.name)[0]
                : item.name;

            return {
              label: nameLabel || "Unknown",
              value: item.id,
              icon: item.flag,
              phone_code: item.phone_code,
            };
          });
          setCountryOptions(formatted);
        } else {
          console.warn("⚠️ Ölkə siyahısı boşdur! Backend formatını yoxlayın.");
        }
      }
    };
    loadCountries();
  }, []);

  // 2. Ölkə seçiləndə
  const handleCountryChange = async (selectedId) => {
    console.log("point -> Selected Country ID:", selectedId);

    setCountry(selectedId);
    setCity("");
    setCityOptions([]);

    // Telefon kodunu tapmaq
    const selectedObj = countryOptions.find((c) => c.value === selectedId);
    if (selectedObj) {
      console.log("Seçilən ölkə obyekti:", selectedObj);
      if (selectedObj.phone_code) {
        setPhoneCountryCode(selectedObj.phone_code.replace("+", ""));
      }
    }

    // Şəhərlər üçün sorğu (ID göndərilir)
    console.log(`🔄 [2] Şəhər sorğusu göndərilir (Ölkə ID: ${selectedId})...`);

    // /city/?country=ID
    const { data, error } = await citiesApi.request(selectedId);

    if (error) {
      console.error("❌ [2] Şəhər API Xətası:", error);
      return;
    }

    if (data) {
      console.log("✅ [2] Şəhər API Cavabı:", JSON.stringify(data, null, 2));

      const listData = Array.isArray(data)
        ? data
        : data.results || data.data || [];

      // Filter: Yalnız seçilən ölkəyə aid olan şəhərləri saxla
      const filteredList = listData.filter((item) => {
        return item.country && item.country.id === selectedId;
      });

      const formattedCities = filteredList.map((item) => {
        // Şəhər adı da obyekt ola bilər
        const cityName =
          typeof item.name === "object" && item.name !== null
            ? item.name.en || Object.values(item.name)[0]
            : item.name;

        return {
          label: cityName || "Unknown City",
          value: item.id, // Və ya item.name, backend-in nə istədiyindən asılıdır
        };
      });
      setCityOptions(formattedCities);
    }
  };

  // --- Validasiya ---
  const validateForm = () => {
    const newErrors = {};
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Invalid email format";

    if (!country) newErrors.country = "Country is required";
    if (!city) newErrors.city = "City is required";
    if (!phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required";
    if (!agreed) newErrors.agreed = "You must agree to the terms";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      console.log("⚠️ Validasiya xətaları:", newErrors);
    }

    return Object.keys(newErrors).length === 0;
  };

  // --- Submit (MODİFİKASİYA OLUNMUŞ) ---
  const handleContinue = async () => {
    console.log("🖱️ [3] Continue düyməsi basıldı");

    if (!validateForm()) {
      console.log("🛑 Validasiyadan keçmədi");
      return;
    }

    // Dataları toplayırıq, amma hələ serverə göndərmirik
    const formData = {
      email: email,
      country: country,
      city: city,
      phone_code: phoneCountryCode,
      phone_number: phoneNumber,
    };

    console.log(
      "🚀 [3] Data növbəti ekrana ötürülür:",
      JSON.stringify(formData, null, 2),
    );

    // Serverə sorğu GÖNDƏRMƏDƏN birbaşa növbəti ekrana keçirik
    navigation.navigate("SignUpVerificationScreen", {
      formData: formData, // Bütün form datası buradadır
      phoneNumber: `+${phoneCountryCode}${phoneNumber}`, // Göstərmək üçün
      email: email,
      type: "register",
      currentStep: 2,
      totalSteps: 6,
    });

    /* 
       QEYD: Keçmiş kodda burada registerApi.request çağırılırdı. 
       Onu sildik (və ya commentə aldıq) ki, avtomatik register olmasın.
    */
  };

  const selectedCountryObj = countryOptions.find((c) => c.value === country);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScreenHeader
          onBackPress={() => navigation.goBack()}
          currentStep={1}
          totalSteps={6}
          showProgress={true}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
        >
          <Text style={[styles.title, { color: theme.textPrimary }]}>
            Become a Tripsify driver 🚗
          </Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            To enhance your travel journey, we'd love to know more about you.
          </Text>

          {/* Email Input */}
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: theme.textPrimary }]}>
              Email
            </Text>
            <View
              style={[
                styles.inputWrapper,
                { backgroundColor: theme.inputBg },
                errors.email && { borderColor: theme.error, borderWidth: 1 },
              ]}
            >
              <EmailIcon
                width={20}
                height={20}
                fill={theme.textSecondary}
                style={styles.inputIcon}
              />
              <TextInput
                style={[styles.input, { color: theme.textPrimary }]}
                placeholder="Enter your e-mail address"
                placeholderTextColor={theme.textSecondary}
                autoCapitalize="none"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
            </View>
            {errors.email && (
              <Text style={[styles.errorText, { color: theme.error }]}>
                {errors.email}
              </Text>
            )}
          </View>

          {/* Country Select */}
          <Select
          searchable="true"
            label="Country of Residence"
            value={country}
            options={countryOptions}
            onSelect={handleCountryChange}
            placeholder={
              countriesApi.loading ? "Loading countries..." : "Select country"
            }
            icon={selectedCountryObj?.icon}
            error={errors.country}
            
          />

          {/* City Select */}
          <Select
          searchable="true"
            label="City of Residence"
            value={city}
            options={cityOptions}
            onSelect={setCity}
            placeholder={
              citiesApi.loading ? "Loading cities..." : "Select city"
            }
            error={errors.city}
            disabled={!country || citiesApi.loading}
          />

          {/* Phone Input */}
          <PhoneInput
            label="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            countryCode={phoneCountryCode}
            onCountryChange={setPhoneCountryCode}
            error={errors.phoneNumber}
          />

          {/* Checkbox */}
          <View style={styles.checkboxContainer}>
            <TouchableOpacity
              style={[
                styles.checkbox,
                { borderColor: theme.border },
                agreed && {
                  backgroundColor: theme.primary,
                  borderColor: theme.primary,
                },
              ]}
              onPress={() => setAgreed(!agreed)}
            >
              {agreed && (
                <Text style={[styles.checkmark, { color: "#FFFFFF" }]}>✓</Text>
              )}
            </TouchableOpacity>

            <Text style={[styles.checkboxText, { color: theme.textPrimary }]}>
              By registering, you agree to the{" "}
              <Text
                style={[styles.link, { color: theme.primary }]}
                onPress={() => navigation.navigate("TermsOfService")}
              >
                Terms of Service
              </Text>{" "}
              and{" "}
              <Text
                style={[styles.link, { color: theme.primary }]}
                onPress={() => navigation.navigate("PrivacyPolicy")}
              >
                Privacy Policy
              </Text>
              , commit to complying with the obligations arising from EU and
              local legislation.
            </Text>
          </View>
          {errors.agreed && (
            <Text style={[styles.errorText, { color: theme.error }]}>
              {errors.agreed}
            </Text>
          )}
        </ScrollView>

        {/* Bottom Button */}
        <View style={[styles.bottomSection, { borderTopColor: theme.border }]}>
          <TouchableOpacity
            style={[styles.continueButton, { backgroundColor: theme.primary }]}
            onPress={handleContinue}
            disabled={registerApi.loading} // Loading state artıq vacib deyil amma qala bilər
          >
            {/* Loading göstəricisini dəyişdirməyə ehtiyac yoxdur, çünki registerApi.loading false olacaq */}
            <Text style={[styles.continueButtonText, { color: "#FFFFFF" }]}>
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: spacing.large,
    gap: 24,
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: 24,
    marginTop: spacing.medium,
  },
  subtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
    lineHeight: 22.4,
    letterSpacing: 0.2,
  },
  inputContainer: {
    // handled by gap
  },
  label: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    marginBottom: spacing.small,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    height: 55,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  inputIcon: {
    marginRight: spacing.small,
  },
  input: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: 16,
  },
  errorText: {
    fontFamily: fontFamily.regular,
    fontSize: 11,
    marginTop: 4,
  },
  checkboxContainer: {
    flexDirection: "row",
    marginTop: spacing.medium,
    marginBottom: spacing.large,
    alignItems: "flex-start",
    gap: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
  },
  checkmark: {
    fontFamily: fontFamily.bold,
    fontSize: 12,
  },
  checkboxText: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: 13,
    lineHeight: 20,
  },
  link: {
    fontFamily: fontFamily.semiBold,
    textDecorationLine: "underline",
  },
  bottomSection: {
    paddingHorizontal: spacing.horizontal,
    paddingVertical: spacing.large,
    borderTopWidth: 1,
  },
  continueButton: {
    height: 55,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  continueButtonText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
  },
});

export default SignUpFormScreen;

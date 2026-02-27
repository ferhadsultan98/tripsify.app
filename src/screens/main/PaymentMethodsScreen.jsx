import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  Dimensions,
  Image,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Carousel from "react-native-reanimated-carousel";
import LinearGradient from "react-native-linear-gradient";
import ScreenHeader from "../../components/common/ScreenHeader";
import { fontFamily } from "../../styles/fonts";
import { useTheme } from "../../context/ThemeContext";
import { colors } from "../../styles/colors";

import PlusIcon from "../../../assets/images/cardAddIcon.svg";
import visaLogo from "../../../assets/images/visa_logo.png";
import mastercardLogo from "../../../assets/images/mastercard_logo.png";

const { width: screenWidth } = Dimensions.get("window");

// --- CARD COMPONENT ---
const CreditCard = ({ item }) => {
  const visaGradient = ["#4A00E0", "#8E2DE2"];
  const masterGradient = ["#11998e", "#38ef7d"];
  const gradientColors = item.type === "visa" ? visaGradient : masterGradient;

  return (
    <View style={styles.cardContainer}>
      <LinearGradient
        colors={gradientColors}
        style={styles.creditCard}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.glassOverlay} />
        <View style={styles.cardHeader}>
          <Image source={item.logo} style={styles.cardLogo} />
          <Text style={styles.cardType}>{item.type}</Text>
        </View>
        <View style={styles.cardNumberContainer}>
          <Text style={styles.creditCardNumber}>{item.number}</Text>
        </View>
        <View style={styles.creditCardDetails}>
          <View>
            <Text style={styles.creditCardLabel}>CARD HOLDER</Text>
            <Text style={styles.creditCardValue}>{item.holder}</Text>
          </View>
          <View>
            <Text style={styles.creditCardLabel}>EXPIRES</Text>
            <Text style={styles.creditCardValue}>{item.expiry}</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

// --- ADD CARD MODAL ---
const AddCardModal = ({ visible, onClose, onAddCard, theme }) => {
  const [cardInfo, setCardInfo] = useState({
    number: "",
    holder: "",
    expiry: "",
    cvv: "",
  });
  const [cardType, setCardType] = useState("visa");

  const formatCardNumber = (text) => {
    const cleaned = text.replace(/\D/g, "");
    const formatted = cleaned.replace(/(\d{4})/g, "$1 ").trim();
    setCardInfo((p) => ({ ...p, number: formatted }));
  };

  const formatExpiryDate = (text) => {
    const cleaned = text.replace(/\D/g, "");
    let formatted = cleaned;
    if (cleaned.length > 2)
      formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    setCardInfo((p) => ({ ...p, expiry: formatted }));
  };

  const handleAdd = () => {
    if (cardInfo.number && cardInfo.holder && cardInfo.expiry) {
      onAddCard({
        id: Math.random().toString(),
        ...cardInfo,
        type: cardType,
        logo: cardType === "visa" ? visaLogo : mastercardLogo,
      });
      setCardInfo({ number: "", holder: "", expiry: "", cvv: "" });
      onClose();
    } else {
      alert("Please fill all fields.");
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ width: "100%", alignItems: "center" }}
        >
          <View
            style={[styles.modalContent, { backgroundColor: theme.cardBg }]}
          >
            <View style={styles.modalHeaderLine} />
            <Text style={[styles.modalTitle, { color: theme.textPrimary }]}>
              Add New Card
            </Text>
            <View style={styles.cardTypeSelector}>
              <TouchableOpacity
                onPress={() => setCardType("visa")}
                style={[
                  styles.typeButton,
                  cardType === "visa" && styles.typeButtonSelected,
                ]}
              >
                <Image
                  source={visaLogo}
                  style={[
                    styles.typeLogo,
                    cardType === "visa" && styles.typeLogoSelected,
                  ]}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setCardType("mastercard")}
                style={[
                  styles.typeButton,
                  cardType === "mastercard" && styles.typeButtonSelected,
                ]}
              >
                <Image
                  source={mastercardLogo}
                  style={[
                    styles.typeLogo,
                    cardType === "mastercard" && styles.typeLogoSelected,
                  ]}
                />
              </TouchableOpacity>
            </View>
            <TextInput
              placeholder="Card Number"
              placeholderTextColor={theme.textSecondary}
              style={[
                styles.input,
                { backgroundColor: theme.inputBg, color: theme.textPrimary },
              ]}
              keyboardType="number-pad"
              maxLength={19}
              onChangeText={formatCardNumber}
              value={cardInfo.number}
            />
            <TextInput
              placeholder="Card Holder Name"
              placeholderTextColor={theme.textSecondary}
              style={[
                styles.input,
                { backgroundColor: theme.inputBg, color: theme.textPrimary },
              ]}
              maxLength={20}
              onChangeText={(text) =>
                setCardInfo((p) => ({ ...p, holder: text.toUpperCase() }))
              }
            />
            <View style={{ flexDirection: "row", gap: 16 }}>
              <TextInput
                placeholder="MM/YY"
                placeholderTextColor={theme.textSecondary}
                style={[
                  styles.input,
                  {
                    flex: 1,
                    backgroundColor: theme.inputBg,
                    color: theme.textPrimary,
                  },
                ]}
                keyboardType="number-pad"
                maxLength={5}
                onChangeText={formatExpiryDate}
                value={cardInfo.expiry}
              />
              <TextInput
                placeholder="CVV"
                placeholderTextColor={theme.textSecondary}
                style={[
                  styles.input,
                  {
                    flex: 1,
                    backgroundColor: theme.inputBg,
                    color: theme.textPrimary,
                  },
                ]}
                keyboardType="number-pad"
                maxLength={3}
                secureTextEntry
              />
            </View>
            <TouchableOpacity
              style={[
                styles.modalAddButton,
                { backgroundColor: theme.primary },
              ]}
              onPress={handleAdd}
            >
              <Text style={styles.modalButtonText}>Add Card</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text
                style={[styles.closeButtonText, { color: theme.textSecondary }]}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

// --- PAGINATION ---
const CustomPagination = ({ length, activeIndex, theme }) => (
  <View style={styles.paginationContainer}>
    {Array.from({ length }).map((_, index) => (
      <View
        key={index}
        style={[
          styles.paginationDot,
          { backgroundColor: theme.border },
          activeIndex === index && {
            backgroundColor: theme.primary,
            width: 24,
          },
        ]}
      />
    ))}
  </View>
);

// --- MAIN SCREEN ---
const PaymentMethodsScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [cards, setCards] = useState([
    {
      id: "1",
      type: "visa",
      number: "4319 5312 0215 1269",
      holder: "THOMAS CULLEN",
      expiry: "09/25",
      logo: visaLogo,
    },
    {
      id: "2",
      type: "mastercard",
      number: "5412 7512 3412 3456",
      holder: "JOHN DOE",
      expiry: "11/26",
      logo: mastercardLogo,
    },
  ]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [addModalVisible, setAddModalVisible] = useState(false);

  const handleAddCard = (newCard) => setCards((prev) => [...prev, newCard]);

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.background }]}
    >
      <ScreenHeader
        title="Payment Methods"
        onBackPress={() => navigation.goBack()}
        rightIcon={<PlusIcon width={24} height={24} fill={theme.primary} />}
        onRightIconPress={() => setAddModalVisible(true)}
      />
      <AddCardModal
        visible={addModalVisible}
        onClose={() => setAddModalVisible(false)}
        onAddCard={handleAddCard}
        theme={theme}
      />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginTop: 20 }}>
          <Carousel
            loop={false}
            width={screenWidth}
            height={240}
            data={cards}
            onSnapToItem={setActiveIndex}
            renderItem={CreditCard}
            mode="parallax"
            modeConfig={{
              parallaxScrollingScale: 0.9,
              parallaxScrollingOffset: 50,
            }}
          />
        </View>
        <CustomPagination
          length={cards.length}
          activeIndex={activeIndex}
          theme={theme}
        />
        <View style={styles.detailsContainer}>
          <DetailRow
            label="Card Holder"
            value={cards[activeIndex]?.holder}
            theme={theme}
          />
          <DetailRow
            label="Card Number"
            value={`**** ${cards[activeIndex]?.number.slice(-4)}`}
            theme={theme}
          />
          <DetailRow
            label="Expiry Date"
            value={cards[activeIndex]?.expiry}
            theme={theme}
            isLast
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const DetailRow = ({ label, value, theme, isLast }) => (
  <View
    style={[
      styles.detailRow,
      { borderBottomColor: isLast ? "transparent" : theme.border },
    ]}
  >
    <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>
      {label}
    </Text>
    <Text style={[styles.detailValue, { color: theme.textPrimary }]}>
      {value}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  scrollContent: { paddingBottom: 20 },
  cardContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  creditCard: {
    width: screenWidth * 0.85,
    height: 210,
    borderRadius: 24,
    padding: 24,
    justifyContent: "space-between",
    overflow: "hidden",
  },
  glassOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 24,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardLogo: { width: 50, height: 30, resizeMode: "contain" },
  cardType: {
    fontFamily: fontFamily.bold,
    color: "rgba(255,255,255,0.8)",
    fontSize: 14,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  cardNumberContainer: { flex: 1, justifyContent: "center" },
  creditCardNumber: {
    fontFamily: fontFamily.medium,
    fontSize: 22,
    color: "#FFF",
    letterSpacing: 3,
  },
  creditCardDetails: { flexDirection: "row", justifyContent: "space-between" },
  creditCardLabel: {
    fontFamily: fontFamily.regular,
    fontSize: 10,
    color: "rgba(255,255,255,0.6)",
    textTransform: "uppercase",
    marginBottom: 4,
  },
  creditCardValue: {
    fontFamily: fontFamily.semiBold,
    fontSize: 15,
    color: "#FFF",
    textTransform: "uppercase",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 20,
  },
  paginationDot: { width: 8, height: 8, borderRadius: 4, marginHorizontal: 4 },
  detailsContainer: { paddingHorizontal: 24, marginTop: 10 },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  detailLabel: { fontFamily: fontFamily.medium, fontSize: 15 },
  detailValue: { fontFamily: fontFamily.bold, fontSize: 16 },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  modalContent: {
    width: "100%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 30,
    gap: 16,
    alignItems: "center",
  },
  modalHeaderLine: {
    width: 40,
    height: 4,
    backgroundColor: "#DDD",
    borderRadius: 2,
    marginBottom: 10,
  },
  modalTitle: { fontFamily: fontFamily.bold, fontSize: 20, marginBottom: 15 },
  input: {
    height: 56,
    borderRadius: 16,
    paddingHorizontal: 20,
    fontFamily: fontFamily.medium,
    fontSize: 16,
    width: "100%",
  },
  cardTypeSelector: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginBottom: 15,
  },
  typeButton: {
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "transparent",
  },
  typeButtonSelected: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderColor: "#DDD",
  },
  typeLogo: { width: 50, height: 35, resizeMode: "contain", opacity: 0.5 },
  typeLogoSelected: { opacity: 1, transform: [{ scale: 1.1 }] },
  modalAddButton: {
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    width: "100%",
  },
  modalButtonText: { fontFamily: fontFamily.bold, fontSize: 16, color: "#FFF" },
  closeButton: { marginTop: 10, padding: 10 },
  closeButtonText: {
    textAlign: "center",
    fontFamily: fontFamily.medium,
    fontSize: 16,
  },
});

export default PaymentMethodsScreen;

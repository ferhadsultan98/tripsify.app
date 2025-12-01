import React, { useState, useRef } from "react";
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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Carousel from "react-native-reanimated-carousel";
import LinearGradient from "react-native-linear-gradient";
import ScreenHeader from "../../components/common/ScreenHeader";
import { colors } from "../../styles/colors";
import { fontFamily } from "../../styles/fonts";

import PlusIcon from "../../../assets/images/cardAddIcon.svg";
import visaLogo from "../../../assets/images/visa_logo.png";
import mastercardLogo from "../../../assets/images/mastercard_logo.png";

const { width: screenWidth } = Dimensions.get("window");

// Kart komponenti (dəyişiklik yoxdur)
const CreditCard = ({ item }) => {
  const gradientColors =
    item.type === "visa" ? ["#5D5FEF", "#3D3DE2"] : ["#2c3e50", "#34495e"];
  return (
    <View style={styles.cardContainer}>
      <LinearGradient
        colors={gradientColors}
        style={styles.creditCard}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.cardHeader}>
          <Image source={item.logo} style={styles.cardLogo} />
          <Text style={styles.cardType}>{item.type}</Text>
        </View>
        <Text style={styles.creditCardNumber}>{item.number}</Text>
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

// === YENİLƏNMİŞ "ADD CARD" MODALI ===
const AddCardModal = ({ visible, onClose, onAddCard }) => {
  const [cardInfo, setCardInfo] = useState({
    number: "",
    holder: "",
    expiry: "",
    cvv: "",
  });
  const [cardType, setCardType] = useState("visa");

  // === FORMATLAMA FUNKSİYALARI ===
  const formatCardNumber = (text) => {
    const cleaned = text.replace(/\D/g, ""); // Yalnız rəqəmləri saxla
    const formatted = cleaned.replace(/(\d{4})/g, "$1 ").trim(); // Hər 4 rəqəmdən sonra boşluq
    setCardInfo((p) => ({ ...p, number: formatted }));
  };

  const formatExpiryDate = (text) => {
    const cleaned = text.replace(/\D/g, "");
    let formatted = cleaned;
    if (cleaned.length > 2) {
      formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`; // MM/YY formatı
    }
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
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add New Card</Text>
          <View style={styles.cardTypeSelector}>
            <TouchableOpacity onPress={() => setCardType("visa")}>
              <Image
                source={visaLogo}
                style={[
                  styles.typeLogo,
                  cardType === "visa" && styles.typeLogoSelected,
                ]}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setCardType("mastercard")}>
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
            style={styles.input}
            keyboardType="number-pad"
            maxLength={19}
            onChangeText={formatCardNumber}
            value={cardInfo.number}
          />
          <TextInput
            placeholder="Card Holder Name"
            style={styles.input}
            maxLength={20}
            onChangeText={(text) =>
              setCardInfo((p) => ({ ...p, holder: text.toUpperCase() }))
            }
          />
          <View style={{ flexDirection: "row", gap: 16 }}>
            <TextInput
              placeholder="MM/YY"
              style={[styles.input, { flex: 1 }]}
              keyboardType="number-pad"
              maxLength={5}
              onChangeText={formatExpiryDate}
              value={cardInfo.expiry}
            />
            <TextInput
              placeholder="CVV"
              style={[styles.input, { flex: 1 }]}
              keyboardType="number-pad"
              maxLength={3}
              secureTextEntry
            />
          </View>
          <TouchableOpacity style={styles.modalAddButton} onPress={handleAdd}>
            <Text style={styles.modalButtonText}>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// PayNowModal və digər komponentlər (dəyişiklik yoxdur)...
const PayNowModal = ({ visible, onClose, card }) => {
  if (!visible) return null;
  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Confirm Payment</Text>
          <View style={styles.paymentInfo}>
            <Text style={styles.paymentLabel}>You are about to pay</Text>
            <Text style={styles.paymentAmount}>$ 99.00</Text>
            <Text style={styles.paymentMethod}>
              with your {card.type} card ending in {card.number.slice(-4)}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.modalAddButton}
            onPress={() => {
              alert("Payment Successful!");
              onClose();
            }}
          >
            <Text style={styles.modalButtonText}>Confirm & Pay</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Cancel Payment</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const CustomPagination = ({ length, activeIndex }) => (
  <View style={styles.paginationContainer}>
    {Array.from({ length }).map((_, index) => (
      <View
        key={index}
        style={[
          styles.paginationDot,
          activeIndex === index && styles.paginationActiveDot,
        ]}
      />
    ))}
  </View>
);

// Əsas ekran (dəyişiklik yoxdur)
const PaymentMethodsScreen = ({ navigation }) => {
  const [cards, setCards] = useState([
    {
      id: "1",
      type: "visa",
      number: "4319  5312  0215  1269",
      holder: "THOMAS CULLEN",
      expiry: "09/25",
      logo: visaLogo,
    },
    {
      id: "2",
      type: "mastercard",
      number: "5412  7512  3412  3456",
      holder: "JOHN DOE",
      expiry: "11/26",
      logo: mastercardLogo,
    },
    {
      id: "3",
      type: "visa",
      number: "4502  1234  5678  9012",
      holder: "JANE DOE",
      expiry: "07/24",
      logo: visaLogo,
    },
  ]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [payModalVisible, setPayModalVisible] = useState(false);

  const handleAddCard = (newCard) => setCards((prev) => [...prev, newCard]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScreenHeader
        title="Payment"
        onBackPress={() => navigation.goBack()}
        rightIcon={<PlusIcon width={22} height={22} color={colors.primary} />}
        onRightIconPress={() => setAddModalVisible(true)}
      />
      <AddCardModal
        visible={addModalVisible}
        onClose={() => setAddModalVisible(false)}
        onAddCard={handleAddCard}
      />
      <PayNowModal
        visible={payModalVisible}
        onClose={() => setPayModalVisible(false)}
        card={cards[activeIndex]}
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Carousel
          loop={false}
          width={screenWidth}
          height={220}
          data={cards}
          onSnapToItem={setActiveIndex}
          renderItem={CreditCard}
          style={{ width: screenWidth }}
        />
        <CustomPagination length={cards.length} activeIndex={activeIndex} />
        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Card Holder</Text>
            <Text style={styles.detailValue}>{cards[activeIndex]?.holder}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Card Number</Text>
            <Text style={styles.detailValue}>{cards[activeIndex]?.number}</Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.payButton}
          onPress={() => setPayModalVisible(true)}
        >
          <Text style={styles.payButtonText}>Pay Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Styllar (dəyişiklik yoxdur)
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F9F9F9" },
  scrollContent: { paddingBottom: 20 },
  cardContainer: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 15,
  },
  creditCard: {
    width: screenWidth * 0.8,
    height: 200,
    borderRadius: 20,
    padding: 24,
    justifyContent: "space-between",
    alignSelf: "center",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardLogo: { width: 60, height: 25, resizeMode: "contain" },
  cardType: {
    fontFamily: fontFamily.bold,
    color: "#FFF",
    fontSize: 16,
    textTransform: "uppercase",
  },
  creditCardNumber: {
    fontFamily: fontFamily.bold,
    fontSize: 22,
    color: "#FFF",
    letterSpacing: 2,
  },
  creditCardDetails: { flexDirection: "row", justifyContent: "space-between" },
  creditCardLabel: {
    fontFamily: fontFamily.regular,
    fontSize: 10,
    color: "rgba(255,255,255,0.7)",
    textTransform: "uppercase",
    marginBottom: 4,
  },
  creditCardValue: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    color: "#FFF",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 25,
    paddingBottom: 15,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: "#D8D8D8",
  },
  paginationActiveDot: { backgroundColor: colors.primary, width: 20 },
  detailsContainer: { paddingHorizontal: 24, gap: 20, marginTop: 20 },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  detailLabel: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
    color: "#616161",
  },
  detailValue: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    color: colors.text,
  },
  footer: {
    padding: 24,
    backgroundColor: "#FFF",
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  payButton: {
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  payButtonText: { fontFamily: fontFamily.bold, fontSize: 16, color: "#FFF" },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    gap: 16,
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  modalTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 22,
    marginBottom: 10,
    textAlign: "center",
    color: colors.text,
  },
  input: {
    height: 55,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontFamily: fontFamily.regular,
    fontSize: 16,
  },
  cardTypeSelector: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginBottom: 10,
  },
  typeLogo: { width: 60, height: 40, resizeMode: "contain", opacity: 0.4 },
  typeLogoSelected: { opacity: 1, transform: [{ scale: 1.1 }] },
  modalAddButton: {
    height: 55,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  modalButtonText: { fontFamily: fontFamily.bold, fontSize: 16, color: "#FFF" },
  closeButton: { marginTop: 8, padding: 5 },
  closeButtonText: {
    color: colors.text,
    textAlign: "center",
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    opacity: 0.7,
  },
  paymentInfo: { alignItems: "center", marginVertical: 20, gap: 8 },
  paymentLabel: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
    color: "#616161",
  },
  paymentAmount: {
    fontFamily: fontFamily.bold,
    fontSize: 36,
    color: colors.text,
  },
  paymentMethod: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    color: "#757575",
    textAlign: "center",
    marginTop: 10,
  },
});

export default PaymentMethodsScreen;

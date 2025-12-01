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
import Carousel, { Pagination } from "react-native-snap-carousel";
import ScreenHeader from "../../components/common/ScreenHeader";
import { colors } from "../../styles/colors";
import { fontFamily } from "../../styles/fonts";
import PlusIcon from "../../../assets/images/settingsIconn.svg";
const visaLogo = require("../../../assets/images/visa_logo.png");
const mastercardLogo = require("../../../assets/images/mastercard_logo.png");

const { width: screenWidth } = Dimensions.get("window");
const SLIDER_WIDTH = screenWidth;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.75);

const CreditCard = ({ item }) => {
  const cardStyle =
    item.type === "visa" ? styles.visaCard : styles.mastercardCard;
  return (
    <View style={[styles.creditCard, cardStyle]}>
      <Image source={item.logo} style={styles.cardLogo} />
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
    </View>
  );
};

const AddCardModal = ({ visible, onClose, onAddCard }) => {
  const [cardInfo, setCardInfo] = useState({
    number: "",
    holder: "",
    expiry: "",
    cvv: "",
  });

  const handleAdd = () => {
    onAddCard({
      id: Math.random().toString(),
      ...cardInfo,
      type: "visa",
      logo: visaLogo,
    });
    setCardInfo({ number: "", holder: "", expiry: "", cvv: "" });
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add New Card</Text>
          <TextInput
            placeholder="Card Number"
            style={styles.input}
            onChangeText={(text) =>
              setCardInfo((prev) => ({ ...prev, number: text }))
            }
          />
          <TextInput
            placeholder="Card Holder"
            style={styles.input}
            onChangeText={(text) =>
              setCardInfo((prev) => ({ ...prev, holder: text }))
            }
          />
          <View style={{ flexDirection: "row", gap: 16 }}>
            <TextInput
              placeholder="MM/YY"
              style={[styles.input, { flex: 1 }]}
              onChangeText={(text) =>
                setCardInfo((prev) => ({ ...prev, expiry: text }))
              }
            />
            <TextInput
              placeholder="CVV"
              style={[styles.input, { flex: 1 }]}
              onChangeText={(text) =>
                setCardInfo((prev) => ({ ...prev, cvv: text }))
              }
              secureTextEntry
            />
          </View>
          <TouchableOpacity style={styles.modalAddButton} onPress={handleAdd}>
            <Text style={styles.payButtonText}>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

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
  const [modalVisible, setModalVisible] = useState(false);
  const carouselRef = useRef(null);

  const handleAddCard = (newCard) => {
    setCards((prev) => [...prev, newCard]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScreenHeader
        title="Payment"
        onBackPress={() => navigation.goBack()}
        rightIcon={<PlusIcon width={22} height={22} color={colors.primary} />}
        onRightIconPress={() => setModalVisible(true)}
      />

      <AddCardModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAddCard={handleAddCard}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View>
          <Carousel
            ref={carouselRef}
            data={cards}
            renderItem={({ item }) => <CreditCard item={item} />}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={ITEM_WIDTH}
            onSnapToItem={(index) => setActiveIndex(index)}
          />
          <Pagination
            dotsLength={cards.length}
            activeDotIndex={activeIndex}
            containerStyle={styles.paginationContainer}
            dotStyle={styles.paginationDot}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          />
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Card Holder Name</Text>
            <Text style={styles.detailValue}>{cards[activeIndex]?.holder}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Card Number</Text>
            <Text style={styles.detailValue}>{cards[activeIndex]?.number}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.payButton}>
          <Text style={styles.payButtonText}>Pay Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F9F9F9" },
  scrollContent: { paddingVertical: 20 },
  creditCard: {
    height: 190,
    borderRadius: 15,
    padding: 20,
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  visaCard: { backgroundColor: "#5D5FEF" },
  mastercardCard: { backgroundColor: "#F8A058" },
  cardLogo: {
    width: 50,
    height: 20,
    resizeMode: "contain",
    alignSelf: "flex-start",
  },
  creditCardNumber: {
    fontFamily: fontFamily.semiBold,
    fontSize: 20,
    color: "#FFF",
    letterSpacing: 2,
  },
  creditCardDetails: { flexDirection: "row", justifyContent: "space-between" },
  creditCardLabel: {
    fontFamily: fontFamily.regular,
    fontSize: 10,
    color: "rgba(255,255,255,0.7)",
    textTransform: "uppercase",
  },
  creditCardValue: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    color: "#FFF",
  },
  paginationContainer: { paddingTop: 15, paddingBottom: 5 },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 8,
    backgroundColor: colors.primary,
  },
  detailsContainer: { paddingHorizontal: 24, gap: 20, marginTop: 20 },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  // Footer
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
  // Modal
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    gap: 15,
  },
  modalTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontFamily: fontFamily.regular,
    fontSize: 16,
  },
  modalAddButton: {
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  closeButton: { marginTop: 5, padding: 10 },
  closeButtonText: {
    color: colors.primary,
    textAlign: "center",
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
  },
});

export default PaymentMethodsScreen;

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ScreenHeader from "../../components/common/ScreenHeader";
import SearchIcon from "../../../assets/images/searchIcon.svg";
import ChevronDownIcon from "../../../assets/images/downArrowIcon.svg";
import { colors } from "../../styles/colors";
import { fontFamily } from "../../styles/fonts";

const FAQScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState("General");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  const tabs = ["General", "Account", "Trips", "Subscript", "Finance", "IT Support"];

  const faqData = {
    General: [
      {
        id: 1,
        question: "What is Tripsify?",
        answer:
          "Tripsify is a travel planning and exploration platform that helps you discover, plan, and organize your dream trips and adventures.",
      },
      {
        id: 2,
        question: "Is Tripsify free to use?",
        answer: "Yes, Tripsify offers a free plan with basic features.",
      },
      {
        id: 3,
        question: "How to save destinations?",
        answer: "You can save destinations by tapping the bookmark icon.",
      },
      {
        id: 4,
        question: "Can I collaborate on trips?",
        answer: "Yes, you can invite friends to collaborate on trip planning.",
      },
      {
        id: 5,
        question: "Does Tripsify recommend trips?",
        answer: "Yes, we provide personalized trip recommendations.",
      },
      {
        id: 6,
        question: "Can I use Tripsify offline?",
        answer: "Some features are available offline after downloading.",
      },
    ],
    Account: [
      {
        id: 7,
        question: "How do I create an account?",
        answer: "Tap Sign Up and enter your email and password.",
      },
      {
        id: 8,
        question: "Can I change my password?",
        answer: "Yes, go to Account & Security settings.",
      },
    ],
    Trips: [
      {
        id: 9,
        question: "How do I create a trip?",
        answer: "Tap the + button and fill in trip details.",
      },
    ],
    Subscript: [
      {
        id: 10,
        question: "What are the subscription benefits?",
        answer: "Premium users get unlimited trips and priority support.",
      },
    ],
  };

  const currentFAQs = faqData[selectedTab] || [];

  const filteredFAQs = currentFAQs.filter((faq) =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScreenHeader
          title="FAQ"
          onBackPress={() => navigation.goBack()}
          showProgress={false}
        />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[0]}
        >
          {/* Sticky Header: Tabs + Search */}
          <View style={styles.stickyHeader}>
            {/* Tabs */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.tabsContainer}
              contentContainerStyle={styles.tabsContent}
            >
              {tabs.map((tab) => (
                <TouchableOpacity
                  key={tab}
                  style={[
                    styles.tab,
                    selectedTab === tab && styles.activeTab,
                  ]}
                  onPress={() => setSelectedTab(tab)}
                >
                  <Text
                    style={[
                      styles.tabText,
                      selectedTab === tab && styles.activeTabText,
                    ]}
                  >
                    {tab}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Search */}
            <View style={styles.searchContainer}>
              <SearchIcon width={20} height={20} fill="#9E9E9E" />
              <TextInput
                style={styles.searchInput}
                placeholder="Search"
                placeholderTextColor="#9E9E9E"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </View>

          {/* FAQ Accordion List */}
          <View style={styles.faqList}>
            {filteredFAQs.map((faq) => (
              <View key={faq.id} style={styles.faqItem}>
                <TouchableOpacity
                  style={styles.faqQuestion}
                  onPress={() => toggleExpand(faq.id)}
                >
                  <Text style={styles.questionText}>{faq.question}</Text>
                  <ChevronDownIcon
                    width={20}
                    height={20}
                    fill="#000"
                    style={[
                      styles.chevron,
                      expandedId === faq.id && styles.chevronExpanded,
                    ]}
                  />
                </TouchableOpacity>
                {expandedId === faq.id && (
                  <View style={styles.faqAnswer}>
                    <Text style={styles.answerText}>{faq.answer}</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },

  container: {
    flex: 1,
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 100,
  },

  /** Sticky Header **/
  stickyHeader: {
    backgroundColor: colors.white,
    paddingBottom: 16,
  },

  /** Tabs **/
  tabsContainer: {
    marginBottom: 16,
  },
  tabsContent: {
    paddingHorizontal: 24,
    gap: 8,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
  },
  activeTab: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    fontWeight: "500",
    color: "#757575",
  },
  activeTabText: {
    color: "#FFF",
  },

  /** Search **/
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 48,
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    paddingHorizontal: 16,
    marginHorizontal: 24,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: 16,
    color: "#000",
  },

  /** FAQ Section **/
  faqList: {
    paddingHorizontal: 24,
    paddingTop: 16,
    gap: 16,
  },

  faqItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    paddingBottom: 16,
  },

  faqQuestion: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  questionText: {
    flex: 1,
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },

  chevron: {
    marginLeft: 12,
    transform: [{ rotate: "0deg" }],
  },
  chevronExpanded: {
    transform: [{ rotate: "180deg" }],
  },

  faqAnswer: {
    marginTop: 12,
  },

  answerText: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    fontWeight: "400",
    color: "#757575",
    lineHeight: 20,
  },
});

export default FAQScreen;

import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../../components/common/ScreenHeader';
import { colors } from '../../styles/colors';
import { fontFamily } from '../../styles/fonts';

import ShieldIcon from '../../../assets/images/shieldIcon.svg';
import TagIcon from '../../../assets/images/tagIcon.svg';
import GlobeIcon from '../../../assets/images/globeIcon.svg';
const teamMember1 = require('../../../assets/images/team/member1.png');
const teamMember2 = require('../../../assets/images/team/member2.png');
const teamMember3 = require('../../../assets/images/team/member3.png');
const aboutUsBg = require('../../../assets/images/about_us_bg.png');


const FeatureItem = ({ Icon, title, text }) => (
    <View style={styles.featureItem}>
        <View style={styles.featureIconContainer}>
            <Icon width={24} height={24} color={colors.primary} />
        </View>
        <View style={styles.featureTextContainer}>
            <Text style={styles.featureTitle}>{title}</Text>
            <Text style={styles.featureText}>{text}</Text>
        </View>
    </View>
);

const TeamMemberCard = ({ item }) => (
    <View style={styles.teamCard}>
        <Image source={item.photo} style={styles.teamPhoto} />
        <Text style={styles.teamName}>{item.name}</Text>
        <Text style={styles.teamRole}>{item.role}</Text>
    </View>
);

const AboutUsScreen = ({ navigation }) => {
    const team = [
        { id: '1', name: 'John Doe', role: 'CEO & Founder', photo: teamMember1 },
        { id: '2', name: 'Jane Smith', role: 'Head of Operations', photo: teamMember2 },
        { id: '3', name: 'Sam Wilson', role: 'Lead Developer', photo: teamMember3 },
    ];

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScreenHeader 
                title="About Us"
                onBackPress={() => navigation.goBack()}
            />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.heroSection}>
                    <Image source={aboutUsBg} style={styles.heroImage} />
                    <Text style={styles.heroTitle}>Making Your Dream Trips a Reality.</Text>
                    <Text style={styles.heroSubtitle}>
                        We believe travel should be accessible, enjoyable, and unforgettable. That's why we created Tripsify.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Our Story</Text>
                    <Text style={styles.bodyText}>
                        Founded in 2023 by a group of passionate travelers, Tripsify started with a simple idea: to make discovering and booking tours as seamless as the journey itself. We were tired of complicated booking processes and wanted to create a platform where every traveler could find their perfect adventure with ease.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>What We Stand For</Text>
                    <FeatureItem Icon={GlobeIcon} title="Curated Experiences" text="Every tour is hand-picked by our team to ensure quality and authenticity." />
                    <FeatureItem Icon={TagIcon} title="Best-Price Guarantee" text="We work directly with providers to offer you unbeatable prices on your adventures." />
                    <FeatureItem Icon={ShieldIcon} title="Safety and Trust" text="Your security is our priority. We partner only with verified and trusted tour operators." />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Meet Our Team</Text>
                    <FlatList
                        data={team}
                        renderItem={TeamMemberCard}
                        keyExtractor={item => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ gap: 16, paddingHorizontal: 24 }}
                    />
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
    scrollContent: { paddingBottom: 40 },
    heroSection: {
        alignItems: 'center',
        padding: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    heroImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
    },
    heroTitle: {
        fontFamily: fontFamily.bold,
        fontSize: 24,
        textAlign: 'center',
        color: colors.text,
        marginBottom: 8,
    },
    heroSubtitle: {
        fontFamily: fontFamily.regular,
        fontSize: 16,
        textAlign: 'center',
        color: '#616161',
        lineHeight: 24,
    },
    section: {
        marginTop: 30,
    },
    sectionTitle: {
        fontFamily: fontFamily.bold,
        fontSize: 20,
        color: colors.text,
        marginBottom: 16,
        paddingHorizontal: 24,
    },
    bodyText: {
        fontFamily: fontFamily.regular,
        fontSize: 15,
        color: '#424242',
        lineHeight: 22,
        paddingHorizontal: 24,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingHorizontal: 24,
        marginBottom: 20,
    },
    featureIconContainer: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#F0F3FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    featureTextContainer: { flex: 1 },
    featureTitle: {
        fontFamily: fontFamily.semiBold,
        fontSize: 16,
        color: colors.text,
        marginBottom: 4,
    },
    featureText: {
        fontFamily: fontFamily.regular,
        fontSize: 14,
        color: '#616161',
        lineHeight: 20,
    },
    teamCard: {
        width: 140,
        alignItems: 'center',
        backgroundColor: '#F7F8FA',
        padding: 16,
        borderRadius: 16,
    },
    teamPhoto: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 12,
        borderWidth: 2,
        borderColor: colors.primary,
    },
    teamName: {
        fontFamily: fontFamily.bold,
        fontSize: 15,
        color: colors.text,
        textAlign: 'center',
    },
    teamRole: {
        fontFamily: fontFamily.regular,
        fontSize: 12,
        color: '#757575',
        textAlign: 'center',
    },
});

export default AboutUsScreen;

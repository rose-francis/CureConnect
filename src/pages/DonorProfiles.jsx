import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DonorProfile({ route }) {
  const { colors } = useTheme();
  const { donor } = route.params;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollContent: {
      padding: 16,
      paddingBottom: 32,
    },
    header: {
      alignItems: 'center',
      marginBottom: 24,
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 12,
    },
    name: {
      fontSize: 24,
      fontWeight: '700',
      marginBottom: 4,
    },
    subtext: {
      fontSize: 16,
      fontWeight: '500',
    },
    card: {
      borderWidth: 1,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      elevation: 1,
      shadowOpacity: 0.08,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 12,
    },
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 6,
    },
    label: {
      fontSize: 16,
      fontWeight: '500',
    },
    value: {
      fontSize: 16,
    },
  });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* 👤 Header */}
        <View style={styles.header}>
          <Image source={{ uri: donor.avatar }} style={styles.avatar} />
          <Text style={[styles.name, { color: colors.text }]}>{donor.Name}</Text>
        </View>

        {/* 🪪 Info card */}
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.background }]}>
          <Text style={[styles.cardTitle, { color: colors.primary }]}>Donor Details</Text>
          
          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: colors.text }]}>Blood Group:</Text>
            <Text style={[styles.value, { color: colors.primary }]}>{donor.BloodGroup}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: colors.text }]}>Age:</Text>
            <Text style={[styles.value, { color: colors.primary }]}>{donor.Age}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: colors.text }]}>Gender:</Text>
            <Text style={[styles.value, { color: colors.primary }]}>{donor.Gender}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: colors.text }]}>Contact:</Text>
            <Text style={[styles.value, { color: colors.primary }]}>{donor.Contact}</Text>
          </View>

          {donor.Genotype && (
            <View style={styles.infoRow}>
              <Text style={[styles.label, { color: colors.text }]}>Genotype:</Text>
              <Text style={[styles.value, { color: colors.primary }]}>{donor.Genotype}</Text>
            </View>
          )}

          {donor.RSID && (
            <View style={styles.infoRow}>
              <Text style={[styles.label, { color: colors.text }]}>RSID:</Text>
              <Text style={[styles.value, { color: colors.primary }]}>{donor.RSID}</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
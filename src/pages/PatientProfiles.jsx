import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PatientProfile({ route }) {
  const { colors } = useTheme();
  const { patient } = route.params;

  const handleDetectDiseaseRisk = () => {
    Alert.alert(
      'Disease Risk Detection',
      `Analyzing disease risk for ${patient.Name}...\n\nThis feature will analyze genetic and clinical data to predict disease susceptibility.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Continue', 
          onPress: () => {
            // Add your disease detection logic here
            console.log('Detecting disease risk for patient:', patient.Patient_id);
          }
        }
      ]
    );
  };

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
    button: {
    alignSelf: 'center',
    width: '60%',
    height: 55,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 24,
    backgroundColor: colors.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
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
          <Image source={{ uri: patient.avatar }} style={styles.avatar} />
          <Text style={[styles.name, { color: colors.text }]}>{patient.Name}</Text>
        </View>

        {/* 🪪 Info card */}
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.background }]}>
          <Text style={[styles.cardTitle, { color: colors.primary }]}>Patient Details</Text>
          
          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: colors.text }]}>Blood Group:</Text>
            <Text style={[styles.value, { color: colors.primary }]}>{patient.BloodGroup}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: colors.text }]}>Age:</Text>
            <Text style={[styles.value, { color: colors.primary }]}>{patient.Age}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: colors.text }]}>Gender:</Text>
            <Text style={[styles.value, { color: colors.primary }]}>{patient.Gender}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: colors.text }]}>Contact:</Text>
            <Text style={[styles.value, { color: colors.primary }]}>{patient.Contact}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: colors.text }]}>Symptoms:</Text>
            <Text style={[styles.value, { color: colors.primary }]}>{patient.Symptoms}</Text>
          </View>

          {patient.Genotype && (
            <View style={styles.infoRow}>
              <Text style={[styles.label, { color: colors.text }]}>Genotype:</Text>
              <Text style={[styles.value, { color: colors.primary }]}>{patient.Genotype}</Text>
            </View>
          )}

          {patient.RSID && (
            <View style={styles.infoRow}>
              <Text style={[styles.label, { color: colors.text }]}>RSID:</Text>
              <Text style={[styles.value, { color: colors.primary }]}>{patient.RSID}</Text>
            </View>
          )}

          {patient.InferenceGeneSymbol && (
            <View style={styles.infoRow}>
              <Text style={[styles.label, { color: colors.text }]}>Inference Gene Symbol:</Text>
              <Text style={[styles.value, { color: colors.primary }]}>{patient.InferenceGeneSymbol}</Text>
            </View>
          )}
          </View>

          <TouchableOpacity 
          style={styles.button}
          onPress={handleDetectDiseaseRisk}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>Detect Disease Risk</Text>
        </TouchableOpacity>
      
      </ScrollView>
    </SafeAreaView>
  );
}
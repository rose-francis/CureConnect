import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PatientProfile({ route }) {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const { patient: initialPatient } = route.params;
  const [patient, setPatient] = useState(initialPatient);
  const [loading, setLoading] = useState(false);
  const [fetchingDiseases, setFetchingDiseases] = useState(true);
  const [patientDiseases, setPatientDiseases] = useState([]); // 🆕 new state

  // Fetch patient's detected diseases on component mount
  useEffect(() => {
    fetchPatientDiseases();
  }, []);

  // 🆕 Fetch DiseaseID and DiseaseName from Patient-Disease table
  const fetchPatientDiseases = async () => {
    try {
      const url = `http://192.168.1.192:3000/api/result/patient/${patient.Patient_id}`;
      console.log('🔍 Fetching patient diseases:', url);

      const response = await axios.get(url);
      console.log('✅ Patient stored diseases:', response.data);

      setPatientDiseases(response.data.diseases || []);
    } catch (error) {
      console.error("❌ Error fetching diseases:", error.response?.data || error.message);
    } finally {
      setFetchingDiseases(false);
    }
  };

  // Handle disease risk detection
  const handleDetectDiseaseRisk = async () => {
    console.log('🔍 Starting disease risk detection');
    console.log('📋 Patient_id:', patient.Patient_id);

    setLoading(true);

    try {
      const url = `http://192.168.1.192:3000/api/result/${patient.Patient_id}`;
      console.log('🌐 Requesting:', url);

      const response = await axios.get(url);
      console.log('✅ Data received:', response.data);

      // Refresh disease data after detection
      await fetchPatientDiseases();

      // Navigate to Results page
      navigation.navigate('Results', {
        patient: response.data.patient,
        results: response.data.results
      });

    } catch (error) {
      console.error("❌ Error:", error.response?.data || error.message);
      Alert.alert(
        "Error",
        error.response?.data?.error || "Unable to fetch disease risk data"
      );
    } finally {
      setLoading(false);
    }
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
    buttonDisabled: {
      opacity: 0.6,
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
            <Text style={[styles.label, { color: colors.text }]}>Patient Id:</Text>
            <Text style={[styles.value, { color: colors.primary }]}>{patient.Patient_id}</Text>
          </View>

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

        {/* 🧬 Disease Information Card */}
        {fetchingDiseases ? (
          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.background, alignItems: 'center' }]}>
            <ActivityIndicator color={colors.primary} size="small" />
            <Text style={[styles.label, { color: colors.text, marginTop: 8 }]}>Loading disease information...</Text>
          </View>
        ) : (
          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.background }]}>
            <Text style={[styles.cardTitle, { color: colors.primary }]}>Detected Diseases</Text>

            {patientDiseases.length > 0 ? (
              patientDiseases.map((disease, index) => (
                <View key={index} style={styles.infoRow}>
                  <Text style={[styles.label, { color: colors.text }]}>{disease.DiseaseName}</Text>
                  <Text style={[styles.value, { color: colors.primary }]}>{disease.DiseaseID}</Text>
                </View>
              ))
            ) : (
              <Text style={[styles.value, { color: colors.text }]}>No disease records found</Text>
            )}
          </View>
        )}

        {/* 🔘 Button */}
        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleDetectDiseaseRisk}
          activeOpacity={0.85}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" size="small" />
          ) : (
            <Text style={styles.buttonText}>Detect Disease Risk</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

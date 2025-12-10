import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useTheme } from '@react-navigation/native';

export default function Results({ route }) {
  const { colors } = useTheme();
  const { patient, results } = route.params;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: colors.background,
    },
    header: {
      fontSize: 50,
      fontWeight: '700',
      color: colors.primary,
      textAlign: 'center',
      marginTop: 20,
      marginBottom: 40,
      fontFamily: 'cursive',
    },
    patientInfoRow: {
      flexDirection: 'row',
      marginBottom: 3, // consistent spacing
    },
    patientLabel: {
      fontSize: 22,
      fontWeight: '600',
      color: colors.primary,
      marginRight: 6,
    },
    patientValue: {
      fontSize: 22,
      fontWeight: '700',
      color: '#000',
      flexShrink: 1,
    },
    resultItem: {
      padding: 12,
      marginBottom: 12,
      borderRadius: 12,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    row: {
      flexDirection: 'row',
      marginBottom: 4,
      alignItems: 'flex-start',
    },
    labelContainer: {
      width: 140,
      marginRight: 6,
    },
    labelText: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.primary,
      lineHeight: 20,
    },
    valueText: {
      fontSize: 16,
      fontWeight: '400',
      color: '#000',
      flex: 1,
      flexWrap: 'wrap',
    },
  });

  const renderItem = ({ item }) => (
    <View style={styles.resultItem}>
      <View style={styles.row}>
        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>Disease:</Text>
        </View>
        <Text style={styles.valueText}>{item.DiseaseName}</Text>
      </View>
      <View style={styles.row}>
        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>Disease ID:</Text>
        </View>
        <Text style={styles.valueText}>{item.DiseaseID}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Risk Analysis</Text>

    {/* Patient Info */}
      <View style={styles.patientInfoRow}>
        <Text style={styles.patientLabel}>Patient ID:</Text>
        <Text style={styles.patientValue}>{patient.Patient_id}</Text>
      </View>
      <View style={styles.patientInfoRow}>
        <Text style={styles.patientLabel}>Patient Name:</Text>
        <Text style={styles.patientValue}>{patient.Name}</Text>
      </View>
      <View style={[styles.patientInfoRow, { marginBottom: 32 }]}>
        <Text style={styles.patientLabel}>Inference Gene Symbol:</Text>
        <Text style={styles.patientValue}>{patient.InferenceGeneSymbol}</Text>
      </View>      

      {/* Results */}
      <FlatList
        data={results}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 16, paddingTop: 8 }}
      />
    </View>
  );
}

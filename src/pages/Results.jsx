import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useTheme } from '@react-navigation/native';

export default function Results({ route }) {
  const { colors } = useTheme();
  const { patient, results } = route.params;

  const getRiskColor = (risk) => {
    if (risk >= 50) return 'red';
    if (risk >= 20) return 'orange';
    return 'green';
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: colors.background,
    },
    header: {
      fontSize: 45,
      fontWeight: '700',
      color: colors.primary,
      textAlign: 'center',
      marginTop: 20,
      marginBottom: 40,
      fontFamily:'cursive'
    },
    patientName: {
      fontSize: 23,
      fontWeight: '600',
      color: colors.text,
      marginBottom:30
    },
    patientId: {
      fontSize: 23,
      fontWeight: '600',
      color: colors.text,
      marginBottom:10
    },
    resultItem: {
      padding: 16,
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
    diseaseName: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
    },
    risk: {
      fontSize: 16,
      marginTop: 6,
    },
  });

  const renderItem = ({ item }) => (
    <View style={styles.resultItem}>
      <Text style={styles.diseaseName}>{item.disease}</Text>
      <Text style={[styles.risk, { color: getRiskColor(item.risk) }]}>
        Risk: {item.risk}%
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Risk Analysis</Text>
      <Text style={styles.patientId}>Patient ID: {patient.Patient_id}</Text>
      <Text style={styles.patientName}>Patient Name: {patient.Name}</Text>

      <FlatList
        data={results}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 16, paddingTop: 8 }}
      />
    </View>
  );
}

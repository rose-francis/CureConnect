import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import { supabase } from '../../supabaseClient'; // Adjust the path to your supabase client

// Function to generate consistent avatar based on donor ID
const getAvatarUrl = (donorId) => {
  const avatarNum = (donorId % 30) + 1;
  return `https://i.pravatar.cc/150?img=${avatarNum}`;
};

const DonorsList = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchDonors = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('Donor')
        .select('*')
        .order('Name', { ascending: true });

      if (error) throw error;

      // Add avatar URL to each donor
      const donorsWithAvatars = data.map(donor => ({
        ...donor,
        avatar: getAvatarUrl(donor.Donor_id)
      }));

      setDonors(donorsWithAvatars);
    } catch (err) {
      console.error('Error fetching donors:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    headingContainer: {
      padding: 16,
    },
    headingText: {
      fontSize: 30,
      fontWeight: '700',
      paddingTop: 20,
      paddingLeft: 12
    },
    subHeadingText: {
      fontSize: 14,
      fontWeight: '500',
      paddingBottom: 10,
      paddingLeft: 12
    },
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 12,
      borderWidth: 1,
      borderRadius: 12,
      marginBottom: 12,
      elevation: 1,
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 12,
    },
    info: {
      flex: 1,
    },
    name: {
      fontSize: 18,
      fontWeight: '600',
    },
    details: {
      fontSize: 14,
      marginTop: 4,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorText: {
      fontSize: 16,
      color: 'red',
      textAlign: 'center',
      padding: 20,
    },
    emptyText: {
      fontSize: 16,
      textAlign: 'center',
      padding: 20,
    },
  });

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.card, borderColor: colors.background }]}
      onPress={() => navigation.navigate('DonorProfile', { donor: item })}
    >
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={[styles.name, { color: colors.text }]}>{item.Name}</Text>
        <Text style={[styles.details, { color: colors.text }]}>
           Age: {item.Age} • Blood: {item.BloodGroup}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[styles.emptyText, { color: colors.text, marginTop: 10 }]}>Loading donors...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.headingContainer}>
          <Text style={[styles.headingText, { color: colors.text }]}>Donors</Text>
          <Text style={[styles.subHeadingText, { color: colors.primary }]}>Find a matching donor</Text>
        </View>
        <Text style={styles.errorText}>Error loading donors: {error}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.headingContainer}>
        <Text style={[styles.headingText, { color: colors.text }]}>Donors</Text>
        <Text style={[styles.subHeadingText, { color: colors.primary }]}>Find a matching donor</Text>
      </View>
      {donors.length === 0 ? (
        <Text style={[styles.emptyText, { color: colors.text }]}>No donors found</Text>
      ) : (
        <FlatList
          data={donors}
          keyExtractor={(item) => item.Donor_id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
        />
      )}
    </View>
  );
};

export default DonorsList;
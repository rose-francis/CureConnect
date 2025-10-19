import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { useTheme } from '@react-navigation/native';
import { signOut } from '../../../Store/AuthThunk';

const Settings = () => {
  const dispatch = useDispatch();
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      alignItems: 'center',
      padding: 20,
    },
    title: {
      fontSize: 50,
      fontWeight: '700',
      color: colors.primary,
      marginBottom: 40,
      paddingTop: 20,
      alignItems: 'center',
      fontFamily: 'cursive',
    },
    button: {
      backgroundColor: colors.primary,
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 8,
      alignItems: 'center',
      alignSelf: 'center',
      width: '50%',
      marginTop: 20,
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => dispatch(signOut())}
      >
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Settings;

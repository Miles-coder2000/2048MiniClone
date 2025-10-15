import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>2048 Mini Clone</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Game')}
      >
        <Text style={styles.buttonText}>Start Game</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#faf8ef' },
  title: { fontSize: 36, fontWeight: 'bold', marginBottom: 40 },
  button: { backgroundColor: '#776e65', padding: 20, borderRadius: 10 },
  buttonText: { color: '#fff', fontSize: 18 },
});

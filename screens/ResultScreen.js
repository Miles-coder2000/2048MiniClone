import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ResultScreen({ route, navigation }) {
  const { score } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Game Over!</Text>
      <Text style={styles.score}>Your Score: {score}</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Game')}>
        <Text style={styles.buttonText}>Play Again</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#faf8ef' },
  title: { fontSize: 36, fontWeight: 'bold', marginBottom: 20 },
  score: { fontSize: 24, marginBottom: 40 },
  button: { backgroundColor: '#776e65', padding: 15, marginVertical: 10, borderRadius: 10 },
  buttonText: { color: '#fff', fontSize: 18 },
});

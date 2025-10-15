import React, { useState } from 'react';
import { View, Text, StyleSheet, PanResponder } from 'react-native';
import { initializeGrid, moveTiles, isGameOver } from '../utils/gameLogic';
import Title from '../components/Title';

const GRID_SIZE = 4;

export default function GameScreen({ navigation }) {
  const [grid, setGrid] = useState(initializeGrid(GRID_SIZE));
  const [score, setScore] = useState(0);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gs) => Math.abs(gs.dx) > 20 || Math.abs(gs.dy) > 20,
    onPanResponderRelease: (_, gs) => {
      let dir = null;
      if (Math.abs(gs.dx) > Math.abs(gs.dy)) dir = gs.dx > 0 ? 'right' : 'left';
      else dir = gs.dy > 0 ? 'down' : 'up';
      if (dir) handleSwipe(dir);
    },
  });

  const handleSwipe = (direction) => {
    const { newGrid, newScore } = moveTiles(grid, direction);
    setGrid(newGrid);
    setScore(score + newScore);
    if (isGameOver(newGrid)) navigation.navigate('Result', { score: score + newScore });
  };

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <Text style={styles.score}>Score: {score}</Text>
      <View style={styles.grid}>
        {grid.map((row, rIdx) => (
          <View key={rIdx} style={styles.row}>
            {row.map((cell, cIdx) => (
              <Title key={cIdx} value={cell.value} isNew={cell.isNew} hasMerged={cell.hasMerged} />
            ))}
          </View>
        ))}
      </View>
      <Text style={styles.info}>Swipe in any direction to play!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#faf8ef', alignItems: 'center', justifyContent: 'center' },
  score: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  grid: { backgroundColor: '#bbada0', padding: 5, borderRadius: 5 },
  row: { flexDirection: 'row' },
  info: { marginTop: 20, fontSize: 16, color: '#776e65' },
});

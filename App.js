import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';

export default function App() {
  const [time, setTime] = useState(0); // em milissegundos
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
  };

  const start = () => {
    if (intervalRef.current) return;
    setRunning(true);
    intervalRef.current = setInterval(() => {
      setTime((prev) => prev + 10);
    }, 10);
  };

  const pause = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setRunning(false);
  };

  const reset = () => {
    pause();
    setTime(0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Cronômetro </Text>
      <View style={styles.timerBox}>
        <Text style={styles.time}>{formatTime(time)}</Text>
      </View>

      <View style={styles.buttons}>
        {!running ? (
          <TouchableOpacity style={[styles.button, styles.start]} onPress={start}>
            <Text style={styles.buttonText}>Iniciar</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={[styles.button, styles.pause]} onPress={pause}>
            <Text style={styles.buttonText}>Pausar</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={[styles.button, styles.reset]} onPress={reset}>
          <Text style={styles.buttonText}>Reiniciar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
    marginBottom: 30,
    color: '#bb86fc', // roxo claro elegante
    fontFamily: 'System',
  },
  timerBox: {
    backgroundColor: '#1e1e1e',
    borderRadius: 16,
    paddingVertical: 30,
    paddingHorizontal: 50,
    borderWidth: 2,
    borderColor: '#bb86fc',
    marginBottom: 40,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowOffset: { width: 2, height: 4 },
    elevation: 6,
  },
  time: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#e0e0e0',
    fontVariant: ['tabular-nums'],
  },
  buttons: {
    flexDirection: 'row',
    gap: 16,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 28,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
    marginHorizontal: 5,
  },
  start: {
    backgroundColor: '#03dac6', // ciano moderno
  },
  pause: {
    backgroundColor: '#cf6679', // vermelho rosado elegante
  },
  reset: {
    backgroundColor: '#37474f', // cinza azulado
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});


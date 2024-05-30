import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, Animated, Easing } from 'react-native';

export default function SplashScreen() {
    
  const [counter, setCounter] = useState(3);
  const rotateValue = useRef(new Animated.Value(0)).current;

  // Contador para la animación de carga
  useEffect(() => {
    const timer = setInterval(() => {
      setCounter(prevCounter => prevCounter - 1);
    }, 1000);

    // Configura la animación de rotación
    Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    return () => clearInterval(timer);
  }, []);

  // Interpolación para convertir el valor de la animación en grados
  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // Muestra el contador y la animación de carga
  return (
    <View  style={styles.container}>
      <Text style={styles.title}>
        Bienvenidos
      </Text>
      <Animated.Image
        source={require('../../assets/pokemon-carga-128.png')}
        style={{ transform: [{ rotate }] }}
      />
    </View>
  );

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffde00',
    padding: 8,
  },
  title: {
    margin: 24,
    fontSize: 38,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFF',
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
    color: '#FFF',
  },
});

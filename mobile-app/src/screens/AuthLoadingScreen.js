import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AuthLoadingScreen({ navigation }) {
  useEffect(() => {
    const verificarLogin = async () => {
      const usuarioId = await AsyncStorage.getItem('usuarioId');
      if (usuarioId) {
        navigation.reset({ index: 0, routes: [{ name: 'Produtos' }] });
      } else {
        navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
      }
    };
    verificarLogin();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
}

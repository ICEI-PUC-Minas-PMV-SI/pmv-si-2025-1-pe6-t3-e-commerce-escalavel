import React from 'react';
import { Appbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, Platform , StatusBar} from 'react-native';

export default function HeaderWithBack({ title, onBack, navigation }) {
  const handleLogout = async () => {
    if (Platform.OS === 'web') {
      // Web: Logout direto (sem Alert)
      await AsyncStorage.removeItem('usuarioLogado');
      navigation.replace('Login');
    } else {
      // Mobile: mostra Alert
      Alert.alert('Sair', 'Deseja realmente sair?', [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.removeItem('usuarioLogado');
            navigation.replace('Login');
          },
        },
      ]);
    }
  };

  return (
   

<Appbar.Header
  style={{
    backgroundColor: '#00d2ff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 0,
    height: Platform.OS === 'android' ? 80 : 56, // aumenta altura para compensar o padding
  }}
>

      <Appbar.BackAction onPress={onBack} />
      <Appbar.Content title={title} />

      {title === 'Painel Admin' && (
        <Appbar.Action icon="logout" onPress={handleLogout} />
      )}
    </Appbar.Header>
  );
}

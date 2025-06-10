import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeaderWithBack from '../components/HeaderWithBack';
import { LinearGradient } from 'expo-linear-gradient';

export default function PerfilScreen({ navigation, route }) {
  const { user } = route.params;

  const handleLogout = async () => {
    await AsyncStorage.removeItem('usuarioLogado');
    navigation.replace('Login');
  };

  return (
    <LinearGradient colors={['#3a7bd5', '#00d2ff']} style={styles.container}>
      <HeaderWithBack title="Perfil" onBack={() => navigation.goBack()} />

      <View style={styles.card}>
        <Text style={styles.title}>Informações do Usuário</Text>

        <Text style={styles.label}>Nome</Text>
        <Text style={styles.value}>{user.nome}</Text>

        <Text style={styles.label}>E-mail</Text>
        <Text style={styles.value}>{user.email}</Text>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Sair da conta</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 24,
    borderRadius: 16,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: 16,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3a7bd5',
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    marginTop: 30,
    backgroundColor: '#dc3545',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

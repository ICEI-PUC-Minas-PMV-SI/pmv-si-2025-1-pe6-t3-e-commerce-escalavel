import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { listarUsuarios, deleteUsuario } from '../services/AuthService';
import HeaderWithBack from '../components/HeaderWithBack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AdminBottomNavBar from '../components/AdminBottomNavBar';
import BASE_URL from '../services/urls';

export default function UsuariosScreen({ navigation }) {
  const [usuarios, setUsuarios] = useState([]);

  const carregarUsuarios = async () => {
    const local = await listarUsuarios();
    let api = [];

    try {
      const token = await AsyncStorage.getItem('token');

      if (token) {
        const response = await fetch(`${BASE_URL}/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        api = await response.json();
      } else {
        console.warn('⚠️ Token não encontrado. API não será acessada.');
      }
    } catch (error) {
      console.log('⚠️ API offline ou erro ao buscar usuários da API:', error.message);
    }

    const todos = [
      ...local,
      ...api.filter(apiUser => !local.some(localUser => localUser.email === apiUser.email)),
    ];
    setUsuarios(todos);
  };

  const excluirUsuario = async (usuario) => {
    const { email, id } = usuario;

    // Remove localmente
    const lista = await listarUsuarios();
    const atualizada = lista.filter((u) => u.email !== email);
    await AsyncStorage.setItem('usuarios', JSON.stringify(atualizada));

    // Remove da API se tiver ID
    if (id) {
      try {
        const sucesso = await deleteUsuario(id); // Usa o ID na chamada
        if (!sucesso) {
          console.warn('❌ Falha ao excluir usuário na API');
        }
      } catch (e) {
        console.warn('⚠️ Erro ao excluir da API:', e.message);
      }
    } else {
      console.warn('ℹ️ Usuário sem ID — somente removido localmente.');
    }

    Alert.alert('Sucesso', 'Usuário removido');
    setUsuarios((prev) => prev.filter((u) => u.email !== email));
  };

  useEffect(() => {
    carregarUsuarios();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <HeaderWithBack title="Usuários Cadastrados" onBack={() => navigation.goBack()} />
      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.email}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.infoContainer}>
              <Text style={styles.title}>{item.nome}</Text>
              <Text style={styles.subtitle}>{item.email}</Text>
            </View>
            <TouchableOpacity onPress={() => excluirUsuario(item)} style={styles.deleteIcon}>
              <Ionicons name="trash" size={22} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />
      <AdminBottomNavBar navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
  },
  deleteIcon: {
    padding: 6,
  },
});

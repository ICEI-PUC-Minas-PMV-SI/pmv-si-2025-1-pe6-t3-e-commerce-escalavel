import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { listarProdutosAPI, deletarProdutoAPI } from '../services/ProdutoApiService';
import { listarProdutosLocal, deletarProdutoLocal } from '../services/ProdutoLocalService';
import HeaderWithBack from '../components/HeaderWithBack';
import AdminBottomNavBar from '../components/AdminBottomNavBar';

export default function GerenciarProdutosScreen({ navigation }) {
  const [produtos, setProdutos] = useState([]);

  const carregarProdutos = async () => {
    const local = await listarProdutosLocal();
    let api = [];

    try {
      api = await listarProdutosAPI();
    } catch (e) {
      console.log('API offline, carregando somente local');
    }

    const todos = [...local, ...api.filter(apiProd => !local.some(l => l.id === apiProd.id))];
    setProdutos(todos);
  };

  const deletarProduto = async (id) => {
    await deletarProdutoLocal(id);
    try {
      await deletarProdutoAPI(id);
    } catch (e) {
      console.log('Não foi possível deletar da API:', e.message);
    }

    Alert.alert('Removido', 'Produto deletado com sucesso');
    carregarProdutos();
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      carregarProdutos();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={{ flex: 1 }}>
      <HeaderWithBack title="Gerenciar Produtos" onBack={() => navigation.goBack()} />
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.infoContainer}>
              <Text style={styles.title}>{item.nome}</Text>
              <Text style={styles.subtitle}>Categoria: {item.categoria}</Text>
              <Text style={styles.subtitle}>Preço: R$ {item.preco}</Text>
            </View>
            <TouchableOpacity onPress={() => deletarProduto(item.id)} style={styles.deleteIcon}>
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
    backgroundColor: '#ffffff',
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
    marginBottom: 2,
  },
  deleteIcon: {
    padding: 6,
  },
});

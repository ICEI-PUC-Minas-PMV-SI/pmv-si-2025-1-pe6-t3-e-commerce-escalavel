import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

import BottomNavBar from '../components/BottomNavBar';
import NavBar from '../components/Navbar';
import styles from '../components/CardStyle';
import { listarProdutosLocal } from '../services/ProdutoLocalService';
import { listarProdutosAPI } from '../services/ProdutoApiService';
import { CarrinhoContext } from '../context/CarrinhoContext';

export default function HomeScreen({ navigation, route }) {
  const { user } = route.params;
  const userType = user.email === 'admin@techparts.com' ? 'admin' : 'usuario';

  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  const { adicionarAoCarrinho } = useContext(CarrinhoContext);

  const carregarProdutos = async () => {
    setLoading(true);
    try {
      const local = await listarProdutosLocal();
      let api = [];
      try {
        api = await listarProdutosAPI();
      } catch {
        console.log('API indisponível');
      }

      const todos = [...local, ...api.filter(apiProd => !local.some(localProd => localProd.id === apiProd.id))];
      setProdutos(todos);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os produtos');
    }
    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      carregarProdutos();
    });
    return unsubscribe;
  }, [navigation]);

  // ✅ Novo handle que usa o contexto corretamente
  const handleAdicionarCarrinho = async (produto) => {
    try {
      await adicionarAoCarrinho(produto, user);
      Alert.alert('Sucesso', 'Produto adicionado ao carrinho');
    } catch (err) {
      console.error('Erro ao adicionar ao carrinho:', err);
      Alert.alert('Erro', 'Não foi possível adicionar o produto');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.imageWrapper}>
        <Image source={{ uri: item.imagem }} style={styles.image} resizeMode="contain" />
      </View>
      <Text style={styles.cardTitle}>{item.nome}</Text>
      <Text style={styles.cardPrice}>R$ {parseFloat(item.preco).toFixed(2)}</Text>
      <TouchableOpacity style={styles.cardButton} onPress={() => handleAdicionarCarrinho(item)}>
        <Text style={styles.cardButtonText}>Adicionar ao carrinho</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <LinearGradient colors={['#3a7bd5', '#00d2ff']} style={styles.container}>
      <NavBar />
      {loading ? (
        <View style={localStyles.loadingContainer}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={localStyles.loadingText}>Carregando produtos...</Text>
        </View>
      ) : (
        <FlatList
          data={produtos}
          keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
          renderItem={renderItem}
          contentContainerStyle={[styles.list, { marginTop: 30 }]}
        />
      )}
      <BottomNavBar navigation={navigation} user={user} />
    </LinearGradient>
  );
}

const localStyles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#fff',
  },
});

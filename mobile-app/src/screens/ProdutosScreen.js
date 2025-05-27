import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import api from '../services/api';

export default function ProdutosScreen({ navigation }) {
  const usuarioId = 'ID_DO_USUARIO'; // Substitua por ID real
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregarProdutos = async () => {
      try {
        const res = await api.get('/produtos');
        setProdutos(res.data);
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
      } finally {
        setCarregando(false);
      }
    };

    carregarProdutos();
  }, []);

  const adicionarAoCarrinho = async (produtoId) => {
    try {
      await api.post('/carrinho', { usuarioId, produtoId, quantidade: 1 });
      Alert.alert('Adicionado ao carrinho');
    } catch (error) {
      Alert.alert('Erro ao adicionar', error.response?.data?.error || 'Tente novamente');
    }
  };

  if (carregando) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Produtos</Text>
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text>{item.descricao}</Text>
            <Text style={styles.preco}>R$ {item.preco}</Text>
            <Button title="Ver Detalhes" onPress={() => navigation.navigate('Detalhes', { produto: item, usuarioId })} />
            <Button title="Adicionar ao Carrinho" onPress={() => adicionarAoCarrinho(item.id)} />
          </View>
        )}
      />
      <View style={{ marginTop: 20 }}>
        <Button title="Ir para o Carrinho" onPress={() => navigation.navigate('Carrinho', { usuarioId })} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  card: { padding: 15, marginBottom: 15, backgroundColor: '#f0f0f0', borderRadius: 5 },
  nome: { fontWeight: 'bold', fontSize: 18 },
  preco: { marginTop: 5, fontWeight: 'bold' },
});

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert } from 'react-native';
import api from '../services/api';

export default function CarrinhoScreen({ route, navigation }) {
  const { usuarioId } = route.params;
  const [itens, setItens] = useState([]);
  const [total, setTotal] = useState(0);

  const carregarCarrinho = async () => {
    try {
      const res = await api.get(`/carrinho/${usuarioId}`);
      setItens(res.data);
      const totalCalculado = res.data.reduce((acc, item) => acc + item.produto.preco * item.quantidade, 0);
      setTotal(totalCalculado);
    } catch (err) {
      Alert.alert('Erro ao carregar carrinho');
    }
  };

  const processarPagamento = async () => {
    try {
      const res = await api.post('/pagamento/processar', { usuarioId });
      const { init_point } = res.data;
      navigation.navigate('Pagamento', { url: init_point });
    } catch (err) {
      Alert.alert('Erro ao processar pagamento', err.response?.data?.error || '');
    }
  };

  useEffect(() => {
    carregarCarrinho();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carrinho</Text>
      <FlatList
        data={itens}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nome}>{item.produto.nome}</Text>
            <Text>Quantidade: {item.quantidade}</Text>
            <Text>Preço: R$ {item.produto.preco}</Text>
          </View>
        )}
      />
      <Text style={styles.total}>Total: R$ {total.toFixed(2)}</Text>
      <Button title="Finalizar Compra" onPress={processarPagamento} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 15 },
  card: { padding: 10, marginBottom: 10, backgroundColor: '#eee', borderRadius: 5 },
  nome: { fontWeight: 'bold', fontSize: 18 },
  total: { fontSize: 20, fontWeight: 'bold', marginVertical: 15 },
});

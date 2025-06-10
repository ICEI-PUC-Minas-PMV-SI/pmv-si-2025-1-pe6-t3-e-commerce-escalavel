import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeaderWithBack from '../components/HeaderWithBack';

export default function PedidosScreen({ navigation, route }) {
  const user = route?.params?.user;

  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    if (!user) return; // ✅ aqui sim pode usar condicional dentro do hook

    const carregarPedidos = async () => {
      const chave = `pedidos_${user.email.replace(/[^a-zA-Z0-9]/g, '')}`;
      const data = await AsyncStorage.getItem(chave);
      const todosPedidos = data ? JSON.parse(data) : [];
      const aprovados = todosPedidos.filter(p => p.status === 'Aprovado');
      setPedidos(aprovados.reverse());
    };

    carregarPedidos();
 }, [user]);


  if (!user) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'red' }}>Erro: usuário não identificado.</Text>
      </View>
    );
  }

  // ... (resto do componente permanece igual)


  const renderProduto = (produto) => (
    <View key={produto.id} style={styles.produtoItem}>
      <Image source={{ uri: produto.imagem }} style={styles.produtoImagem} />
      <View style={styles.produtoInfo}>
        <Text style={styles.produtoNome}>{produto.nome}</Text>
        <Text style={styles.produtoPreco}>R$ {parseFloat(produto.preco).toFixed(2)}</Text>
      </View>
    </View>
  );

  const renderPedido = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.data}>Pedido em {item.data}</Text>
      <Text style={styles.total}>Total: R$ {item.total.toFixed(2)}</Text>
      <View>{item.produtos.map(renderProduto)}</View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderWithBack title="Meus Pedidos" onBack={() => navigation.goBack()} />
      <View style={styles.container}>
        {pedidos.length === 0 ? (
          <Text style={styles.vazio}>Você ainda não tem pedidos aprovados.</Text>
        ) : (
          <FlatList
            data={pedidos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderPedido}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  vazio: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#444',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },
  data: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  total: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  produtoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  produtoImagem: {
    width: 50,
    height: 50,
    borderRadius: 6,
    marginRight: 10,
    backgroundColor: '#ddd',
  },
  produtoInfo: {
    flex: 1,
  },
  produtoNome: {
    fontSize: 14,
    fontWeight: '500',
  },
  produtoPreco: {
    fontSize: 13,
    color: '#555',
  },
});

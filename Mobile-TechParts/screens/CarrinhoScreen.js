import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Alert,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import HeaderWithBack from '../components/HeaderWithBack';
import EventBus from '../src/utils/EventBus';

export default function CarrinhoScreen({ navigation, route }) {
  const user = route?.params?.user;
  const [carrinho, setCarrinho] = useState([]);

  const chaveCarrinho = user
    ? `carrinho_${user.email.replace(/[^a-zA-Z0-9]/g, '')}`
    : null;

  const carregarCarrinho = useCallback(async () => {
    if (!chaveCarrinho) return;
    const data = await AsyncStorage.getItem(chaveCarrinho);
    const carrinhoAtual = data ? JSON.parse(data) : [];
    setCarrinho(carrinhoAtual);
    EventBus.emit('carrinhoAtualizado');
  }, [chaveCarrinho]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', carregarCarrinho);
    carregarCarrinho();
    return unsubscribe;
  }, [navigation, carregarCarrinho]);

  const atualizarQuantidade = async (id, delta) => {
    const atualizado = carrinho.map((item) => {
      if (item.id === id) {
        return { ...item, quantidade: Math.max(1, item.quantidade + delta) };
      }
      return item;
    });
    setCarrinho(atualizado);
    await AsyncStorage.setItem(chaveCarrinho, JSON.stringify(atualizado));
    EventBus.emit('carrinhoAtualizado');
  };

  const removerItem = async (id) => {
    const atualizado = carrinho.filter((item) => item.id !== id);
    setCarrinho(atualizado);
    await AsyncStorage.setItem(chaveCarrinho, JSON.stringify(atualizado));
    EventBus.emit('carrinhoAtualizado');
  };

  const finalizarPedido = () => {
    if (carrinho.length === 0) {
      Alert.alert('Carrinho Vazio', 'Não é possível finalizar um pedido com o carrinho vazio.');
      return;
    }
    navigation.navigate('CheckoutScreen', {
      carrinho,
      total,
      user,
    });
  };

  const total = carrinho.reduce(
    (acc, item) => acc + item.preco * item.quantidade,
    0
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderWithBack title="Carrinho" onBack={() => navigation.goBack()} />
      <View style={styles.content}>
        <FlatList
          data={carrinho}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.itemContainer}>
                <Image source={{ uri: item.imagem }} style={styles.itemImage} />
                <View style={styles.itemDetails}>
                  <Text style={styles.nome}>{item.nome}</Text>
                  <Text style={styles.preco}>
                    Preço: R$ {parseFloat(item.preco).toFixed(2)}
                  </Text>

                  <View style={styles.qtdContainer}>
                    <TouchableOpacity
                      onPress={() => atualizarQuantidade(item.id, -1)}
                      style={styles.qtdButton}>
                      <Text style={styles.btnQtd}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantidade}>{item.quantidade}</Text>
                    <TouchableOpacity
                      onPress={() => atualizarQuantidade(item.id, 1)}
                      style={styles.qtdButton}>
                      <Text style={styles.btnQtd}>+</Text>
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity onPress={() => removerItem(item.id)}>
                    <Text style={styles.remover}>Remover</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
        <View style={styles.totalContainer}>
          <Text style={styles.total}>Total: R$ {total.toFixed(2)}</Text>
          <TouchableOpacity
            style={styles.finalizarBtn}
            onPress={finalizarPedido}>
            <Text style={styles.finalizarTxt}>Finalizar Pedido</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },

  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 3,
  },
  nome: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 6,
  },
  qtdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  btnQtd: {
    fontSize: 20,
    paddingHorizontal: 12,
  },
  quantidade: {
    fontSize: 16,
    marginHorizontal: 8,
  },
  remover: {
    marginTop: 10,
    color: 'red',
    textDecorationLine: 'underline',
  },
  totalContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  finalizarBtn: {
    backgroundColor: '#3a7bd5',
    padding: 14,
    borderRadius: 10,
    marginTop: 12,
  },
  finalizarTxt: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#ddd',
  },
  itemDetails: {
    flex: 1,
  },
  preco: {
    fontSize: 14,
    color: '#333',
  },
  qtdButton: {
    backgroundColor: '#eee',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
});


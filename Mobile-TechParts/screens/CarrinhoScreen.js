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
import { LinearGradient } from 'expo-linear-gradient'; 

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
        // Garante que a quantidade não seja menor que 1
        const novaQuantidade = Math.max(1, item.quantidade + delta);
        return { ...item, quantidade: novaQuantidade };
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
      Alert.alert('Carrinho Vazio', 'Adicione produtos ao carrinho para continuar.');
      return;
    }
    navigation.navigate('CheckoutScreen', {
      carrinho,
      total,
      user,
    });
  };

  const total = carrinho.reduce(
    (acc, item) => acc + parseFloat(item.preco) * item.quantidade,
    0
  );
  
  
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.imagem }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.nome} numberOfLines={2}>{item.nome}</Text>
        <Text style={styles.preco}>R$ {parseFloat(item.preco).toFixed(2)}</Text>
        <View style={styles.qtdContainer}>
          <TouchableOpacity
            onPress={() => atualizarQuantidade(item.id, -1)}
            style={styles.qtdButton}
          >
            <Text style={styles.btnQtdText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantidade}>{item.quantidade}</Text>
          <TouchableOpacity
            onPress={() => atualizarQuantidade(item.id, 1)}
            style={styles.qtdButton}
          >
            <Text style={styles.btnQtdText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={() => removerItem(item.id)} style={styles.removerButton}>
         <Text style={styles.removerText}>✕</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    
    <LinearGradient colors={['#3a7bd5', '#00d2ff']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <HeaderWithBack title="Carrinho" onBack={() => navigation.goBack()} />
        {carrinho.length === 0 ? (
           <View style={styles.emptyContainer}>
             <Text style={styles.emptyText}>Seu carrinho está vazio!</Text>
             <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
                <Text style={styles.goBackButtonText}>Continuar comprando</Text>
             </TouchableOpacity>
           </View>
        ) : (
          <>
            <FlatList
              data={carrinho}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.listContent}
            />
            <View style={styles.footer}>
              <View style={styles.totalContainer}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>R$ {total.toFixed(2)}</Text>
              </View>
              <TouchableOpacity
                style={styles.finalizarBtn}
                onPress={finalizarPedido}
              >
                <Text style={styles.finalizarTxt}>Finalizar Pedido</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    padding: 12,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 6,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: '#eee',
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
    height: 80, 
  },
  nome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  preco: {
    fontSize: 14,
    color: '#007bff',
    fontWeight: '600',
  },
  qtdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qtdButton: {
    width: 30,
    height: 30,
    backgroundColor: '#e9ecef',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnQtdText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#343a40',
  },
  quantidade: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 15,
    color: '#333',
  },
  removerButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    padding: 5,
  },
  removerText: {
    fontSize: 18,
    color: '#a0a0a0',
    fontWeight: 'bold',
  },
  
  footer: {
    backgroundColor: '#fff',
    padding: 20,
    paddingBottom: 30, 
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 20,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  totalLabel: {
    fontSize: 18,
    color: '#666',
  },
  totalValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  finalizarBtn: {
    backgroundColor: '#28a745', 
    padding: 5,
    borderRadius: 30,
    alignItems: 'center',

    
  },
  finalizarTxt: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  goBackButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  goBackButtonText: {
    color: '#3a7bd5',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

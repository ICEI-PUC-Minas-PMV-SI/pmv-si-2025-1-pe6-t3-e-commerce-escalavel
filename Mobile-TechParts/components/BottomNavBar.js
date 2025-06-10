import React, { useEffect, useState,useCallback  } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EventBus from '../src/utils/EventBus'; // ✅ Importa o EventBus

export default function BottomNavBar({ navigation, user }) {
  const [quantidade, setQuantidade] = useState(0);
  const primeiroNome = user?.nome?.split(' ')[0] || 'Usuário';

  const chaveCarrinho = user ? `carrinho_${user.email.replace(/[^a-zA-Z0-9]/g, '')}` : null;

 const carregarQuantidadeCarrinho = useCallback(async () => {
  if (!chaveCarrinho) return;
  const data = await AsyncStorage.getItem(chaveCarrinho);
  const carrinho = data ? JSON.parse(data) : [];
  const total = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
  setQuantidade(total);
}, [chaveCarrinho]);


  useEffect(() => {
  carregarQuantidadeCarrinho();

  const listener = () => {
    carregarQuantidadeCarrinho();
  };

  EventBus.on('carrinhoAtualizado', listener);
  return () => {
    EventBus.off('carrinhoAtualizado', listener);
  };
}, [carregarQuantidadeCarrinho]);


  return (
    <View style={styles.navBar}>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate('Carrinho', { user })}
      >
        <View style={styles.iconWithBadge}>
          <Ionicons name="cart-outline" size={22} color="#fff" />
          {quantidade > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{quantidade}</Text>
            </View>
          )}
        </View>
        <Text style={styles.label}>Carrinho</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Pedidos', { user })}>

        <Ionicons name="clipboard-outline" size={22} color="#fff" />
        <Text style={styles.label}>Pedidos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => {
          if (user.tipo === 'admin') {
            navigation.navigate('AdminDashboard');
          } else {
            navigation.navigate('Perfil', { user });
          }
        }}
      >
        <Ionicons
          name={user.tipo === 'admin' ? 'shield-checkmark-outline' : 'person-outline'}
          size={22}
          color="#fff"
        />
        <Text style={styles.label}>
          {user.tipo === 'admin' ? 'Admin' : primeiroNome}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#3a7bd5',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#333',
  },
  navItem: {
    alignItems: 'center',
  },
  label: {
    color: 'white',
    fontSize: 12,
    marginTop: 4,
  },
  iconWithBadge: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -10,
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

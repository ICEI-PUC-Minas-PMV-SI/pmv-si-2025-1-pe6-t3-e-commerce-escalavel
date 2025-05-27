import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

export default function HistoricoScreen() {
  const [pedidos, setPedidos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregarHistorico = async () => {
      try {
        const usuarioId = await AsyncStorage.getItem('usuarioId');
        const res = await api.get('/pedidos', { params: { usuarioId } });
        setPedidos(res.data);
      } catch (error) {
        console.error('Erro ao carregar pedidos:', error);
      } finally {
        setCarregando(false);
      }
    };

    carregarHistorico();
  }, []);

  if (carregando) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico de Compras</Text>
      <FlatList
        data={pedidos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>Pedido: {item.id}</Text>
            <Text>Status: {item.status}</Text>
            <Text>Total: R$ {item.total}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  card: { padding: 10, backgroundColor: '#eee', borderRadius: 5, marginBottom: 15 },
});

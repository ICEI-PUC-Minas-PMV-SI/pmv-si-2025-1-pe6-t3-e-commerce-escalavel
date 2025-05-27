import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TextInput, StyleSheet, Alert } from 'react-native';
import api from '../services/api';

export default function ProdutoDetalhesScreen({ route, navigation }) {
  const { produto, usuarioId } = route.params;
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [comentario, setComentario] = useState('');
  const [nota, setNota] = useState('');

  const carregarAvaliacoes = async () => {
    try {
      const res = await api.get(`/avaliacoes/${produto.id}`);
      setAvaliacoes(res.data);
    } catch (err) {
      console.error('Erro ao carregar avaliações:', err);
    }
  };

  const enviarAvaliacao = async () => {
    try {
      await api.post('/avaliacoes', {
        produtoId: produto.id,
        nota: parseInt(nota),
        comentario
      });
      setNota('');
      setComentario('');
      carregarAvaliacoes();
      Alert.alert('Avaliação enviada!');
    } catch (err) {
      Alert.alert('Erro ao enviar avaliação');
    }
  };

  const adicionarAoCarrinho = async () => {
    try {
      await api.post('/carrinho', {
        usuarioId,
        produtoId: produto.id,
        quantidade: 1
      });
      Alert.alert('Produto adicionado ao carrinho!');
    } catch (err) {
      Alert.alert('Erro ao adicionar', err.response?.data?.error || '');
    }
  };

  useEffect(() => {
    carregarAvaliacoes();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.nome}>{produto.nome}</Text>
      <Text>{produto.descricao}</Text>
      <Text style={styles.preco}>Preço: R$ {produto.preco}</Text>

      <Button title="Adicionar ao Carrinho" onPress={adicionarAoCarrinho} />

      <Text style={styles.subtitulo}>Avaliações</Text>
      <FlatList
        data={avaliacoes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.avaliacao}>
            <Text>Nota: {item.nota}</Text>
            <Text>{item.comentario}</Text>
            <Text style={styles.usuario}>Por: {item.usuario?.nome || 'Usuário'}</Text>
          </View>
        )}
      />

      <Text style={styles.subtitulo}>Avaliar Produto</Text>
      <TextInput placeholder="Nota (1-5)" keyboardType="numeric" value={nota} onChangeText={setNota} style={styles.input} />
      <TextInput placeholder="Comentário" value={comentario} onChangeText={setComentario} style={styles.input} />
      <Button title="Enviar Avaliação" onPress={enviarAvaliacao} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  nome: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  preco: { marginBottom: 10 },
  subtitulo: { marginTop: 20, fontWeight: 'bold', fontSize: 16 },
  avaliacao: { marginVertical: 10, borderBottomWidth: 1, borderBottomColor: '#ddd', paddingBottom: 10 },
  usuario: { fontStyle: 'italic', fontSize: 12 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginVertical: 5, borderRadius: 5 },
});

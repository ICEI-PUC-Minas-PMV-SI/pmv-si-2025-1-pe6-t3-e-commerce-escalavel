import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

export default function PerfilScreen({ route, navigation }) {
  const { usuarioId } = route.params;
  const [usuario, setUsuario] = useState({});
  const [nome, setNome] = useState('');
  const [cel, setCel] = useState('');
  const [senha, setSenha] = useState('');

  useEffect(() => {
    const carregarUsuario = async () => {
      try {
        const res = await api.get(`/usuarios`);
        const user = res.data.find(u => u.id === usuarioId);
        setUsuario(user);
        setNome(user.nome);
        setCel(user.cel);
      } catch (err) {
        Alert.alert('Erro ao carregar perfil');
      }
    };
    carregarUsuario();
  }, []);

  const atualizarPerfil = async () => {
    try {
      await api.put(`/usuarios/${usuarioId}`, { nome, cel, senha });
      Alert.alert('Perfil atualizado com sucesso!');
    } catch (err) {
      Alert.alert('Erro ao atualizar perfil');
    }
  };

  const sair = async () => {
    await AsyncStorage.clear();
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <Text>Email: {usuario.email}</Text>
      <TextInput placeholder="Nome" value={nome} onChangeText={setNome} style={styles.input} />
      <TextInput placeholder="Celular" value={cel} onChangeText={setCel} style={styles.input} />
      <TextInput placeholder="Nova senha (opcional)" secureTextEntry value={senha} onChangeText={setSenha} style={styles.input} />
      <Button title="Salvar Alterações" onPress={atualizarPerfil} />
      <View style={{ marginTop: 20 }}>
        <Button title="Sair" onPress={sair} color="red" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', marginBottom: 15, padding: 10, borderRadius: 5 },
});

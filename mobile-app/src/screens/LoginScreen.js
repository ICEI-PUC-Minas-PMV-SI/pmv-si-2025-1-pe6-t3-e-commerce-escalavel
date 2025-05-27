import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    try {
      const res = await api.post('/login', { email, senha });
      const { user, token } = res.data;

      await AsyncStorage.setItem('usuarioId', user.id);
      await AsyncStorage.setItem('token', token);

      Alert.alert('Login feito com sucesso');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Produtos' }]
      });
    } catch (error) {
      Alert.alert('Erro ao logar', error.response?.data?.error || 'Verifique os dados');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput placeholder="Senha" secureTextEntry value={senha} onChangeText={setSenha} style={styles.input} />
      <Button title="Entrar" onPress={handleLogin} />
      <View style={{ marginTop: 15 }}>
        <Button title="Criar conta" onPress={() => navigation.navigate('Cadastro')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 28, marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', marginBottom: 15, padding: 10, borderRadius: 5 },
});

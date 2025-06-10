import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { autenticarUsuario } from '../services/AuthService';
import { LinearGradient } from 'expo-linear-gradient';
import NavBar from '../components/Navbar';
import API from '../services/api'; // Certifique-se que esse arquivo configura axios
import BASE_URL from '../services/urls';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
  try {
    // 1. Tenta login na API externa
    const response = await API.post(`${BASE_URL}/login`, {
      email,
      password: senha,
    });

    const token = response.data.accessToken;

    if (token) {
      // 2. Salva o token no AsyncStorage
      await AsyncStorage.setItem('token', token);

      // 3. Define o tipo com base no email/senha
      const tipo = email === 'puc@gmail.com' && senha === 'admin123' ? 'admin' : 'usuario';

      // 4. Busca o nome/local do usuário no armazenamento local (pode já ter sido salvo no cadastro)
      const usuarioLocal = await autenticarUsuario(email, senha);

      const usuarioLogado = {
        nome: usuarioLocal?.nome || email.split('@')[0], // fallback se nome não existir
        email,
        senha,
        tipo,
      };

      await AsyncStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
      navigation.replace('Home', { user: usuarioLogado });
    } else {
      throw new Error('Token não recebido da API');
    }
  } catch (error) {
    console.warn('⚠️ Falha na API externa, tentando login local...');

    // 5. Se a API falhar, tenta login local
    const usuarioLocal = await autenticarUsuario(email, senha);
    if (usuarioLocal) {
      const tipo = email === 'puc@gmail.com' && senha === 'admin123' ? 'admin' : 'usuario';
      const usuarioLogado = {
        ...usuarioLocal,
        tipo,
      };
      await AsyncStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
      navigation.replace('Home', { user: usuarioLogado });
    } else {
      Alert.alert('Erro', 'Email ou senha inválidos');
    }
  }
};


  return (
    <LinearGradient colors={['#3a7bd5', '#00d2ff']} style={styles.container}>
      <NavBar />
      <View style={styles.card}>
        <Text style={styles.title}>Login</Text>
        <TextInput style={styles.input} placeholder="E-mail" value={email} onChangeText={setEmail} />
        <TextInput style={styles.input} placeholder="Senha" value={senha} onChangeText={setSenha} secureTextEntry />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        <Text style={styles.link} onPress={() => navigation.navigate('Register')}>
          Não tem conta? Cadastre-se
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 30,
    width: '90%',
    maxWidth: 450,
    alignSelf: 'center',
    marginTop: 150,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    backgroundColor: '#3a7bd5',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: {
    color: '#3a7bd5',
    textAlign: 'center',
    marginTop: 15,
    textDecorationLine: 'underline',
  },
});

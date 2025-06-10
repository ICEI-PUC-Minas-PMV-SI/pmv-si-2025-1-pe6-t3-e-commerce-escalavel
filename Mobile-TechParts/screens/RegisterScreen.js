import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import { salvarUsuario, listarUsuarios, register } from '../services/AuthService';
import { LinearGradient } from 'expo-linear-gradient';
import API from '../services/api';
import BASE_URL from '../services/urls';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function RegisterScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!nome || !email || !password) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    // Validação de formato de e-mail
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Erro', 'Por favor, insira um e-mail válido.');
      return;
    }

    // Validação de senha mínima (ex: 6 caracteres)
    if (password.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    const usuarios = await listarUsuarios();
    if (usuarios.some((u) => u.email === email)) {
      Alert.alert('Erro', 'E-mail já cadastrado localmente');
      return;
    }

    const novoUsuario = { nome, email, senha: password };

    // Salva localmente primeiro
    await salvarUsuario(novoUsuario);

    // Tenta registrar na API externa
    const response = await register({
      nome,
      email,
      password, // use "password" se o backend exige esse nome
    });
if (response) {
  console.log('Usuário registrado na API:', response);

  // 🔐 Faz login automaticamente para obter o token
  try {
    const loginResp = await API.post(`${BASE_URL}/login`, {
      email,
      password,
    });

    const token = loginResp.data?.accessToken;
    if (token) {
      await AsyncStorage.setItem('token', token);
      console.log('Token salvo após cadastro');
    }
  } catch (loginError) {
    console.warn('Falha ao obter token após cadastro:', loginError);
  }
} else {
  console.warn('API offline ou falhou. Registro feito apenas localmente.');
}

Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
navigation.navigate('Login');

  };

  return (
    <LinearGradient colors={['#3a7bd5', '#00d2ff']} style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Cadastro</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome completo"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
        <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
          Já tem conta? Voltar
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 30,
    width: '90%',
    maxWidth: 450,
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


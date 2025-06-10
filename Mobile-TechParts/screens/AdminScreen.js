import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import HeaderWithBack from '../components/HeaderWithBack';
import { LinearGradient } from 'expo-linear-gradient';
import { salvarProdutoLocal } from '../services/ProdutoLocalService';
import { register } from '../services/ProdutoApiService';
import AdminBottomNavBar from '../components/AdminBottomNavBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'; // para chamada manual com token
import BASE_URL from '../services/urls';


export default function AdminScreen({ navigation }) {
  const [produto, setProduto] = useState({
    nome: '',
    categoria: 'processador',
    descricao: '',
    preco: '',
    estoque: '',
    imagem: '',
  });

const handleSalvar = async () => {
  if (
    !produto.nome ||
    !produto.descricao ||
    !produto.preco ||
    !produto.estoque ||
    !produto.imagem
  ) {
    Alert.alert('Erro', 'Preencha todos os campos');
    return;
  }

  const produtoComId = {
    ...produto,
    preco: parseFloat(produto.preco.replace(',', '.')),
    estoque: parseInt(produto.estoque),
    id: Date.now().toString(),
  };

  let enviadoAPI = false;

  try {
    const token = await AsyncStorage.getItem('token');

    if (token) {
      await axios.post(`${BASE_URL}/cadastro`, produtoComId, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      enviadoAPI = true;
      console.log('✅ Produto salvo na API');
    } else {
      console.warn('⚠️ Token não encontrado. Produto será salvo localmente.');
    }
  } catch (error) {
    console.warn('❌ Erro ao salvar na API:', error.response?.data || error.message);
  }

  // Salva local se API falhar
  if (!enviadoAPI) {
    await salvarProdutoLocal(produtoComId);
    console.log('💾 Produto salvo localmente');
  }

  Alert.alert('Sucesso', 'Produto cadastrado com sucesso!');

  // Limpa o formulário
  setProduto({
    nome: '',
    categoria: 'processador',
    descricao: '',
    preco: '',
    estoque: '',
    imagem: '',
  });
};


  return (
    <LinearGradient colors={['#3a7bd5', '#00d2ff']} style={{ flex: 1 }}>
      <HeaderWithBack title="Painel Admin" onBack={() => navigation.goBack()} navigation={navigation} />

      <View style={styles.form}>
        <Text style={styles.label}>Nome do Produto</Text>
        <TextInput
          style={styles.input}
          value={produto.nome}
          onChangeText={(val) => setProduto({ ...produto, nome: val })}
        />

        <Text style={styles.label}>Categoria</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={produto.categoria}
            onValueChange={(itemValue) => setProduto({ ...produto, categoria: itemValue })}
            style={styles.picker}
          >
            <Picker.Item label="Memória RAM" value="ram" />
            <Picker.Item label="Placa de Vídeo" value="gpu" />
            <Picker.Item label="Placa Mãe" value="mobo" />
            <Picker.Item label="Processador" value="processador" />
            <Picker.Item label="Armazenamento" value="armazenamento" />
            <Picker.Item label="Periféricos" value="perifericos" />
          </Picker>
        </View>

        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={styles.input}
          value={produto.descricao}
          onChangeText={(val) => setProduto({ ...produto, descricao: val })}
        />

        <Text style={styles.label}>Preço (R$)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={produto.preco}
          onChangeText={(val) => setProduto({ ...produto, preco: val })}
        />

        <Text style={styles.label}>Estoque</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={produto.estoque}
          onChangeText={(val) => setProduto({ ...produto, estoque: val })}
        />

        <Text style={styles.label}>URL da Imagem</Text>
        <TextInput
          style={styles.input}
          value={produto.imagem}
          onChangeText={(val) => setProduto({ ...produto, imagem: val })}
        />

        <TouchableOpacity style={styles.button} onPress={handleSalvar}>
          <Text style={styles.buttonText}>Cadastrar Produto</Text>
        </TouchableOpacity>
      </View>

      <AdminBottomNavBar navigation={navigation} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  form: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    elevation: 4,
  },
  label: {
    fontWeight: '600',
    color: '#1a1a2e',
    marginTop: 12,
  },
  input: {
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 6,
  },
  pickerContainer: {
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    marginTop: 6,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  button: {
    backgroundColor: '#3a7bd5',
    marginTop: 20,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

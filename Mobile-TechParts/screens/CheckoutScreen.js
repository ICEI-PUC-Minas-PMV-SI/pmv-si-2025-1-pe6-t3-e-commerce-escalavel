import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeaderWithBack from '../components/HeaderWithBack';

export default function CheckoutScreen({ route, navigation }) {
  const { carrinho, total, user } = route.params;

  const [metodo, setMetodo] = useState('credito');
  const [numeroCartao, setNumeroCartao] = useState('');
  const [nomeTitular, setNomeTitular] = useState('');
  const [validade, setValidade] = useState('');
  const [cvv, setCvv] = useState('');

  const handlePagamento = () => {
    if (metodo !== 'pix') {
      // Cartão
      const numero = numeroCartao.replace(/\s/g, '');
      const cvvValido = /^[0-9]{3}$/.test(cvv);
      const nomeValido = nomeTitular.trim().length > 0;

      if (numero.length !== 16) {
        Alert.alert('Erro', 'O número do cartão deve conter 16 dígitos.');
        return;
      }

      if (!nomeValido) {
        Alert.alert('Erro', 'Por favor, preencha o nome do titular.');
        return;
      }

      if (!cvvValido) {
        Alert.alert('Erro', 'CVV deve conter exatamente 3 dígitos.');
        return;
      }

      const validadeRegex = /^([0-1][0-9])\/([0-9]{2})$/;
      if (!validadeRegex.test(validade)) {
        Alert.alert('Erro', 'Validade deve estar no formato MM/AA.');
        return;
      }

      const [mesStr, anoStr] = validade.split('/');
      const mes = parseInt(mesStr, 10);
      const ano = parseInt(`20${anoStr}`, 10);

      const hoje = new Date();
      const vencimento = new Date(ano, mes - 1, 1);
      vencimento.setMonth(vencimento.getMonth() + 1); // fim do mês

      if (vencimento <= hoje) {
        Alert.alert('Erro', 'Cartão expirado. Insira uma validade futura.');
        return;
      }

      if (numero === '4242424242424242') {
        salvarPedido('Aprovado');
      } else {
        salvarPedido('Reprovado');
      }
    } else {
      // PIX sempre aprova
      salvarPedido('Aprovado');
    }
  };

  const salvarPedido = async (status) => {
    const novoPedido = {
      id: Date.now(),
      produtos: carrinho,
      total,
      status,
      data: new Date().toLocaleString(),
    };

    const chave = `pedidos_${user.email.replace(/[^a-zA-Z0-9]/g, '')}`;
    const pedidosExistentes = await AsyncStorage.getItem(chave);
    const pedidos = pedidosExistentes ? JSON.parse(pedidosExistentes) : [];

    pedidos.push(novoPedido);
    await AsyncStorage.setItem(chave, JSON.stringify(pedidos));

    navigation.navigate('ResultadoPagamentoScreen', {
      status,
      user,
      carrinho,
      total,
    });
  };

  const renderProduto = ({ item }) => (
    <View style={styles.produtoItem}>
      <Image source={{ uri: item.imagem }} style={styles.produtoImagem} />
      <View style={styles.produtoInfo}>
        <Text style={styles.produtoNome}>{item.nome}</Text>
        <Text style={styles.produtoPreco}>
          R$ {parseFloat(item.preco).toFixed(2)}
        </Text>
      </View>
    </View>
  );

  return (
    <LinearGradient colors={['#3a7bd5', '#00d2ff']} style={styles.gradient}>
      <HeaderWithBack
        title="Painel pagamento"
        onBack={() => navigation.goBack()}
        navigation={navigation}
      />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.card}>
          <Text style={styles.title}>Finalizar Pagamento</Text>

          <FlatList
            data={carrinho}
            renderItem={renderProduto}
            keyExtractor={(item) => item.id.toString()}
            style={styles.listaProdutos}
          />

          <View style={styles.metodoContainer}>
            {['credito', 'debito', 'pix'].map((opcao) => (
              <TouchableOpacity
                key={opcao}
                style={[
                  styles.metodoBtn,
                  metodo === opcao && styles.metodoSelecionado,
                ]}
                onPress={() => setMetodo(opcao)}>
                <Text style={styles.metodoTexto}>
                  {opcao === 'credito'
                    ? 'Crédito'
                    : opcao === 'debito'
                    ? 'Débito'
                    : 'PIX'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {metodo === 'pix' ? (
            <View style={styles.qrContainer}>
              <Text style={styles.label}>Escaneie o QR Code abaixo:</Text>
              <Image
                source={{
                  uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Link_pra_pagina_principal_da_Wikipedia-PT_em_codigo_QR_b.svg/1200px-Link_pra_pagina_principal_da_Wikipedia-PT_em_codigo_QR_b.svg.png',
                }}
                style={styles.qr}
              />
            </View>
          ) : (
            <>
              <TextInput
                style={styles.input}
                placeholder="Número do cartão"
                keyboardType="number-pad"
                value={numeroCartao}
                onChangeText={(text) => {
                  const apenasNumeros = text.replace(/[^0-9]/g, '');
                  if (apenasNumeros.length <= 16) {
                    setNumeroCartao(apenasNumeros);
                  }
                }}
              />

              <TextInput
                style={styles.input}
                placeholder="Nome do titular"
                value={nomeTitular}
                onChangeText={setNomeTitular}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <TextInput
                  style={[styles.input, { width: '48%' }]}
                  placeholder="Validade (MM/AA)"
                  value={validade}
                  onChangeText={setValidade}
                />
                <TextInput
                  style={[styles.input, { width: '48%' }]}
                  placeholder="CVV"
                  keyboardType="number-pad"
                  value={cvv}
                  onChangeText={(text) => {
                    const apenasNumeros = text.replace(/[^0-9]/g, '');
                    if (apenasNumeros.length <= 3) {
                      setCvv(apenasNumeros);
                    }
                  }}
                />
              </View>
            </>
          )}

          <Text style={styles.total}>Total: R$ {total.toFixed(2)}</Text>

          <TouchableOpacity style={styles.btn} onPress={handlePagamento}>
            <Text style={styles.btnText}>
              {metodo === 'pix' ? 'Confirmar Pagamento' : 'Pagar'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1e3c72',
    marginBottom: 16,
    textAlign: 'center',
  },
  metodoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  metodoBtn: {
    flex: 1,
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  metodoSelecionado: {
    backgroundColor: '#3a7bd5',
  },
  metodoTexto: {
    color: '#000',
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },

  total: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e3c72',
    marginVertical: 16,
    textAlign: 'center',
  },
  btn: {
    backgroundColor: '#1e3c72',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  qrContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  qr: {
    width: 180,
    height: 180,
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  listaProdutos: {
    marginBottom: 16,
  },
  produtoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  produtoImagem: {
    width: 40,
    height: 40,
    borderRadius: 6,
    marginRight: 10,
    backgroundColor: '#ccc',
  },
  produtoInfo: {
    flex: 1,
  },
  produtoNome: {
    fontSize: 14,
    fontWeight: '500',
  },
  produtoPreco: {
    fontSize: 13,
    color: '#444',
  },
});

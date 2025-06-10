import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient'; // Ou 'react-native-linear-gradient'

export default function ResultadoPagamentoScreen({ route, navigation }) {
  const { status, user, carrinho, total } = route.params;

  const [processando, setProcessando] = useState(true);
  const [statusFinal, setStatusFinal] = useState('');

  useEffect(() => {
    const processar = async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));

      if (status === 'Aprovado') {
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

        const chaveCarrinho = `carrinho_${user.email.replace(/[^a-zA-Z0-9]/g, '')}`;
        await AsyncStorage.removeItem(chaveCarrinho);
      }

      setStatusFinal(status);
      setProcessando(false);
    };

    processar();
  }, [status, carrinho, total, user.email]);


  const voltarParaHome = () => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'Home',
          params: { user },
        },
      ],
    });
  };

  return (
    <LinearGradient colors={['#3a7bd5', '#00d2ff']} style={styles.container}> 
      {processando ? (
        <>
          <ActivityIndicator size="large" color="#FFFFFF" />
          <Text style={styles.text}>Pagamento em análise...</Text>
        </>
      ) : (
        <>
          <Text style={styles.text}>
            Pagamento {statusFinal === 'Aprovado' ? 'aprovado 🎉' : 'reprovado ❌'}
          </Text>
          <TouchableOpacity style={styles.btn} onPress={voltarParaHome}>
            <Text style={styles.btnText}>Voltar para a Home</Text>
          </TouchableOpacity>
        </>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF', // Cor do texto branca para contraste com o gradiente
    marginTop: 20,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)', // Sombra para melhor legibilidade
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  btn: {
    backgroundColor: '#FFFFFF', // Botão branco para destaque
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 30, // Bordas mais arredondadas
    marginTop: 40, // Mais espaço acima do botão
    elevation: 5, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  btnText: {
    color: '#3a7bd5', // Cor do texto do botão combinando com o gradiente
    fontWeight: 'bold',
    fontSize: 18,
  },
});

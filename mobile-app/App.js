import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import CadastroScreen from './src/screens/CadastroScreen';
import ProdutosScreen from './src/screens/ProdutosScreen';
import CarrinhoScreen from './src/screens/CarrinhoScreen';
import ProdutoDetalhesScreen from './src/screens/ProdutoDetalhesScreen';
import PerfilScreen from './src/screens/PerfilScreen';
import AuthLoadingScreen from './src/screens/AuthLoadingScreen';
import HistoricoScreen from './src/screens/HistoricoScreen';
import PagamentoWebScreen from './src/screens/PagamentoWebScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AuthLoading" screenOptions={{ headerShown: true }}>
        <Stack.Screen name="AuthLoading" component={AuthLoadingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} />
        <Stack.Screen name="Produtos" component={ProdutosScreen} />
        <Stack.Screen name="Carrinho" component={CarrinhoScreen} />
        <Stack.Screen name="Detalhes" component={ProdutoDetalhesScreen} />
        <Stack.Screen name="Perfil" component={PerfilScreen} />
        <Stack.Screen name="Historico" component={HistoricoScreen} />
        <Stack.Screen name="Pagamento" component={PagamentoWebScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

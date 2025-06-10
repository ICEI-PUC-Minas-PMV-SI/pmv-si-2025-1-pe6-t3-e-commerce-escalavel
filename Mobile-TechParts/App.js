import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PerfilScreen from './screens/PerfilScreen';
import AdminScreen from './screens/AdminScreen';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import GerenciarProdutosScreen from './screens/GerenciarProdutosScreen';
import UsuariosScreen from './screens/UsuariosAdminScreen';
import CarrinhoScreen from './screens/CarrinhoScreen';
import { CarrinhoProvider } from './context/CarrinhoContext';
import PagamentoScreen from './screens/CheckoutScreen';
import ResultadoPagamentoScreen from './screens/ResultadoPagamentoScreen'
import PedidosScreen from './screens/PedidosScreen'

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <CarrinhoProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Perfil" component={PerfilScreen} />
          <Stack.Screen name="AdminDashboard" component={AdminScreen} />
          <Stack.Screen name="Carrinho" component={CarrinhoScreen} />
          <Stack.Screen name="Pedidos" component={PedidosScreen} />

          <Stack.Screen
            name="GerenciarProdutos"
            component={GerenciarProdutosScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Usuarios"
            component={UsuariosScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="CheckoutScreen" component={PagamentoScreen} />
       <Stack.Screen name="ResultadoPagamentoScreen" component={ResultadoPagamentoScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </CarrinhoProvider>
  );
}

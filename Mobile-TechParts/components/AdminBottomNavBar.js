import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AdminBottomNavBar({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Produtos - Lado esquerdo */}
      <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('GerenciarProdutos')}>
        <Ionicons name="construct" size={24} color="#fff" />
        <Text style={styles.label}>Produtos</Text>
      </TouchableOpacity>

      {/* Adicionar - Centro */}
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AdminDashboard')}>
        <Ionicons name="add-circle" size={48} color="#fff" />
      </TouchableOpacity>

      {/* Usuários - Lado direito */}
      <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Usuarios')}>
        <Ionicons name="people" size={24} color="#fff" />
        <Text style={styles.label}>Usuários</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    height: 70,
    width: '100%',
    backgroundColor: '#3a7bd5',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    borderTopWidth: 1,
    borderColor: '#333',
  },
  item: {
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    color: '#fff',
    marginTop: 4,
  },
  addButton: {
    marginBottom: 20, // levanta o botão do meio
    alignItems: 'center',
  },
});

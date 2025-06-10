import API from './api';
import BASE_URL from './urls';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Função utilitária para obter o header de autorização
const getAuthHeaders = async () => {
  const token = await AsyncStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const listarProdutosAPI = async () => {
  try {
    const config = await getAuthHeaders();
    const response = await API.get(`${BASE_URL}/cadastro`, config);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar produtos da API:', error);
    return [];
  }
};

export const salvarProdutoAPI = async (produto) => {
  try {
    const config = await getAuthHeaders();
    const response = await API.post(`${BASE_URL}/cadastro`, produto, config);
    return response.data;
  } catch (error) {
    console.error('Erro ao salvar na API:', error);
    return null;
  }
};

export const deletarProdutoAPI = async (id) => {
  try {
    const config = await getAuthHeaders();
    await API.delete(`${BASE_URL}/cadastro/${id}`, config);
    return true;
  } catch (error) {
    console.error('Erro ao deletar da API:', error);
    return false;
  }
};

export const atualizarProdutoAPI = async (id, produtoAtualizado) => {
  try {
    const config = await getAuthHeaders();
    const response = await API.put(`${BASE_URL}/cadastro/${id}`, produtoAtualizado, config);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar na API:', error);
    return null;
  }
};

import AsyncStorage from '@react-native-async-storage/async-storage';

import API from './api';
import BASE_URL from './urls';


const getAuthHeaders = async () => {
  const token = await AsyncStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const salvarUsuario = async (usuario) => {
  const usuarios = await listarUsuarios();
  usuarios.push(usuario);
  await AsyncStorage.setItem('usuarios', JSON.stringify(usuarios));
};

export const salvarUsuarioLocal = async (usuario) => {
  const usuarios = await listarUsuariosLocal();
  usuarios.push(usuario);
  await AsyncStorage.setItem('usuarios', JSON.stringify(usuarios));
};

export const listarUsuariosLocal = async () => {
  const data = await AsyncStorage.getItem('usuarios');
  return data ? JSON.parse(data) : [];
};

export const deleteUsuarioLocal = async (email) => {
  const usuarios = await listarUsuarios();
  const atualizados = usuarios.filter((u) => u.email !== email);
  await AsyncStorage.setItem('usuarios', JSON.stringify(atualizados));
};



export const listarUsuarios = async () => {
  const data = await AsyncStorage.getItem('usuarios');
  return data ? JSON.parse(data) : [];
};

export const autenticarUsuario = async (email, senha) => {
  const usuarios = await listarUsuarios();
  return usuarios.find((u) => u.email === email && u.senha === senha) || null;
};

export const register = async (param) => {
  try {
    return await API.post(`${BASE_URL}/register`, param).then(
      (response) => {
        return response.data;
      },

      (error) => {
        console.log(error);
        return null;
      }
    );
  } catch (error) {
    //console.log(error);
    return null;
  }
};

export const deleteUsuario = async (id) => {
  try {
    const config = await getAuthHeaders();
    await API.delete(`${BASE_URL}/users/${id}`, config);
    return true;
  } catch (error) {
    console.log('Erro ao deletar usuário da API:', error);
    return false;
  }
};

export const listarUsuariosAPI = async () => {
  try {
    const config = await getAuthHeaders();
    const response = await API.get(`${BASE_URL}/users`, config);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar usuários da API:', error);
    return [];
  }
};
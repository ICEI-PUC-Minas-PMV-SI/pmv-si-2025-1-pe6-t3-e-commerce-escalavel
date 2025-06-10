import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'produtos';

export const listarProdutosLocal = async () => {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const salvarProdutoLocal = async (produto) => {
  const produtos = await listarProdutosLocal();
  produtos.push({ ...produto, id: Date.now().toString() }); // ID local
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(produtos));
};

export const deletarProdutoLocal = async (id) => {
  const produtos = await listarProdutosLocal();
  const novos = produtos.filter(p => p.id !== id);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(novos));
};

export const atualizarProdutoLocal = async (id, novoProduto) => {
  const produtos = await listarProdutosLocal();
  const atualizados = produtos.map(p => (p.id === id ? { ...p, ...novoProduto } : p));
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(atualizados));
};

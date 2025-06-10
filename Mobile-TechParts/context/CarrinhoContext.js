import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EventBus from '../src/utils/EventBus'; // para emitir atualização visual

export const CarrinhoContext = createContext();

export const CarrinhoProvider = ({ children }) => {
  const adicionarAoCarrinho = async (produto, user) => {
    if (!user || !user.email) return;
    const chave = `carrinho_${user.email.replace(/[^a-zA-Z0-9]/g, '')}`;
    const carrinhoAtual = JSON.parse(await AsyncStorage.getItem(chave)) || [];

    const existente = carrinhoAtual.find(p => p.id === produto.id);
    if (existente) {
      existente.quantidade += 1;
    } else {
      carrinhoAtual.push({ ...produto, quantidade: 1 });
    }

    await AsyncStorage.setItem(chave, JSON.stringify(carrinhoAtual));
    EventBus.emit('carrinhoAtualizado'); // <== importante!
  };

  return (
    <CarrinhoContext.Provider value={{ adicionarAoCarrinho }}>
      {children}
    </CarrinhoContext.Provider>
  );
};
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export default function PagamentoWebScreen({ route }) {
  const { url } = route.params;

  return (
    <View style={styles.container}>
      <WebView source={{ uri: url }} startInLoadingState />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 }
});

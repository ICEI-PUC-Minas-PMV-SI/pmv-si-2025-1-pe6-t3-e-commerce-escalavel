import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 12,
  },
  list: {
    paddingHorizontal: 12,
    paddingBottom: 100,
    marginTop: 10,
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 14,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    alignItems: 'center',
    width: 200,
  },
  imageWrapper: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: 4,
    textAlign: 'center',
  },
  cardPrice: {
    fontSize: 13,
    color: '#3a7bd5',
    marginBottom: 8,
  },
  cardButton: {
    backgroundColor: '#3a7bd5',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  cardButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
});

export default styles;

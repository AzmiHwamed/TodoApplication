import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
  },
  card: {
    padding: 16,
    borderRadius: 10,
    elevation: 4, 
  },
  label: {
    fontWeight: 'bold',
    marginTop: 8,
  },
  value: {
    marginBottom: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
});

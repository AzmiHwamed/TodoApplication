import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  image:{
    width: "45%",
    height: "30%",
    objectFit: "contain",
    marginTop: 50,
  },
  title:{
    fontSize: 15,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: "10%",
  },
  input:{
    width: "90%",
    height: 50,
    marginBottom: "3%",
  },
  button:{
    marginTop: "3%",
    width: "90%",
    maxHeight: "7%",
    flex:1,
    justifyContent: "center",
    alignItems: "center",
    
  }
});
 export default styles;
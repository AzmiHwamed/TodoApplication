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
    marginTop: "5%",
    objectFit: "contain",
  },
  title:{
    fontSize: 15,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 80,
  },
  input:{
    width: "90%",
    height: "5%",
    marginBottom: "3%",
  },
  button:{
    marginTop: "3%",
    width: "80%",
    maxHeight: "6%",
    flex:1,
    justifyContent: "center",
    alignItems: "center",


    
  }
});
 export default styles;
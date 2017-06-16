import { StyleSheet } from 'react-native';
export const size = "large";
export const color = "#494949";
export default StyleSheet.create({
	loader: {
    flexDirection: "column",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignSelf: "center",
    padding: 10
  },
  message: {
    fontSize: 16,
    marginVertical: 16, 
	  justifyContent: "center",
    alignSelf: "center",
    color: "#fff",
    backgroundColor: "transparent",
  }
});
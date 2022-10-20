import { StyleSheet } from "react-native";

export default StyleSheet.create({
  markerImage: {
    borderColor: "#06B6D4",
    borderWidth: 4,
    width: 34,
    height: 34,
    borderRadius: 34,
    zIndex:2
  },
  markerView: {
    backgroundColor: "red",
    width: 30,
    height: 30,
    borderRadius: 30,
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
  },
  markerBottom: {
    marginTop: -23,
    marginLeft: 4,
    zIndex:1
  },
  markerText: {
    color:"white"
  }
});

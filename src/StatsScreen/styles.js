import { StyleSheet } from 'react-native';
export default StyleSheet.create({
	container: {
    flex: 1,
    backgroundColor: '#333333',
    paddingTop: 15
  },
  lastShowNumber: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 100,
    color: '#ffffff'
  },
  lastShowText: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 20,
    color: '#fff'
  },
  showHistoryText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 30
  },
	chartBarGraph: {
	  position: 'absolute',
	  marginLeft: 15,
	  marginRight: 15,
	  top: 16,
	  left: 4,
	  bottom: 4,
	  right: 16
	},
	chart: {

	}
});
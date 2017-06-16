import { StyleSheet } from 'react-native';
export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 5,
    marginTop: 0,
    backgroundColor: '#333'
  },
  description: {
    marginBottom: 30,
    fontSize: 18,
    textAlign: 'center',
    color: '#fff'
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8
  },
  searchInput: {
    height: 36,
    width: 60,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC'
  },
  placeholderTextWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
    height: 300
  },
  placeholderText: {
    marginTop: 30,
    marginBottom: 20,
    fontSize: 20,
    color: '#656565'
  },
  placeholderMusicNote: {
    width: 200,
    height: 100
  },
  separator: {
    height: 1,
    marginLeft: 10,
    marginTop: 10,
    backgroundColor: 'rgba(80, 227, 194, 0.5)'
  },
  concertRowContainer: {
    flexDirection: 'row',
    paddingLeft: 12.5,
    paddingTop: 10,
    justifyContent: 'flex-start',
    backgroundColor: '#333'
  },
  concertThumbnail: {
    width: 65,
    height: 65,
    marginRight: 10,
    borderRadius: 4
  },
  concertTextContainer: {
    width: 230,
    justifyContent: 'flex-start',
    flexWrap: 'nowrap'
  },
  concertTextArtist: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff'
  },
  concertTextVenue: {
    paddingTop: 3,
    fontSize: 15,
    color: '#ffffff'
  },
  concertTextLocationAndDate: {
    paddingTop: 3,
    fontSize: 12,
    color: '#ffffff'
  },
  concertRating: {
    color: "#50E3C2",
    fontSize: 30,
    alignSelf: 'center'
  },
  iconButtons: {
    width: 65,
    height: 65,
    alignSelf: 'center',
    justifyContent: "center",
  },
  buttonCamera: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: "center",
  },
});
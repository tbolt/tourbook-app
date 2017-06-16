import { StyleSheet } from 'react-native';
export default StyleSheet.create({
  concertDetailContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#333'
  },
  concertDetailImage: {
    height: 300,
    overflow: 'hidden'
  },
  concertDetailBlurWrapper: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  concertDetailBlurBox: {
    overflow: 'hidden',
    borderRadius: 10,
    marginTop: 10,
  },
  concertDetailArtist: {
    textAlign: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 40,
    flexWrap: 'nowrap',
    paddingRight: 40,
    color: '#ffffff',
    fontSize: 22,
    textShadowColor: '#4f4f4f',
    textShadowRadius: 4,
    textShadowOffset: {width: 1, height: 1}
  },
  editButton: {
    marginTop: 10,
    marginRight: 10,
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 5,
    paddingRight: 5,
    color: '#fff',
    backgroundColor: '#333',
    borderRadius: 3,
    fontSize: 14,
    flex: 1,
    alignSelf: 'flex-end',
  },
  description: {
    fontSize: 18,
    margin: 5,
    color: '#ffffff'
  },
    descriptionShowNotes: {
    fontSize: 11,
    margin: 5,
    color: '#ffffff'
  },
  modalButton: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'center',
    marginTop: 140
  },
  modalContainer: {

  },
  modalInnerContainer: {

  },
  modalText: {
    color: '#fff'
  },
  concertRatingAndTicketWrapper: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'flex-start',
    height: 70,
    marginTop: -40,
    marginBottom: 10
  },
  concertDetailRatingWrapper: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: 85,
    height: 85,
    backgroundColor: '#333333',
    borderRadius: 100,
    overflow: 'hidden',
    marginLeft: 30,
    marginRight: 120,
    marginTop: -6,
  },
  concertDetailRating: {
    fontSize: 48,
    width: 85,
    alignSelf: 'center',
    textAlign: 'center',
    color: '#50E3C2'
  },
  concertDetailTicketImage: {
    flex: 0 ,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    borderWidth: 3,
    borderColor: '#2B2B2B',
    shadowColor: '#000',
    shadowOpacity: 0.8,
    shadowRadius: 20,
    shadowOffset: {width: 0, height: 0},
    width: 125,
    height: 60,
    marginTop: 0,
    marginLeft: -20
  },
  concertDetailsWrapper: {
    marginLeft: 35,
  },
  concertDetailVenue: {
    color: '#ffffff',
    fontSize: 20
  },
  concertDetailLocation: {
    color: '#ffffff',
    fontSize: 16
  },
  concertDetailDate: {
    color: '#ffffff',
    fontSize: 16
  },
  concertNotesHeaderText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  concertNotesWrapper: {
    borderTopWidth: 2,
    borderTopColor: '#fff',
    marginTop: 20,
    marginLeft: 35,
    paddingTop: 20,
  },
  concertDetailShowNotes: {
    marginTop: 20,
    color: '#ffffff'
  },
  lightBoxPhoto: {
    width: 1000
  },
   iconButtons: {
    alignSelf: 'center',
    justifyContent: "center",
  },
  buttonCamera: {
    width: 300,
    height: 300,
    backgroundColor: 'transparent',
    alignItems: 'center',
    alignSelf: "center",
    justifyContent: "center",
  },
  ticketInput: {
    flex: 1,
  },
  buttonTicket: {
    backgroundColor: '#333',
  },
});
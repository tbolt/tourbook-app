import {CONSTANT} from "./Constants";
import ConcertDatabase from './Database';

exports.clearDatabase = (cb: Function) => {
  ConcertDatabase.write(() => {
    let concerts = ConcertDatabase.objects(CONSTANT.CONCERT);
    ConcertDatabase.delete(concerts);
    console.log('Concerts successfully deleted');
   	cb({
   		success: true, 
   		message: "Successfully deleted concerts",
   		data: result
   	})
  });
}

exports.createConcert = (data: Object, cb: Function) => {	
	// Validate parameters
	if(!data) {
		return cb({
   		success: false, 
   		errorMessage: "No data was provided to create a new concert",
   		error: data
   	})
	}
	// Validate fields
	let validResult = validateConcertData(data);
	if(!validResult.success) {
		return cb(validResult)
	}
  // Write to datebase
  ConcertDatabase.write(() => {
   	let result = ConcertDatabase.create(CONSTANT.CONCERT, data);
   	console.log('Concert successfully created');
   	cb({
   		success: true, 
   		message: "Successfully created concert",
   		data: result
   	})
  });
}

const CONCERT_NAME_REQUIRED = false;
const CONCERT_ARTIST_REQUIRED = false;
const CONCERT_VENUE_REQUIRED = false;
const CONCERT_LOCATION_REQUIRED = false;
const TICKET_RATING_REQUIRED = false;
const CONCERT_PHOTO_REQUIRED = false;
const TICKET_PHOTO_REQUIRED = false;
const SHOW_NOTES_REQUIRED = false;

let validateConcertData = (data: Object) => {
	if(!data.guid)
		return {success: false, errorMessage: "GUID field was not provided", error:  data};
	else if(CONCERT_NAME_REQUIRED && !data.name)
		return {success: false, errorMessage: "name field was not provided", error:  data};
	else if(CONCERT_ARTIST_REQUIRED && !data.artist)
		return {success: false, errorMessage: "artist field was not provided", error:  data};
	else if(CONCERT_VENUE_REQUIRED && !data.venue)
		return {success: false, errorMessage: "venue field was not provided", error:  data};
	else if(CONCERT_LOCATION_REQUIRED && !data.location)
		return {success: false, errorMessage: "location field was not provided", error:  data};
	else if(TICKET_RATING_REQUIRED && !data.rating)
		return {success: false, errorMessage: "rating field was not provided", error:  data};
	else if(TICKET_PHOTO_REQUIRED && !data.showNotes)
		return {success: false, errorMessage: "showNotes field was not provided", error:  data};
	else if(CONCERT_PHOTO_REQUIRED && !data.concertPhoto)
		return {success: false, errorMessage: "concertPhoto field was not provided", error:  data};
	else if(SHOW_NOTES_REQUIRED && !data.ticketPhoto)
		return {success: false, errorMessage: "ticketPhoto field was not provided", error:  data};
	else  
		return {success: true, message: "all field are valid", data:  data};	
}


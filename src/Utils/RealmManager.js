import { CONSTANT } from "./Constants";
import RealmDatabase from './RealmDatabase';

exports.getConcerts = () => {
	return RealmDatabase.objects('Concert'); 
}

exports.getConcertsDates = () => {
	return RealmDatabase.objects('Concert').filtered('date');
}

exports.deleteConcert = (guid: String, cb: Function) => {
  RealmDatabase.write(() => {
	  let concerts = RealmDatabase.objects('Concert');
	  let filter = 'guid == "' + guid + '"';
	  let concert = concerts.filtered(filter); 
	  let result = RealmDatabase.delete(concert);
	  cb({
	 		success: true, 
	 		message: "Successfully deleted concert",
	 		data: result
	  });
	});
}

exports.clearDatabase = (cb: Function) => {
  RealmDatabase.write(() => {
    let concerts = RealmDatabase.objects(CONSTANT.CONCERT);
    let result = RealmDatabase.delete(concerts);
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
  RealmDatabase.write(() => {
   	let result = RealmDatabase.create(CONSTANT.CONCERT, data);
   	console.log('Concert successfully created');
   	cb({
   		success: true, 
   		message: "Successfully created concert",
   		data: result
   	})
  });
}

exports.updateConcert = (guid: String, data: Object, cb: Function) => {	
	if(!data || !guid) {
		return cb({
   		success: false, 
   		errorMessage: "Invalid data was provided to create a update concert",
   		error: data
   	})
	}
	let concerts = RealmDatabase.objects(CONSTANT.CONCERT);
	let concert = concerts.filtered('guid = $0', guid);
  RealmDatabase.write(() => {
  	//let modifiedConcert = updateConcertData(data, concert);
		//concert = (modifiedConcert)? modifiedConcert: concert;
   	 	console.log('Updating concert data', concert);	

   	 	let concertData = {
        name: artist,
        artist: artist,
        venue: venue,
        location: location,
        date: formattedDate,
        rating: concertRatingSlider,
        showNotes: showNotes,
        concertPhoto: concertPhotoURI,
        ticketPhoto: ticketPhotoURI      
      }

		if(data.name)
			concert.name = data.name;
		if(data.artist)
			concert.artist = data.artist;
		if(data.venue)
			concert.venue = data.venue;
		if(data.location)
			concert.location = data.location;
		if(data.rating)
			concert.rating = data.rating;
		if(data.showNotes)
			concert.showNotes = data.showNotes;
		if(data.concertPhoto)
			concert.concertPhoto = data.concertPhoto;
		if(data.ticketPhoto)
			concert.ticketPhoto = data.ticketPhoto;	

		   	 	console.log('Updated concert data', concert);	  	
  });
  cb({
 		success: true, 
 		message: "Successfully created concert",
 		data: concert
 	})
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
 	console.log('Validating concert data');
 	if(!data)return;
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

let updateConcertData = (data: Object, concert: Object) => {
 	console.log('Updating concert data');	
 	if(!data)return;
	if(data.name)
		concert.name = data.name;
	if(data.artist)
		concert.artist = data.artist;
	if(data.venue)
		concert.venue = data.venue;
	if(data.location)
		concert.location = data.location;
	if(data.rating)
		concert.rating = data.rating;
	if(data.showNotes)
		concert.showNotes = data.showNotes;
	if(data.concertPhoto)
		concert.concertPhoto = data.concertPhoto;
	if(data.ticketPhoto)
		concert.ticketPhoto = data.ticketPhoto;	
	return concert;
}


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
	let validResult = validateConcertData();
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




let validateConcertData = (data: Object) => {
	if(!data.guid)
		return {success: false, errorMessage: "GUID field was not provided", error:  data};
	else if(!data.name)
		return {success: false, errorMessage: "name field was not provided", error:  data};
	else if(!data.artist)
		return {success: false, errorMessage: "artist field was not provided", error:  data};
	else if(!data.venue)
		return {success: false, errorMessage: "venue field was not provided", error:  data};
	else if(!data.location)
		return {success: false, errorMessage: "location field was not provided", error:  data};
	else if(!data.rating)
		return {success: false, errorMessage: "rating field was not provided", error:  data};
	else if(!data.showNotes)
		return {success: false, errorMessage: "showNotes field was not provided", error:  data};
	else if(!data.concertPhoto)
		return {success: false, errorMessage: "concertPhoto field was not provided", error:  data};
	else if(!data.ticketPhoto)
		return {success: false, errorMessage: "ticketPhoto field was not provided", error:  data};
	else  
		return {success: true, message: "all field are valid", data:  data};	
}


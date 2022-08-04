import {
	ActivityIndicatorIOS,
} from 'react-native';

exports.getSpinner = (hidden: String, size: String) => {
	return (
		<ActivityIndicatorIOS hidden={hidden} size={size}/> 
	);
}

exports.createGuid = () => {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() +
  s4() + s4();
}

exports.showImagePicker = (options: Object, cb: Function) => {
	let ImagePicker = require('react-native-image-picker');
  ImagePicker.showImagePicker(options, (response) => {
    if (response.didCancel) {
      console.log('Image Picker was cancelled');
      cb({
      	success: false,
      	errorMessage: "Image Picker was cancelled",
      	error: response
      });
    } else if (response.error) {
      console.log('Image Picker experienced an error', response.error);
      cb({
      	success: false,
      	errorMessage: "The Image Picker experienced an error",
      	error: response.error
      });
    } else {
      const source = getBase64ImageResource(response.data, true);
      cb({
      	success: true,
      	message: "User successfully picked an image",
      	data: source
      });
    }
  });
}

let getBase64ImageResource = (data: Object, isStatic: Boolean) => {
  // Base64 Image (on iOS)
	let uri = "data:image/jpeg;base64," + response.data;
	return {uri: uri, isStatic: isStatic};
}
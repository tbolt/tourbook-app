export const CONSTANT = {
	BACK_BUTTON_TITLE: "Back",
	CONCERT: "Concert",
	HOME_NAME: "home",
	HOME_NAV_REF: "navHome",
	HOME_TAB: "homeTab",
	HOME_TITLE: "Home", 
	FAVORITES_NAME: "star",
	FAVORITES_NAV_REF: "navFavorites",
	FAVORITE_TAB: "favoriteTab",
	FAVORITES_TITLE: "Favorites",
	SAVE: "Save",
	SECONDARY_COLOR: "#50E3C2",
	SETTINGS: "Settings",
	STATS_NAME: "line-graph",
	STATS_NAV_REF: "navStats",
	STATS_TAB: "statsTab",
	STATS_TITLE: "Stats",
	PRIMARY_COLOR: "#282828",
	TERTIARY_COLOR: "#4A90E2",
	TITLE: "Tourbook",
}

export const COLOR = {
	GRAY: '#333',
	WHITE: "#fff"
}

export const IMAGE_PICKER = {
	CONCERT_PHOTO: "concertPhoto",
	TICKET_PHOTO: "ticketPhoto",
	OPTIONS: {
		CONCERT_PHOTO: {
			title: '', // specify null or empty string to remove the title
      cancelButtonTitle: 'Cancel',
      takePhotoButtonTitle: 'Take Photo...', // specify null or empty string to remove this button
      chooseFromLibraryButtonTitle: 'Choose from Library...', // specify null or empty string to remove this button
      cameraType: 'back', // 'front' or 'back'
      mediaType: 'photo', // 'photo' or 'video'
      videoQuality: 'high', // 'low', 'medium', or 'high'
      durationLimit: 10, // video recording max time in seconds
      angle: 0, // photos only
      allowsEditing: false, // Built in functionality to resize/reposition the image
      noData: false, // photos only - disables the base64 `data` field from being generated (greatly improves performance on large photos)
      storageOptions: { // if this key is provided, the image will get saved in the documents/pictures directory (rather than a temporary directory)
        skipBackup: true, // image will NOT be backed up to icloud
        path: 'images' // will save image at /Documents/images rather than the root
      }
		},
		TICKET_PHOTO: {
			title: '', // specify null or empty string to remove the title
      cancelButtonTitle: 'Cancel',
      takePhotoButtonTitle: 'Take Photo...', // specify null or empty string to remove this button
      chooseFromLibraryButtonTitle: 'Choose from Library...', // specify null or empty string to remove this button
      cameraType: 'back', // 'front' or 'back'
      mediaType: 'photo', // 'photo' or 'video'
      videoQuality: 'high', // 'low', 'medium', or 'high'
      durationLimit: 10, // video recording max time in seconds
      angle: 0, // photos only
      allowsEditing: false, // Built in functionality to resize/reposition the image
      noData: false, // photos only - disables the base64 `data` field from being generated (greatly improves performance on large photos)
      storageOptions: { // if this key is provided, the image will get saved in the documents/pictures directory (rather than a temporary directory)
        skipBackup: true, // image will NOT be backed up to icloud
        path: 'images' // will save image at /Documents/images rather than the root
      }
		}
	}
}

export const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

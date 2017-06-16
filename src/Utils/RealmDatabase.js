const Realm = require('realm');
import Concert from '../Models/Concert';
export default new Realm({
	schema: [Concert], 
	schemaVersion: 400
});

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
	
var UserSchema = new Schema ( {
	
	firstname : String,
	lastname : String,
	email: {
		type: String,
		index: true,
		match: /.+\@.+\..+/,
		required: true
	},
	username: {
		type: String,
		trim: true,
		unique: true,
		required: true},
		
	password : String,
	created : {
		type: Date,
		default: Date.now
	},
	website: {
		type: String,
		get: function(url) {
			if (!url) {
				return url;
			} else {
				if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
					url = 'http://'+url;
				}
				return url;
			}
			
		}
	},
	role : {
		type: String,
		trim: true,
		unique: true,
		required: true,
		enum: ['Admin', 'Member', 'Buyer']		
	}
	
});
UserSchema.set('toJSON', {getters: true});
mongoose.model('User', UserSchema);

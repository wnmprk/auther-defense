'use strict'; 

var mongoose = require('mongoose'),
	shortid = require('shortid'),
	_ = require('lodash'),
	crypto = require('crypto');

var db = require('../../db');
var Story = require('../stories/story.model');

var User = new mongoose.Schema({
	_id: {
		type: String,
		unique: true,
		default: shortid.generate
	},
	name: String,
	photo: {
		type: String,
		default: '/images/default-photo.jpg'
	},
	phone: String,
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		select: false
	},
	salt: {
		type: String,
		default: makeSalt,
		select: false
	},
	google: {
		id: String,
		name: String,
		email: String,
		token: {
			type: String,
			select: false
		}
	},
	twitter: {
		id: String,
		name: String,
		email: String,
		token: {
			type: String,
			select: false
		}
	},
	github: {
		id: String,
		name: String,
		email: String,
		token: {
			type: String,
			select: false
		}
	},
	isAdmin: {
		type: Boolean,
		default: false
	}
});

function makeSalt () {
	return crypto.randomBytes(16).toString('base64');
}

User.path('password').set(function (plaintext) {
	return this.hash(plaintext);
});

User.methods.hash = function (plaintext) {
	return crypto.pbkdf2Sync(plaintext, this.salt, 10000, 64).toString('base64');
};

User.methods.authenticate = function (attempt) {
	return this.password == this.hash(attempt);
};

User.methods.getStories = function () {
	return Story.find({author: this._id}).exec();
};

module.exports = db.model('User', User);
'use strict';

var express = require('express'),
	router = express.Router(),
	path = require('path');

var rootPath = path.join(__dirname, '..', '..');

var publicPath = path.join(rootPath, 'public');
var bowerPath = path.join(rootPath, 'bower_components');
var browserPath = path.join(rootPath, 'browser');

router.use(express.static(publicPath));

router.use('/bower_components', express.static(bowerPath));

router.use('/browser', express.static(browserPath));

module.exports = router;
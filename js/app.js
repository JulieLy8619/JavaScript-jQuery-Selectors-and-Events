'use strict';

//Feature 1, display images

//make a constructor funtion
function Horns (url, title, descrip, key, horn) {
  this.url = url;
  this.title = title;
  this.description = descrip;
  this.keyword = key;
  this.horn = horn;
}

//get information from json and populate template, which also then renders to screen.
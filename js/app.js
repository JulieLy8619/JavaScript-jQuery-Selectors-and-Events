'use strict';

//Feature 1, display images

//Global variables
allHornsArray = [];

//make a constructor funtion
function Horns (url, title, descrip, key, horn) {
  this.url = url;
  this.title = title;
  this.description = descrip;
  this.keyword = key;
  this.horn = horn;
}

Horns.prototype.render = function() {
  console.log('in renders func');
  $('main').append('<div class="clone"></div>')
  let hornClone = $('div [class="clone"]');

  let hornHtml = $('#photo-template').html();

  hornClone.html(hornHtml);

  hornClone.find('h2').text(this.title);
  hornClone.find('img').attr('src', this.url);
  hornClone.find('p').text(this.description);
  hornClone.removeClass('clone');
  hornClone.attr('class', this.title);   
}
//get information from json and populate template, which also then renders to screen.

Horns.readJson = () => {
  console.log('in readJson func');
  $.get('page-1.json', 'json');
    .then(data => {
      data.forEach(obj => {
        allHornsArray.push(new Horns(obj));
      })
    })
    .then(Horns.loadHorns);
}

loadHorns = () => {
  console.log('in loadHorns func');
  allHornsArray.forEach(horn => horns.render());
}


'use strict';

//Feature 1, display images


//make a constructor funtion
function Horns (obj) {
  this.url = obj.image_url;
  this.title = obj.title;
  this.description = obj.description;
  this.keyword = obj.keyword;
  this.horn = obj.horns;
}
Horns.allHornsArray = [];

Horns.prototype.render = function() {

  $('main').append('<div class="clone"></div>')
  let hornClone = $('div[class="clone"]');
  let hornHtml = $('#photo-template').html();
  hornClone.html(hornHtml);
  hornClone.find('h2').text(this.title);
  hornClone.find('img').attr('src', this.url);
  hornClone.find('p').text(this.description);
  hornClone.removeClass('clone');
  hornClone.attr('class', this.title);
  console.log('end');
}

//get information from json and populate template, which also then renders to screen.
Horns.readJson = () => {
  $.get('data/page-1.json', 'json')
    .then(data => {
      data.forEach(obj => {
        Horns.allHornsArray.push(new Horns(obj));
      })
    })
    .then(Horns.loadHorns);
}

Horns.loadHorns = () => {
  Horns.allHornsArray.forEach(horn => horn.render());
}

$(() => Horns.readJson());

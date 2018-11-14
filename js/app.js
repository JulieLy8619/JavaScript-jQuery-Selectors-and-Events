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
Horns.listArray = [];

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
}



// Horns.makeList = () => {
//   if (Horns.listArray.includes(this.keyword) !== true) {
//     Horns.listArray.push(this.keyword)
//   }
// }

// Horns.allHornsArray.forEach(Horns.makeList(this.keyword));

Horns.prototype.newList = function() {
  if (!Horns.listArray.includes(this.keyword)) {
    Horns.listArray.push(this);
  }
}

Horns.prototype.list = function () {
  // console.log('in list prototype');
  let filterList = $('select');
  // $.each(Horns.allHornsArray, () => {
  filterList.append($('<option></option>').val(this.keyword).html(this.keyword))
  // this isn't right because I do't want the keyword for each of the objects, I just need a list of the keywords and that is what will go into the options
  // })
};

//get information from json and populate template, which also then renders to screen.
Horns.readJson = () => {
  $.get('data/page-1.json', 'json')
    .then(data => {
      data.forEach(obj => {
        Horns.allHornsArray.push(new Horns(obj));
      })
    })
    .then(Horns.loadHorns)
    .then(Horns.populateList)
    .then(Horns.populateForm)
}

Horns.loadHorns = () => {
  Horns.allHornsArray.forEach(horn => horn.render());
}
//feature 2: filter images
Horns.populateForm= () => {
  Horns.listArray.forEach( horn => horn.list());
}

Horns.populateList = () => {
  Horns.allHornsArray.forEach(horn => horn.newList());
}

$(() => Horns.readJson());


//populates the dropdownlist

//clickhandler



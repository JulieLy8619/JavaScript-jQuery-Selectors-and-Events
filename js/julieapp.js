'use strict';

// 11-15-18 jl added my stuff to this index and working from here on out

//make a constructor funtion
function Horns (obj) {
  this.url = obj.image_url;
  this.title = obj.title;
  this.description = obj.description;
  this.keyword = obj.keyword;
  this.horn = obj.horns;
}
Horns.allHornsArray = [];
Horns.listArrayKeys = [];
Horns.listArray = [];
Horns.filteredListArray = [];

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

Horns.prototype.makeList = function () {
  if (!Horns.listArrayKeys.includes(this.keyword)) {
    Horns.listArrayKeys.push(this.keyword);
    Horns.listArray.push(this);
  }
}

Horns.prototype.list = function () {

  let filterList = $('select');
  filterList.append($('<option></option>').val(this.keyword).html(this.keyword))


};

Horns.prototype.clearImage = function (){
  $('div').remove();
  // $('option').remove();
}

//get information from json and populate template, which also then renders to screen.
Horns.readJson1 = () => {
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

Horns.readJson2 = () => {
  $.get('data/page-2.json', 'json')
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

Horns.populateForm= () => {
  Horns.listArray.forEach( horn => horn.list());
}

Horns.populateList = () => {
  Horns.allHornsArray.forEach(horn => horn.makeList());
}
Horns.clearPage = () => {
  Horns.allHornsArray.forEach(horn => horn.clearImage());
}

$(() => Horns.readJson1());


$('select').on('change', function(event) {
  //clear images
  Horns.clearPage();
  let getKey = event.target.value;
  // console.log(getKey);
  Horns.allHornsArray.forEach( hornObj => {
    if (getKey === 'default') {
      hornObj.render();
    } else if (getKey === hornObj.keyword) {
      hornObj.render();
    }
  })

});

$('#page1').on('click', function(event) {
  console.log('on page 1');
  Horns.clearPage();
  $('option').remove();
  let clearedFilterList1 = $('select');
  clearedFilterList1.append($('<option></option>').val('default').html('Filter by Keyword'));

  Horns.allHornsArray = [];
  Horns.listArrayKeys = [];
  Horns.listArray = [];
  Horns.filteredListArray = [];
  $(() => Horns.readJson1());
});

$('#page2').on('click', function(event) {
  console.log('on page 1');
  Horns.clearPage();
  $('option').remove();
  let clearedFilterList2 = $('select');
  clearedFilterList2.append($('<option></option>').val('default').html('Filter by Keyword'));

  Horns.allHornsArray = [];
  Horns.listArrayKeys = [];
  Horns.listArray = [];
  Horns.filteredListArray = [];
  $(() => Horns.readJson2());
});

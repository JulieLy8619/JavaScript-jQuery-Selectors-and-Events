'use strict';

// Horns constructor function
function Horns (obj) {
  this.url = obj.image_url;
  this.title = obj.title;
  this.description = obj.description;
  this.keyword = obj.keyword;
  this.horn = obj.horns;
  this.page = obj.page;
  Horns.allHornsArray.push(this);

}
Horns.allHornsArray = [];
Horns.listArrayKeys1 = [];
Horns.listArray1 = [];
Horns.filteredListArray = [];
Horns.listArrayKeys2 = [];
Horns.listArray2 = [];
let $whereToGo = 'page1';
let $sort = 'sortTitle';

// render each Horn object passed to it
Horns.prototype.render = function() {
  const source = $('#photo-template').html();
  const template = Handlebars.compile(source);
  return template(this);
};

// make list of keywords and array of page 1 objects with unique keywords
Horns.prototype.makeList1 = function () {
  if (!Horns.listArrayKeys1.includes(this.keyword)) {
    Horns.listArrayKeys1.push(this.keyword);
    Horns.listArray1.push(this);
  }
}

// // make list of keywords and array of page 2 objects with unique keywords
Horns.prototype.makeList2 = function () {
  if (!Horns.listArrayKeys2.includes(this.keyword)) {
    Horns.listArrayKeys2.push(this.keyword);
    Horns.listArray2.push(this);
  }
}

// append dropdown list with unique keywords for page 1
Horns.prototype.list1 = function () {
  let filterList1 = $('select[name="page1"');
  filterList1.append($('<option></option>').val(this.keyword).html(this.keyword))
};

// append dropdown list with unique keywords for page 2
Horns.prototype.list2 = function () {
  let filterList2 = $('select[name="page2"');
  filterList2.append($('<option></option>').val(this.keyword).html(this.keyword))
};

// remove image by removing div of obj passed to it by clear page function
Horns.prototype.clearImage = function (){
  $('div').remove();
}

// click handler for pagination, $whereToGo set to page one on pageload, hide current page, clearPage (or it will keep adding images), load/render images (so all images loaded when pagination initiated after dropdown selected), hide/expose page
$('#pages ul a').on('click', function() {
  $whereToGo = $(this).data('tab');
  $('.photo-location').hide();
  Horns.clearPage();
  Horns.loadHorns();
  $('#' + $whereToGo).fadeIn(750)
  if($whereToGo === 'page1') {
    $('select[name="page2"').hide();
    $('select[name="page1"').fadeIn(750);
  }else{
    $('select[name="page1"').hide();
    $('select[name="page2"').fadeIn(750);
  }
})

// sort by click handler, changes sort method (title on page load), clears page, sorts allHornsArray, loads images
$('#sorters ul a').on('click', function() {
  $sort = $(this).data('tab');
  Horns.clearPage();
  Horns.sort();
  Horns.loadHorns();
})

//get information from json and populate template, which also then renders to screen.
Horns.readJson = () => {
  $.get('data/page-1.json', 'json')
    .then(data => {
      data.forEach(obj => {
        obj.page = 'page1';
        new Horns(obj);
      })
    })
  $.get('data/page-2.json', 'json')
    .then(data => {
      data.forEach(obj => {
        obj.page = 'page2';
        new Horns(obj);
      })
    })
    .then(Horns.sort)
    .then(Horns.loadHorns)
    .then($('#page2').hide())
    .then(Horns.populateLists)
    .then(Horns.populateForms)
}

// sorts allHornsArray by title or number of horns, title on page load
Horns.sort = () => {
  if ($sort === 'sortTitle'){
    Horns.allHornsArray.sort(function (a, b) {
      let first = a.title, second = b.title;
      if (first < second)
        return -1;
      if ( first > second)
        return 1;
      return 0;
    })
  }else{
    Horns.allHornsArray.sort(function (a, b) {
      return a.horn - b.horn;
    })
  }
}

// iterates through all horn objects, sending each one to render to relevant page
Horns.loadHorns = () => {
  Horns.allHornsArray.forEach(horn => {
    if(horn.page === 'page1') {
      $('#page1').append(horn.render());
    }else{
      $('#page2').append(horn.render());
    }
  })
}

// iterate through allHornsArray of objects to make unique lists (of keywords) for each page
Horns.populateLists = () => {
  Horns.allHornsArray.forEach(horn => {
    if (horn.page === 'page1') {
      horn.makeList1();
    }else{
      horn.makeList2();
    }
  })
}

// iterate through objects in unique keyword object lists for each page to append keyword to dropdown list
Horns.populateForms = () => {
  Horns.listArray1.forEach( horn => horn.list1());
  Horns.listArray2.forEach( horn => horn.list2());
  $('select[name="page2"').hide();
}

// remove all images from page
Horns.clearPage = () => {
  Horns.allHornsArray.forEach(horn => horn.clearImage());
}

// starts it all on pageload
$(() => Horns.readJson());

//clickhandler for dropdown, clear page, empty filteredArrayList, populate filteredArrayList with item selected from dropdown, render images with matching keywords
$('select[name="page1"').on('change', function(event) {
  Horns.clearPage();
  Horns.filteredListArray = [];
  let getKey = event.target.value;
  Horns.allHornsArray.forEach( hornObj => {
    if (getKey === hornObj.keyword) {
      Horns.filteredListArray.push(hornObj);
      hornObj.render();
    }
  })
  Horns.filteredListArray.forEach(horn => {
    $('#page1').append(horn.render());
  })
})

//same as above, for page two, note: they are different lists for each page, but return images with matching keyword from both pages
$('select[name="page2"').on('change', function(event) {
  Horns.clearPage();
  Horns.filteredListArray = [];
  let getKey = event.target.value;
  Horns.allHornsArray.forEach( hornObj => {
    if (getKey === hornObj.keyword) {
      Horns.filteredListArray.push(hornObj);
      hornObj.render();
    }
  })
  Horns.filteredListArray.forEach(horn => {
    $('#page2').append(horn.render());
  })
})

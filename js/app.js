'use strict';

//make a constructor funtion
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

Horns.prototype.render = function() {
  const source = $('#photo-template').html();
  const template = Handlebars.compile(source);
  return template(this);
};

Horns.prototype.makeList1 = function () {
  if (!Horns.listArrayKeys1.includes(this.keyword)) {
    Horns.listArrayKeys1.push(this.keyword);
    Horns.listArray1.push(this);
  }
}

Horns.prototype.makeList2 = function () {
  if (!Horns.listArrayKeys2.includes(this.keyword)) {
    Horns.listArrayKeys2.push(this.keyword);
    Horns.listArray2.push(this);
  }
}

Horns.prototype.list1 = function () {
  let filterList1 = $('select[name="page1"');
  filterList1.append($('<option></option>').val(this.keyword).html(this.keyword))
};

Horns.prototype.list2 = function () {
  let filterList2 = $('select[name="page2"');
  filterList2.append($('<option></option>').val(this.keyword).html(this.keyword))
};

Horns.prototype.clearImage = function (){
  $('div').remove();
}

$('ul a').on('click', function() {
  $whereToGo = $(this).data('tab');
  $('.photo-location').hide();
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
    .then(Horns.loadHorns)
    .then($('#page2').hide())
    .then(Horns.populateLists)
    .then(Horns.populateForms)
}

Horns.loadHorns = () => {
  Horns.allHornsArray.forEach(horn => {
    if(horn.page === 'page1') {
      $('#page1').append(horn.render());
    }else{
      $('#page2').append(horn.render());
    }
  })
}

Horns.populateLists = () => {
  Horns.allHornsArray.forEach(horn => {
    if (horn.page === 'page1') {
      horn.makeList1();
    }else{
      horn.makeList2();
    }
  })
}

Horns.populateForms = () => {
  Horns.listArray1.forEach( horn => horn.list1());
  Horns.listArray2.forEach( horn => horn.list2());
  $('select[name="page2"').hide();
}

Horns.clearPage = () => {
  Horns.allHornsArray.forEach(horn => horn.clearImage());
}

$(() => Horns.readJson());


//populates the dropdownlist

//clickhandler


$('select[name="page1"').on('change', function(event) {
  //clear images
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

$('select[name="page2"').on('change', function(event) {
  //clear images
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

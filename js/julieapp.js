'use strict';

//make a constructor funtion
function Horns (obj) {
  this.url = obj.image_url;
  this.title = obj.title;
  this.description = obj.description;
  this.keyword = obj.keyword;
  this.horn = obj.horns;
}

// function Horns (rawDataObject) {
//   for (let key in rawDataObject) {
//     // console.log('key', key);
//     this[key] = rawDataObject[key];
//   }


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

Horns.prototype.clearImage = function() {
  $('div').remove();
  // Horns.allHornsArray = []
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
    // console.log('while readjson2 ' + Horns.allHornsArray);
    .then(Horns.loadHorns)
    .then(Horns.populateList)
    .then(Horns.populateForm)
}

Horns.loadHorns = () => {
  Horns.allHornsArray.forEach(horn => horn.render());
}

Horns.populateForm= () => {
  Horns.listArray.forEach(horn => horn.list());
}

Horns.populateList = () => {
  Horns.allHornsArray.forEach(horn => horn.makeList());
}

Horns.clearPage = () => {
  Horns.allHornsArray.forEach(horn => horn.clearImage());
}


//verified both loads images
//for the 'pages" effect, the clickhandler will call which page depending on which button is click
// json1 is the default though
$(() => Horns.readJson1());
// $(() => Horns.readJson2());


// Horns.clickHandler = (event) => {
//   // console.log($('input:text')); //this logs a function and I still can't drill to val
//   // console.log(this.val); //i keep getting an error this doesn't work, "this" isn't a thing
//   // let getKey = $(this).id;
//   let getKey = event;
//   console.log('getkey ' + getKey);
//   console.log(getKey === 'narwhal')

//   //right now this walks through both arrays and i need to get the value of the selection to place in the if and THEN this will work. otherwise this is just reorganizing the array by keytype
//   Horns.listArray.forEach( listObj => {
//     // console.log('listObj.keyword outside of if ' + listObj.keyword);
//     Horns.allHornsArray.forEach( hornObj => {
//       if (hornObj.keyword === listObj.keyword) {
//         // console.log('hornObj.keyword in if ' + hornObj.keyword);
//         Horns.filteredListArray.push(hornObj);

//       }
//     })
//   })
// }

// $('select').change(Horns.clickHandler);

// $('select').on('change', Horns.clickHandler(event));
//why doesn't this work if I call a function, why do I have to do an annymous function to get the event information
//did I miss how you pass in the event as the param, or how to note the param in arrow format?
$('select').on('change', function(event) {
  //clear images
  Horns.clearPage();
  //re-renders selected images
  let getKey = event.target.value;
  Horns.allHornsArray.forEach( hornObj => {
    //need to add if value is default then rerenders all
    if (getKey === hornObj.keyword) {
      hornObj.render();
    }
  })
});

$('#page1').on('click', function(event) {
  console.log('on page 1');
  Horns.clearPage();
  $(() => Horns.readJson1());
});

$('#page2').on('click', function(event) {
  console.log('on page 2');
  // Horns.clearPage();
  Horns.allHornsArray = [];
  console.log('before readjson2 ', Horns.allHornsArray);
  $(() => Horns.readJson2());
  console.log('after readjson2 ', Horns.allHornsArray);
});

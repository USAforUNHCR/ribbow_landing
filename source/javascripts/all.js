import {merge}        from 'ramda';

$(document).ready(() => {
  const app = new App();
});



function App(){

  let incentive = querystring.parse(location.search).incentive || "emojis";
  let source = querystring.parse(location.search).source || "";
  let medium = querystring.parse(location.search).medium;

  let incentiveData = {
    emojis: "Pope Emojis",
    devotionals: "Prayer Devotionals",
    recipes: "Recipes"
  };

  this.getFields = (form) => {
  
  const fieldNames = [ 'givenName', 'familyName', 'email'];
  let fieldObj = {};

  fieldNames.map((fieldName) => {
    fieldObj[fieldName] = form.find("[name=" + fieldName + "]").val();
  });

    return fieldObj;
  }

  this.sendData = (payload) => {
    const groundwork = new Groundwork ({ 'apiUrl': 'https://api.thegroundwork.com',
              'apiKey': 'pub-un.ribbow_acquisition--VQ2jFJ92HGHQc1B4D_wh_2xd7IOCsUklmecKCPh6IZVfJ7QRDH9U3ubIsxVQ7aX3Aqi8iapcW5jMMyjshxVJVQ'
            });
    groundwork.supporters.create(payload)
    .then((resp) => {
      
      window.location = "/thanks.html?incentive=" + incentive + "&email=" + payload.email;
    })
    .catch((resp) => {
      
      $('.signupForm').append('<p>Something went wrong, please try again</p>')
    });
  }

  $('.form_submit').click( (e) => {
    e.preventDefault();
    const data = {
      source: "Refugee Jesus Signup " + source,
      tags: 
          {
            send_email: 0
          }
    }
    if (medium){
      data.tags.medium = medium;
    } 
    let payload = merge(data, this.getFields($('.signupForm')));
    this.sendData(payload)
  })

  this.createCopy = (incentive) => {
    $(".form_header").html("Add your name to the list of people who want to help generate change and receive your " + incentiveData[incentive] + "!"); 
    $(".form_submit").html("Get Your " + incentiveData[incentive]);
  }

  this.createCopy(incentive);
};







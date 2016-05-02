import {merge}        from 'ramda';

$(document).ready(() => {
  const app = new App();
});



function App(){

  let incentive = querystring.parse(location.search).incentive || "emojis";
  let source = querystring.parse(location.search).source || "";

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
              'apiKey': 'pub-un-test.ribbow_acquisition--CW.CB.4thYvOcjnO3Xv8j1XXUpGUBk1izQu.tuavKptXE_P6BmcoDd8DuvqEo6eaFUVHiuO52Ds3KIGM5LmQZw'
            });
    groundwork.supporters.create(payload)
    .then((resp) => {
      console.log(resp);
      window.location = "/thanks.html?incentive=" + incentive + "&email=" + payload.email;
    })
    .catch((resp) => {
      console.log(resp);
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
    let payload = merge(data, this.getFields($('.signupForm')));
    this.sendData(payload)
  })

  this.createCopy = (incentive) => {
    $(".form_header").html("Add your name to the list of people who want to help generate change and recive your " + incentiveData[incentive] + "!"); 
    $(".form_submit").html("Get Your " + incentiveData[incentive]);
  }

  this.createCopy(incentive);
};







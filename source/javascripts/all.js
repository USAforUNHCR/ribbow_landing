import {merge}        from 'ramda';

$(document).ready(() => {
  const app = new App();
});



function App(){

  this.incentive = querystring.parse(location.search).incentive;

  this.createCopy(this.incentive);

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
              'apiKey': 'pub-un-test.jesus-was-a-refugee-test-int-MUEAS9X5941jPRczITpf0anqMFqunzzh6YAgImx0EUT18aBcBPIIVdEsx7wK4kcSibY3hpFhpv9H0_GgOUp4SA'
            });
    groundwork.supporters.create(payload)
    .then((resp) => {
      console.log(resp);
      window.location = "/thanks.html"
    })
    .catch((resp) => {
      console.log(resp);
      $('.signupForm').append('<p>Something went wrong, please try again</p>')
    });
  }

  $('.form_submit').click( (e) => {
    e.preventDefault();
    const data = {
      source: "Refugee Jesus Site Signup",
      tags: 
          {
            send_email: 0
          }
    }
    let payload = merge(data, this.getFields($('.signupForm')));
    this.sendData(payload)
  });

  this.createCopy(incentive) {
    if(incentive === undefined) {
      
    }
  }
};







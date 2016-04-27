$(document).ready(function(){
  incentives = new Incentives();
});

function Incentives() {
  let source = querystring.parse(location.search).source;
  let email = querystring.parse(location.search).email;
  let incentive = querystring.parse(location.search).incentive;

  const image_data = {
    emojis: "../images/pope_emoji.jpg",
    devotionals: "../images/church.jpeg",
    recipes: "../images/recipe_logo.jpeg"
  }

  this.groundwork = new Groundwork ({ 'apiUrl': 'https://api.thegroundwork.com',
              'apiKey': 'pub-un-test.jesus-was-a-refugee-test-int-MUEAS9X5941jPRczITpf0anqMFqunzzh6YAgImx0EUT18aBcBPIIVdEsx7wK4kcSibY3hpFhpv9H0_GgOUp4SA'
            });

  $('.incentives_container').click(event,function (event){
    event.preventDefault();
    if (event.target.tagName == 'BUTTON') {
      incentives.sendIncentive(incentive);
    }
  });

  this.sendIncentive = function(incentive){
    data = {};
    data.source = "Ribbow incentive " + (source ? source + " " : "") + incentive; 
    data.tags = {
      send_email: 0
    };
    data.tags.incentive = incentive;

    if (email) {
      data.email = email;
    }
    this.createRecord(data);
  }

  this.createRecord = function(payload) {
    this.groundwork.supporters.create(payload)
    .then((resp) => {
      console.log(resp);
    })
    .catch((resp) => {
      console.log(resp);
    });
  }

  let getHeader = function(incentive) {
    if (incentive === "emojis") {
      return "Be inspired by Pope Francis";
    }
    else if (incentive === "devotionals") {
      return "&quotBe merciful, just as your Father is merciful.&quot - Luke 6:36";
    }
    else if (incentive === "recipes") {
      return "Enjoy these recipes from around the world!";
    }
  }

  let getCopy = function(incentive) {
    if (incentive === "emojis")
      return "<p>Pope Francis is an excellent example of loving and helping those in need. Use these emojis as a reminder of his work and chance to have a little fun!</p>";
    else if(incentive === "devotionals") {
      return "<p>We all need reminders to look beyond ourselves. Enjoy these professionally designed devotionals with scripture and quotes reminding us of the importance reaching out to those in need.</p>"
    }
    else if (incentive === "recipes") {
      "<p>For centuries meals have been used as a sign of peace and a way to gather friends and family together. Recipes can be deeply personal things passed down from person to person as part of a family tradition, but they can also be used to explore different cultures through the food they consume.</p><p>Each of these recipes describes how to make dishes from countries around the world. We hope that as you enjoy these dishes you will explore other aspects of the countries culture.</p>"
    }
  }

  let makeButton = function(incentive) {
    return "<img src='" + image_data[incentive] + "'/><span>Click to Download</span>";  
  }

  this.addCopy = function(incentive) {
    if (incentive === undefined) {
      incentive = "emojis";
    }

    $('.incentive_header').html(getHeader(incentive));
    $('.incentive_copy').html(getCopy(incentive));
    $('.download_button').html(makeButton(incentive));
  };

  this.addCopy(incentive);
}
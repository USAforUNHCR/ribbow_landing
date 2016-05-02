$(document).ready(function(){
  incentives = new Incentives();
});

function Incentives() {
  let source = querystring.parse(location.search).source;
  let email = querystring.parse(location.search).email;
  let incentive = querystring.parse(location.search).incentive || "emojis";
  let medium = querystring.parse(location.search).medium;

  const incentive_data = {
    emojis: {
              image: "../images/pope_emoji.jpg",
              file: "../public/pope_emojis.zip"
            },
    devotionals: {
                    image: "../images/church.jpeg",
                    file: "../public/devotionals.pdf"
                  },
    recipes: {
                image: "../images/recipe_logo.jpeg",
                file: "../public/recipes.pdf"
             }
  }



  this.groundwork = new Groundwork ({ 'apiUrl': 'https://api.thegroundwork.com',
              'apiKey': 'pub-un.ribbow_acquisition--VQ2jFJ92HGHQc1B4D_wh_2xd7IOCsUklmecKCPh6IZVfJ7QRDH9U3ubIsxVQ7aX3Aqi8iapcW5jMMyjshxVJVQ'
            });

  $('.download_link').click(event,function (event){
    incentives.sendIncentive(incentive);
  });

  this.sendIncentive = function(incentive){
    data = {};
    data.source = "Ribbow incentive " + (source ? source + " " : "") + incentive; 
    data.tags = {
      send_email: 0
    };
    data.tags.incentive = incentive;

    if(medium){
      data.tags.medium = medium;
    }

    if (email) {
      data.email = email;
    }
    this.createRecord(data);
  }

  this.createRecord = function(payload) {
    this.groundwork.supporters.create(payload)
    .then((resp) => {
      
    })
    .catch((resp) => {
      
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
      return "<p>Pope Francis is an excellent example of someone who has been loving and helpful to those in need. Use these emojis as a reminder of his work and as a chance to have a little fun!</p>";
    else if(incentive === "devotionals") {
      return "<p>We all need reminders to look beyond ourselves. Enjoy these professionally designed devotionals with scripture and quotes reminding us of the importance reaching out to those in need.</p>"
    }
    else if (incentive === "recipes") {
      return "<p>For centuries meals have been used as a sign of peace and a way to gather friends and family together. We have collected recipes from five countries with refugee crises. We hope you enjoy these dishes as you explore cultures through the food they consume.</p>"
    }
  }

  let makeButton = function(incentive) {
    return "<img src='" + incentive_data[incentive].image + "'/><span>Click to Download</span>";  
  }

  this.addCopy = function(incentive) {

    $('.incentive_header').html(getHeader(incentive));
    $('.incentive_copy').html(getCopy(incentive));
    $('.download_button').html(makeButton(incentive));
    $('.download_link').attr("href", incentive_data[incentive].file);
  };

  this.addCopy(incentive);
}
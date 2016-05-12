$(document).ready(function(){
  var incentives = new Incentives();
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

  Incentives.groundwork = new Groundwork ({ 'apiUrl': 'https://api.thegroundwork.com',
              'apiKey': 'pub-un-test.ribbow_acquisition--CW.CB.4thYvOcjnO3Xv8j1XXUpGUBk1izQu.tuavKptXE_P6BmcoDd8DuvqEo6eaFUVHiuO52Ds3KIGM5LmQZw'
            });

  Incentives.sendIncentive = function(incentive){
    let data = {};
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

  $('.download_link').click(function (event){
    Incentives.sendIncentive(incentive);
  });

  Incentives.createRecord = function(payload) {
    Incentives.groundwork.supporters.create(payload)
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
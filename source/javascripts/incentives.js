$(document).ready(function(){
  incentives = new Incentives();
});

function Incentives() {
  let source = querystring.parse(location.search).source;
  let email = querystring.parse(location.search).email;

  this.groundwork = new Groundwork ({ 'apiUrl': 'https://api.thegroundwork.com',
              'apiKey': 'pub-un-test.jesus-was-a-refugee-test-int-MUEAS9X5941jPRczITpf0anqMFqunzzh6YAgImx0EUT18aBcBPIIVdEsx7wK4kcSibY3hpFhpv9H0_GgOUp4SA'
            });

  $('.incentives_container').click(event,function (event){
    event.preventDefault();
    if (event.target.tagName == 'BUTTON') {
      let incentive = event.target.id;
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
}
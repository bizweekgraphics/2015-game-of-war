// DATA

var items = {};

items["gold"] = [{"item":"Torch","type":"gold","price":20,"source":"http://www.gamemasterypro.com/game-of-war-fire-age-what-to-spend-your-gold-on/"},
{"item":"Equipment Bag","type":"gold","price":1000,"source":"http://www.gamemasterypro.com/game-of-war-fire-age-what-to-spend-your-gold-on/"},
{"item":"Golden Pickaxe","type":"gold","price":1000,"source":"http://www.gamemasterypro.com/game-of-war-fire-age-what-to-spend-your-gold-on/"},
{"item":"Advanced Teleport","type":"gold","price":1500,"source":"http://www.gamemasterypro.com/game-of-war-fire-age-what-to-spend-your-gold-on/"},
{"item":"Master’s Hammer","type":"gold","price":2000,"source":"http://www.gamemasterypro.com/game-of-war-fire-age-what-to-spend-your-gold-on/"},
{"item":"VIP 30 Days","type":"gold","price":4000,"source":"http://www.gamemasterypro.com/game-of-war-fire-age-what-to-spend-your-gold-on/"},
{"item":"Stack of 1,000 Sacrificial Daggers","type":"gold","price":10000,"source":"http://www.gamemasterypro.com/game-of-war-fire-age-what-to-spend-your-gold-on/"},
{"item":"Upgrade your Gold Mine to Level 21","type":"gold","price":20000,"source":"http://www.appsorium.com/game_of_war/playing_guides/how_to_make_free_gold.html"},
{"item":"Advanced Speed Up Chest","type":"gold","price":24000,"source":"http://www.gamemasterypro.com/game-of-war-fire-age-what-to-spend-your-gold-on/"},
{"item":"Upgrade your Treasury","type":"gold","price":70000,"source":"http://www.appsorium.com/game_of_war/playing_guides/how_to_make_free_gold.html"},
{"item":"Upgrade your Hall of War","type":"gold","price":200000,"source":"http://www.appsorium.com/game_of_war/playing_guides/unlocking_tier_4_troops.html"}];

items["usd"] = [{"item":"Vaccination syringe, 5 mL","type":"usd","price":0.04,"source":"http://www.unicef.org/videoaudio/PDFs/EN-ImmSumm-2013.pdf"},
{"item":"Polio vaccine dose","type":"usd","price":0.13,"source":"https://www.flickr.com/photos/gatesfoundation/5632251253/in/set-72157625923795751"},
{"item":"Book for schoolchild","type":"usd","price":0.38,"source":"http://www.aidforafrica.org/donate/"},
{"item":"Meningitis vaccine dose","type":"usd","price":0.50,"source":"https://www.flickr.com/photos/gatesfoundation/5632251253/in/set-72157625923795751"},
{"item":"Cholera vaccine dose","type":"usd","price":2.00,"source":"https://www.flickr.com/photos/gatesfoundation/5632251253/in/set-72157625923795751"},
{"item":"Flock of ducks donation","type":"usd","price":20.00,"source":"http://www.heifer.org/gift-catalog/animals-nutrition/flock-of-ducks-donation.html"},
// {"item":"Honeybees donation","type":"usd","price":30.00,"source":"http://www.heifer.org/gift-catalog/animals-nutrition/honeybees-donation.html"},
{"item":"School supplies for a student for a year","type":"usd","price":50.00,"source":"http://www.aidforafrica.org/donate/"},
{"item":"Seedlings and saplings donation","type":"usd","price":60.00,"source":"http://www.heifer.org/gift-catalog/sustainable-farming/gift-of-trees-donation.html"},
{"item":"Goat donation","type":"usd","price":120.00,"source":"http://www.heifer.org/gift-catalog/animals-nutrition/gift-of-a-goat-donation.html"},
{"item":"Set of irrigation pumps and training","type":"usd","price":150.00,"source":"http://www.heifer.org/gift-catalog/basic-needs/irrigation-pumps-donation.html"},
{"item":"Water buffalo donation","type":"usd","price":250.00,"source":"http://www.heifer.org/gift-catalog/animals-nutrition/gift-of-a-water-buffalo-donation.html"},
{"item":"Send a girl to school","type":"usd","price":275.00,"source":"http://www.heifer.org/gift-catalog/empowerment/send-a-girl-to-school-donation.html"},
{"item":"Heifer donation","type":"usd","price":500.00,"source":"http://www.heifer.org/gift-catalog/animals-nutrition/gift-of-a-heifer-donation.html"}];

// SLIDER
// http://bl.ocks.org/shancarter/5979700

var width = 500;

if(window.innerWidth < 500) {
  width = window.innerWidth - 20;
}

var x = d3.scale.log()
    .domain([0.1, 1000])
    .range([0, width])
    .clamp(true);

var dispatch = d3.dispatch("sliderChange");

var slider = d3.select("#calculator .slider")
    .style("width", width + "px");

var sliderTray = slider.append("div")
    .attr("class", "slider-tray");

var sliderHandle = slider.append("div")
    .attr("class", "slider-handle");

sliderHandle.append("div")
    .attr("class", "slider-handle-icon")

slider.call(d3.behavior.drag()
    .on("dragstart", function() {
      dispatch.sliderChange(x.invert(d3.mouse(sliderTray.node())[0]));
      d3.event.sourceEvent.preventDefault();
    })
    .on("drag", function() {
      dispatch.sliderChange(x.invert(d3.mouse(sliderTray.node())[0]));
    }));

///// MY STUFF /////

var usdToGold = d3.scale.linear()
    .domain([0,1])
    .range([0,280.0280028]);

var moneyScale = d3.scale.linear()
    .domain([])

var dollarFormat = d3.format(",.2f");
var intFormat = d3.format(",.0f");

dispatch.on("sliderChange.slider", function(value) {
  sliderHandle.style("left", x(value) + "px")

  d3.select("#calculator #gold-amount").text(intFormat(usdToGold(value)));
  d3.select("#calculator #usd-amount").text(dollarFormat(value));

  renderTable("gold", usdToGold(value));
  renderTable("usd", value);
});

function init() {
  initTable("usd");
  initTable("gold");
  dispatch.sliderChange(10);
}
init();

function initTable(type) {
  var table = d3.select("#calculator #"+type);

  var rows = table.selectAll("tr")
      .data(items[type])
    .enter().append("tr");

  rows.append("td").classed("quantity", true).text("#");
  rows.append("td").classed("operator", true).text("×");
  rows.append("td").classed("item", true).html(function(d) {
    return d.item + " <a href='" + d.source + "' target='_blank'>→</a>";
  });
  // rows.append("td").classed("price", true).text(function(d) { return d.price; });
}

function renderTable(type, value) {
  var rows = d3.select("#calculator #"+type).selectAll("tr");
  rows.select(".quantity").text(function(d) {
    return intFormat(Math.floor(value/d.price));
  });
  rows.classed("hidden", function(d) {
    return Math.floor(value/d.price) == 0;
  })
}

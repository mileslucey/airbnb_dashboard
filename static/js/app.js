var neighborhood = "Downtown";
var chart_color = "#3D2B56";
var pie_colors = ['#3D2B56','#A26769', '#D5B9B2', '#ECE2D0', '#CEBEBE', 'rgb(102, 102, 102)','rgb(76, 76, 76)','rgb(153, 153, 153)','rgb(204, 204, 204)','rgb(229, 229, 229)'];
var bg_color ="#dcd2e9";
// var neighborhood = "Downtown"
function priceSummaryData(neighborhood) {

    // @TODO: Complete the following function that builds the metadata panel
    // Use `d3.json` to fetch the metadata for a sample
    var url = `/pricesummary/${neighborhood}`;
    d3.json(url).then(function(neighborhood){
        
      // Use d3 to select the panel with id of `#sample-metadata`
      var pricesummary = d3.select("#price-summary");
  
      // Use `.html("") to clear any existing metadata
      pricesummary.html("");
        
      // Use `Object.entries` to add each key and value pair to the panel
      // Hint: Inside the loop, you will need to use d3 to append new
      // tags for each key-value in the metadata.
      Object.entries(neighborhood).forEach(function ([key, value]) {
        var row = pricesummary.append("p");
        row.text(`${key}: ${value}`);
      });
    }
  );
  }

  function bedroomsSummaryData(neighborhood) {

    // @TODO: Complete the following function that builds the metadata panel
    // Use `d3.json` to fetch the metadata for a sample
    var url_2 = `/bedroomssummary/${neighborhood}`;
    d3.json(url_2).then(function(neighborhood){
        
      // Use d3 to select the panel with id of `#sample-metadata`
      var bedroomssummary = d3.select("#bedrooms-summary");
  
      // Use `.html("") to clear any existing metadata
      bedroomssummary.html("");
        
      // Use `Object.entries` to add each key and value pair to the panel
      // Hint: Inside the loop, you will need to use d3 to append new
      // tags for each key-value in the metadata.
      Object.entries(neighborhood).forEach(function ([key, value]) {
        var row = bedroomssummary.append("p");
        row.text(`${key}: ${value}`);
      });
    }
  );
  }

  function bathroomsSummaryData(neighborhood) {

    // @TODO: Complete the following function that builds the metadata panel
    // Use `d3.json` to fetch the metadata for a sample
    var url_3 = `/bathroomssummary/${neighborhood}`;
    d3.json(url_3).then(function(neighborhood){
        
      // Use d3 to select the panel with id of `#sample-metadata`
      var bathroomssummary = d3.select("#bathrooms-summary");
  
      // Use `.html("") to clear any existing metadata
      bathroomssummary.html("");
        
      // Use `Object.entries` to add each key and value pair to the panel
      // Hint: Inside the loop, you will need to use d3 to append new
      // tags for each key-value in the metadata.
      Object.entries(neighborhood).forEach(function ([key, value]) {
        var row = bathroomssummary.append("p");
        row.text(`${key}: ${value}`);
      });
    }
  );
  }

function buildBoxplot(neighborhood) {
  //Use `d3.json` to fetch the sample data for the plots
  var url_5 = `/reviewscorelist/${neighborhood}`;
  d3.json(url_5).then(function(response) {
    // console.log(response);

    var review_scores_rating = response;
    //Build a box plot using the sample data
    // var review_scores_rating = response['review_scores_rating'];

    //  Create a trace and declare is as the data variable
    var data = [
      {
        x: review_scores_rating,
        boxpoints: 'all',
        jitter: 0.3,
        pointpos: -1.8,
        // boxpoints: false,
        name: "",
        marker:{
          color: chart_color
        },
        type: 'box'
      }
    ];

    layout = {
      title: "Distribution of Ratings",
      xaxis: {title: "Overall Rating (Scale of 0 to 100)"}
    }
    

    //  Create the box plot
    Plotly.newPlot('box', data, layout);
  });
}  



function buildHistogram(neighborhood) {

//   // @TODO: Use `d3.json` to fetch the sample data for the plots
  var url_4 = `/pricelist/${neighborhood}`;
  d3.json(url_4).then(function(data) {
    
    // @TODO: Build a Histogram using the sample data
    var prices = data;
    
    //  Create a trace and declare is as the data variable
    var trace1 = {
      x: prices,
      type: "histogram",
      marker:{
        color: chart_color
      }
    };
    var data = [trace1];

    var layout = {
      title: "Distribution of Listing Prices", 
      xaxis: {title: "Listing Prices (USD)"}, 
      yaxis: {title: "Frequency"}
    };
      
    //  Create the bubble chart
    Plotly.newPlot('histogram', data, layout);
  });
}

function buildPieChartPropertyType(neighborhood) {

  //   // @TODO: Use `d3.json` to fetch the sample data for the plots
    var url_5 = `/propertytype/${neighborhood}`;
    d3.json(url_5).then(function(proptypedata) {
      
      // @TODO: Build a Histogram using the sample data
      var property_type_keys = [];
      var property_type_values = [];
      for (var k in proptypedata) {
        property_type_keys.push(k);
        property_type_values.push(proptypedata[k])};
      // var property_type_values = proptypedata.values();
      // console.log(property_type_keys);
      // console.log(property_type_values);

      var trace2 = [{
        values: property_type_values,
        labels: property_type_keys,
        type: "pie",
        marker: {
          colors: pie_colors
        }
      }];

      var layout2 = {
        title: "Property Types"
      };
      Plotly.newPlot('pie', trace2, layout2);
    });
  }


  function buildPieChartRoomType(neighborhood) {

    //   // @TODO: Use `d3.json` to fetch the sample data for the plots
      var url_6 = `/roomtype/${neighborhood}`;
      d3.json(url_6).then(function(roomtypedata) {
        
        // @TODO: Build a Histogram using the sample data
        var room_type_keys = [];
        var room_type_values = [];
        for (var k in roomtypedata) {
          room_type_keys.push(k);
          room_type_values.push(roomtypedata[k])};
        // console.log(room_type_keys);
        // console.log(room_type_values);
  
        var trace3 = [{
          values: room_type_values,
          labels: room_type_keys,
          type: "pie",
          marker: {
            colors: pie_colors
          }
        }];
  
        var layout3 = {
          title: "Room Types"
        };
        Plotly.newPlot('pie2', trace3, layout3);
      });
    }

function buildPieChartCancellation(neighborhood) {

    //   // @TODO: Use `d3.json` to fetch the sample data for the plots
      var url_7 = `/cancellationpolicy/${neighborhood}`;
      d3.json(url_7).then(function(cancellationdata) {
        
        // @TODO: Build a Histogram using the sample data
        var cancellation_keys = [];
        var cancellation_values = [];
        for (var k in cancellationdata) {
          cancellation_keys.push(k);
          cancellation_values.push(cancellationdata[k])};
        // console.log(room_type_keys);
        // console.log(room_type_values);
  
        var trace4 = [{
          values: cancellation_values,
          labels: cancellation_keys,
          type: "pie",
          marker: {
            colors: pie_colors
          }
        }];
  
        var layout4 = {
          title: "Cancellation Policy"
        };
        Plotly.newPlot('pie3', trace4, layout4);
      });
    }  


function buildPieChartBedType(neighborhood) {

    //   // @TODO: Use `d3.json` to fetch the sample data for the plots
      var url_8 = `/bedtype/${neighborhood}`;
      d3.json(url_8).then(function(bedtypedata) {
        
        // @TODO: Build a Histogram using the sample data
        var bedtype_keys = [];
        var bedtype_values = [];
        for (var k in bedtypedata) {
          bedtype_keys.push(k);
          bedtype_values.push(bedtypedata[k])};
        // console.log(room_type_keys);
        // console.log(room_type_values);
  
        var trace5 = [{
          values: bedtype_values,
          labels: bedtype_keys,
          type: "pie",
          marker: {
            colors: pie_colors
          }
        }];
  
        var layout5 = {
          title: "Bed Types"
        };
        Plotly.newPlot('pie4', trace5, layout5);
      });
    }  

    function buildPieChartSuperhost(neighborhood) {

      //   // @TODO: Use `d3.json` to fetch the sample data for the plots
        var url_9 = `/superhost/${neighborhood}`;
        d3.json(url_9).then(function(superhostdata) {
          
          // @TODO: Build a Histogram using the sample data
          var superhost_keys = [];
          var superhost_values = [];
          var true_false_values = ["Not Superhost","Is Superhost"];
          for (var k in superhostdata) {
            superhost_keys.push(k);
            superhost_values.push(superhostdata[k])};
          // console.log(superhost_keys);
          // console.log(superhost_values);
          var trace6 = [{
            values: superhost_values,
            labels: true_false_values,
            type: "pie",
            marker: {
              colors: pie_colors
            }
          }];
    
          var layout6 = {
            title: "Superhosts"
          };
          Plotly.newPlot('pie5', trace6, layout6);
        });
      }

    function buildPieChartIDVerfified(neighborhood) {

      //   // @TODO: Use `d3.json` to fetch the sample data for the plots
        var url_10 = `/identityverified/${neighborhood}`;
        d3.json(url_10).then(function(identityverifieddata) {
          
          // @TODO: Build a Histogram using the sample data
          var identity_keys = [];
          var identity_values = [];
          var true_false_values_2 = ["Identity Not Verified","Identity Verified"];
          for (var k in identityverifieddata) {
            identity_keys.push(k);
            identity_values.push(identityverifieddata[k])};
          // console.log(superhost_keys);
          // console.log(superhost_values);
          var trace7 = [{
            values: identity_values,
            labels: true_false_values_2,
            type: "pie",
            marker: {
              colors: pie_colors
            }
          }];
    
          var layout7 = {
            title: "Host Identity Verification"
          };
          Plotly.newPlot('pie6', trace7, layout7);
        });
      }  
  
function buildListingCountHistogram(neighborhood) {
  //Use `d3.json` to fetch the sample data for the plots
  var url_11 = `/listingscount/${neighborhood}`;
  d3.json(url_11).then(function(response_2) {
    // console.log(response);

    var listingcount = response_2;
    //Build a box plot using the sample data
    // var review_scores_rating = response['review_scores_rating'];

    //  Create a trace and declare is as the data variable
    var trace4 = {
      x: listingcount,
      type: "histogram",
      marker:{
        color: chart_color
      }
    };
    var data3 = [trace4];

    var layout3 = {
      title: "Distribution of AirBnB Listings", 
      xaxis: {title: "Number of AirBnB Listings Hosts Own"}, 
      yaxis: {title: "Frequency"}
    };
    

    //  Create the box plot
    Plotly.newPlot('histogram2', data3, layout3);
  });
}

  
function buildWordCloud(neighborhood) {
  //Use `d3.json` to fetch the sample data for the plots
  var url_12 = `/reviewcontentlist/${neighborhood}`;
  d3.json(url_12).then(function(wordclouddata) {
    var wordcloudstring = "";
    wordcloudstring = wordclouddata.join(" ");
    // console.log(wordcloudstring);

    // var text = wordcloudstring;
    //Build a box plot using the sample data
    // var review_scores_rating = response['review_scores_rating'];

    //  Create a trace and declare is as the data variable
    var myConfig = {
      type: 'wordcloud',
      options: {
        text: wordcloudstring,
        minLength: 5,
        ignore: ["Seattle","there","would","which","really","host","place","house","could","didn't","definitely","accommodating","about","first","needed","bathroom","bedroom","There","around","great","apartment","kitchen","condo","house","everything","Place","Great","great","during","helpful","downtown","questions","location","located","space","within","visit","their","little","Beacon","hill","Hill","central","Central","neighborhood","Thanks","Thank","thanks","thank","Queen","queen","Anne","anne","clean","right","left","recommend","before","after","wonderful","again","hosts","amazing","beautiful","again","airport","arrived","check","other","super","stayed","Needle","excellent","Nadine","The","arrival","Capitol","Would","things","perfect","loved","described","exactly","Space","Serina","available","Everything","awesome","fantastic","welcome","enough","Center","responsive","absolutely","experience","highly","minute","anyone","studio","extremely","Lauren","because","while","staying","Leslie","Carol","Airbnb","better","being","The","Julian","every","comfortable","close","though","where","wanted","early","itself","communication","looking","instructions","distance","information","airbnb","short","light","night","lovely","Melissa","enjoyed","Kevin"],
        maxItems: 40,
        aspect: 'flow-center',
        rotate: true,
        colorType: 'palette',
        // palette: ['#D32F2F','#5D4037','#1976D2','#E53935','#6D4C41','#1E88E5','#F44336','#795548','#2196F3','#EF5350','#8D6E63','#42A5F5'],
        palette: pie_colors,
        // console.log(pie_colors);

        style: {
          fontFamily: 'Crete Round',
          
          hoverState: {
            // backgroundColor: '#D32F2F',
            backgroundColor: chart_color,
            borderRadius: 2,
            fontColor: 'white'
          },
          tooltip: {
            text: '%text: %hits',
            visible: true,
            
            alpha: 0.9,
            backgroundColor: "black",
            // backgroundColor: '#1976D2',
            borderRadius: 2,
            borderColor: 'none',
            fontColor: 'white',
            fontFamily: 'Georgia',
            textAlpha: 1
          }
        }
      },
    };
    zingchart.render({ 
      id: 'myChart', 
      data: myConfig, 
      // height: 400, 
      width: '100%' 
    });
  });
}



function init() {
  
//     // Grab a reference to the dropdown select element
var selector = d3.select("#selNeighborhood");

// Use the list of sample names to populate the select options
d3.json("/neighborhoods").then((neighborhoods) => {
  neighborhoods.forEach((neighborhood) => {
    selector
      .append("option")
      .text(neighborhood)
      .property("value", neighborhood);
  });

    // Use the first sample from the list to build the initial plots
    const firstNeighborhood = neighborhoods[0];
    // buildCharts(firstSample);
    priceSummaryData(firstNeighborhood);
    bedroomsSummaryData(firstNeighborhood);
    bathroomsSummaryData(firstNeighborhood);
    buildHistogram(firstNeighborhood);
    buildBoxplot(firstNeighborhood);
    buildPieChartPropertyType(firstNeighborhood);
    buildPieChartRoomType(firstNeighborhood);
    buildPieChartCancellation(firstNeighborhood);
    buildPieChartBedType(firstNeighborhood);
    buildPieChartSuperhost(firstNeighborhood);
    buildPieChartIDVerfified(firstNeighborhood);
    buildListingCountHistogram(firstNeighborhood);
    buildWordCloud(firstNeighborhood);
    neighborhood = firstNeighborhood;
    set_chart_color();
    setBackgroundColor();
  });
}


function optionChanged(newNeighborhood) {
    
    // Fetch new data each time a new sample is selected
    // buildCharts(newSample);
    priceSummaryData(newNeighborhood);
    bedroomsSummaryData(newNeighborhood);
    bathroomsSummaryData(newNeighborhood);
    buildHistogram(newNeighborhood);
    buildBoxplot(newNeighborhood);
    buildPieChartPropertyType(newNeighborhood);
    buildPieChartRoomType(newNeighborhood);
    buildPieChartCancellation(newNeighborhood);
    buildPieChartBedType(newNeighborhood);
    buildPieChartSuperhost(newNeighborhood);
    buildPieChartIDVerfified(newNeighborhood);
    buildListingCountHistogram(newNeighborhood);
    buildWordCloud(newNeighborhood);
    neighborhood = newNeighborhood;
    set_chart_color();
    setBackgroundColor();
  }

function set_chart_color() {
  if (neighborhood == "Downtown") {
    chart_color = "#3D2B56";
    pie_colors = ['#3D2B56','#A26769', '#D5B9B2', '#ECE2D0', '#CEBEBE', 'rgb(102, 102, 102)','rgb(76, 76, 76)','rgb(153, 153, 153)','rgb(204, 204, 204)','rgb(229, 229, 229)'];
    bg_color ="#dcd2e9";
  }
  else if (neighborhood == "Beacon Hill") {
    chart_color = "#F26419";
    pie_colors = ['#F26419','#FFB800', '#2F4858', '#86BBD8', '#33658A', 'rgb(102, 102, 102)','rgb(76, 76, 76)','rgb(153, 153, 153)','rgb(204, 204, 204)','rgb(229, 229, 229)'];
    bg_color = "#fce0d1";
  }
  else if (neighborhood == "Central Area") {
    chart_color = "#6B8F71";
    pie_colors = ['#6B8F71','#9DBF9E', '#D0D6B5', '#F9B5AC', '#EE7674', 'rgb(102, 102, 102)','rgb(76, 76, 76)','rgb(153, 153, 153)','rgb(204, 204, 204)','rgb(229, 229, 229)'];
    bg_color = "#dae4da";
  }
  else if (neighborhood == "Queen Anne") {
    chart_color = "#6F1A07";
    pie_colors = ['#6F1A07','#C32F27', '#D8572A', '#DB7C26', '#F7B538', 'rgb(102, 102, 102)','rgb(76, 76, 76)','rgb(153, 153, 153)','rgb(204, 204, 204)','rgb(229, 229, 229)'];
    bg_color = "#fac2b5";
  }
}

function setBackgroundColor() {
  document.body.style.backgroundColor = bg_color;
};


// Initialize the dashboard
init();

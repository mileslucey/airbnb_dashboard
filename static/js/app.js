// var chart_color = "blue";
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
        y: review_scores_rating,
        boxpoints: 'all',
        jitter: 0.3,
        pointpos: -1.8,
        // boxpoints: false,
        name: "",
        type: 'box'
      }
    ];

    layout = {
      title: "Distribution of Ratings",
      yaxis: {title: "Overall Rating (Scale of 0 to 100)"}
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
        // color: "lightblue"
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
        type: "pie"
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
          type: "pie"
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
          type: "pie"
        }];
  
        var layout4 = {
          title: "Cancellation Policy"
        };
        Plotly.newPlot('pie3', trace4, layout4);
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
  }

// if (neighborhood == "Downtown") {
//   chart_color = "blue";
// }
// else if (neighborhood == "Beacon Hill") {
//   chart_color = "orange";
// }
// else if (neighborhood == "Central Area") {
//   chart_color = "green";
// }
// else if (neighborhood == "Queen Anne") {
//   chart_color = "purple";
// }


// Initialize the dashboard
init();

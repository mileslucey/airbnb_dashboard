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
    console.log(response);

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
  

//     // @TODO: Build a Pie Chart
//     d3.json(url).then(function(data) {
// //        Establish the variables for the pie chart
//         var pie_values = data.sample_values.slice(0,10);
//         var pie_labels = data.otu_ids.slice(0,10);
//         var pie_hover = data.otu_labels.slice(0,10);
        
// //        Use the above values to create the data variable for the pie chart
//         var data = [{
//             values: pie_values,
//             labels: pie_labels,
//             hovertext: pie_hover,
//             type: 'pie'
//           }];
        
//         // Establish the pie chart
//       Plotly.newPlot('pie', data);
//     });
//   });   
// }


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

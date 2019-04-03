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
    var url_2 = `/bathroomssummary/${neighborhood}`;
    d3.json(url_2).then(function(neighborhood){
        
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








// function buildCharts(sample) {

//   // @TODO: Use `d3.json` to fetch the sample data for the plots
//   var url = `/samples/${sample}`;
//   d3.json(url).then(function(data) {

//     // @TODO: Build a Bubble Chart using the sample data
//     var x_values_bubble = data.otu_ids;
//     var y_values_bubble = data.sample_values;
//     var m_size = data.sample_values;
//     var m_colors = data.otu_ids; 
//     var t_values = data.otu_labels;
    
//     //    Create a trace and declare is as the data variable
//     var trace1 = {
//       x: x_values_bubble,
//       y: y_values_bubble,
//       text: t_values,
//       mode: 'markers',
//       marker: {
//         color: m_colors,
//         size: m_size
//       } 
//     };
//     var data = [trace1];
      
// //      Add an xaxis label
//     var layout = {
//       xaxis: { title: "OTU ID"},
//     };
      
// //    Create the bubble chart
//     Plotly.newPlot('bubble', data, layout);
   

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
    const firstNeighborhood = neighborhoods[1];
    // buildCharts(firstSample);
    priceSummaryData(firstNeighborhood);
    bedroomsSummaryData(firstNeighborhood);
    bathroomsSummaryData(firstNeighborhood);
  });
}


function optionChanged(newNeighborhood) {
    
    // Fetch new data each time a new sample is selected
    // buildCharts(newSample);
    priceSummaryData(newNeighborhood);
    bedroomsSummaryData(newNeighborhood);
    bathroomsSummaryData(newNeighborhood);
  }


//     // Use the first sample from the list to build the initial plots
//     const firstSample = sampleNames[0];
//     buildCharts(firstSample);
//     buildMetadata(firstSample);
//   });
// }

// Initialize the dashboard
init();

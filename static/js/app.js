// Create the neighborhood variable and set it equal to "Downtown". This variable will be changed by various functions in the code
var neighborhood = "Downtown";
// Create the chart_color variable and set it equal to the colorhex for a shade of purple. This variable is used to identify the primary color used in numerous charts. This variable will be changed by various functions in the code
var chart_color = "#3D2B56";
// Create the pie_colors variable and set it equal to a list of colorhexs and rgbs for shades of purple and grey. This list of colors is used to identify the colors used in This variable will be changed by various functions in the code
var pie_colors = ['#3D2B56','#A26769', '#D5B9B2', '#ECE2D0', '#CEBEBE', 'rgb(102, 102, 102)','rgb(76, 76, 76)','rgb(153, 153, 153)','rgb(204, 204, 204)','rgb(229, 229, 229)'];
// Create the bg_color variable and set it equal to a colorhex for a shade of purple. This variable will be changed by various functions in the code
var bg_color ="#dcd2e9";

// Define a price summary function that depends on a variable neighborhood. This function will display the keys and values from the pricesummary information that has been queried in the Python app
function priceSummaryData(neighborhood) {
    // Define the path to the pricesummary data
    var url = `/pricesummary/${neighborhood}`;
    // Use `d3.json` to fetch the price summary data and turn it into the JSON format
    d3.json(url).then(function(neighborhood){
      // Use d3 to select the panel with id of `#price-summary`
      var pricesummary = d3.select("#price-summary");
      // Use `.html("") to clear any existing metadata
      pricesummary.html("");
      // Use `Object.entries` to add each key and value pair to the panel
      Object.entries(neighborhood).forEach(function ([key, value]) {
        var row = pricesummary.append("p");
        row.text(`${key}: ${value}`);
      });
    }
  );
  }

// Define a bedrooms summary function that depends on a variable neighborhood. This function will display the keys and values from the bedroomssummary information that has been queried in the Python app
function bedroomsSummaryData(neighborhood) {
  // Define the path to the bedroomssummary data
  var url_2 = `/bedroomssummary/${neighborhood}`;
  // Use `d3.json` to fetch the bedrooms summary data and turn it into the JSON format
  d3.json(url_2).then(function(neighborhood){ 
    // Use d3 to select the panel with id of `#bedrooms-summary`
    var bedroomssummary = d3.select("#bedrooms-summary");
    // Use `.html("") to clear any existing metadata
    bedroomssummary.html("");
      // Use `Object.entries` to add each key and value pair to the panel
    Object.entries(neighborhood).forEach(function ([key, value]) {
      var row = bedroomssummary.append("p");
      row.text(`${key}: ${value}`);
    });
  }
);
}

// Define a bathrooms summary function that depends on a variable neighborhood. This function will display the keys and values from the bathroomssummary information that has been queried in the Python app
function bathroomsSummaryData(neighborhood) {
  // Define the path to the bathroomssummary data
  var url_3 = `/bathroomssummary/${neighborhood}`;
  d3.json(url_3).then(function(neighborhood){      
    // Use `d3.json` to fetch the bathrooms summary data and turn it into the JSON format
    var bathroomssummary = d3.select("#bathrooms-summary");
    // Use `.html("") to clear any existing metadata
    bathroomssummary.html("");
    // Use `Object.entries` to add each key and value pair to the panel
    Object.entries(neighborhood).forEach(function ([key, value]) {
      var row = bathroomssummary.append("p");
      row.text(`${key}: ${value}`);
    });
  }
);
}

// Define a buildBoxplot function that depends on a variable neighborhood. This function will generate a box plot out of the information from the list of review scores that has been queried in the Python app
function buildBoxplot(neighborhood) {
  // Define the path to the list of numerical review scores data
  var url_5 = `/reviewscorelist/${neighborhood}`;
  // Use `d3.json` to fetch the numerical reviews data and turn it into the JSON format
  d3.json(url_5).then(function(response) {
    // Set review_scores_rating variable equal to the list of numerical ratings
    var review_scores_rating = response;
    //Build a box plot using the sample data
    //  Create a trace and declare is as the data variable
    var data = [
      {
        // Define the x variable as the list of numerical ratings
        x: review_scores_rating,
        // Add in the individual data points next to the box plot
        boxpoints: 'all',
        jitter: 0.3,
        pointpos: -1.8,
        // Make it so there isn't a "trace0" label
        name: "",
        // Define the chart color
        marker:{
          color: chart_color
        },
        // Define the chart as a boxplot
        type: 'box'
      }
    ];
    // Add title and x label
    layout = {
      title: "Distribution of Ratings",
      xaxis: {title: "Overall Rating (Scale of 0 to 100)"}
    }
    //  Create the box plot
    Plotly.newPlot('box', data, layout);
  });
}  

// Define a buildHistogram function that depends on a variable neighborhood. This function will generate a histogram out of the information from the list of prices that has been queried in the Python app
function buildHistogram(neighborhood) {
  // Define the path to the list of listing prices
  var url_4 = `/pricelist/${neighborhood}`;
  // Use `d3.json` to fetch the numerical reviews data and turn it into the JSON format
  d3.json(url_4).then(function(data) {
    // Set prices variable equal to the list of prices
    var prices = data;
    //  Create a trace and declare is as the trace1 variable
    var trace1 = {
      // Define x values as the list of prices
      x: prices,
      // Define chart type as histogram
      type: "histogram",
      // Define the histogram chart color
      marker:{
        color: chart_color
      }
    };
    // Set the chart data equal to the trace
    var data = [trace1];
    // Add chart title, x axis, and y axis labels
    var layout = {
      title: "Distribution of Listing Prices", 
      xaxis: {title: "Listing Prices (USD)"}, 
      yaxis: {title: "Frequency"}
    };
    //  Create the bubble chart
    Plotly.newPlot('histogram', data, layout);
  });
}

// Define a buildPieChartPropertyType function that depends on a variable neighborhood. This function will generate a pie chart out of the property type information that has been queried in the Python app
function buildPieChartPropertyType(neighborhood) {
  // Define the path that contains the dictionary of property types and the counts of property types in each neighborhood
  var url_5 = `/propertytype/${neighborhood}`;
  // Use `d3.json` to fetch the property types labels and the property types counts and turn it into the JSON format (becomes like a dictionary)
  d3.json(url_5).then(function(proptypedata) {
    // Create lists for the keys and values to separate them for the chart
    var property_type_keys = [];
    var property_type_values = [];
    // Create a loop that separates the keys and values into separate lists 
    for (var k in proptypedata) {
      property_type_keys.push(k);
      property_type_values.push(proptypedata[k])};
    // Create a trace of the separated lists and define the chart type as "pie" and the chart colors 
    var trace2 = [{
      values: property_type_values,
      labels: property_type_keys,
      type: "pie",
      marker: {
        colors: pie_colors
      }
    }];
    // Add chart title
    var layout2 = {
      title: "Property Types"
    };
    // Create pie chart
    Plotly.newPlot('pie', trace2, layout2);
  });
}

// Define a buildPieChartRoomType function that depends on a variable neighborhood. This function will generate a pie chart out of the room type information that has been queried in the Python app
function buildPieChartRoomType(neighborhood) {
  // Define the path that contains the dictionary of room types and the counts of room types in each neighborhood
  var url_6 = `/roomtype/${neighborhood}`;
  // Use `d3.json` to fetch the room types labels and the room types counts and turn it into the JSON format (becomes like a dictionary)
  d3.json(url_6).then(function(roomtypedata) {
    // Create lists for the keys and values to separate them for the chart
    var room_type_keys = [];
    var room_type_values = [];
    // Create a loop that separates the keys and values into separate lists 
    for (var k in roomtypedata) {
      room_type_keys.push(k);
      room_type_values.push(roomtypedata[k])};
        // Create a trace of the separated lists and define the chart type as "pie" and the chart colors 
        var trace3 = [{
          values: room_type_values,
          labels: room_type_keys,
          type: "pie",
          marker: {
            colors: pie_colors
          }
        }];
        // Add chart title
        var layout3 = {
          title: "Room Types"
        };
        // Create pie chart
        Plotly.newPlot('pie2', trace3, layout3);
      });
  }

// Define a buildPieChartCancellation function that depends on a variable neighborhood. This function will generate a pie chart out of the cancellation information that has been queried in the Python app
function buildPieChartCancellation(neighborhood) {
  // Define the path that contains the dictionary of cancellation policies and the counts of cancellation policies in each neighborhood
  var url_7 = `/cancellationpolicy/${neighborhood}`;
  // Use `d3.json` to fetch the cancellation policy labels and the cancellation policy counts and turn it into the JSON format (becomes like a dictionary)
  d3.json(url_7).then(function(cancellationdata) {
    // Create lists for the keys and values to separate them for the chart
    var cancellation_keys = [];
    var cancellation_values = [];
    // Create a loop that separates the keys and values into separate lists 
    for (var k in cancellationdata) {
      cancellation_keys.push(k);
      cancellation_values.push(cancellationdata[k])};
    // Create a trace of the separated lists and define the chart type as "pie" and the chart colors 
    var trace4 = [{
      values: cancellation_values,
      labels: cancellation_keys,
        type: "pie",
        marker: {
          colors: pie_colors
        }
    }];
      // Add chart title
    var layout4 = {
      title: "Cancellation Policy"
    };
    // Create pie chart
    Plotly.newPlot('pie3', trace4, layout4);
  });
}  

// Define a buildPieChartBedType function that depends on a variable neighborhood. This function will generate a pie chart out of the bed type information that has been queried in the Python app
function buildPieChartBedType(neighborhood) {
  // Define the path that contains the dictionary of bed types and the counts of bed types in each neighborhood
  var url_8 = `/bedtype/${neighborhood}`;
  // Use `d3.json` to fetch the bed type labels and the bed type counts and turn it into the JSON format (becomes like a dictionary)
  d3.json(url_8).then(function(bedtypedata) {
    // Create lists for the keys and values to separate them for the chart
    var bedtype_keys = [];
    var bedtype_values = [];
    // Create a loop that separates the keys and values into separate lists 
    for (var k in bedtypedata) {
      bedtype_keys.push(k);
      bedtype_values.push(bedtypedata[k])};
    // Create a trace of the separated lists and define the chart type as "pie" and the chart colors   
    var trace5 = [{
      values: bedtype_values,
      labels: bedtype_keys,
      type: "pie",
      marker: {
        colors: pie_colors
      }
    }];
    // Add chart title
    var layout5 = {
      title: "Bed Types"
    };
    // Create pie chart
    Plotly.newPlot('pie4', trace5, layout5);
  });
}  

// Define a buildPieChartSuperhost function that depends on a variable neighborhood. This function will generate a pie chart out of the is_superhost boolean values that have been queried in the Python app
function buildPieChartSuperhost(neighborhood) {
  // Define the path that contains the dictionary of superhost boolean and the counts of the superhost booleans in each neighborhood
  var url_9 = `/superhost/${neighborhood}`;
  // Use `d3.json` to fetch the superhost boolean labels and the counts and turn it into the JSON format (becomes like a dictionary)
  d3.json(url_9).then(function(superhostdata) {
    // Create lists for the keys and values to separate them for the chart; Also create a different list manually labeling the categories as "Not Superhost" and "Is Superhost"
    var superhost_keys = [];
    var superhost_values = [];
    var true_false_values = ["Not Superhost","Is Superhost"];
    // Create a loop that separates the keys and values into separate lists 
    for (var k in superhostdata) {
      superhost_keys.push(k);
      superhost_values.push(superhostdata[k])};
    // Create a trace of the separated lists and define the chart type as "pie" and the chart colors
    var trace6 = [{
      values: superhost_values,
      labels: true_false_values,
      type: "pie",
      marker: {
        colors: pie_colors
      }
  }];
    // Add chart title
    var layout6 = {
      title: "Superhosts"
    };
    // Create pie chart
    Plotly.newPlot('pie5', trace6, layout6);
  });
}

// Define a buildPieChartIDVerfified function that depends on a variable neighborhood. This function will generate a pie chart out of the identity_verified boolean values that have been queried in the Python app
function buildPieChartIDVerfified(neighborhood) {
  // Define the path that contains the dictionary of identity_verified boolean and the counts of the identity_verified booleans in each neighborhood
  var url_10 = `/identityverified/${neighborhood}`;
  // Use `d3.json` to fetch the identity_verified boolean labels and the counts and turn it into the JSON format (becomes like a dictionary)
  d3.json(url_10).then(function(identityverifieddata) {
    // Create lists for the keys and values to separate them for the chart; Also create a different list manually labeling the categories as "Identity Not Verified" and "Identity Verified"  
    var identity_keys = [];
    var identity_values = [];
    var true_false_values_2 = ["Identity Not Verified","Identity Verified"];
      // Create a loop that separates the keys and values into separate lists 
      for (var k in identityverifieddata) {
        identity_keys.push(k);
        identity_values.push(identityverifieddata[k])};
      // Create a trace of the separated lists and define the chart type as "pie" and the chart colors
      var trace7 = [{
        values: identity_values,
        labels: true_false_values_2,
        type: "pie",
        marker: {
          colors: pie_colors
        }
      }];
      // Add chart title
      var layout7 = {
        title: "Host Identity Verification"
      };
      // Create pie chart
      Plotly.newPlot('pie6', trace7, layout7);
  });
}  
  
// Define a buildListingCountHistogram function that depends on a variable neighborhood. This function will generate a histogram out of the counts of other listings that Airbnb hosts that have been queried in the Python app
function buildListingCountHistogram(neighborhood) {
  // Define the path that contains the list of listing counts in each neighborhood
  var url_11 = `/listingscount/${neighborhood}`;
  // Use `d3.json` to fetch the list of listing_count quantities turns it into the JSON format
  d3.json(url_11).then(function(response_2) {
    // Identify the listingcount variable as the list of listing_count quantities
    var listingcount = response_2;
    // Create a trace variable with all the listing counts, identify as a histogram, and set the chart color
    var trace4 = {
      x: listingcount,
      type: "histogram",
      marker:{
        color: chart_color
      }
    };
    // Set data equal to the trace
    var data3 = [trace4];
    // Add the titles and axis titles
    var layout3 = {
      title: "Distribution of AirBnB Listings", 
      xaxis: {title: "Number of AirBnB Listings Hosts Own"}, 
      yaxis: {title: "Frequency"}
    };
    //  Create the box plot
    Plotly.newPlot('histogram2', data3, layout3);
  });
}

// Define a buildWordCloud function that depends on a variable neighborhood. This function will generate a Word Cloud out of the list of review comments for all listings in each neighborhood (queried in the Python app)
function buildWordCloud(neighborhood) {
  // Define the path that contains the list of review comments in each neighborhood
  var url_12 = `/reviewcontentlist/${neighborhood}`;
  // Use `d3.json` to fetch the list of review comments and turns it into the JSON format
  d3.json(url_12).then(function(wordclouddata) {
    var wordcloudstring = "";
    // Joins everything into one string (since that's what the Word Cloud accepts)
    wordcloudstring = wordclouddata.join(" ");
    var myConfig = {
    // Defines the chart as a Wordcloud
      type: 'wordcloud',
      options: {
        // Define the text 
        text: wordcloudstring,
        // Make it so words in the cloud have to be at least 5 characters long
        minLength: 5,
        // Ignore irrelevant words
        ignore: ["Seattle","there","would","which","really","host","place","house","could","didn't","definitely","accommodating","about","first","needed","bathroom","bedroom","There","around","great","apartment","kitchen","condo","house","everything","Place","Great","great","during","helpful","downtown","questions","location","located","space","within","visit","their","little","Beacon","hill","Hill","central","Central","neighborhood","Thanks","Thank","thanks","thank","Queen","queen","Anne","anne","clean","right","left","recommend","before","after","wonderful","again","hosts","amazing","beautiful","again","airport","arrived","check","other","super","stayed","Needle","excellent","Nadine","The","arrival","Capitol","Would","things","perfect","loved","described","exactly","Space","Serina","available","Everything","awesome","fantastic","welcome","enough","Center","responsive","absolutely","experience","highly","minute","anyone","studio","extremely","Lauren","because","while","staying","Leslie","Carol","Airbnb","better","being","The","Julian","every","comfortable","close","though","where","wanted","early","itself","communication","looking","instructions","distance","information","airbnb","short","light","night","lovely","Melissa","enjoyed","Kevin"],
        // Limit wordcloud to 40 words
        maxItems: 40,
        // Define wordcloud layout as 'flow center' format
        aspect: 'flow-center',
        // Make the wordcloud horizontal
        rotate: true,
        // Define the color type as 'palette'
        colorType: 'palette',
        // Define the palette as a list of colors
        palette: pie_colors,
        // Define font
        style: {
          fontFamily: 'Crete Round',
        //  Define hover
          hoverState: {
            backgroundColor: chart_color,
            borderRadius: 2,
            fontColor: 'white'
          },
          // Define tooltip
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
    // Put together the chart
    zingchart.render({ 
    // Define the chart's id as "myChart" (to be matched with the HTML doc)
      id: 'myChart', 
      data: myConfig,
      width: '100%' 
    });
  });
}

// Create init function
function init() {
  
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selNeighborhood");

  // Use the list of neighborhoods to populate the select options
  d3.json("/neighborhoods").then((neighborhoods) => {
    neighborhoods.forEach((neighborhood) => {
      selector
        .append("option")
        .text(neighborhood)
        .property("value", neighborhood);
    });

    // Use the first neighborhood from the list to build the initial plots
    const firstNeighborhood = neighborhoods[0];
    // Trigger all formulas so that the charts and colors all populate
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

// Create optionChanged formula that defines what happens when the selector option is changed
function optionChanged(newNeighborhood) {
    // Trigger all formulas so that the charts and colors all populate
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

// Function that triggers multiple if statements that change the color scheme of the application
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

// Function thhat sets the background color
function setBackgroundColor() {
  document.body.style.backgroundColor = bg_color;
};

// Initialize the dashboard
init();

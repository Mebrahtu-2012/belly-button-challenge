// store URL in variable
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Get the JSON data and console log it
d3.json(url).then(function(data) {
    console.log(data);
    init(data);  
});

function init(data) {
    // Use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");

    // Get the names from the dataset
    let names = data.names;

    // Append options to the dropdown menu
    names.forEach((name) => {
        dropdownMenu.append("option").text(name).property("value", name);
    });

    // Add an event listener to the dropdown to handle changes
    dropdownMenu.on("change", function () {
        // Get the selected value from the dropdown
        let selectedValue = dropdownMenu.property("value");

        // Call chart function with the selected value and the data
        chart(selectedValue, data);
    });

    chart(names[0], data);  
}


function chart(value, data) {
    // access the 'data' variable here
    let samples = data.samples;
    let filterValue = samples.filter(id => id.id === value)[0];
    console.log(filterValue);

    
    
    let trace1 = {
        x: filterValue.sample_values.slice(0, 10).reverse(),
        y: filterValue.otu_ids.map(id => `OTU ${id}`).slice(0, 10).reverse(),
        text: filterValue.otu_labels.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h"
    };

    // Data array
    let barData = [trace1];

    let layout = {
        title: "Top 10 OTUs found",
        margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 100
        }
    };

    // Render the plot to the div tag with id "bar"
    Plotly.newPlot("bar", barData, layout);

    let trace2 = {
        x: filterValue.otu_ids,
        y: filterValue.sample_values,
        mode: 'markers',
        marker: {
            color: filterValue.otu_ids,
            colorscale: 'Earth',
            opacity: [1, 0.8, 0.6, 0.4],
            size: filterValue.sample_values
        }
    };

    // Data array
    let bubbleData = [trace2];

    let bubbleLayout = {
        title: "OTU IDs vs Sample Values",
        height: 600,
        width: 1000
    };

    // Render the plot to the div tag with id "bubble"
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);

valueInt = parseInt(value)    
    let metadataInfo = d3.select("#sample-metadata");
    let metadata = data.metadata;
    let filterData = metadata.filter(id => id.id === valueInt)[0];
    console.log(filterData);
    
    // Clear existing content in metadataInfo
    metadataInfo.html("");
    
    // Append information from filterData to metadataInfo
    Object.entries(filterData).forEach(([key, value]) => {
        metadataInfo.append("p").text(`${key}: ${value}`);
    });

}

// Call the init function to set up the dropdown menu
init();

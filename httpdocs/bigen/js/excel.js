$(document).ready(function () {
    GetData();
});


//Get Excel Data
function GetData() {
    $.ajax({
        type: "POST",
        url: "excel.ashx",
        data: '{}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccess,
        failure: function(response) {
            alert(response.d);
        },
          error: function (a, b, c) {
            alert(a.responseText);
        }
    });
}

function OnSuccess(response) {
    var excel = response;
 


    //Separate Json data to send to chart
    var labels = excel.map(function(e) {
       var date = moment(e.Date).format('DD-MMM-2019');
       return date;
    });
    var percentile90 = excel.map(function(e) {
       return e.percentile90;
    });

    var percentile10 = excel.map(function (e) {
       return e.percentile10
    });

    var percentile75 = excel.map(function (e) {
       return e.percentile75;
    });

    var percentile25 = excel.map(function (e) {
       return e.percentile25;
    });

    var Min = excel.map(function (e) {
       return e.Min;
    });
   
    var Max = excel.map(function (e) {
       return e.Max;
    });

    var Average = excel.map(function(e) {
       return e.Average;
    });

    var Median = excel.map(function (e) {
       return e.Median
    });
   
    var Currentflow = excel.map(function (e) {
       return e.Currentflow;
    });

    
    //Intiallise Chartjs
    render(percentile90, percentile10, percentile75, percentile25, Min, Max, Average, Median, Currentflow, labels);

}

function render(percentile90, percentile10, percentile75, percentile25, Min, Max, Average, Median, Currentflow, labels) {
var ctx = document.getElementById("myChart").getContext("2d");

const colors = {
  lightgrey: {
    fill: '#CCCCCC',
    stroke: '#CCCCCC',
  },
  silver: {
    stroke: '#C0C0C0',
  },
  grey: {
    fill: '#999999',
    stroke: '#999999',
  },
  gray: {
    fill: '#808080',
    stroke: '#808080',
  },
  blue: {
    fill: '#0000FF',
    stroke: '#0000FF',
  },
};


const myChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: labels,
    datasets: [{
      label: "Current Flow ",
      fill: false,
      backgroundColor: colors.blue.fill,
      pointBackgroundColor: colors.blue.stroke,
      borderColor: colors.blue.stroke,
      borderCapStyle: 'butt',
      data: Currentflow,
    },{
      label: "Min",
      fill: true,
      backgroundColor: colors.lightgrey.fill,
      pointBackgroundColor: colors.lightgrey.stroke,
      borderColor: colors.lightgrey.stroke,
      borderCapStyle: 'butt',
      data: Min,
    },{
      label: "10% percentile",
      fill: true,
      backgroundColor: colors.silver.fill,
      pointBackgroundColor: colors.silver.stroke,
      borderColor: colors.silver.stroke,
      borderCapStyle: 'butt',
      data: percentile10,
    }, {
      label: "25% percentile",
      fill: true,
      backgroundColor: colors.silver.fill,
      pointBackgroundColor: colors.silver.stroke,
      borderColor: colors.silver.stroke,
      borderCapStyle: 'butt',
      data: percentile25,
    },{
      label: "Median",
      fill: true,
      backgroundColor: colors.grey.fill,
      pointBackgroundColor: colors.grey.stroke,
      borderColor: colors.grey.stroke,
      borderCapStyle: 'butt',
      data: Median,
    },{
      label: "75% percentile",
      fill: true,
      backgroundColor: colors.silver.fill,
      pointBackgroundColor: colors.silver.stroke,
      borderColor: colors.silver.stroke,
      borderCapStyle: 'butt',
      data: percentile75,
    },{
      label: "90% percentile",
      fill: true,
      backgroundColor: colors.silver.fill,
      pointBackgroundColor: colors.silver.stroke,
      borderColor: colors.silver.stroke,
      borderCapStyle: 'butt',
      data: percentile90,

    }, {
      label: "Max",
      fill: true,
      backgroundColor: colors.lightgrey.fill,
      pointBackgroundColor: colors.lightgrey.stroke,
      borderColor: colors.lightgrey.stroke,
      borderCapStyle: 'butt',
      data: Max,
    },{
      label: "Average",
      fill: true,
      backgroundColor: colors.gray.fill,
      pointBackgroundColor: colors.gray.stroke,
      borderColor: colors.gray.stroke,
      borderCapStyle: 'butt',
      data: Average,
    }]
  },
  options: {
    responsive: false,
    scales: {
      yAxes: [{
        stacked: false,
      }]
    },
    animation: {
      duration: 750,
    },
    tooltips: {
	  position: 'nearest',
	  mode: 'index',
	  intersect: false,
	},
    annotation: {
        annotations: [
          {
            type: "line",
            mode: "vertical",
            scaleID: "x-axis-0",
            value: "21-Oct-2019",
            borderColor: "red",
            label: {
              content: "21 October 2019",
              enabled: true,
              position: "top"
            }
          }
        ]
      }
  }
});
}


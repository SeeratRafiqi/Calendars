// Variables for current date and month
var today = new Date();
var currentMonth = today.getMonth();
var currentYear = today.getFullYear();

// Array of months and days
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function year_range(start, end) {
    var years = "";
    for (var year = start; year <= end; year++) {
        years += "<option value='" + year + "'>" + year + "</option>";
    }
    return years;
}

// Function to show/hide calendar
function toggleCalendar() {
    var calendar = document.getElementById("calendar");
    calendar.style.display = (calendar.style.display === "block") ? "none" : "block";
    showCalendar(currentMonth, currentYear); // it is ensuring calender is updated when shown
}

// Function to jump to selected month and year
function jump() {
    var selectedMonth = parseInt(document.getElementById("month").value);
    var selectedYear = parseInt(document.getElementById("year").value);
    showCalendar(selectedMonth, selectedYear);
}

// Function to display the calendar for a given month and year
function showCalendar(month, year) {
    var firstDay = (new Date(year, month)).getDay();
    var daysInThisMonth = new Date(year, month + 1, 0).getDate();

    var tbl = document.getElementById("calendar-body");
    tbl.innerHTML = "";

    // Display month and year
    var monthAndYear = document.createElement("div");
    monthAndYear.text = months[month] + " " + year;
    
   // Create table header row for days of the week
   var headerRow = document.createElement("tr");
   var daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
   for (var d = 0; d < 7; d++) {
       var headerCell = document.createElement("th");
       headerCell.textContent = daysOfWeek[d];
       headerRow.appendChild(headerCell);
       if(d===0){
        headerCell.classList.add("sunday");
       }
   }
   tbl.appendChild(headerRow);

    // Display calendar days
    var date = 1;
    for (var i = 0; i < 6; i++) {
        var row = document.createElement("tr");
        for (var j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                // Empty cells before the first day of the month
                cell = document.createElement( "td" );
                cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            } else if (date > daysInThisMonth) {
                // Break loop if we've gone past the number of days in the month
                 break;
            } else {
                // Create cell for each day
                cell = document.createElement("td");
                cell.textContent = date;
                //cell.className = "date-picker";

                // Highlight current day
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add("selected");
                }
                if (j === 0) {
                    cell.classList.add("sunday"); // Apply 'sunday' class to Sundays
                }
                // Add click event listener to select date
                cell.onclick = (function (date, month, year) {
                    return function () {
                        document.getElementById("selected-date").textContent ="Date pressed : "+
                            date + " " + months[month] + " " + year;
                        // toggleCalendar(); // Hide calendar after date selection
                    };
                })(date, month, year);
                

                row.appendChild(cell);
                date++;
            }
        }
        tbl.appendChild(row);
    }
}

// Populate year dropdown
document.getElementById("year").innerHTML = year_range(2020, 2030);

// Populate month dropdown
var monthOptions = "";
for (var i = 0; i < 12; i++) {
    monthOptions += "<option value='" + i + "'>" + months[i] + "</option>";
}
document.getElementById("month").innerHTML = monthOptions;

// Initialize calendar on page load
showCalendar(currentMonth, currentYear);

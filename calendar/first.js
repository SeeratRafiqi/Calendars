function year_range(start,end){
var years="";
    // Loop to build HTML string
    for (var year = start; year <= end; year++) {
        // Concatenate HTML option tags to the years string
        years += "<option value='" + year + "'>" + year + "</option>";
    }

    return years; // Return accumulated HTML string representing year options
}
/* assign today to current date */
today= new Date();
currentMonth = today.getMonth();
currentYear = today.getFullYear();
/* we select the id from html using document.getElementById*/
selectYear = document.getElementById("year");
selectMonth = document.getElementById("month");

createYear=year_range(2020,2030);
/*sets the inner HTML content of the HTML element with the ID of "year" to the value of the createYear variable.*/
document.getElementById("year").innerHTML=createYear;
var calendar=document.getElementById("calender");
var months=["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var days=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
var $dataHead = "<tr>";
for (dhead in days) {
    $dataHead += "<th data-days='" + days[dhead] + "'>" + days[dhead] + "</th>";
}
$dataHead += "</tr>";

//alert($dataHead);
document.getElementById("thead-month").innerHTML = $dataHead;


monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);
function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}

function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    console.log(selectMonth);
    showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {

    var firstDay = ( new Date( year, month ) ).getDay();

    tbl = document.getElementById("calendar-body");

    
    tbl.innerHTML = "";

    /* sets the innerHTML of the monthAndYear element to months[month]*/
    monthAndYear.innerHTML = months[month] + " " + year;
    selectYear.value = year;
    selectMonth.value = month;
     // creating all cells
     var date = 1;
     // i is representing weeks
     for ( var i = 0; i < 6; i++ ) {
         
         var row = document.createElement("tr");
         // j is for the days
         for ( var j = 0; j < 7; j++ ) {
            //if its forst week and the day is less than the first day t
            if ( i === 0 && j < firstDay ) {
                cell = document.createElement( "td" );
                cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            } else if (date > daysInMonth(month, year)) {
                break;
            } else {
                cell = document.createElement("td");
                cell.setAttribute("data-date", date);
                cell.setAttribute("data-month", month + 1);
                cell.setAttribute("data-year", year);
                cell.setAttribute("data-month_name", months[month]);
                cell.className = "date-picker";
                cell.innerHTML = "<span>" + date + "</span>";

                if ( date === today.getDate() && year === today.getFullYear() && month === today.getMonth() ) {
                    cell.className = "date-picker selected";
                }
                row.appendChild(cell);
                date++;
            }


        }

        tbl.appendChild(row);
    }

}
function daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
}
         

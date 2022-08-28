/*
  TITLE : SJF ALGORITHM
  Time complexity=O(n^2)[nested loop]
  Space Complexity=O(n)[arrays are created]
  1.add_process:
    time complexity:O(n) 
    n = row length = no. of processes
  2.delete_process:
    time complexity:O(n)
    n = row length = no. of processes
  3.reset_table
    time complexity:O(1)
  4.run_algorithm:
    time complexity=O(n)
    n = row length = no. of processes
  5.calculateAllTimes:
    time complexity : O(n^2)
    n = row length = no. of processes
  6.tableCreate:
    time complexity:O(n)
    n = row length = no. of processes
*/
//This will traverse the html file and select the query where we want to perform some action
let add_button = document.querySelector(".container>div:last-child>.add-process>.add");
let table = document.querySelector(".table>table");
let play_button = document.querySelector(".container>div:first-child>.buttons>.play");
let reset_button = document.querySelector(".container>div:first-child>.buttons>.reset");
add_button.addEventListener("click", add_process);//This will call the function add_process when we click on add button
play_button.addEventListener("click", run_algorithm);
reset_button.addEventListener("click", reset_table);
function add_process(e) {
  let arrivalTime = parseInt(document.getElementById("arrival-time").value, 10);//This will convert arrival time value to integer
  let burstTime = parseInt(document.getElementById("brust-time").value, 10);
  let tableBody = document.querySelector(".table>table>tbody");
  //From below line,conditions for arrival time and burst time will be checked
  if ( Number.isInteger(arrivalTime) && Number.isInteger(burstTime) && burstTime > 0 && arrivalTime >= 0) {
    document.querySelector(".error").style.display = "none";//If the conditions are satisfied then we will not get any error
    //This will put the values of arrivaltime and burst time into table
    tableBody.innerHTML += `<tr>
        <td></td>
        <td>${arrivalTime}</td>
        <td>${burstTime}</td>
        <td></td>
        <td></td>
        <td></td>
      </tr>`;
    document.getElementById("arrival-time").value = "";//After adding values for arrival time and burst time will allow other values to be entered 
    document.getElementById("brust-time").value = "";
  } else { document.querySelector(".error").style.display = "block";}//If The above conditions are not satisfied then this will give error
}
function reset_table(e) {location.reload();}//Reset of table can be  done by applying this condition
//SJF ALGORITHM
var processArr = [];// Array of objects
var rowLength;//length of table 
var pid;
//Below conditions are data for creating a chart
var data = {
  header: ["processId", "Completion Time"],
  rows: [],
};
function run_algorithm(e) {
  let times = ["st", "ct", "rt", "wt", "tat"];
  rowLength = table.rows.length;//Length of table
  for (let i = 1; i < rowLength; i++) {
    processArr.push({
      at: parseInt(table.rows.item(i).cells.item(1).innerHTML, 10), //From  this condition we can insert values of arrival time in table
      bt: parseInt(table.rows.item(i).cells.item(2).innerHTML, 10), //From  this condition we can insert values of Burst time in table
      pid: "P" + i,  //From  this condition we can insert each process in table
    });
  }
  const pid2 = processArr.map((obj)=>obj.pid);//mapping out the pid from processarr
  for(let i=0;i<=rowLength;i++){pid2.push[i];}
  processArr = calculateAllTimes(processArr);//calls the function calculatealltimes which will return array
  const pid1 = processArr.map((obj)=>obj.pid);
  const ct1 = processArr.map((obj)=>obj.ct);
  let avgTAT = 0,avgWT = 0, 
  st1=processArr[0].at;
  for (let i = 0; i < processArr.length; i++) {
    avgTAT += processArr[i].tat;//Calculating the average turnaround time
    avgWT += processArr[i].wt;
    //Displaying the calculated values to table
    document.querySelector(`.table>table>tbody>tr:nth-child(${i+1})>td:nth-child(1)`).innerHTML = pid2[i]; 
    document.querySelector(`.table>table>tbody>tr:nth-child(${i + 1})>td:nth-child(4)`).innerHTML = ct1[i];
    document.querySelector( `.table>table>tbody>tr:nth-child(${i + 1})>td:nth-child(6)`).innerHTML = processArr[i].tat;
    document.querySelector( `.table>table>tbody>tr:nth-child(${i + 1})>td:nth-child(5)`).innerHTML =processArr[i].wt;
  } 
  //Displaying average turnaround time and average waiting time
  document.querySelector(".container>div:first-child>.avg-tat>span").innerHTML =(avgTAT/processArr.length).toFixed(2) == "NaN"? 0: (avgTAT/processArr.length).toFixed(2);
  document.querySelector(".container>div:first-child>.avg-wt>span").innerHTML =(avgWT/processArr.length).toFixed(2) == "NaN"? 0: (avgWT/processArr.length).toFixed(2);
  processArr.sort(function (a, b) {//for sorting the process according to completion time
    var keyA = a.ct,keyB = b.ct;
    if (keyA < keyB) return -1;
    if (keyA > keyB) return 1;
    return 0;
  });
  tableCreate();
  processArr.forEach((a, index) => {data.rows[index] = [a.pid, a.ct];});//Data for graph
  for(let v = 0; v<rowLength; v++){ data.rows[v] = [[pid1,ct1]];}
  anychart.onDocumentReady(function () {
    anychart.theme(anychart.themes.lightEarth); // set a data from process array for tat chart
    var chart = anychart.line();// create the chart
    chart.line(ct1); // add data
    chart.title("process CT comparison");// set the chart title
    var xAxis = chart.xAxis();
    xAxis.title("Process id");
    var yAxis = chart.yAxis();
    yAxis.title("Completion time");
    chart.container("container");// draw
    chart.draw();
  });
}
//This function
function calculateAllTimes(arr) {
  let time = Infinity;
  //Finding the minimum arrival time
  for (let i = 0; i < arr.length; i++) {if (arr[i].at < time) {time = arr[i].at; }}
  //Renaming the empty columns of tables to undefined
  while (arr.find((el) => el.finish == undefined)) {
    let minBT = Infinity;
    let process = {};
    //Sorting of burst time
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].at <= time && arr[i].finish != true && arr[i].bt < minBT) { 
        minBT = arr[i].bt;
        process = arr[i];
      }
    }
    if (minBT === Infinity) {
      time++;
      continue;
    }
    //setting value of start time
    process.st = time;
    process.finish = true;//ending the process
    //after the process is finished calculating the ct,rt,tat and wt
    time += process.bt;
    process.ct = time;
    process.rt = process.st - process.at;
    process.tat = process.ct - process.at;
    process.wt = process.tat - process.bt;
  }
  // returning  calculated ct,rt,tat,wt to the processsarr
  return arr;
}
//Gantt Chart
var row1 = document.getElementById("row1");
var row = document.getElementById("row");
var colors = ["#58508d","#bc5090","#ff6361","#ffa600","#fc979e","#a8f796","#b0f287","#f49381","#b2ffda",];//for displaying multiple colors in gantt chart
function tableCreate() {
  var z = row1.insertCell(0);
  var w = row2.insertCell(0);
  z.id = "cell1";
  w.id = "cell2";
  document.getElementById("cell1").style.width = "80px";
  document.getElementById("cell2").style.width = "80px";
  z.innerHTML = "Start Time";
  w.innerHTML = processArr[0].st;
  //Configuration for gantt chart
  document.getElementById("cell1").style.border = "none";
  document.getElementById("cell2").style.border = "none";
  document.getElementById("cell1").style.background = "#e0e0e0";
  document.getElementById("cell2").style.background = "none";
  document.getElementById("cell1").style.textAlign = "center";
  document.getElementById("cell2").style.textAlign = "right";
  document.getElementById("cell1").style.color = "black";
  document.getElementById("cell2").style.color = "black";
  for (let i = 0; i < rowLength - 1; i++) {
    var f = i % 9;
    var x = row1.insertCell(i + 1);
    var y = row2.insertCell(i + 1);
    x.id = "c" + i;
    y.id = "cc" + i;
    x.innerHTML = processArr[i].pid;
    y.innerHTML = processArr[i].ct;
    //Configuration for gantt chart
    document.getElementById("c" + i).style.width = "150px";
    document.getElementById("cc" + i).style.width = "50px";
    document.getElementById("c" + i).style.height = "65px";
    document.getElementById("cc" + i).style.height = "65px";
    document.getElementById("am").style.margin = "170px";
    document.getElementById("am").style.padding = "190px";
    document.getElementById("c" + i).style.backgroundColor = colors[f];
    document.getElementById("cc" + i).style.backgroundColor = "none";
    document.getElementById("cc" + i).style.color = "black";
    document.getElementById("c" + i).style.textAlign = "center";
    document.getElementById("cc" + i).style.textAlign = "right";
    document.getElementById("c" + i).style.border = "none";
    document.getElementById("cc" + i).style.border = "none";
  }
}
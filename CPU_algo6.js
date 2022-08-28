/*
    TITLE: ROUND ROBIN ALGORITHM
    Time Complexity: O(n^3)
    Space Complexity: O(n)
    n = row length = no. of processes

1.add_process:
    time complexity:O(n) 
    n = row length = no. of processes

2.delete_process:
    time complexity:O(n)
    n = row length = no. of processes

3.reset_table
    time complexity:O(1)

4.run_algorithm:
    time complexity of for loop 1 : O(n)
    n = row length = no. of processes
    time complexity of for loop 2 : O(n*m)
    n = row length = no. of processes , m = 5

    overall time complexity : O(n * m)

5.calculateAllTimes:
    time complexity : O(n ^ 3)
    n = row length = no. of processes

6.tableCreate:
    time complexity:O(n)
    n = row length = no. of processes
*/

//This will traverse the html file and select the query where we want to perform some action
let add_button = document.querySelector(".container>div:last-child>.add-process>.add");
  let table = document.querySelector(".table>table");
  let play_button = document.querySelector( ".container>div:first-child>.buttons>.play");
  let reset_button = document.querySelector( ".container>div:first-child>.buttons>.reset" );

  //Setting on click listerners
  add_button.addEventListener("click", add_process); 
  table.addEventListener("click", delete_process);
  play_button.addEventListener("click", run_algorithm);
  reset_button.addEventListener("click", reset_table);
  
  //Defining add_process function which would add values 
  function add_process(e) {
    let arrivalTime = parseInt(document.getElementById("arrival-time").value, 10);//This will convert arrival time value to integer
    let burstTime = parseInt(document.getElementById("brust-time").value, 10);
    let tableBody = document.querySelector(".table>table>tbody");

    //if entered values are integer and burst time is > 0 and arrival time is >= 0
    if (Number.isInteger(arrivalTime) && Number.isInteger(burstTime) && burstTime > 0 && arrivalTime >= 0) {
      document.querySelector(".error").style.display = "none";  //dont display any error

      //add arrivalTime and burstTime value
      tableBody.innerHTML += `<tr>
          <td></td>
          <td>${arrivalTime}</td>
          <td>${burstTime}</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td class="del">DEL</td>
        </tr>`;

      //will set arrival time and burst time tab to null for other values to enter
      document.getElementById("arrival-time").value = "";
      document.getElementById("brust-time").value = "";

      // for process id
      for (let i = 0; i < table.rows.length; i++) {document.querySelector(`.table>table>tbody>tr:nth-child(${i + 1})>td:nth-child(1)`).innerHTML = "P" + (i + 1);}
    } 
    //else display error 
    else {
      document.querySelector(".error").innerHTML = "Invalid Input";
      document.querySelector(".error").style.display = "block";
    }
  }

  //This function will delete the values of particular row rather than reseting the whole table
  function delete_process(e) {
    if (!e.target.classList.contains("del")) {return;}
    let deleteButton = e.target;
    deleteButton.closest("tr").remove();
    for (let i = 0; i < table.rows.length; i++) {document.querySelector(`.table>table>tbody>tr:nth-child(${i + 1})>td:nth-child(1)`).innerHTML = "P" + (i + 1);}
  }
//This function will reset the values of whole table 
function reset_table(e) { location.reload();}
  //Array of objects
  var processArr = [];
  var g = [], tm = [], pid = [];//Dynamic Arrays
  var data = { header: ["processId", "CT"], rows: [],};         //Data for making the line chart
  
  //will call tablecreate and calculateAllTimes function and display the calculated values of tat,wt,ct,avg wt and avg tat in the table by clicking on play button
  function run_algorithm(e) {
    processArr = [];
    let times = ["st", "ct", "rt", "wt", "tat"];
    let rowLength = table.rows.length;
    let timeQ = parseInt(document.getElementById("time-q").value, 10);         //time quantum
    //Display error if time quantum is not entered or is invalid and then return 
    if (!Number.isInteger(timeQ)) {
      document.querySelector(".error").innerHTML = "Time Quantum is required";
      document.querySelector(".error").style.display = "block";
      return;}
    document.querySelector(".error").style.display = "none";         //else dont display any error
    //keep pushing all the values in process array till the last row : O(row length)
    for (let i = 1; i < rowLength; i++) {processArr.push({at: parseInt(table.rows.item(i).cells.item(1).innerHTML, 10),bt: parseInt(table.rows.item(i).cells.item(2).innerHTML, 10),rbt: parseInt(table.rows.item(i).cells.item(2).innerHTML, 10),pid: "P" + i,});}
     // calling calculateAllTimes function and intialising avg Turn Around time, avg waiting time and avg run time to 0
    processArr = calculateAllTimes(processArr, timeQ);
    let avgTAT = 0, avgWT = 0, avgRT = 0;
    //running for loop till processArr.lenght which is equal to rowLength
    for (let i = 0; i < processArr.length; i++) {
      //Add all the tat and wt 
      avgTAT += processArr[i].tat;
      avgWT += processArr[i].wt;
      //will display all the values in the table (tat, rt, wt, ct, st)
      for (let j = 0; j < 5; j++) {document.querySelector( `.table>table>tbody>tr:nth-child(${i + 1})>td:nth-child(${j + 4})`).innerHTML = processArr[i][times[j]];}
    }
    //will display the calculated values of wt and tat in the box
    document.querySelector(".container>div:first-child>.avg-tat>span").innerHTML =(avgTAT / processArr.length).toFixed(2) == "NaN"? 0: (avgTAT / processArr.length).toFixed(2);
    document.querySelector(".container>div:first-child>.avg-wt>span").innerHTML =(avgWT / processArr.length).toFixed(2) == "NaN"? 0: (avgWT / processArr.length).toFixed(2);  
    //This will sort the Process id's in the gantt chart according to their completion time
    processArr.sort(function (a, b) {
      var keyA = a.st,keyB = b.st;
      if (keyA < keyB) return -1;
      else if (keyA > keyB) return 1;
      return 0;});
    tableCreate();                //This will call table create function to generate the gantt chart
    processArr.forEach((a, index) => {data.rows[index] = [a.pid, a.ct];});          //Data for graph
    anychart.onDocumentReady(function () {
      // set a data from process array for tat chart
      anychart.theme(anychart.themes.lightEarth);
      // create the chart
      var chart = anychart.line();
      // add data
      chart.data(data);
      // set the chart title
      chart.title("process Completion time comparison");
      var xAxis=chart.xAxis();
      xAxis.title("Process id");
      var yAxis=chart.yAxis();
      yAxis.title("Completion time");
      chart.background().stroke({
        keys: [".1 red", ".5 yellow", ".9 blue"],
        angle: 45,
        thickness: 5
      });
      // draw
      chart.container("container");
      chart.draw();});
  }
  //This function will calculate the wt,tat and ct of the process and return these values to processArr
  function calculateAllTimes(arr, timeQ) {
    let time = Infinity;
    //setting value of time equal to the minimum arrival time
    for (let i = 0; i < arr.length; i++) {if (arr[i].at < time) {time = arr[i].at;}}
    while (arr.find((el) => el.finish == undefined)) {//This will make all empty row values as undefined
      let sortedArr = [...arr];
      //sorting arrival time
      sortedArr.sort((a, b) => a.at - b.at);
      let pArr = [];//Running queue
      // sorting the running queue
      for (let i = 0; i < sortedArr.length; i++) {if (sortedArr[i].at <= time && sortedArr[i].finish != true) { pArr.push(sortedArr[i]);}}
        //if running queue's length == 0 then increment the value of time and continue
      if (pArr.length == 0) {
        time++;
        continue;
      }

      for (let i = 0; i < pArr.length; i++) {
          //if starttime of the current process == undefined then start time = time and calculate running time (rt = st-at)
        if (pArr[i].st == undefined) {
          pArr[i].st = time;
          pArr[i].rt = pArr[i].st - pArr[i].at;
        }

        //again update the value of time based on minimum of duplicated burst time and time quantum 
        time = time + Math.min(timeQ, pArr[i].rbt);

        //updating burst time after process
        pArr[i].rbt = pArr[i].rbt - Math.min(timeQ, pArr[i].rbt);
        //will store the process id of running queue
        g.push(pArr[i].pid);
        tm.push(time);
        //if duplicated burst time is finally 0 then calculate the values of ct, tat, wt
        if (pArr[i].rbt == 0) {
          pArr[i].ct = time;
          pArr[i].tat = pArr[i].ct - pArr[i].at;
          pArr[i].wt = pArr[i].tat - pArr[i].bt;
          //finish that particular process
          pArr[i].finish = true;
        }

        //will give cpu to each process in circular manner
        for (let j = i + 1; j < sortedArr.length; j++) {
            if (sortedArr[j].at <= time &&sortedArr[j].finish != true &&!pArr.includes(sortedArr[j])) {
                 pArr.push(sortedArr[j]);
                }
            }
            
            //if duplicated burst time is not 0 then add procedd to the running queue
        if (pArr[i].rbt != 0) {
            pArr.push(pArr[i]);
        }
      }
    }
    return arr;
  }

  var row1 = document.getElementById("row1");
  var row = document.getElementById("row");
  var colors = [
    "#58508d",
    "#bc5090",
    "#ff6361",
    "#ffa600",
    "#fc979e",
    "#a8f796",
    "#b0f287",
    "#f49381",
    "#b2ffda",
  ];

  //For making gantt chart
  function tableCreate() {
    var z = row1.insertCell(0);
    var w = row2.insertCell(0);
    z.id = "cell1";
    w.id = "cell2";
    document.getElementById("cell1").style.width = "80px";
    document.getElementById("cell2").style.width = "180px";
    z.innerHTML = "Start Time";
    w.innerHTML = processArr[0].st;
    //Configuration for gantt chart
    document.getElementById("cell1").style.border = "none";
    document.getElementById("cell2").style.border = "none";
    document.getElementById("cell1").style.background = "#e0e0e0";
    document.getElementById("cell2").style.background = "none";
    document.getElementById("cell1").style.textAlign = "center";
    document.getElementById("cell2").style.textAlign = "right";
    document.getElementById("cell2").style.color = "black";
    document.getElementById("cell1").style.color = "black";
    for (let i = 0; i < g.length; i++) {
      var f = i % 9;
      var x = row1.insertCell(i + 1);
      var y = row2.insertCell(i + 1);
      if(g[i] == undefined){x.innerHTML = 'CPU Idle';}
      else{ x.innerHTML = g[i];}
      y.innerHTML = tm[i];
      x.id = "c" + i;
      y.id = "cc" + i;
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
/*
  TITLE : FCFS ALGORITHM
  Time complexity=O(n)[loop]
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
    time complexity : O(n)
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
  //Setting on click listerners
  add_button.addEventListener("click", add_process);
  play_button.addEventListener("click", run_algorithm);
  reset_button.addEventListener("click", reset_table);
  //Defining add_process function which would values
  function add_process(e) {
    let arrivalTime = parseInt(document.getElementById("arrival-time").value, 10);//This will convert arrival time value to integer
    let burstTime = parseInt(document.getElementById("brust-time").value, 10);
    let tableBody = document.querySelector(".table>table>tbody");
    //From below line,conditions for arrival time and burst time will be checked
    if (Number.isInteger(arrivalTime) && Number.isInteger(burstTime) && burstTime > 0 && arrivalTime >= 0) {
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
        //After adding values for arrival time and brust this will allow other values to be entered
      document.getElementById("arrival-time").value = "";
      document.getElementById("brust-time").value = "";
    } else { document.querySelector(".error").style.display = "block";}//If The above conditions are not satisfied then this will give error
  }
  function reset_table(e) {location.reload();}//Reset of table can be  done by applying this condition
  //FCFS ALGORITHM
  var processArr = [];// Array of objects
  var pid;
  //Below conditions are data for creating a chart
  var data = {
    header: ["processId", "Completion Time"],
    rows: [],
  };
  function run_algorithm(e){
    // let times = ["st", "ct", "rt", "wt", "tat"];
    var rowLength = table.rows.length;
    for (let i = 1; i < rowLength; i++) {
      processArr.push({
        at: parseInt(table.rows.item(i).cells.item(1).innerHTML, 10),//in table arrival time is at index 1 so column1 index 1 value is pushed
        bt: parseInt(table.rows.item(i).cells.item(2).innerHTML, 10),
        pid:"P"+i,//From  this condition we can insert each process in table
      });
    }
    //mapping out the pid from processarr
    const pid1 = processArr.map((obj)=>obj.pid);
    for(let i=0;i<=rowLength;i++){pid1.push[i];}
    let top=0,avgTAT = 0,avgWT = 0;
    const at2 = processArr.map((obj)=>obj.at);
    const bt2 = processArr.map((obj)=> obj.bt);
    const at1 = processArr.map((obj) => obj.at);
    rowLength = at1.length;
    bt1 = [],ct=[],tat=[],wt=[],pid2=[];
    at1.sort();//sorting of arrival time
    st1 = at1[0];
    for(let j=0;j<rowLength;j++){
      let x=at2.indexOf(at1[j]);
      bt1.push(bt2[x]);//Mapping of burst time with respect to arrival time
    }
    for(let i=0;i<rowLength;i++){
      if(i==0){//for the first process
        //if the arrival time of first process is 0 then directly add this process to ct
        if(at1[0]==0){
          top=top+bt1[0];
          ct.push(top);
        }
        //if the arrival time of first process is not 0 then add the arrival time also in the ct
        else if(at1[0]!=0){
          top=top+at1[0]+bt1[0];
          ct.push(top)
        }
      }
      //for processes after first process
      else if(i>0){
        //if the process dosen't start directly after its previous process completion then we have to add the inbetween time to ct
        if(top<at1[i]){
          top=at1[i]+bt1[i];
          ct.push(top);
        }
        //if the process can start immediately after the previous process then directly add the process to ct
        else{
          top=top+bt1[i];
          ct.push(top);
        }
      }
      //Calculating turn around time and waiting time
      x=ct[i]-at1[i];
      //tat=completiontime-arrivaltime
      tat.push(x);
      y=tat[i]-bt1[i];//wt=turnaroundtime-bursttime
      wt.push(y);
    }
    ct1= [],tat1=[],wt1=[];
    for(let j=0;j<rowLength;j++){
      //mapped ct,tat,pid,wt according to arrivaltime
      let x=at1.indexOf(at2[j]);
      ct1.push(ct[x]);
      tat1.push(tat[x]);
      wt1.push(wt[x]);
      pid2.push(pid1[x]);
    }
    for (let i = 0; i < tat.length; i++) {
      avgTAT += (tat[i]/tat.length);//Calculating the average turnaround time
      avgWT += (wt[i]/tat.length);
      //Displaying the calculated values to table
      document.querySelector(`.table>table>tbody>tr:nth-child(${i+1})>td:nth-child(1)`).innerHTML = pid1[i]; 
      document.querySelector(`.table>table>tbody>tr:nth-child(${i + 1})>td:nth-child(4)`).innerHTML = ct1[i];
      document.querySelector( `.table>table>tbody>tr:nth-child(${i + 1})>td:nth-child(6)`).innerHTML = tat1[i];
      document.querySelector( `.table>table>tbody>tr:nth-child(${i + 1})>td:nth-child(5)`).innerHTML = wt1[i];
    }
    document.querySelector(".container>div:first-child>.avg-tat>span").innerHTML =(avgTAT).toFixed(2) == "NaN"? 0: (avgTAT).toFixed(2);
    document.querySelector(".container>div:first-child>.avg-wt>span").innerHTML =(avgWT).toFixed(2) == "NaN"? 0: (avgWT).toFixed(2);
    tableCreate(pid2,ct,st1);
    //Line Chart
    for(let v = 0; v<ct.length; v++){ data.rows[v] = [[pid1,ct1]]}
    anychart.onDocumentReady(function () {
      anychart.theme(anychart.themes.lightEarth);
      var chart = anychart.line(); // create the chart
      chart.line(ct1);// add data
      chart.title("Process CT comparison");  // set the chart title
      var xAxis = chart.xAxis();
      xAxis.title("Process id");
      var yAxis = chart.yAxis();
      yAxis.title("Completion time");
      chart.container("container");// draw
      chart.draw();
    });
  }
  //Gantt Chart
  var row1 = document.getElementById("row1");
  var row = document.getElementById("row");
  var colors = ["#58508d","#bc5090","#ff6361","#ffa600","#fc979e","#a8f796","#b0f287","#f49381","#b2ffda",];//for displaying multiple colors in gantt chart
  function tableCreate(pid2,ct,st1) {
    var z = row1.insertCell(0);
    var w = row2.insertCell(0);
    z.id = "cell1";
    w.id = "cell2";
    document.getElementById("cell1").style.width = "80px";
    document.getElementById("cell2").style.width = "180px";
    z.innerHTML = "Start Time";
    w.innerHTML = st1;
    //Configuration for gantt chart
    document.getElementById("cell1").style.border = "none";
    document.getElementById("cell2").style.border = "none";
    document.getElementById("cell1").style.background = "#e0e0e0";
    document.getElementById("cell2").style.background = "none";
    document.getElementById("cell1").style.textAlign = "center";
    document.getElementById("cell2").style.textAlign = "right";
    document.getElementById("cell2").style.color = "black";
    document.getElementById("cell1").style.color = "black";
    var rowLength = table.rows.length;
    for (let i = 0; i < rowLength - 1; i++) {
      var f = i % 9;
      var x = row1.insertCell(i + 1);
      var y = row2.insertCell(i + 1);
      x.id = "c" + i;
      y.id = "cc" + i;
      x.innerHTML = pid2[i];
      y.innerHTML = ct[i];
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
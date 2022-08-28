const button = document.querySelector("#button");
const input = document.querySelector("#input");
const voicerec = document.querySelector("#voicerec");
const voicerec1 = document.querySelector("#voicerec1");

function redirect() {
  console.log("access");
  if (
    input.value === "first come first serve" ||
    input.value === "First come first serve." ||
    input.value === "fcfs" ||
    input.value === "Fcfs." ||
    input.value === "F cfs."
  ) {
    window.location = "./FCFS.html";
    input.value = "";
  }
  if (
    input.value === "round robin" ||
    input.value === "rrs" ||
    input.value === "Rrs." ||
    input.value === "Round robin." ||
    input.value === "Round Robin."
  ) {
    window.location = "./RRS.HTML";
    input.value = "";
  }
  if (
    input.value === "shortest job first" ||
    input.value === "Shortest job first." ||
    input.value === "SJF" ||
    input.value === "Sjf."
  ) {
    window.location = "./SJF.HTML";
    input.value = "";
  }
  if (
    input.value === "shortest remaining job first" ||
    input.value === "Shortest remaining job first." ||
    input.value === "Srtf." ||
    input.value === "srtf"
  ) {
    window.location = "./SRTF.HTML";
    input.value = "";
  }
  if (input.value === "contact us" || input.value === "Contact us.") {
    window.location = "./index.html#colophon";
    input.value = "";
  }
  if (input.value === "intro" || input.value === "Introduction.") {
    window.location = "./index.html#intro";
    input.value = "";
  }
  if (input.value === "about" || input.value === "About.") {
    window.location = "./index.html#why";
    input.value = "";
  }
  if (input.value === "types" || input.value === "Types.") {
    window.location = "./index.html#about";
    input.value = "";
  }
  if (input.value === "terminologies" || input.value === "Terminologies.") {
    window.location = "./index.html#terms";
    input.value = "";
  }
  if (input.value === "algorithms" || input.value === "Algorithms." || input.value === "Algo" || input.value === "algo.") {
    window.location = "./index.html#services";
    input.value = "";
  }
  if (input.value === "home" || input.value === "Home.") {
    window.location = "./index.html#top";
    input.value = "";
  }
}

function record() {
  console.log("yes");
  var recognition = new webkitSpeechRecognition();
  recognition.lang = "en-GB";
  recognition.onresult = function (event) {
    document.querySelector("#input").value = event.results[0][0].transcript;
    if (
      event.results[0][0].transcript == "first come first serve" ||
      event.results[0][0].transcript === "First come first serve." ||
      event.results[0][0].transcript === "fcfs" ||
      event.results[0][0].transcript === "Fcfs." ||
      event.results[0][0].transcript === "F cfs."
    ) {
      console.log("HII");
      window.location = "./FCFS.html";
      input.value = "";
    }
    if (
      event.results[0][0].transcript == "Round Robin." ||
      event.results[0][0].transcript === "rrs" ||
      event.results[0][0].transcript === "Rrs." ||
      event.results[0][0].transcript === "Round robin." ||
      event.results[0][0].transcript === "Round Robin."
    ) {
      console.log("HII");
      window.location = "./RRS.HTML";
      input.value = "";
    }
    if (
      event.results[0][0].transcript === "shortest job first" ||
      event.results[0][0].transcript === "Shortest job first." ||
      event.results[0][0].transcript === "SJF." ||
      event.results[0][0].transcript === "Sjf."
    ) {
      window.location = "./SJF.HTML";
      input.value = "";
    }
    if (
      event.results[0][0].transcript === "shortest remaining job first" ||
      event.results[0][0].transcript === "Shortest remaining job first." ||
      event.results[0][0].transcript === "Srtf." ||
      event.results[0][0].transcript === "srtf"
    ) {
      console.log("HII");
      window.location = "./SRTF.HTML";
      input.value = "";
    }
    if (event.results[0][0].transcript === "contact us" || event.results[0][0].transcript === "Contact us.") {
      window.location = "./index.html#colophon";
      input.value = "";
    }
    if (event.results[0][0].transcript === "intro" || event.results[0][0].transcript === "Introduction.") {
      window.location = "./index.html#intro";
      input.value = "";
    }
    if (event.results[0][0].transcript === "about" || event.results[0][0].transcript === "About.") {
      window.location = "./index.html#why";
      input.value = "";
    }
    if (event.results[0][0].transcript === "types" || event.results[0][0].transcript === "Types.") {
      window.location = "./index.html#about";
      input.value = "";
    }
    if (event.results[0][0].transcript === "terminologies" || event.results[0][0].transcript === "Terminologies.") {
      window.location = "./index.html#terms";
      input.value = "";
    }
    if (event.results[0][0].transcript === "algorithms" || event.results[0][0].transcript === "Algorithms." || event.results[0][0].transcript === "algo" ||  event.results[0][0].transcript === "Algo.") {
      window.location = "./index.html#services";
      input.value = "";
    }
    if (event.results[0][0].transcript === "home" || event.results[0][0].transcript === "Home." || event.results[0][0].transcript === "Home Page." || event.results[0][0].transcript === "Homepage.") {
      window.location = "./index.html#top";
      input.value = "";
    }
  };
  recognition.start();
}
voicerec.addEventListener("click", record);
voicerec1.addEventListener("click", record);
button.addEventListener("click", redirect);
var TotalUsuarisConnectats = 0;
var users = [];
// Hi ha una funció que retorna el número d'usuaris connectats però
// això ho vaig implementar abans de veure la funció

// Quan un client es connecta:
//    Fons de la web de color verd
//    Incrementar el número de clients al TD (Taulell Digital)

api.addEventListener("participantJoined", (obj) => {
  console.log("participantJoined:");
  console.log(obj);
  //api.executeCommand('displayName', 'MyName');
  document.body.style.backgroundColor = "green";
  TotalUsuarisConnectats++;
  document.getElementById(
    "UsuarisConnectats"
  ).innerHTML = TotalUsuarisConnectats;

  api.executeCommand("displayName", userName);
  obj.displayName = userName;

  users.push(obj);
  var txt = "";
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    var userNum = i + 1;
    txt += "<p> <strong>" + userNum + "-</strong> " + user.displayName + "</p>";
  }
  document.getElementById("users").innerHTML = txt;
});

// Quan un client es desconnecta:
//    Decrementar el número de clients al TD (Taulell Digital)
//    Si el número de clients és zero fons de color blanc

api.addEventListener("participantLeft", (obj) => {
  console.log("participantLeft:");
  console.log(obj);
  //api.executeCommand('displayName', 'MyName');
  TotalUsuarisConnectats--;
  document.getElementById(
    "UsuarisConnectats"
  ).innerHTML = TotalUsuarisConnectats;
  if (TotalUsuarisConnectats == 0) {
    document.body.style.backgroundColor = "white";
  }

  users = users.filter((el) => el.id !== obj.id);
  var txt = "";
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    txt += "<p> <strong>" + "-</strong> " + user.displayName + "</p>";
  }
  document.getElementById("users").innerHTML = txt;
});

// Botons - controls
//  Penjar - Tancar la paradeta.

document.querySelector("#bye").addEventListener("click", () => {
  document.body.style.backgroundColor = "white";
  api.executeCommand("hangup"); // Penja
});

document.querySelector("#up").addEventListener("click", () => {
  var iframe = document.getElementById("jitsiConferenceFrame0");
  //var iframe = document.getElementsByTagName("iframe")[0];
  //var elmnt = iframe.contentWindow.document.getElementsByTagName("H2")[0];
  iframe.style.display = "none";
  document.getElementById(
    "UsuarisConnectats"
  ).innerHTML = TotalUsuarisConnectats;
});

document.querySelector("#test").addEventListener("click", () => {
  api.executeCommand("displayName", "Salvador");
  //api.executeCommand('toggleAudio'); // Apaga / Activa - Micro
  //api.executeCommand('toggleShareScreen'); // Comparteix pantalla (aplicació)
  //api.executeCommand('hangup'); // Penja
  //

  //  api.executeCommand('displayName', 'Salvador');
  document.getElementById("UsuarisConnectats").innerHTML = "testing";
});

api.addEventListener("displayNameChange", () => {
  console.log("Name Changed");
  //api.executeCommand('displayName', 'MyName');
  document.body.style.backgroundColor = "green";
});

/*
displayNameChange
{
    id: string, // the id of the participant that changed his display name
    displayname: string // the new display name
}
*/

/*
api.addEventListener('videoConferenceJoined', () => {
    console.log('Local User Joined');
    //api.executeCommand('displayName', 'MyName');
    document.body.style.backgroundColor = "green";
  });
*/

//participantJoined

//participantLeft

//videoConferenceLeft

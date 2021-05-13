// Your web app's Firebase configuration
var firebaseConfig = {
	apiKey: "AIzaSyDdohbmQDGasgma9WOlh2Y5oJ3kX4bmg_8",
	authDomain: "kwitter-web-app-a0124.firebaseapp.com",
	databaseURL: "https://kwitter-web-app-a0124-default-rtdb.firebaseio.com",
	projectId: "kwitter-web-app-a0124",
	storageBucket: "kwitter-web-app-a0124.appspot.com",
	messagingSenderId: "229868928476",
	appId: "1:229868928476:web:f670cbb3b97c30fab62319"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  username = localStorage.getItem("username");
  document.getElementById("username").innerHTML = "Welcome " + username + "!";

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey = childSnapshot.key;
	Room_names = childKey;
 //Start code
	console.log("Room Name - " + Room_names);
	row = '<div class="room_name" id="' + Room_names + '" onclick="roomRedirect(this.id)">#' + Room_names + "</div><hr>";
	document.getElementById("output").innerHTML += row;
 //End code
 });});}
getData();

function addRoom() {
  room_name = document.getElementById("room_name").value;

  firebase.database().ref("/").child(room_name).update({
	purpose: "Adding Room Name"
  });

  localStorage.setItem("room_name", room_names);
  window.location = "room.html";
}

function roomRedirect(name) {
	console.log(name);
	localStorage.setItem("room_name", name);
	window.location = "room.html";
}

function logout() {
	localStorage.removeItem("username");
	localStorage.removeItem("room_name");

	window.location = "index.html";
}
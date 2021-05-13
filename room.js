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
  room_name = localStorage.getItem("room_name");

  function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") { 
    firebase_message_id = childKey; 
    message_data = childData; 
    //Start code 
      console.log(firebase_message_id);
      console.log(message_data);
      var name = message_data["name"];
      message = message_data["message"];
      likes = message_data["likes"];
      name_tag = "<h4>" + name + "</h4>";
      message_tag = "<h4>" + message + "</h4>";
      like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + likes + " onclick='updateLike(this.id)'>";
      span_tag = "<span class='glyphicon glyphicon-thumbs-up'>Likes: " + likes + "<span></button><hr>";
      
      row = name_tag + message_tag + like_button + span_tag;
      document.getElementById("output").innerHTML += row;
    //End code 
  } }); }); } 
  getData();

function send() {
    msg = document.getElementById("message").value;

    firebase.database().ref(room_name).push({
        name: username,
        message: msg,
        likes: 0
    });

    document.getElementById("message").value = "";
}

room_name = localStorage.getItem("room_name");

  


function updateLike(message_id) {
  console.log("clicked on like button");
  button_id = message_id;
  likes = document.getElementById(button_id).value;
  updated_likes = Number(likes) + 1;

  firebase.database().ref(room_name).child(message_id).update({
    likes: updated_likes
  });
}

function logout() {
	localStorage.removeItem("username");
	localStorage.removeItem("room_name");

	window.location = "index.html";
}
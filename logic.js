var firebaseConfig = {
    apiKey: "AIzaSyC9vb5yCxOtJivcVDfkxpqZMuXqsagK2O8",
    authDomain: "train-scheduler-52f42.firebaseapp.com",
    databaseURL: "https://train-scheduler-52f42.firebaseio.com",
    projectId: "train-scheduler-52f42",
    storageBucket: "",
    messagingSenderId: "662397210375",
    appId: "1:662397210375:web:e0c18679390e96bb"
  };

  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

  database.ref('/').on("value", function(snapshot){

  })

  $(".btn").on("click", function() {
    event.preventDefault();
    var train = {
        name: $("#name-input").val().trim(),
        destination: $("#destination-input").val().trim(),
        firstTrain: $("#first-train-input").val().trim(),
        frequency: $("#frequency-input").val().trim(),
    }

    database.ref().push({
        test: train
    })

    $("#name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");  
})


  database.ref().on("child_added", function(childSnapshot) {

    var firstTrain = moment(childSnapshot.val().test.firstTrain, "HH:mm")
    console.log(firstTrain)
    var trainTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years")
    console.log(trainTimeConverted)
    var currentTime = moment()
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));
    var diffTime = moment().diff(moment(trainTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
    var tFrequency = childSnapshot.val().test.frequency
    console.log(tFrequency)
    var remainder = diffTime % tFrequency; 
    console.log(remainder);
    var minutesAway = tFrequency - remainder;
    console.log("MINUTES TILL TRAIN: " + minutesAway);
    var nextArrival = moment().add(minutesAway, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextArrival).format("HH:mm"));

    var newRow = $(".trains").append("<tr>");
    $(newRow).append("<td class=newName>" + childSnapshot.val().test.name);
    $(newRow).append("<td class=newDestination>" + childSnapshot.val().test.destination);
    $(newRow).append("<td class=newFirstTrain>" + childSnapshot.val().test.firstTrain);
    $(newRow).append("<td class=newFrequency>" + childSnapshot.val().test.frequency);
    $(newRow).append("<td class=newNextArrival>" + moment(nextArrival).format("HH:mm"));
    $(newRow).append("<td class=newMinutesAway>" + minutesAway);
    $(".trains").append(newRow);
  });
firebase.auth().onAuthStateChanged((user) => {
    if (user !== null) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;

var queryString = decodeURIComponent(window.location.search);
queryString = queryString.substring(1);

firebase.firestore().collection("groups")
    .get()
    .then((querySnapshot) => {
        var content = "";
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            var Id = doc.data().GroupId;
           var Name = doc.data().GroupName;
           var date = doc.data().DateJoined;
          
           if(Id == queryString){
            document.getElementById("name").innerHTML = Name;
            document.getElementById("date").innerHTML = date;
    
           }
        
           
        });  
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
 
    } else {
    // User is signed out
    // ...
    window.location.href="login.html";
    
  }
 });

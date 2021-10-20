firebase.auth().onAuthStateChanged((user) => {
    if (user !== null) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
      
      var queryString = decodeURIComponent(window.location.search);
      queryString = queryString.substring(1);
      
      firebase.firestore().collection("savingtransactions")
          .get()
          .then((querySnapshot) => {
              var content = "";
              querySnapshot.forEach((doc) => {
                  // doc.data() is never undefined for query doc snapshots
                  console.log(doc.id, " => ", doc.data());
                 var Id = doc.data().TransactionId;
                 var member = doc.data().Member;
                 var group = doc.data().Group;
                 var product = doc.data().Product;
                 var reference = doc.data().Reference;
                 var notes = doc.data().Notes;
                 var type = doc.data().Type;
                 var mode = doc.data().Mode;
                 var date = doc.data().Date;
                 if(Id == queryString){
                  document.getElementById("member").innerHTML = member;
                  document.getElementById("group").innerHTML = group;
                  document.getElementById("product").innerHTML = product;
                  document.getElementById("reference").innerHTML = reference;
                  document.getElementById("notes").innerHTML = notes;
                  document.getElementById("type").innerHTML = type;
                  document.getElementById("mode").innerHTML = mode;
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

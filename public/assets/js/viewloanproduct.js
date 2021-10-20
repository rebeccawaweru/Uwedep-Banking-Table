firebase.auth().onAuthStateChanged((user) => {
    if (user !== null) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
      
 var queryString = decodeURIComponent(window.location.search);
queryString = queryString.substring(1);

firebase.firestore().collection("loanproducts")
    .get()
    .then((querySnapshot) => {
        var content = "";
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            var Id = doc.data().LoanProductId;
           var Name = doc.data().ProductName;
          
           if(Id == queryString){
            document.getElementById("name").innerHTML = Name;
    
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


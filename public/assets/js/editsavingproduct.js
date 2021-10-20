firebase.auth().onAuthStateChanged((user) => {
    if (user !== null) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;


      var queryString = decodeURIComponent(window.location.search);
queryString = queryString.substring(1);

firebase.firestore().collection("savingproducts")
    .get()
    .then((querySnapshot) => {
        var content = "";
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            var Id = doc.data().SavingProductId;
            if(Id == queryString){
                document.getElementById("name").value = doc.data().ProductName;
            }
   });
 
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

 document.getElementById("update").onclick = function(){
    var name1 = document.getElementById("name").value ;


    
    var GroupRef = firebase.firestore().collection('savingproducts').doc(queryString);
    return GroupRef.update({
    ProductName: name1,
    
    })
   .then(() => {
       console.log("Document successfully written!");
   //    window.setTimeout(()=>{location.reload()},3000) ;
   window.location.href = "tickets.html";

   })
   .catch((error) => {
       console.error("Error writing document: ", error);
   });
 }

 document.getElementById("cancel").onclick = function(){
    window.location.href = "tickets.html";
 }

 document.getElementById("delete").onclick=function(){
    firebase.firestore().collection("savingproducts").doc(queryString).delete().then(() => {
      console.log("Document successfully deleted!");
      window.location.href="tickets.html";


      
  }).catch((error) => {
      console.error("Error removing document: ", error);
  });

}
 
    } else {
    // User is signed out
    // ...
    window.location.href="login.html";
    
  }
 });

 
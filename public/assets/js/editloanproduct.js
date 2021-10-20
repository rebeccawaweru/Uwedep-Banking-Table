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


    
    var GroupRef = firebase.firestore().collection('loanproducts').doc(queryString);
    return GroupRef.update({
    ProductName: name1,
    
    
    })
   .then(() => {
       console.log("Document successfully written!");
   //    window.setTimeout(()=>{location.reload()},3000) ;
   window.location.href = "tabs.html";

   })
   .catch((error) => {
       console.error("Error writing document: ", error);
   });
 }

 document.getElementById("cancel").onclick = function(){
    window.location.href = "tabs.html";
 }

 document.getElementById("delete").onclick=function(){
    firebase.firestore().collection("loanproducts").doc(queryString).delete().then(() => {
      console.log("Document successfully deleted!");
      window.location.href="tabs.html";


      
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

 
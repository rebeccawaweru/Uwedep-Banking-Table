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
            if(Id == queryString){
                document.getElementById("name").value = doc.data().GroupName;
                document.getElementById("date").value = doc.data().DateJoined;
            }
   });
 
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

 document.getElementById("update").onclick = function(){
    var name1 = document.getElementById("name").value ;
    var date1 = document.getElementById("date").value;

    
    var GroupRef = firebase.firestore().collection('groups').doc(queryString);
    return GroupRef.update({
    GroupName: name1,
    DateJoined: date1,
    
    })
   .then(() => {
       console.log("Document successfully written!");
   //    window.setTimeout(()=>{location.reload()},3000) ;
   window.location.href = "tables-datatables.html";

   })
   .catch((error) => {
       console.error("Error writing document: ", error);
   });
 }

 document.getElementById("cancel").onclick = function(){
    window.location.href = "tables-datatables.html";
 }

 document.getElementById("delete").onclick=function(){
    firebase.firestore().collection("groups").doc(queryString).delete().then(() => {
      console.log("Document successfully deleted!");
      window.location.href="tables-datatables.html";


      
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

 
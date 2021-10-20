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
            if(Id == queryString){
                document.getElementById("member").value = doc.data().Member;
                document.getElementById("group").value = doc.data().Group;
                document.getElementById("product").value= doc.data().Product;
                document.getElementById("reference").value= doc.data().Reference;
                document.getElementById("notes").value = doc.data().Notes;
                document.getElementById("type").value = doc.data().Type;
                document.getElementById("mode").value = doc.data().Mode;
                document.getElementById("date").value = doc.data().Date;
            }
     
   });
 
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

 document.getElementById("Update").onclick = function(){
    var member = document.getElementById("member").value ;
    var group = document.getElementById("group").value ;
    var product = document.getElementById("product").value ;
    var reference = document.getElementById("reference").value;
    var notes = document.getElementById("notes").value ;
    var type = document.getElementById("type").value;
    var mode = document.getElementById("mode").value;
    var date = document.getElementById("date").value;

    
    var TransactionRef = firebase.firestore().collection('savingtransactions').doc(queryString);
    return TransactionRef.update({
        Member : member,
        Group:group,
        Product : product,
        Reference : reference,
        Notes : notes,
        Type: type,
       Mode: mode,
       Date:date,
    
    })
   .then(() => {
       console.log("Document successfully written!");
   //    window.setTimeout(()=>{location.reload()},3000) ;
   window.location.href="savingtransaction.html";

   })
   .catch((error) => {
       console.error("Error writing document: ", error);
   });
 }

 document.getElementById("cancel").onclick = function(){
    window.location.href="savingtransaction.html";
 }

 document.getElementById("delete").onclick=function(){
    firebase.firestore().collection("savingtransactions").doc(queryString).delete().then(() => {
      console.log("Document successfully deleted!");
      window.location.href="savingtransaction.html";


      
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

 
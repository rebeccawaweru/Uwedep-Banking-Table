firebase.auth().onAuthStateChanged((user) => {
    if (user !== null) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;


 var queryString = decodeURIComponent(window.location.search);
queryString = queryString.substring(1);

firebase.firestore().collection("loans")
    .get()
    .then((querySnapshot) => {
        var content = "";
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            var Id = doc.data().LoanId;
            if(Id == queryString){
                document.getElementById("member").value = doc.data().TheMember;
                document.getElementById("product").value = doc.data().Product;
                document.getElementById("interest").value = doc.data().InterestValue;
                document.getElementById("principal").value = doc.data().ThePrincipal;
                document.getElementById("duration").value = doc.data().Duration;
                document.getElementById("unit").value = doc.data().Unit;
                document.getElementById("status").value = doc.data().Loanstatus;
                document.getElementById("releasedate").value = doc.data().Releasedate;
                document.getElementById("maturitydate").value = doc.data().Maturitydate;
                document.getElementById("amount").value = doc.data().Amount;
            }
           
     
   });
 
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

 document.getElementById("Update").onclick = function(){
    var Member = document.getElementById("member").value ;
    var Product1 = document.getElementById("product").value ;
    var Interest = document.getElementById("interest").value ;
    var Principal = document.getElementById("principal").value;
    var duration = document.getElementById("duration").value ;
    var unit = document.getElementById("unit"). value ;
    var loanstatus = document.getElementById("status"). value;
    var releasedate = document.getElementById("releasedate"). value;
    var maturitydate = document.getElementById("maturitydate").value;
    var amount = document.getElementById("amount").value;
    
    var LoanRef = firebase.firestore().collection('loans').doc(queryString);
    return LoanRef.update({
        TheMember : Member,
        Product : Product1,
        InterestValue : Interest,
        ThePrincipal : Principal,
        Duration : duration,
        Unit: unit,
        Loanstatus: loanstatus,
        Releasedate:releasedate,
       Maturitydate:maturitydate,
       Amount:amount,
    
    })
   .then(() => {
       console.log("Document successfully written!");
   //    window.setTimeout(()=>{location.reload()},3000) ;
  window.location.href="typography.html";

   })
   .catch((error) => {
       console.error("Error writing document: ", error);
   });
 }

 document.getElementById("cancel").onclick = function(){
   window.location.href="typography.html";
 }

 document.getElementById("delete").onclick=function(){
    firebase.firestore().collection("loans").doc(queryString).delete().then(() => {
      console.log("Document successfully deleted!");
      window.location.href="typography.html";


      
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

 
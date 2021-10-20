firebase.auth().onAuthStateChanged((user) => {
   if (user !== null) {
     // User is signed in, see docs for a list of available properties
     // https://firebase.google.com/docs/reference/js/firebase.User
     var uid = user.uid;

     document.getElementById("create").onclick = function(){
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
       var LoanRef = firebase.firestore().collection('loans').doc();
       
       if(Member == ""){
           window.alert("please insert member");
       }else if(Product1 == ""){
          window.alert("please insert loan product");
       }else if(Interest == ""){
          window.alert("please insert interest");
       }else if(Principal == ""){
          window.alert("please insert principal");
       }else if ( duration == ""){
          window.alert("please insert duration");
       }else if (unit == ""){
          window.alert("please insert unit");
       }else if (loanstatus == ""){
          window.alert("please select loan status");
       }else if (releasedate == ""){
          window.alert("please insert release date");
       }else if(maturitydate == ""){
          window.alert("please insert maturity date");
       }else{
          LoanRef.set({
          LoanId: LoanRef.id,
          TheMember : Member,
          Product : Product1,
          InterestValue : Interest,
          ThePrincipal : Principal,
          Duration : duration,
          Unit: unit,
          Loanstatus: loanstatus,
          Releasedate:releasedate,
         Maturitydate:maturitydate,
         Amount : amount,
          })
          .then(() => {
          console.log("Document successfully written!");
          window.location.href="typography.html";
          })
          .catch((error) => {
          console.error("Error writing document: ", error);
          window.location.reload();
          });
      }
    
     
    }
    document.getElementById("cancel").onclick=function(){
      window.location.href="typography.html";
  }

   } else {
   // User is signed out
   // ...
   window.location.href="login.html";
   
 }
});


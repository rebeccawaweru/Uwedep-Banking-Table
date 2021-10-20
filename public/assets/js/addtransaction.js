firebase.auth().onAuthStateChanged((user) => {
   if (user !== null) {
     // User is signed in, see docs for a list of available properties
     // https://firebase.google.com/docs/reference/js/firebase.User
     var uid = user.uid;

     document.getElementById("add").onclick = function(){
      var member = document.getElementById("member").value ;
      var group = document.getElementById("group").value ;
      var product = document.getElementById("product").value ;
      var reference = document.getElementById("reference").value;
      var notes = document.getElementById("notes").value ;
      var type = document.getElementById("type").value;
      var mode = document.getElementById("mode").value;
      var date = document.getElementById("date").value;
       var AddSavingRef = firebase.firestore().collection('savingtransactions').doc();
       if(member == ""){
           window.alert("please insert member");
       }else if(group == ""){
          window.alert("please insert group");
       }else if(product == ""){
          window.alert("please insert product ");
       }else if(reference == ""){
          window.alert("please insert reference");
       }else if (notes  == ""){
          window.alert("please insert notes ");
       }else if (type == ""){
          window.alert("please insert transaction type");
       }else if (mode == ""){
          window.alert("please select mode");
       }else if (date == ""){
          window.alert("please insert date");
       }else{
          AddSavingRef.set({
         TransactionId: AddSavingRef.id,
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
          window.location.href="savingtransactions.html";
          })
          .catch((error) => {
          console.error("Error writing document: ", error);
          window.location.reload();
          });
      }
    
       document.getElementById("cancel").onclick=function(){
           window.location.href="savingtransaction.html";
       }
    }

   } else {
   // User is signed out
   // ...
   window.location.href="login.html";
   
 }
});

firebase.auth().onAuthStateChanged((user) => {
    if (user !== null) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;

      document.getElementById("add").onclick = function(){
        var Name = document.getElementById("product").value ;
    
        var AddProductRef = firebase.firestore().collection('savingproducts').doc();
    
         if(Name == ""){
             window.alert("please insert  name");
         }else{
            AddProductRef.set({
           SavingProductId : AddProductRef.id,
            ProductName : Name,
            })
            .then(() => {
            console.log("Document successfully written!");
            window.location.href="tickets.html";
            })
            .catch((error) => {
            console.error("Error writing document: ", error);
            window.location.reload();
            });
        }
      
      
      }
      document.getElementById("cancel").onclick=function(){
        window.location.href="tickets.html";
    }
 
    } else {
    // User is signed out
    // ...
    window.location.href="login.html";
    
  }
 });

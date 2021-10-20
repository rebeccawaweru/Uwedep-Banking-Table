firebase.auth().onAuthStateChanged((user) => {
    if (user !== null) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;

      document.getElementById("add").onclick = function(){
        var Name = document.getElementById("product").value ;
        var interest = document.getElementById("interest").value ;
        var AddProductRef = firebase.firestore().collection('loanproducts').doc();
    
         if(Name == ""){
             window.alert("please insert name");
         }else{
            AddProductRef.set({
           LoanProductId : AddProductRef.id,
            ProductName : Name,
            Interest:interest,
            })
            .then(() => {
            console.log("Document successfully written!");
            window.location.href="tabs.html";
            })
            .catch((error) => {
            console.error("Error writing document: ", error);
            window.location.reload();
            });
        }
      
      
      }
      document.getElementById("cancel").onclick=function(){
        window.location.href="tabs.html";
    }
 
    } else {
    // User is signed out
    // ...
    window.location.href="login.html";
    
  }
 });

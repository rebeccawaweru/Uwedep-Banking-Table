firebase.auth().onAuthStateChanged((user) => {
    if (user !== null) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;

    document.getElementById("add").onclick = function(){
    var Name = document.getElementById("groupname").value ;
    var date = document.getElementById("date").value ;
    var AddGroupRef = firebase.firestore().collection('groups').doc();

     if(Name == ""){
         window.alert("please insert  name");
     }else if(date == ""){
        window.alert("please insert date");
     }else{
        AddGroupRef.set({
        GroupId : AddGroupRef.id,
        GroupName : Name,
        DateJoined : date,
        })
        .then(() => {
        console.log("Document successfully written!");
        })
        .catch((error) => {
        console.error("Error writing document: ", error);
        window.location.reload();
        });
    }
  
     document.getElementById("cancel").onclick=function(){
         window.location.href="index.html";
     }
  }


} else {
    // User is signed out
    // ...
    window.location.href="login.html";
    
  }
});

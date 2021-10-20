firebase.auth().onAuthStateChanged((user) => {
    if (user !== null) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;

      var queryString = decodeURIComponent(window.location.search);
queryString = queryString.substring(1);

firebase.firestore().collection("members")
    .get()
    .then((querySnapshot) => {
        var content = "";
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            var Id = doc.data().MemberId;
            if(Id == queryString){
                document.getElementById("firstname").value = doc.data().TheFirstName;
                document.getElementById("lastname").value = doc.data().LastName;
                document.getElementById("email").value = doc.data().EmailValue;
                document.getElementById("phone").value = doc.data().ThePhoneNumber;
                document.getElementById("name1").value = doc.data().KinName;
                document.getElementById("kin").value = doc.data().KinNumber;
                document.getElementById("group").value = doc.data().MemberGroup;
                document.getElementById("address").value = doc.data().MemberAddress;
            }
     
   });
 
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

 document.getElementById("update").onclick = function(){
    var fName = document.getElementById("firstname").value ;
    var lName = document.getElementById("lastname").value;
    var email1 = document.getElementById("email").value;
    var phone1 = document.getElementById("phone").value;
    var kin = document.getElementById("name1").value;
    var kin1 = document.getElementById("kin").value;
    var group1 = document.getElementById("group").value;
    var address1 = document.getElementById("address").value;

    
    var MemberRef = firebase.firestore().collection('members').doc(queryString);
    return MemberRef.update({
    TheFirstName: fName,
    LastName: lName,
    EmailValue: email1,
    ThePhoneNumber: phone1,
    KinName: kin,
    KinNumber : kin1,
    MemberGroup: group1,
    MemberAddress: address1,
    
    })
   .then(() => {
       console.log("Document successfully written!");
   //    window.setTimeout(()=>{location.reload()},3000) ;
   window.location.href = "tables-basic.html";

   })
   .catch((error) => {
       console.error("Error writing document: ", error);
   });
 }

 document.getElementById("cancel").onclick = function(){
    window.location.href = "tables-basic.html";
 }

 document.getElementById("delete").onclick=function(){
    firebase.firestore().collection("members").doc(queryString).delete().then(() => {
      console.log("Document successfully deleted!");
      window.location.href="tables-basic.html";


      
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

 
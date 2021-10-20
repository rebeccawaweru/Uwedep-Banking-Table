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
                 var fName = doc.data().TheFirstName;
                 var lName = doc.data().LastName;
                 var email = doc.data().EmailValue;
                 var phone = doc.data().ThePhoneNumber;
                 var kin = doc.data().KinName;
                 var kin1 = doc.data().KinNumber;
                 var group = doc.data().MemberGroup;
                 var address = doc.data().MemberAddress;
                 if(Id == queryString){
                  document.getElementById("firstName").innerHTML = fName;
                  document.getElementById("lastName").innerHTML = lName;
                  document.getElementById("email").innerHTML = email;
                  document.getElementById("phone").innerHTML = phone;
                  document.getElementById("kin").innerHTML = kin;
                  document.getElementById("kin1").innerHTML = kin1;
                  document.getElementById("group").innerHTML = group;
                  document.getElementById("address").innerHTML = address;
      
                 }
              
                 
              });  
          })
          .catch((error) => {
              console.log("Error getting documents: ", error);
          });
 
    } else {
    // User is signed out
    // ...
    window.location.href="login.html";
    
  }
 });


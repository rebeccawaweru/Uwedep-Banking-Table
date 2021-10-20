firebase.auth().onAuthStateChanged((user) => {
   if (user !== null) {
     // User is signed in, see docs for a list of available properties
     // https://firebase.google.com/docs/reference/js/firebase.User
     var uid = user.uid;

     document.getElementById("add").onclick = function(){
      var FirstName = document.getElementById("firstname").value ;
      var lastName = document.getElementById("lastname").value ;
      var Email = document.getElementById("email").value ;
      var phoneNumber = document.getElementById("phone").value;
      var NextKin = document.getElementById("name1").value ;
      var NextKinNo = document.getElementById("kin"). value ;
      var Group = document.getElementById("group"). value;
      var Address = document.getElementById("address"). value;
       var AddMemberRef = firebase.firestore().collection('members').doc();
       if(FirstName == ""){
           window.alert("please insert first name");
       }else if(lastName == ""){
          window.alert("please insert last name");
       }else if(Email == ""){
          window.alert("please insert email ");
       }else if(phoneNumber == ""){
          window.alert("please insert phone number");
       }else if ( NextKin == ""){
          window.alert("please insert Next of Kin");
       }else if (NextKinNo == ""){
          window.alert("please insert Next of Kin phone number");
       }else if (Group == ""){
          window.alert("please select group");
       }else if (Address == ""){
          window.alert("please insert address");
       }else{
          AddMemberRef.set({
          MemberId: AddMemberRef.id,
          TheFirstName : FirstName,
          LastName : lastName,
          EmailValue : Email,
          ThePhoneNumber : phoneNumber,
          KinName : NextKin,
          KinNumber: NextKinNo,
          MemberGroup: Group,
          MemberAddress:Address,
          
          
          })
          .then(() => {
    
          console.log("Document successfully written!");
          })
          .catch((error) => {
          console.error("Error writing document: ", error);
          window.location.reload();
          });
      }
    
      
    }
  
    document.getElementById("cancel").onclick=function(){
     window.location.href="tables-basic.html";
  }

   } else {
   // User is signed out
   // ...
   window.location.href="login.html";
   
 }
});

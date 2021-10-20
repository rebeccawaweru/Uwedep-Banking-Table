firebase.auth().onAuthStateChanged((user) => {
    if (user !== null) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;

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
           
           let viewmember = 'ViewMember.html' + '?' + Id;
           let editmember = 'EditMember.html' + '?' + Id;
          
           content+= `<tr>`;
           content+=`<td>`+ fName + `</td>`;
           content+=`<td>`+ lName + `</td>`;
           content+=`<td>`+ email + `</td>`;
           content+=`<td>`+ phone + `</td>`;
           content+=`<td>`+ kin + `</td>`;
           content+=`<td>`+ kin1 + `</td>`;
           content+=`<td>`+ group + `</td>`;
           content+=`<td>`+ address + `</td>`;
           content+='<td id="edit2"> <a href="'+viewmember+'" id="edit3">View</a> </td>';
           content+='<td id="edit2"> <a href="'+editmember+'" id="edit3">Edit</a> </td>';
         
           content+= `</tr>`;

        });

        $("#members").append(content);    
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



firebase.auth().onAuthStateChanged((user) => {
    if (user !== null) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;

      firebase.firestore().collection("groups")
    .get()
    .then((querySnapshot) => {
        var content = "";
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
           var Id = doc.data().GroupId;
           var Name = doc.data().GroupName;
           var date = doc.data().DateJoined;
        
           
           let viewgroup = 'ViewGroup.html' + '?' + Id;
           let editgroup = 'EditGroup.html' + '?' + Id;
          
           content+= `<tr>`;
           content+=`<td>`+ Name + `</td>`;
           content+=`<td>`+ date + `</td>`;
           content+='<td id="edit2"> <a href="'+viewgroup+'" id="edit3">View</a> </td>';
           content+='<td id="edit2"> <a href="'+editgroup+'" id="edit3">Edit</a> </td>';
         
           content+= `</tr>`;

        });

        $("#groups").append(content);    
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

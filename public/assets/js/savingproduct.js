firebase.auth().onAuthStateChanged((user) => {
    if (user !== null) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;

      firebase.firestore().collection("savingproducts")
    .get()
    .then((querySnapshot) => {
        var content = "";
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
           var Id = doc.data().SavingProductId;
           var Name = doc.data().ProductName;
         
           let viewproduct = 'ViewSavingProduct.html' + '?' + Id;
           let editproduct= 'EditSavingProduct.html' + '?' + Id;
          
           content+= `<tr>`;
           content+=`<td>`+ Name + `</td>`;
           content+='<td id="edit2"> <a href="'+viewproduct +'" id="edit3">View</a> </td>';
           content+='<td id="edit2"> <a href="'+editproduct+'" id="edit3">Edit</a> </td>';
         
           content+= `</tr>`;

        });

        $("#products").append(content);    
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
document.getElementById("create").onclick=function(){
    window.location.href = "addsavingproduct.html";
}
 
    } else {
    // User is signed out
    // ...
    window.location.href="login.html";
    
  }
 });

firebase.auth().onAuthStateChanged((user) => {
    if (user !== null) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;

      document.getElementById("create").onclick = function(){
        window.location.href="add-product.html";
    }
    
    firebase.firestore().collection("loanproducts")
        .get()
        .then((querySnapshot) => {
            var content = "";
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
               var Id = doc.data(). LoanProductId;
               var Name = doc.data().ProductName;
               var interest = doc.data().Interest;
             
               let viewproduct = 'ViewLoanProduct.html' + '?' + Id;
               let editproduct= 'EditLoanProduct.html' + '?' + Id;
            
               content+= `<tr>`;
               content+=`<td>`+ Name + `</td>`;
               content+=`<td>`+ interest + `</td>`;
               content+='<td> <a href="'+viewproduct +'">View</a> </td>';
               content+='<td> <a href="'+editproduct+'">Edit</a> </td>';
             
               content+= `</tr>`;
    
            });
    
            $("#loanproducts").append(content);    
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

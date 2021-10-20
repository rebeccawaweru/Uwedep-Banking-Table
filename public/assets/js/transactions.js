firebase.auth().onAuthStateChanged((user) => {
    if (user !== null) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;

      document.getElementById("create").onclick = function(){
        window.location.href = "addtransaction.html";
    }
    
    firebase.firestore().collection("savingtransactions")
        .get()
        .then((querySnapshot) => {
            var content = "";
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
               var Id = doc.data().TransactionId;
               var member = doc.data().Member;
               var group = doc.data().Group;
               var product = doc.data().Product;
               var reference = doc.data().Reference;
               var notes = doc.data().Notes;
               var type = doc.data().Type;
               var mode = doc.data(). Mode;
               var date = doc.data(). Date;
           
               
               let viewtransaction = 'ViewTransaction.html' + '?' + Id;
               let editransaction = 'EditTransaction.html' + '?' + Id;
              
               content+= `<tr>`;
               content+=`<td>`+ member + `</td>`;
               content+=`<td>`+ group + `</td>`;
               content+=`<td>`+ product + `</td>`;
               content+=`<td>`+ reference + `</td>`;
               content+=`<td>`+ notes + `</td>`;
               content+=`<td>`+ type + `</td>`;
               content+=`<td>`+ mode + `</td>`;
               content+=`<td>`+ date + `</td>`;
               content+='<td> <a href="'+viewtransaction+'">View</a> </td>';
               content+='<td> <a href="'+editransaction+'" >Edit</a> </td>';
             
               content+= `</tr>`;
    
            });
    
            $("#transactions").append(content);    
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

firebase.auth().onAuthStateChanged((user) => {
    if (user !== null) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;

      document.getElementById("create").onclick = function(){
        window.location.href = "uikit.html";
    }
    firebase.firestore().collection("loans")
        .get()
        .then((querySnapshot) => {
            var content = "";
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
               var Id = doc.data().LoanId;
               var member = doc.data().TheMember;
               var product = doc.data().Product;
               var interestrate = doc.data().InterestValue;
               var principal = doc.data().ThePrincipal;
               var duration = doc.data().Duration;
               var unit = doc.data().Unit;
               var status = doc.data().Loanstatus;
               var releasedate = doc.data().Releasedate;
               var maturitydate = doc.data().Maturitydate;
               var amount = doc.data().Amount;
            let finalinterest = 0;
            let principal1 = 0;
            let interest = 0;
            let total = 0;
            let totalprincipal = 0;
            interest = (principal * interestrate/100 *duration );
            finalinterest += interest
            console.log(finalinterest);
            console.log(principal);
            total =  parseInt(doc.data().ThePrincipal) + finalinterest;
    
               let viewloan  = 'ViewLoan.html' + '?' + Id;
               let editloan = 'EditLoan.html' + '?' + Id;
    
               content+= `<tr>`;
               content+=`<td>`+ member + `</td>`;
               content+=`<td>`+ product + `</td>`;
               content+=`<td>`+ interestrate + `</td>`;
               content+=`<td>`+ principal + `</td>`;
               content+=`<td>`+ duration + unit +`</td>`;
               content+=`<td>`+ status + `</td>`;
               content+=`<td>`+ releasedate + `</td>`;
               content+=`<td>`+ maturitydate + `</td>`;
               content+=`<td>`+ finalinterest + `</td>`;
               content+=`<td>`+ total + `</td>`;
               content+=`<td>`+ amount + `</td>`;
               content+='<td> <a href="'+ viewloan +'">View</a> </td>';
               content+='<td> <a href="'+editloan+'" >Edit</a> </td>';
               content+= `</tr>`;
    
            });
    
            $("#loans").append(content);    
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



firebase.auth().onAuthStateChanged((user) => {
    if (user !== null) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;

      var queryString = decodeURIComponent(window.location.search);
      queryString = queryString.substring(1);
      
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
                 var interest = doc.data().InterestValue;
                 var principal = doc.data().ThePrincipal;
                 var duration = doc.data().Duration;
                 var unit = doc.data().Unit;
                 var status = doc.data(). Loanstatus;
                 var releasedate = doc.data().Releasedate;
                 var maturitydate = doc.data().Maturitydate;
                 var amount = doc.data().Amount;
                 let finalinterest = 0;
                 let principal1 = 0;
                 let interest1 = 0;
                 let total = 0;
                 let totalprincipal = 0;
                 interest1 = (principal * interest/100 *duration );
                 finalinterest += interest1;
                 console.log(finalinterest);
                 console.log(principal);
                 total =  parseInt(doc.data().ThePrincipal) + finalinterest;
                 if(Id == queryString){
                  document.getElementById("member").innerHTML = member;
                  document.getElementById("product").innerHTML = product;
                  document.getElementById("interest").innerHTML = interest;
                  document.getElementById("principal").innerHTML = principal;
                  document.getElementById("duration").innerHTML = duration + unit;
                  document.getElementById("status").innerHTML = status;
                  document.getElementById("releasedate").innerHTML = releasedate;
                  document.getElementById("maturitydate").innerHTML = maturitydate;
                  document.getElementById("totalinterest").innerHTML = interest1;
                  document.getElementById("loanamount").innerHTML = total;
                  document.getElementById("amount").innerHTML = amount;
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


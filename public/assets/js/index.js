firebase.auth().onAuthStateChanged((user) => {
    if (user !== null) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
      
    //logout
    document.getElementById('logout').onclick = ()=>{
    firebase.auth().signOut().then(() => {
        // Sign-out successful.

        window.location.href="index.html";
        
        }).catch((error) => {
        // An error happened.
        });
    }


      firebase.firestore().collection("members")
      .get()
      .then((querySnapshot) => {          querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              console.log(doc.id, " => ", doc.data());
           
              document.getElementById("members").innerHTML = querySnapshot.docs.length;
           
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });

        firebase.firestore().collection("groups")
        .get()
        .then((querySnapshot) => {          querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());

                document.getElementById("groups").innerHTML = querySnapshot.docs.length;
             
              });
          })
          .catch((error) => {
              console.log("Error getting documents: ", error);
          });

          firebase.firestore().collection("loans")
          .get()
          .then((querySnapshot) => {
             let finalamount = 0; 
            querySnapshot.forEach((doc) => {
                  // doc.data() is never undefined for query doc snapshots
                  console.log(doc.id, " => ", doc.data());
                 var status = doc.data().Loanstatus;
                  var amount = parseInt(doc.data().Amount);
                  finalamount += amount;
                  document.getElementById("totalamountpaid").innerHTML = amount;
                
                  if(status == "Active"){
                    document.getElementById("activeloans").innerHTML = querySnapshot.docs.length; 
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
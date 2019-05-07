/*botones de cambio de pantalla*/
visitor.addEventListener("click", function(){
    document.getElementById("homeContainer").style.display = "none";
    document.getElementById("visitorContainer").style.display = "block";
    });
admin.addEventListener("click", function(){
    document.getElementById("homeContainer").style.display = "none";
    document.getElementById("adminContainer").style.display = "block";
            });
            
historial.addEventListener("click", function(){
    document.getElementById("adminContainer").style.display = "none";
    document.getElementById("historiContainer").style.display = "block";
});
coWorkers.addEventListener("click", function(){
    document.getElementById("adminContainer").style.display = "none";
    document.getElementById("historiContainer").style.display = "block";
});

goBack.addEventListener("click",function(){
    document.getElementById("visitorContainer").style.display="none";
    document.getElementById("homeContainer").style.display="block";
});

historicView.addEventListener("click", function(){
    document.getElementById("historiContainer").style.display="none";
    document.getElementById("coWorkerContainer").style.display="block";
});


hisToHome.addEventListener("click",function(){
    document.getElementById("visitorContainer").style.display="none";
    document.getElementById("adminContainer").style.display="block";
});

cowToHome.addEventListener("click",function(){
    document.getElementById("coWorkerContainer").style.display="none";
    document.getElementById("adminContainer").style.display="block";
})

admiToHome.addEventListener("click",function(){
    document.getElementById("adminContainer").style.display="none";
    document.getElementById("homeContainer").style.display="block";
})






/*firebase*/
var config = {
    apiKey: "AIzaSyDwRc0-RFbV2K8EnhMN3tfJ_3ZBR3ukJ2k",
    authDomain: "visitors-e2702.firebaseapp.com",
    databaseURL: "https://visitors-e2702.firebaseio.com",
    projectId: "visitors-e2702",
    storageBucket: "visitors-e2702.appspot.com",
    messagingSenderId: "1043185901581"
  };

  
  firebase.initializeApp(config);
  var db = firebase.firestore();


//Agregar información de visitante
signUpVisitor.addEventListener("click", (e) => {
    e.preventDefault(e);
    
    let name = document.querySelector('#visitorName').value;
    let email = document.querySelector('#visitorEmail').value;
    let host = document.querySelector('#coWorkerName').value;
    let timeInnew =new Date();
    let timeOut = document.querySelector('#timeOut').value;

    console.log(name, email, host, timeInnew, timeOut); 

    db.collection("visitor").add({
        visitorName: name,
        visitorEmail: email,
        coworker: host,
        arriveTime: timeInnew,
        exitTime: timeOut || '00:00:00',
        photo:photoUrl
    })
    .then(function(docRef) { 
        Email.send({
            SecureToken : "bfcd0384-8e4b-4639-9ad6-22a9c5fcfba9",
            To : host,
            From : "apps@claudiagarfias.works",
            Subject : "This is the subject",
            Body : `Hola, ya llegó ${name}. Te está esperando en la recpeción.`,
        }).then(
          message => alert(message)
        );
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

    }
);

//función para que aprezcan los nombres de los coworkers en el selector de la vista de visitante
let selector = document.querySelector('#coWorkerName');
db.collection("coworkers").get().then((querySnapshot) => {
   selector.innerHTML='';
  querySnapshot.forEach((doc) => {
      //console.log(`${doc.id} => ${doc.data()}`);
      selector.innerHTML += `
      <option value="${doc.data().email}">${doc.data().name}  ${doc.data().lastName} </option>
      `
  }); 
});


//Agregar información coworker
registerCoworker.addEventListener("click", (e) => {
    e.preventDefault(e);
    let name = document.querySelector('#name').value;
    let lastName = document.querySelector('#lastName').value;
    let celPhone = document.querySelector ('#celPhone').value;
    let email = document.querySelector('#email').value;
    let company = document.querySelector('#company').value;
        
    db.collection("coworkers").add({
       name: name,
        lastName: lastName,
        celphone: celPhone,
        email: email,
         company: company,
             })
    .then(function(docRef) {
         console.log("Document written with ID: ", docRef.id);
     })
     .catch(function(error) {
        console.error("Error adding document: ", error);
      });
       console.log(name, lastName, celPhone, email, company);
     });
    


     //función para leer los datos de historico
let table = document.querySelector('#summary');
db.collection("visitor").get().then((querySnapshot) => {
   table.innerHTML='';
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
    table.innerHTML += `
    <tr>
   <th scope="col">${doc.data().visitorName}</th>
   <td>${doc.data().coworker}</td>
   <td>${doc.data().arriveTime}</td>
   </tr>
      `
  }); 
});

//función para tabla de coworkers registrados
let register = document.querySelector('#registCoworker');
db.collection("coworkers").get().then((querySnapshot) => {
   register.innerHTML='';
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
    register.innerHTML += `
    <tr>
   <th scope="col">${doc.data().name}</th>
   <td>${doc.data().lastName}</td>
   <td>${doc.data().celphone}</td>
   <td>${doc.data().email}</td>
   <td>${doc.data().company}</td>
   </tr>
      `
  }); 
});
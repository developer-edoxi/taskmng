function loadDoc(c) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          var ar=JSON.parse(this.responseText);
          var obj=ar[ar.length-1];
        document.getElementById("fullname").innerHTML="Employee Name: "+obj.firstname;
        document.getElementById("alocdate").innerHTML="Allocated Date: "+obj.alocdate;
        document.getElementById("status").innerHTML="Status: "+obj.status; 
      }
    };
    xhttp.open("GET", "Welcome/getdata?q=" +c, true);
    xhttp.send();
  }
  
  
  
  var span = document.getElementsByClassName("close")[0];
  
  var span1 = document.getElementsByClassName("close1")[0];
  
  var modal = document.getElementById("myModal");
  
  var modal1 = document.getElementById("myModal1");
  
  $(document).ready(function(){
    
  new DataTable('#example');
  
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0 so need to add 1 to make it 1!
  var yyyy = today.getFullYear();
  
  if(dd<10){
    dd='0'+dd
  } 
  if(mm<10){
    mm='0'+mm
  } 
  
  today = yyyy+'-'+mm+'-'+dd;
  
  document.getElementById("sdate").setAttribute("min", today);
  document.getElementById("ldate").setAttribute("min", today);
  
  
  });
  
  $(function () {
          $(".forward").click(function () {
  
              modal.style.display = "block";
  
              var c=$(this).attr("dataval");
  
              document.getElementById("taskid").value=c;
  
              console.log(c);
  
    
          });
      });
  
  $(function () {
          $(".backward").click(function () {
  
              modal1.style.display = "block";
  
              var c=$(this).attr("dataval");
  
              console.log(c);
  
              loadDoc(c);
  
   
          });
      });
  
  span.onclick = function() {
    modal.style.display = "none";
  }
  
  span1.onclick = function() {
    modal1.style.display = "none";
  }
  
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }else if(event.target == modal1) {
      
      modal1.style.display = "none";
  
    }
  }
  
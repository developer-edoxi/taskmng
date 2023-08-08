  var span = document.getElementsByClassName("close")[0];
  
  
  var modal = document.getElementById("myModal");
  

  const imgPreview = document.getElementById("img-preview");

  const chooseFile = document.getElementById("file-input");
  
  $(document).ready(function(){
    
  new DataTable('#example');
  
  
  });
  
  $(function () {
          $(".forward").click(function () {
  
              modal.style.display = "block";
  
              var c=$(this).attr("dataval");
  
              document.getElementById("taskid").value=c;
  
              console.log(c);
  
    
          });
      });


      function getImgData() {
        const files = chooseFile.files[0];
        if (files) {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(files);
          fileReader.addEventListener("load", function () {
            imgPreview.style.display = "block";
            imgPreview.innerHTML = '<img src="' + this.result + '" />';
          });    
        }
      }
      


      
      
chooseFile.addEventListener("change", function () {
  getImgData();
});

      
  

  
  span.onclick = function() {
    modal.style.display = "none";

    imgPreview.style.display = "none";

  }
  

  
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
      imgPreview.style.display = "none";
    }
  }
  
const imgPreview = document.getElementById("img-preview");

const chooseFile = document.getElementById("file-input");

var span = document.getElementsByClassName("close")[0];
  
  
var modal = document.getElementById("myModal");

var slug = document.getElementById("userslug").value;

var path = document.getElementById("path").value;


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



$(function () {
          $(".forward").click(function () {
  
              modal.style.display = "block";
  
              var c=$(this).attr("dataval");
  
              document.getElementById("taskid").value=c;
  
              console.log(c);
  
    
          });
      });



span.onclick = function() {
modal.style.display = "none";

imgPreview.style.display = "none";

}




window.onclick = function(event) {
if (event.target == modal) {
	modal.style.display = "none";
	imgPreview.style.display = "none";
}
}


var tpid ="";


function viewreply(cmid,elem) {

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
	  var ar=JSON.parse(this.responseText);
	//   console.log("hello");
	//   console.log(ar);


	for(var j=0;j<ar.length;j++){

		$(elem).after("<h4  style='color:green;margin-left:40px;'>"+ar[j].firstname+"</h4><p style='margin-left:60px;'>"+ar[j].reply+"</p>");

	}

  }
};
xhttp.open("GET",path+"welcome/getreply?cmid=" +cmid, true);
xhttp.send();
}


function viewcomment(id,topicid) {
	var commentview = document.querySelector("#cs"+id+">.comment-view");
	commentview.innerHTML = "";
	$("#cs"+id+">.comment-view").off();
	// console.log("jiiii")
	var status=document.getElementById("cs"+id).getAttribute("stat")
	console.log("stat"+status);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      	if(this.readyState == 4 && this.status == 200) {
          var ar=JSON.parse(this.responseText);
          console.log(ar);

		for(var i=0;i<ar.length;i++){
			
		  const head = document.createElement("h3");
		  const para = document.createElement("p");
		  const para1 = document.createElement("p");
		  head.style.color = "red";
		  head.classList.add("my-10");
		  para.classList.add("text-fade");
		  para.classList.add("w-p85");
		  para.classList.add("mx-auto");
		  para1.classList.add("text-fade");
		  para1.classList.add("w-p85");
		  para1.classList.add("mx-auto");
		  para1.classList.add("reply-icon");
		  para1.setAttribute("id",ar[i].id);
		  para1.setAttribute("tpid",ar[i].tpid);
		  para1.style.fontWeight="bold";
		  head.innerHTML = ar[i].firstname;
		  para.innerHTML = ar[i].comment;
		  para1.innerHTML = "--Reply--";
		  commentview.appendChild(head);
		  commentview.appendChild(para);
		  commentview.appendChild(para1);
		  if(status=="closed"){
			
			para1.style.display = 'none';

		  }
		 

		  

		//   console.log(ar[i].id);
		
					$("#cs"+id+">.comment-view").on("click","p#"+ar[i].id, function(){


						var c=$(this).attr("id");

						var tpid=$(this).attr("tpid");

						console.log($(this).next().length);

					if($(this).next().length>0){

						// console.log("inside");

					if($(this).next()[0].classList.contains('reply-form')){

						// console.log("2inside");

						$(this).next()[0].remove();


					}else{

						// console.log("elseinside");

						$(this).after("<form class='reply-form'><div class='input-group'><input type='text' class='form-control' id='rp"+c+"'placeholder='Add your reply' required><span class='input-group-text'><i class='icon-Send reply-sent' id="+c+" tpid="+tpid+" ><span class='path1'></span><span class='path2'></span></i></span></div></form>");

					}

					}else{


						$(this).after("<form class='reply-form'><div class='input-group'><input type='text' class='form-control' id='rp"+c+"'placeholder='Add your reply' required><span class='input-group-text'><i class='icon-Send reply-sent' id="+c+" tpid="+tpid+" ><span class='path1'></span><span class='path2'></span></i></span></div></form>");			


					}


				});


				$("#cs"+id+">.comment-view").on("click", "i#"+ar[i].id, function(){
								
								// console.log("hello");  
					
								var cmid=$(this).attr("id");
					
								var tpid=$(this).attr("tpid");
					
								console.log("id:"+id);
					
								reply=document.getElementById("rp"+cmid).value
					
								

								if(reply == ""){

									document.getElementById("rp"+cmid).focus();

								}else{

								addreply(cmid,reply,tpid,id);

								document.getElementById("cm"+topicid).value="";

								}

					
								// document.getElementById("rp"+cmid).value="";
					
					
					});



		  				viewreply(ar[i].id,para1);
				 

		}
		  
      }
    };
    xhttp.open("GET", path+"welcome/getcomment?tpid="+topicid, true);
    xhttp.send();
  }





function addcomment(tpid,uid,comment,cid) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          var ar=JSON.parse(this.responseText);
		  console.log(ar);
      }
    };
    xhttp.open("POST", path+"welcome/addcomment", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send("tpid="+tpid+"&uid="+uid+"&comment="+comment);
	
	viewcomment(cid,tpid)

   
  }



  function addreply(cmid,reply,tpid,cid) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          var ar=JSON.parse(this.responseText);
		  console.log(ar);
      }
    };
    xhttp.open("POST", path+"welcome/addreply", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send("cmid="+cmid+"&uid="+slug+"&reply="+reply);

	console.log(cid+":"+tpid)
	
	viewcomment(cid,tpid)


  }


  


$(function () {
          $(".comment-icon").click(function () {
  
              
  
              var c=$(this).attr("id");

			  var d=$(this).attr("tpid");

			  var stat=$(this).attr("stat");
  
              console.log(stat);

              

						if(document.getElementById("cs"+c).style.display=='block'){

								document.getElementById("cs"+c).style.display="none";


						}else{

							if(stat=='opened'){

								document.getElementById("cs"+c).style.display="block";

								viewcomment(c,d);
							}else{

								document.getElementById("cs"+c).style.display="block";

								var el=document.getElementById("cs"+c);

								// var rpicon=document.querySelector("#cs"+c+">.comment-view>");

								// rpicon.hidden=true;

								for (var i = 0; i < el.childNodes.length; i++) {

									if ((el.childNodes[i].className == "form-part")) {

											el.childNodes[i].hidden=true;
									
									}  
									     
								}
								document.getElementById("closestatus").style.display="block";
								viewcomment(c,d);

							}

						}

			  

   
          });
      });


	  $(function () {
          $(".close-icon").click(function () {
  
            console.log("hello");
			var val=$(this).attr("tpid");

			$(this)[0].hidden=true;

			console.log($(this)[0].hidden);

			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var ar=JSON.parse(this.responseText);
				console.log(ar);
				

			}
			};
			xhttp.open("POST", path+"welcome/changetopicstat", true);
			xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhttp.send("tpid="+val);
  
 
   
          });
      });





	  $(function () {
          $(".comment-sent").click(function () {
  
              
  
              var cid=$(this).attr("id");

			  var topicid=$(this).attr("tpid");

			  var uid=$(this).attr("dataval");
  
              console.log(document.getElementById("cm"+topicid).value);

			  comment=document.getElementById("cm"+topicid).value

			  if(comment == ""){

				document.getElementById("cm"+topicid).focus();

			  }else{

				addcomment(topicid,uid,comment,cid);
              
			  	document.getElementById("cm"+topicid).value="";

			  }

			  

   
          });
      });


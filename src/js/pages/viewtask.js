var modal = document.getElementById("myModal");

var close = document.getElementsByClassName("close")[0];

$(function () {
        $(".chk").click(function () {

            var span = $(this).attr("value");

			var span1 = $(this).attr("dataval");

            // alert(span);

			modal.style.display = "block";

			document.getElementById("taskid").value=span;

			document.getElementById("userid").value=span1;

			

  
        });
    });

	window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";

	var inp = document.querySelectorAll('input:checked');

	inp[0].checked=false;

  }
}

close.onclick = function() {
  
	modal.style.display = "none";

	var inp = document.querySelectorAll('input:checked');

	inp[0].checked=false;



}
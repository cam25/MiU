var parseEventForm = function(data){
	// uses the form data here:
	console.log(data)
};

$(document).bind('pageinit', function(){

	var evForm = $("#eventForm"),
		errorslink = $("#errorlink");
	evForm.validate({
		invalidHandler: function(form, validator){
			errorslink.click();
			var html = '';
			 console.log(validator.submitted);
			for(var key in validator.submitted){
				var label = $('label[for^="'+ key +'"]').not('[generated]');  // error with a label except those generated.
				console.log(label.text());
				var legend = label.closest('fieldset').find('.ui-controlgroup-label');  
				var fieldName = legend.length ? legend.text() : label.text();
				console.log(fieldName);
				html += '<li>'+ fieldName +'</li>';
			};
			$("#errorslink ul").html(html);
		},
		submitHandler: function() {
			var data = evForm.serializeArray();
			localStorage.setItem("formdata",data);
			parseEventForm(data);
		}
	});
   console.log(localStorage)



	 
	
	
});



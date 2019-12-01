		setTimeout(function(){  CKEDITOR.replace('editor'); }, 5000);
		 function clicky(){
			 document.getElementById('description').value = CKEDITOR.instances.editor.getData();
			 $('#description').click();
			 $('#add').click();
		 }
		 
		

<script>
	setTimeout(function(){  CKEDITOR.replace('editor'); }, 30000);


	/*
	 * function checkFlag() { var desc = $('#editor').val(); if(desc.trim() ==
	 * '') { window.setTimeout(checkFlag(), 100); this checks the flag every 100
	 * milliseconds } else { CKEDITOR.replace('editor'); } }
	 */
		/*
		 * $( document ).ready(function() { CKEDITOR.replace('editor'); });
		 */
</script>
<script>
		 $( document ).ready(function() {
			 function Ctrl($scope) {
					$scope.showId = function() {
						$scope.description = CKEDITOR.instances.editor.getData();
					};

				}
			});
			
</script>
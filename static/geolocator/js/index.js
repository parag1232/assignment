

$(document).ready(function(){
    $('#error').hide();
    $('#validatedCustomFile').on('change',function(){
    var fileName = $(this).val();
    $(this).next('.custom-file-label').html(fileName);
    
})
var table = $('#geotable').dataTable({
    destroy:true,
    stateSave: true,
    fnInitComplete : function() {
     
       if ($(this).find('tbody tr').length<=1) {
          $(this).parent().hide();
       }
    } 
 });
    $("#uploadForm").submit(function(event) {
        $("#myDiv").show();
        $("#loading-image").show();
        event.preventDefault();
        var data = new FormData(this);
        $.ajax({
            url: $(this).attr('action'),
            type: $(this).attr('method'),
            data: data,
            cache: false,
            processData: false,
            contentType: false,
            success: function(data) {
            if (data.hasOwnProperty('data')){
                if (data.data.length > 1){
                $("#loading-image").hide();
                $("#myDiv").hide();
                
                $('#geotable').dataTable({
                    dom: 'Bfrtip',
                    buttons: [
                     'csv', 'excel'
                    ],
                    destroy:true,
                    stateSave: true,
                    data:data.data
                 });
                 $('#uploadForm').trigger("reset");
                 $('#validatedCustomFile').next('.custom-file-label').html("Upload Excel file Containing Addresses");
            }
            else if(data.data.length == 0){
                $("#loading-image").hide();
                $('#validatedCustomFile').next('.custom-file-label').html("Upload Excel file Containing Addresses");
                $("#myDiv").hide();
                $('#error').html('<p><b>'+'Excel File is Empty'+'</b></p>');
                $('#error').show();
                $("#error").fadeTo(2000, 500).slideUp(500, function(){
                    $("#error").slideUp(500);
                });
            }}
            else if(data.error){
                $("#loading-image").hide();
                $('#validatedCustomFile').next('.custom-file-label').html("Upload Excel file Containing Addresses");
                $("#myDiv").hide();
                $('#error').html('<p><b>'+data.error+'</b></p>');
                $('#error').show();
                $("#error").fadeTo(2000, 500).slideUp(500, function(){
                    $("#error").slideUp(500);
                });
            }
        }


        });
    });
});
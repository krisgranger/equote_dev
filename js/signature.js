$(function() {
    //Show jSignature if on a supported browser
    $('#SignatureRow').show();
    $('#Signature').jSignature({width:'100%',height:'100%'});
    
    $('#ClearButton').click(function() {
        $('#Signature').jSignature('reset');
    });
    
    $('#Signature').bind('change', function() {
        $('.uniquesignatureclass').val($('#Signature').jSignature('getData', 'image'));
    });
    
    $('#Signature').on("keyup change", function() {
        if($('#Signature').jSignature('getData', 'native').length > 0) {
            $('#sigReq').hide();
        }
        else {
            $('#sigReq').show();
        }
    }).change();
});
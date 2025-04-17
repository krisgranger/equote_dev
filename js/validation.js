$(function() {
    $(':input, #Signature').on("keyup change", function() {
        return validateInputs();
    }).change();
});

function validateInputs() {
    #UnapprovedBegin() 
    var paymentProcessor = $('select[name="#Quote.InputOrderPorterPaymentMode"]').val();
    if (paymentProcessor == "ConnectBooster") {
        document.getElementById("otherPaymentCreditCardFields").setAttribute('style', 'display: none'); 
        document.getElementById("cashtermoption").setAttribute('style', 'display: none'); 
        document.getElementById("connectBoosterButtons").setAttribute('style', 'display: block'); 
    } else if (paymentProcessor != undefined) {
        document.getElementById("connectBoosterButtons").setAttribute('style', 'display: none');
        document.getElementById("cashtermoption").setAttribute('style', 'display: none'); 
        document.getElementById("otherPaymentCreditCardFields").setAttribute('style', 'display: block');
    } 

    if ($('input[name="ApproveOrder"]').is(':checked') && reqFilled()#BeginIf("#Quote.OrderPorterShowSignature","True") && ($('#Signature').jSignature('getData', 'native').length > 0)#EndIf()) {
        if (paymentProcessor != "ConnectBooster" || (paymentProcessor == "ConnectBooster" && $('input[name="ConnectBoosterToken"]').val().trim() != '')) {
            if("#Quote.OrderPorterPaymentMode" === "Authorize.net") {
                if($('#authorizeNetTransactionId').val().trim() != ''){
                    $('#submission').prop('disabled', false);
                    $('#RequiredFieldsMessage').hide();
                    return true;
                } else {
                    blockAcceptButton();
                }
            } else {
                $('#submission').prop('disabled', false);
                $('#RequiredFieldsMessage').hide();
                return true;
            }
        } else {
            blockAcceptButton();
        }
    } else {
        blockAcceptButton();
    }
    #UnapprovedEnd()
}

function blockAcceptButton() {
    $('#submission').prop('disabled', true);
    $('#RequiredFieldsMessage').show();
    return false;
}

//jquery to disable accept button until all required fields are filled out
function reqFilled() {
    var filled = true;
    $('.FieldName').each(function() {
        if ($(this).val().trim() == '') {
            filled = false;
        }
    });
    return filled;
}
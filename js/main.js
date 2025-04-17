$(function() {
    //Disable all buttons and change text to "Submitting" on click
    $('form:not(#formAuthorizeNetPopup)').submit(function(e) {
        $('input:submit').attr("disabled", true);
        $('input:submit').attr("value", 'Submitting');
        return true;
    });

    //Hide the required graphics when field is filled out/checked
    $('.req').prev('input').on("keyup change", function() { 
        $(this).val().length ? $(this).next('.req').hide() : $(this).next('.req').show(); 
    });
    
    $('.reqcheck').next(':checkbox').on("keyup change", function() { 
        $(this).is(':checked') ? $(this).prev('.reqcheck').hide() : $(this).prev('.reqcheck').show() 
    });

    //Disable qty input if item is set as optional or not included
    $(':checkbox').change(function() {
        ($(this).is(':checked')) ?
            $(this).closest('td').next().children(':text').removeAttr("disabled") :
            $(this).closest('td').next().children(':text').attr("disabled", "disabled");
    }).change();
    
    $(':radio').change(function() {
        $(':radio').each(function(i) {
            ($(this).is(':checked')) ?
                $(this).closest('td').next().children(':text').removeAttr("disabled") :
                $(this).closest('td').next().children(':text').attr("disabled", "disabled");
        });
    }).change();
    
    //jQuery accordion control. Used for displaying item level data. #agreement may be used for Terms and Conditions section (to get scroll bar in CSS: overflow:auto; once height has been set.)
    $("#accordion, #agreement").accordion({
        active: false,
        collapsible: true,
        heightStyle: "content",
        autoHeight: false,
        clearStyle: true,
    });
    
    #UnapprovedBegin() 
    #BeginIf("#Quote.OrderPorterPaymentMode","ConnectBooster")
    var paymentProcessor = "ConnectBooster";
    document.getElementById("otherPaymentCreditCardFields").setAttribute('style', 'display: none'); 
    document.getElementById("connectBoosterButtons").setAttribute('style', 'display: block'); 
    #EndIf()

    #BeginIfNot("#Quote.OrderPorterPaymentMode","ConnectBooster")
    #BeginIfNot2("#Quote.OrderPorterPaymentMode","None")
    #BeginIfNot3("#Quote.OrderPorterPaymentMode","Terms")
    #BeginIfNot4("#Quote.OrderPorterPaymentMode","Wise-Pay")
    #BeginIfNot5("#Quote.OrderPorterPaymentMode", "Authorize.net")
    var paymentProcessor = "NonConnectBoosterCC";
    document.getElementById("connectBoosterButtons").setAttribute('style', 'display: none');
    document.getElementById("otherPaymentCreditCardFields").setAttribute('style', 'display: block');
    #EndIfNot5()
    #EndIfNot4()
    #EndIfNot3()
    #EndIfNot2()
    #EndIfNot()
    #UnapprovedEnd()

    $('input[name="ApproveOrder"]').attr('id', 'ApprovalCheck');
});
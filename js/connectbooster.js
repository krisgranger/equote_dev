$(function() {
    // Tokens
    var GatewayTokenizationKey = "#ConnectBooster.TokenizationKey";
    var GatewayCustomerVaultEnabled = "#ConnectBooster.StorePaymentInformation";
    var PmCcEnabled = "#ConnectBooster.CreditCardEnabled";
    var PmEftEnabled = "#ConnectBooster.ElectronicCheckEnabled";
    var PmCcAdjustmentAmount = #ConnectBooster.CreditCardAdjustment;
    var PmEftAdjustmentAmount = #ConnectBooster.ElectronicCheckAdjustment;
    var PmCcCalculatedAdjustment = #ConnectBooster.CreditCardCalculatedAdjustment;
    var PmEftCalculatedAdjustment = #ConnectBooster.ElectronicCheckCalculatedAdjustment;
    var QuoteOrderPorterAmount = #Quote.OrderPorterAmount;
    var TotalAmount;

    // Rendering
    function paymentInfoCCRender() {
        //Quote amount Y/N show/hide
        if (QuoteOrderPorterAmount != "0.00") {
            if (PmCcAdjustmentAmount > "0") {
                TotalAmount = QuoteOrderPorterAmount + PmCcCalculatedAdjustment;

                document.getElementById("quoteAmount").innerHTML =
                    "<div class=" + "paymentQuote" + "> <div>Quote Amount: </div><div>$" + QuoteOrderPorterAmount.toFixed(2) + "</div></div>" +
                    "<div class=" + "paymentAdjustment" + ">" + "<span class=" + "paymentAdjustmentNegative" + ">" + PmCcAdjustmentAmount + "% Adjustment </span>$" + PmCcCalculatedAdjustment.toFixed(2) + "</div>" +
                    "<div class=" + "paymentDataMainContentItemTotal" + ">" + "<div><b>Total Amount: </b></div><div>$" + TotalAmount.toFixed(2) + "</div></div>";

                // Display Text
                document.getElementById("adjustmentsEnabled").setAttribute("style", "display: block")
                document.getElementById("adjustmentsEnabled").innerHTML =
                    "By paying with this payment method you are forfeiting your cash discount."
            } else if (PmCcAdjustmentAmount < "0") {
                TotalAmount = QuoteOrderPorterAmount + PmCcCalculatedAdjustment;
                // Convert PmCcAdjustmentAmount to string to get rid of -
                var percent = PmCcAdjustmentAmount.toString();

                document.getElementById("quoteAmount").innerHTML =
                    "<div class=" + "paymentQuote" + "> <div>Quote Amount: </div><div>$" + QuoteOrderPorterAmount.toFixed(2) + "</div></div>" +
                    "<div class=" + "paymentAdjustment" + ">" + "<span class=" + "paymentAdjustmentPositive" + ">Save " + percent.substr(1, percent.length) + "%</span>$" + PmCcCalculatedAdjustment.toFixed(2) + "</div>" +
                    "<div class=" + "paymentDataMainContentItemTotal" + ">" + "<div><b>Total Amount: </b></div><div>$" + TotalAmount.toFixed(2) + "</div></div>";
            } else {
                TotalAmount = QuoteOrderPorterAmount;
                document.getElementById("quoteAmount").innerHTML =
                    "<div class=" + "paymentQuote" + "> <div>Quote Amount: </div><div>$" + QuoteOrderPorterAmount.toFixed(2) + "</div></div>" +
                    "<br>" + "<div class=" + "paymentDataMainContentItemTotal" + "><b>Total Amount: </b>$" + TotalAmount.toFixed(2) + "</div>";
            }
        }

        gatewayVault();
    }

    function paymentInfoACHRender() {
        //Quote amount Y/N show/hide
        if (QuoteOrderPorterAmount != "0.00") {
            if (PmEftAdjustmentAmount > "0") {
                TotalAmount = QuoteOrderPorterAmount + PmEftCalculatedAdjustment;

                document.getElementById("quoteAmount").innerHTML =
                    "<div class=" + "paymentQuote" + "> <div>Quote Amount: </div><div>$" + QuoteOrderPorterAmount.toFixed(2) + "</div></div>" +
                    "<div class=" + "paymentAdjustment" + ">" + "<span class=" + "paymentAdjustmentNegative" + ">" + PmEftAdjustmentAmount + "% Adjustment </span>$" + PmEftCalculatedAdjustment.toFixed(2) + "</div>" +
                    "<div class=" + "paymentDataMainContentItemTotal" + ">" + "<div><b>Total Amount: </b></div><div>$" + TotalAmount.toFixed(2) + "</div></div>";

                // Display Text
                document.getElementById("adjustmentsEnabled").setAttribute("style", "display: block")
                document.getElementById("adjustmentsEnabled").innerHTML =
                    "By paying with this payment method you are forfeiting your cash discount."
            } else if (PmEftAdjustmentAmount < "0") {
                TotalAmount = QuoteOrderPorterAmount + PmEftCalculatedAdjustment;
                // Convert PmEftAdjustmentAmount to string to get rid of -
                var percent = PmEftAdjustmentAmount.toString();

                document.getElementById("quoteAmount").innerHTML =
                    "<div class=" + "paymentQuote" + "> <div>Quote Amount: </div><div>$" + QuoteOrderPorterAmount.toFixed(2) + "</div></div>" +
                    "<div class=" + "paymentAdjustment" + ">" + "<span class=" + "paymentAdjustmentPositive" + ">Save " + percent.substr(1, percent.length) + "%</span>$" + PmEftCalculatedAdjustment.toFixed(2) + "</div>" +
                    "<div class=" + "paymentDataMainContentItemTotal" + ">" + "<div><b>Total Amount: </b></div><div>$" + TotalAmount.toFixed(2) + "</div></div>";
            } else {
                TotalAmount = QuoteOrderPorterAmount;
                document.getElementById("quoteAmount").innerHTML =
                    "<div class=" + "paymentQuote" + "> <div>Quote Amount: </div><div>$" + QuoteOrderPorterAmount.toFixed(2) + "</div></div>" +
                    "<div class=" + "paymentDataMainContentItemTotal" + ">" + "<div><b>Total Amount: </b></div><div>$" + TotalAmount.toFixed(2) + "</div></div>";
            }
        }

        gatewayVault();
    }

    function gatewayVault() {
        // Gateway Vault Y/N
        if (GatewayCustomerVaultEnabled == "True") {
            document.getElementById("gatewayEnabled").setAttribute('style', 'display: block;');
            document.getElementById("GatewayAddToVault").checked = true;
        } else {
            document.getElementById("gatewayEnabled").setAttribute('style', 'display: none');
            document.getElementById("GatewayAddToVault").checked = false;
        }
        //Remove pay by buttons
        document.getElementById("customBankAccountPayment").setAttribute("style", "display: none");
        document.getElementById("customCCPayment").setAttribute("style", "display: none");

        //Trigger form validation
        $('#firstnamebilling').keyup();
    }

    // Collect.JS
    function payBankAccount() {
        // BankAccount Base
        CollectJS.configure({
            'tokenizationKey': GatewayTokenizationKey,
            'paymentSelector': '#customBankAccountPayment',
            'theme': 'material',
            'primaryColor': '#2F5AA3',
            'secondaryColor': '#cecece',
            'buttonText': 'SAVE',
            'instructionText': 'Enter Banking Information Below',
            'paymentType': 'ck',
            'callback': function (response) {
                document.getElementById("paymentDataBody").style.display = "block",
                document.getElementById("paymentDataBodyTitle").innerHTML =
                    'Bank Account Information'
                // Display responses from CollectJS
                document.getElementById("paymentData").innerHTML =
                    'Account Name: ' + response.check.name +
                    '<br>Account Number: ' + response.check.account;
                document.getElementById("ConnectBoosterToken").setAttribute('value', response.token);
                document.getElementById("ConnectBoosterPaymentType").setAttribute('value', 'ck');
                // Display Text for adjustments need to set to none by default
                document.getElementById("adjustmentsEnabled").setAttribute("style", "display: none");
                paymentInfoACHRender();
            }
        });
    }
    
    function payCreditCard() {
        // Credit Card Base
        CollectJS.configure({
            'tokenizationKey': GatewayTokenizationKey,
            'paymentSelector': '#customCCPayment',
            'theme': 'material',
            'primaryColor': '#2F5AA3',
            'secondaryColor': '#cecece',
            'buttonText': 'SAVE',
            'instructionText': 'Enter Credit Card Information Below',
            'paymentType': 'cc',
            'callback': function (response) {
                document.getElementById("paymentDataBody").style.display = "block",
                document.getElementById("paymentDataBodyTitle").innerHTML =
                    'Credit Card Information'
                // Display responses from CollectJS
                document.getElementById("paymentData").innerHTML =
                    'Card Number: ' + response.card.number +
                    '<br>Expiration: ' + response.card.exp
                document.getElementById("ConnectBoosterToken").setAttribute('value', response.token);
                document.getElementById("ConnectBoosterPaymentType").setAttribute('value', 'cc');
                // Display Text for adjustments need to set to none by default
                document.getElementById("adjustmentsEnabled").setAttribute("style", "display: none");
                paymentInfoCCRender();
            },
        });
    }
    
    // Payment Button Options
    showActivePaymentButtons();
    
    $('#customBankAccountPayment').click(function() {
        CollectJS.startPaymentRequest(payBankAccount());		
    });
    
    $('#customCCPayment').click(function() {
        CollectJS.startPaymentRequest(payCreditCard());		
    });

    $('#paymentClear').click(function() {
        showActivePaymentButtons();
        document.getElementById("paymentDataBody").style.display = "none"
        document.getElementById("ConnectBoosterToken").setAttribute('value', '');
        document.getElementById("ConnectBoosterPaymentType").setAttribute('value', '');
        $('#submission').prop('disabled', true);
        $('#RequiredFieldsMessage').show();
    });

    function showActivePaymentButtons(){
        var ccDoc = document.getElementById("customCCPayment");
        if(ccDoc){
            if (PmCcEnabled == "True") {
                ccDoc.setAttribute('style', 'display: inline-block;');
            } else {
                ccDoc.setAttribute('style', 'display: none;');
            }
        }
        
        var checkDoc = document.getElementById("customBankAccountPayment");
        if(checkDoc){
            if (PmEftEnabled == "True") {
                checkDoc.setAttribute('style', 'display: inline-block;');
            } else {
                checkDoc.setAttribute('style', 'display: none;');
            }
        }
    }
});
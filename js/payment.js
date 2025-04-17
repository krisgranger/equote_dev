// This file contains shared payment-related functionality
$(function() {
    // Payment mode specific logic
    initializePaymentMode();
});

function initializePaymentMode() {
    // Handle payment mode specific initializations
    // These will be called on page load
    
    #BeginIf("#Quote.OrderPorterPaymentMode","Authorize.net")
    // Initialize Authorize.net specific elements
    // Already handled in authorizenet.js
    #EndIf()
    
    #BeginIf("#Quote.OrderPorterPaymentMode","ConnectBooster")
    // Initialize ConnectBooster specific elements
    // Already handled in connectbooster.js
    #EndIf()
}
<?php
    require_once("GlobalClass.php");
    $GlobalConnection = new GlobalConnection();

    $Id = $_POST['Id'];
    $TagNumber = $_POST['TagNumber'];
    $VoucherNumber = $_POST['VoucherNumber'];

    if($GlobalConnection->UpdateBillingDetails($Id, $TagNumber, $VoucherNumber)){
        echo 'Updated Successfully!';
    }

?>
<?php
require_once("classProject.php");
$ProjectList = new ProjectList();

    $PCode =$_POST['PCode'];
    $BudgetedAmt = $_POST["BudgetedAmt"];
    $OrigAmount = $_POST['OrigAmount'];
    
    $stmts = $ProjectList->runQuery("SELECT * From apollo_projectlist WHERE project_code = $PCode");
    $stmts->execute();
    $row = $stmts->fetch();
    $capex = $row['capex_number'];
    $project = $row['project_name'];



    if($ProjectList->UpdateProjectAmount($PCode, $BudgetedAmt)){
        if($ProjectList->insertToHistoryLogs($capex, $project, $OrigAmount, $BudgetedAmt)){
            echo "Updated successfully!";
        }
       
    }
    else{
        echo "Incomplete Data!";
    }
?>
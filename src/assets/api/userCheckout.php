<?php
    require "init.php";
    $data = array();
    $id = $_POST["id"];
    $sql_query = "SELECT * FROM `user` WHERE id= $id ";
    $result = mysqli_query($con2, $sql_query);
    while($row=mysqli_fetch_assoc($result)){
        $data = array('Name'=>$row["Name"],'email'=>$row["email"],'phone1'=>$row["phone1"]);
    
    }
    mysqli_close($con1);
    mysqli_close($con2);
    echo json_encode($data);
    
?>
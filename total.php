<?php

   
    // Database details
    $d = "127.0.0.1";
    $u = "root";
    $p = "";
    $db = mysqli_connect($d, $u, $p, "avSearch");
    if (mysqli_connect_errno($db)) {
        echo "AV:Failed to connect to MySQL: " . mysqli_connect_error();
        exit();
    }

    $domain = "avDomains";

    // $item_select_moz = "SELECT min(mozPa),max(fbshares) FROM `".$domain."`";
    // $result_select_moz = mysqli_query($db, $item_select_moz);
    // $row = mysqli_fetch_assoc($result_select_moz);

    // $minMoz = intval($row["min(mozPa)"]);
    // $maxfbshares = intval($row["max(fbshares)"]);
    // if ($maxfbshares > 1000) {
    //     $mulForMoz = $maxfbshares /200;
    // }
    // else{
    //     $mulForMoz = $maxfbshares /15;
    // }
    $item_select = "SELECT ipfsHash, charCount, imgCount FROM `".$domain."` where ipfsHash is not null";
    $result_select = mysqli_query($db, $item_select);
    while ($row = mysqli_fetch_assoc($result_select)) {
        try {
          $total=0;
            $ipfsHash=$row["ipfsHash"];
            $charCount= $row["charCount"];
            $imgCount= $row["imgCount"];


            //Approx 50% for shares,10% for likes and 40% for pa.
            // Note that I feel log should ve avoided for likes and shares.
            if ($charCount>0) {
                $total+=$charCount;
            }
            if ($imgCount>0) {
                $total+=$imgCount/4;
            }

        
            $total=ceil($total);
            //echo $total;
      
            $insertquery="UPDATE `".$domain."` SET defaultPopularity='".$total."' WHERE ipfsHash='".$ipfsHash."'";
            $insert=mysqli_query($db, $insertquery);
            if (!$insert) {
                echo "insert failed - ",mysqli_error($db);
            }
        } catch (Exception $e1) {
            echo 'Caught exception: ',  $e1->getMessage(), "\n";
        }
    }

    mysqli_free_result($result_select);
    mysqli_close($db);
    
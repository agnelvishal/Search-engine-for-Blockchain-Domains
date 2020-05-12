<?php
try {

  //Diagnosis
  ini_set("display_errors", 1);
  error_reporting(E_ALL);

  // Database details
  $d = "127.0.0.1";
  $u = "root";
  $p = "";

  // $details = file_get_contents("../details.json");
  // $detail = json_decode($details, true);

  // $d = $detail["host"];
  // $p = $detail["password"];


  //Db connection
  $db = mysqli_connect($d, $u, $p, "avSearch");
  if (mysqli_connect_errno($db)) {
    echo "AV:Failed to connect to MySQL: " . mysqli_connect_error();
    exit();
  }

  $limitCount = $_GET["limit"];
  if (empty($_GET["limitStart"])) {
    $limitStart = 0;
  } else {
    $limitStart = $_GET["limitStart"];
  }
  $search = $_GET["search"];
  $advanced = $_GET["advanced"];
  $display = $_GET["display"];




  $site = "avDomains";


  $search = mysqli_real_escape_string($db, $search);
  $advanced = mysqli_real_escape_string($db, $advanced);
  $limitStart = mysqli_real_escape_string($db, $limitStart);
  $limitCount = mysqli_real_escape_string($db, $limitCount);
  $display = mysqli_real_escape_string($db, $display);

  //query generation for date


  if (!empty($search) and $advanced == "are") {
    $whereDateClause = " where";

    $whereDateClause .= "(url like '%";
    $whereDateClause .= $search;
    $whereDateClause .= "%'";
    $whereDateClause .= "or keywords like '%";
    $whereDateClause .= $search;
    $whereDateClause .= "%'";
    $whereDateClause .= "or author like '%";
    $whereDateClause .= $search;
    $whereDateClause .= "%'";
    $whereDateClause .= "or title like '%";
    $whereDateClause .= $search;
    $whereDateClause .= "%')";
  }


  $item_select1 = "SELECT count(*) as count FROM `" . $site . "`" . $whereDateClause;
  echo "ssssssssss";
  echo $item_select1;
  $result1 = mysqli_query($db, $item_select1);
  if (!$result1) {
    die('<div class="picked">Some problem : Consider sending a screenshot to agnelvishal@gmail.com </div>' . mysqli_error($db));
  }
  $rows1 = mysqli_fetch_assoc($result1);
  if ($rows1["count"] == 0) {
    die('<div class="picked">No articles found. Try different</div>' . mysqli_error($db));
  }

  $item_select = "SELECT ipfsHash,cryptoDomain FROM `" . $site . "`" . $whereDateClause . " order by defaultPopularity desc limit " . $limitStart . "," . $limitCount;

  // echo $item_select;

  $result = mysqli_query($db, $item_select);
  if (!$result) {
    die('Some Problem: Blame agnelvishal@gmail.com' . mysqli_error($db));
  }
  // Data being fetched for cards
  $table =  "<div class='picked'> Picked from " . number_format($rows1["count"]) . " domains in blockchain </div>";

  // if ($display == "cardView") {
  if (1) {
    $table .= '<div class="row">';

    while ($rows = mysqli_fetch_assoc($result)) {
      $table .=   '<div class="column"><div class="card">';

      $url = "https://gateway.ipfs.io/ipfs/";
      $url .= $rows["ipfsHash"];


      $table .= '<a target="_blank" href="' . $url . '" >';
      // $table .= '<img alt="Image" class="center-image" src="' . $rows["image"] . '">';
      $table .= '<p class="block-with-text"><span class="avtext">' . preg_replace('/u([a-fA-F0-9]{4})/', '&#x\\1;', $rows["cryptoDomain"]) . '</span></p>';
      $table .= '<div class="container">';
      $table .= '<div class="totalPopularity"> ' . number_format($rows["total"]) . '</div>';
      $table .= '<div class="meta">';
      $table .= '<div class="meta-item searchEngine"><p class="label ">Search Engine Popularity:</p><p>';
      $table .= number_format($rows["normMoz"]) . "</p></div>";
      $table .= '<div class="meta-item fb"><p class="label ">Facebook Shares:</p><p>';
      $table .= number_format($rows["fbshares"]) . "</p></div>";
      $table .= '<div class="meta-item fb"><p class="label">Facebook Likes:</p><p>';
      $table .= number_format($rows["fblikes"]) . "</p></div>";
      $table .= '<div class="meta-item reddit"><p class="label">Reddit:</p><p>';
      $table .= number_format($rows["reddit"]) . "</p></div>";
      $table .= '<div class="meta-item pinterest"><p class="label">Pinterest:</p><p>';
      $table .= number_format($rows["pinterest"]) . "</p></div>";
      $table .= '</div>';
      /*$table .= '<p class="description">';
                  $table .= $rows["description"];
                  $table .= '</p>';
                  */
      $table .= '</div></a></div><div onload="upvoteT(this)" onclick="upvotefn(this)" id="upvote" class="upvote" data-address="' . $rows["url"] . '"> Upvote</div></div>';
    }
    $table .= '</div>';

    echo $table;
  } else {
    mysqli_data_seek($result, 0);
    include "chartsScript.php";

    // Data being fetched from db for charts
    $table = "";
    while ($rows = mysqli_fetch_assoc($result)) {
      if ($rows["normMoz"] == null) {
        continue;
      }
      $adate = date_create($rows["date"]);
      // Not sure why I am subtracting a month.
      date_sub($adate, date_interval_create_from_date_string('1 month'));

      $table .= '{';
      $table .= 'x:Date.UTC(';
      $table .= date_format($adate, 'Y,m,d') . '),';
      $table .= 'y:';
      $table .= $rows["normMoz"] . ',';
      $table .= 'z:';
      $table .= $rows["total"] . ',';
      $table .= 'heading:';
      $table .= '\'';
      $table .=  addcslashes($rows["title"], "'");
      $table .= '\'' . ',';

      $table .= 'url:';
      $table .= '\'';
      $table .= $rows["url"];
      $table .= '\'';
      $table .= '}';
      $table .= ',';
    }
    echo $table; ?>

    ]}] });

    </script>

<?php

    mysqli_free_result($result);
    mysqli_close($db);
  }
} catch (Exception $e) {
  echo 'Caught exception: ',  $e->getMessage(), "\n";
}
echo '<div class="made"> <a target="_blank" href="https://sarchy.online/"> Made By Sarchy</a></div>';
echo '<div class="made"><a target="_blank" href="mailto:info@sarchy.online">  Contact us at info@sarchy.online </a> </div>';
echo '<div class="made"> <a target="_blank" href="https://github.com/agnelvishal/Search-engine-for-Blockchain-Domains-">Source code</a>.</div>';
echo '<div class="made">   <a target="_blank" href="https://t.me/SearchEnginePlus"> Join Telegram Group </a>.</div>';

?>
<?php

session_start();

if (file_exists( '../../includes/config.php' )) { require( '../../includes/includes.php'); }  else { header( 'Location: ../../install' );};
if(base64_decode($_SESSION['loggedin']) == 'true') {}
else { header('Location: ../../login.php'); }
if($username != 'admin') { header("Location: ../../"); }

if(isset($adminenabled) && $adminenabled != 'true'){ header("Location: ../../error-pages/403.html"); }

$v_ip = $_GET['ip'];
$v_chain = $_GET['chain'];

if ((!isset($_GET['ip'])) || ($_GET['ip'] == '')) { header('Location: ../list/fail2ban.php?error=1');}
elseif ((!isset($_GET['chain'])) || ($_GET['chain'] == '')) { header('Location: ../list/fail2ban.php?error=1');}

$postvars = array('user' => $vst_username,'password' => $vst_password,'returncode' => 'yes','cmd' => 'v-delete-firewall-ban','arg1' => $v_ip,'arg2' => $v_chain);

$curl0 = curl_init();
curl_setopt($curl0, CURLOPT_URL, $vst_url);
curl_setopt($curl0, CURLOPT_RETURNTRANSFER,true);
curl_setopt($curl0, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($curl0, CURLOPT_SSL_VERIFYHOST, false);
curl_setopt($curl0, CURLOPT_POST, true);
curl_setopt($curl0, CURLOPT_POSTFIELDS, http_build_query($postvars));
$r1 = curl_exec($curl0);

?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <link href="../../css/style.css" rel="stylesheet">
    </head>
    <body class="fix-header">
        <div class="preloader">
            <svg class="circular" viewBox="25 25 50 50">
                <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10" /> 
            </svg>
        </div>

        <form id="form" action="../list/fail2ban.php" method="post">
            <?php 
            echo '<input type="hidden" name="delcode" value="'.$r1.'">';
            ?>
        </form>
        <script type="text/javascript">
            document.getElementById('form').submit();
        </script>
    </body>
    <script src="../../plugins/bower_components/jquery/dist/jquery.min.js"></script>
</html>
<?php
include("connection.php");

// get date in yyyy-mm-dd format
$date = date('Y-m-d');

switch($_REQUEST['action']){
	case 'logProductivity':
        // sanitise and insert logs
        $cs_hours = mysqli_real_escape_string($conn, $_POST['cs_hours']);
        $msc_hours = mysqli_real_escape_string($conn, $_POST['msc_hours']);
        $b2a_hours = mysqli_real_escape_string($conn, $_POST['b2a_hours']);
        $random_hours = mysqli_real_escape_string($conn, $_POST['random_hours']);
        $statement = "INSERT INTO productivity (date, comp_sci, masters, b2a, random) VALUES('{$date}', '{$cs_hours}', '{$msc_hours}', '{$b2a_hours}', '{$random_hours}');";
        $result = mysqli_query($conn, $statement);
        if ($result) {
            $success = true;
            $error = '';
        } else {
            $success = false;
            $error = mysqli_error($conn);
        }

        // output a json string of the success and error variables back to the js
        $output = array('success' => $success, 'error' => $error);
        echo json_encode($output);
		break;

    case 'logHabits':
        // convert to 1 or 0 and insert logs
        $water_habit = ($_POST['water_habit'] == 'true') ? 1 : 0;
        $fruit_habit = ($_POST['fruit_habit'] == 'true') ? 1 : 0;
        $supplements_habit = ($_POST['supplements_habit'] == 'true') ? 1 : 0;
        $calories_habit = ($_POST['calories_habit'] == 'true') ? 1 : 0;
        $statement = "INSERT INTO habits (date, water, fruit, supplements, calories) VALUES('{$date}', '{$water_habit}', '{$fruit_habit}', '{$supplements_habit}', '{$calories_habit}');";
        $result = mysqli_query($conn, $statement);
        if ($result) {
            $success = true;
            $error = '';
        } else {
            $success = false;
            $error = mysqli_error($conn);
        }

        // output a json string of the success and error variables back to the js
        $output = array('success' => $success, 'error' => $error);
        echo json_encode($output);
		break;

    case 'logJournal':
        // sanitise and insert logs
        $journal_type = mysqli_real_escape_string($conn, $_POST['journal_type']);
        $journal_focus = mysqli_real_escape_string($conn, $_POST['journal_focus']);
        $journal_wins = mysqli_real_escape_string($conn, $_POST['journal_wins']);
        $journal_challenges = mysqli_real_escape_string($conn, $_POST['journal_challenges']);
        $journal_reflect = mysqli_real_escape_string($conn, $_POST['journal_reflect']);
        $statement = "INSERT INTO journal (date, type, reflection, wins, challenges, focus) VALUES('{$date}', '{$journal_type}', '{$journal_reflect}', '{$journal_wins}', '{$journal_challenges}', '{$journal_focus}');";
        $result = mysqli_query($conn, $statement);
        if ($result) {
            $success = true;
            $error = '';
        } else {
            $success = false;
            $error = mysqli_error($conn);
        }

        // output a json string of the success and error variables back to the js
        $output = array('success' => $success, 'error' => $error);
        echo json_encode($output);
		break;

    case 'logMartialArts':
        // sanitise and insert logs
        $martial_title = mysqli_real_escape_string($conn, $_POST['martial_title']);
        $martial_h1 = mysqli_real_escape_string($conn, $_POST['martial_h1']);
        $martial_p1 = mysqli_real_escape_string($conn, $_POST['martial_p1']);
        $martial_h2 = mysqli_real_escape_string($conn, $_POST['martial_h2']);
        $martial_p2 = mysqli_real_escape_string($conn, $_POST['martial_p2']);
        $martial_h3 = mysqli_real_escape_string($conn, $_POST['martial_h3']);
        $martial_p3 = mysqli_real_escape_string($conn, $_POST['martial_p3']);
        $statement = "INSERT INTO martial_arts (date, title, h1, p1, h2, p2, h3, p3) VALUES('{$date}', '{$martial_title}', '{$martial_h1}', '{$martial_p1}', '{$martial_h2}', '{$martial_p2}', '{$martial_h3}', '{$martial_p3}');";
        $result = mysqli_query($conn, $statement);
        if ($result) {
            $success = true;
            $error = '';
        } else {
            $success = false;
            $error = mysqli_error($conn);
        }

        // output a json string of the success and error variables back to the js
        $output = array('success' => $success, 'error' => $error);
        echo json_encode($output);
		break;
    
    case 'getProductivity': 
        $statement = "SELECT * FROM productivity WHERE YEARWEEK(date, 1) = YEARWEEK(NOW()) ORDER BY date;";
        $result = mysqli_query($conn, $statement);
        $output = array();
        if(!$result){
            echo mysqli_error($conn);
        } else {
            while($row = mysqli_fetch_assoc($result)) {
                $output[] = $row;
            }
        }
        
        echo json_encode($output);
        break;

    case 'getHabits': 
        $statement = "SELECT * FROM habits WHERE YEARWEEK(date, 1) = YEARWEEK(NOW()) ORDER BY date;";
        $result = mysqli_query($conn, $statement);
        $output = array();
        if(!$result){
            echo mysqli_error($conn);
        } else {
            while($row = mysqli_fetch_assoc($result)) {
                $output[] = $row;
            }
        }
        
        echo json_encode($output);
        break;

    case 'getJournal':     
        $statement = "SELECT * FROM journal ORDER BY id DESC LIMIT 1;";
        $result = mysqli_query($conn, $statement);
        $output = array();
        if(!$result){
            echo mysqli_error($conn);
        } else {
            while($row = mysqli_fetch_assoc($result)) {
                $output[] = $row;
            }
        }
        
        echo json_encode($output);
        break;

    case 'getMartialArts': 
        $statement = "SELECT * FROM martial_arts WHERE YEARWEEK(date, 1) = YEARWEEK(NOW()) ORDER BY date;";
        $result = mysqli_query($conn, $statement);
        $output = array();
        if(!$result){
            echo mysqli_error($conn);
        } else {
            while($row = mysqli_fetch_assoc($result)) {
                $output[] = $row;
            }
        }
        
        echo json_encode($output);
        break;
    
        case 'getProductivityHistory': 
            $statement = "SELECT * FROM productivity ORDER BY date;";
            $result = mysqli_query($conn, $statement);
            $output = array();
            if(!$result){
                echo mysqli_error($conn);
            } else {
                while($row = mysqli_fetch_assoc($result)) {
                    $output[] = $row;
                }
            }
            
            echo json_encode($output);
            break;
    
        case 'getHabitsHistory': 
            $statement = "SELECT * FROM habits ORDER BY date;";
            $result = mysqli_query($conn, $statement);
            $output = array();
            if(!$result){
                echo mysqli_error($conn);
            } else {
                while($row = mysqli_fetch_assoc($result)) {
                    $output[] = $row;
                }
            }
            
            echo json_encode($output);
            break;
    
        case 'getJournalHistory':     
            $statement = "SELECT * FROM journal ORDER BY id DESC;";
            $result = mysqli_query($conn, $statement);
            $output = array();
            if(!$result){
                echo mysqli_error($conn);
            } else {
                while($row = mysqli_fetch_assoc($result)) {
                    $output[] = $row;
                }
            }
            
            echo json_encode($output);
            break;
    
        case 'getMartialArtsHistory': 
            $statement = "SELECT * FROM martial_arts ORDER BY date;";
            $result = mysqli_query($conn, $statement);
            $output = array();
            if(!$result){
                echo mysqli_error($conn);
            } else {
                while($row = mysqli_fetch_assoc($result)) {
                    $output[] = $row;
                }
            }
            
            echo json_encode($output);
            break;

    default:
    // If no action request sent by ajax call
	echo "No action was provided";

}


?>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>LifeTracker History</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <link rel="stylesheet" href="main.css">
    <script src='history.js' defer></script>
</head>

<body>
    <?php include 'header.php';?>
    <div class="main">
        <div class="text-center">
            <div class="btn-group text-center" id="history_buttons">
                <input id="getProductivityHistory" class="btn btn-primary btn-lg" type="button" value="Productivity">
                <input id="getHabitsHistory" class="btn btn-warning btn-lg" type="button" value="Habits">
                <input id="getJournalHistory" class="btn btn-info btn-lg" type="button" value="Journal">
                <input id="getMartialArtsHistory" class="btn btn-dark btn-leg" type="button" value="Martial Arts">
            </div>
        </div>
        <div id="productivity_summary" class="table-responsive"></div>
        <div id="habits_summary" class="table-responsive"></div>
        <div id="journal_summary"></div>
        <div id="martial_arts_summary"></div>
    </div>
    <?php include 'footer.php';?>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
</body>
</html>
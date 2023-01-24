<!DOCTYPE html>
<html lang="en">
<head>
    <title>LifeTracker</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <link rel="stylesheet" href="main.css">
    <script src='main.js' defer></script>
</head>

<body>
    <?php include 'header.php';?>
    <div class="main">
        
        <div class="form-group" id="productivity">
            <h2>Productivity👨🏻‍💻</h2>
            <label for="cs_hours">Computer Science</label>
            <input class="form-control" id="cs_hours" type="number" value="0.0" step="0.25" min="0" max="10" required />
            <label for="msc_hours">Masters Degree</label>
            <input class="form-control" id="msc_hours" type="number" value="0.0" step="0.25" min="0" max="10" required />
            <label for="b2a_hours">B2A</label>
            <input class="form-control" id="b2a_hours" type="number" value="0.0" step="0.25" min="0" max="10" required />
            <label for="random_hours">Random</label>
            <input class="form-control" id="random_hours" type="number" value="0.0" step="0.25" min="0" max="10" required />
        </div>
        <div class="form-group" id="habits">
            <h2>Habits📊</h2>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="water_habit">
                <label class="form-check-label" for="water_habit">Water</label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="fruit_habit">
                <label class="form-check-label" for="fruit_habit">Fruit</label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="supplements_habit">
                <label class="form-check-label" for="supplements_habit">Supplements</label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="calories_habit">
                <label class="form-check-label" for="calories_habit">Calories</label>
            </div>
        </div>
        <div id="journal">
            <h2>Journal📙</h2>
        </div>
        <div id="martial_arts" class="form-group">
            <input class="btn btn-dark" type="button" value="Log Martial Arts" id="display_martial_arts">
        </div>
        <input class="btn btn-primary btn-block" type="button" value="Add Log" id='add_log'>
    
    </div>
    <?php include 'footer.php';?>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
</body>
</html>
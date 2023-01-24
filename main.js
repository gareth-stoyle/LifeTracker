$(function() {
    /**
     * on page load, check if day is sunday or not, fill journal section based on this information
     */
    let colors = [
        "purple",
        "blue",
        "green",
        "orange"
    ];
    let randomIndex = Math.floor(Math.random() * colors.length);
    $("body").addClass(colors[randomIndex]);
    const date = new Date();
    // returns day of week as number from 1-7
    let day = date.getDay();
    if (day == 7) {
        // populate journal div for weekly reflection
        $('#journal').append("<div class='form-group'><textarea class='form-control' rows='3' id='journal_wins' placeholder='Wins this week...' />");
        $('#journal').append("<div class='form-group'><textarea class='form-control' rows='3' id='journal_challenges' placeholder='Challenges this week...' /><");
        $('#journal').append("<div class='form-group'><textarea class='form-control' rows='3' id='journal_focus' placeholder='Focus for next week...' />");
    } else {
        // populate journal div for daily reflection
        $('#journal').append("<div class='form-group'><textarea class='form-control' rows='3' id='journal_reflect' placeholder='How was today?' />");
        $('#journal').append("<div class='form-group'><textarea class='form-control' rows='3' id='journal_focus' placeholder='Focus for tomorrow...' />");
    }
});

$(document).on('click', '#display_martial_arts', function(e){
    /**
     * provide inputs for logging martial arts
     */
    $('#martial_arts').html('');
    $('#martial_arts').append("<h2>Martial Arts🥷🏼</h2>");
    $('#martial_arts').append("<div class='form-group'><input id='martial_title' class='form-control' type='text' name='title' placeholder='Title' />");
    $('#martial_arts').append("<div class='form-group'><input id='martial_h1' class='form-control' type='text' name='h1' placeholder='Heading' />");
    $('#martial_arts').append("<div class='form-group'><textarea class='form-control' rows='3' id='martial_p1' placeholder='Description' />");
    $('#martial_arts').append("<div class='form-group'><input id='martial_h2' class='form-control' type='text' name='h2' placeholder='Heading' />");
    $('#martial_arts').append("<div class='form-group'><textarea class='form-control' rows='3' id='martial_p2' placeholder='Description' />");
    $('#martial_arts').append("<div class='form-group'><input id='martial_h3' class='form-control' type='text' name='h3' placeholder='Heading' />");
    $('#martial_arts').append("<div class='form-group'><textarea class='form-control' rows='3' id='martial_p3' placeholder='Description' />");
    // button to remove martial arts section
    $('#martial_arts').append("<input class='btn btn-danger' type='button' value='Remove Section' id='remove_martial_arts' />");
});

$(document).on('click', '#remove_martial_arts', function(e){
    /**
     * remove martial arts section
     */
    $('#martial_arts').html('');
    $('#martial_arts').append("<input class='btn btn-dark' type='button' value='Log Martial Arts' id='display_martial_arts' />");
});

$(document).on('click', '#add_log', function(e){
    /**
     * Log various entries to their respective places using calls to logger functions
     */
    let cs_hours = $('#cs_hours').val();
    let msc_hours = $('#msc_hours').val();
    let b2a_hours = $('#b2a_hours').val();
    let random_hours = $('#random_hours').val();

    let water_habit = $('#water_habit').is(":checked");
    let fruit_habit = $('#fruit_habit').is(":checked");
    let supplements_habit = $('#supplements_habit').is(":checked");
    let calories_habit = $('#calories_habit').is(":checked");
    
    let journal_focus = $('#journal_focus').val();

    let martial_title = $('#martial_title').val();
    let martial_h1 = $('#martial_h1').val();
    let martial_p1 = $('#martial_p1').val();
    let martial_h2 = $('#martial_h2').val();
    let martial_p2 = $('#martial_p2').val();
    let martial_h3 = $('#martial_h3').val();
    let martial_p3 = $('#martial_p3').val();

    if (cs_hours != '' && msc_hours != '' && b2a_hours != '' && random_hours != '') {
        logProductivity(cs_hours, msc_hours, b2a_hours, random_hours);
    } else {
        alert("Information incomplete!");
        return;
    }

    logHabits(water_habit, fruit_habit, supplements_habit, calories_habit);
    
    const date = new Date();
    // returns day of week as number from 1-7
    let day = date.getDay();
    if (journal_focus != '' && day == 7) {
        let journal_type = 'weekly';
        let journal_wins = $('#journal_wins').val();
        let journal_challenges = $('#journal_challenges').val();
        logJournal(journal_type, journal_focus, journal_wins, journal_challenges, '');
    } else if (journal_focus != '' && day != 7) {
        let journal_type = 'daily';
        let journal_reflect = $('#journal_reflect').val();
        logJournal(journal_type, journal_focus, '', '', journal_reflect);
    } else {
        alert("Information incomplete!");
        return;
    }

    // log martial arts if heading is present and fields aren't empty
    if ($('#martial_title').length) {
        if (martial_title != '' && martial_h1 != '' && martial_p1 != '') {
            logMartialArts(martial_title, martial_h1, martial_p1, martial_h2, martial_p2, martial_h3, martial_p3);
        } else {
            alert("Information incomplete!");
            return;
        }
    }

    setTimeout(function(){location.href = 'summary.php';},1000);
});


function logProductivity(cs_hours, msc_hours, b2a_hours, random_hours) {
    /**
     * Log hours worked to database
     */
    // ajax call to send log details to php file
    url = "ajax.php"; 
    $.ajax({ 
            data: {"action": "logProductivity", "cs_hours": cs_hours, "msc_hours": msc_hours, "b2a_hours": b2a_hours, "random_hours": random_hours}, 
            url: url, 
            type: "POST", 
            dataType: "json" 
    }).always(function(response) { 
        console.log(response);
    }).fail(function(response) {
        // error message
        console.log("Ajax fail, see logs");
    });
}

function logHabits(water_habit, fruit_habit, supplements_habit, calories_habit) {
    /**
     * Log habits to database
     */
    // ajax call to send log details to php file
    url = "ajax.php"; 
    $.ajax({ 
            data: {"action": "logHabits", "water_habit": water_habit, "fruit_habit": fruit_habit, "supplements_habit": supplements_habit, "calories_habit": calories_habit}, 
            url: url, 
            type: "POST", 
            dataType: "json" 
    }).always(function(response) { 
        console.log(response);
    }).fail(function(response) {
        // error message
        console.log("Ajax fail, see logs");
    });
}

function logJournal(j_type, j_focus, j_wins, j_challenges, j_reflect) {
    /**
     * Log journal to database
     */
    // ajax call to send log details to php file
    url = "ajax.php"; 
    $.ajax({ 
            data: {"action": "logJournal", "journal_focus": j_focus, "journal_wins": j_wins, "journal_challenges": j_challenges, "journal_reflect": j_reflect, "journal_type": j_type}, 
            url: url, 
            type: "POST", 
            dataType: "json" 
    }).always(function(response) { 
        console.log(response);
    }).fail(function(response) {
        // error message
        console.log("Ajax fail, see logs");
    });
}

function logMartialArts(martial_title, martial_h1, martial_p1, martial_h2, martial_p2, martial_h3, martial_p3) {
    /**
     * Log to database
     */
    // ajax call to send log details to php file
    url = "ajax.php"; 
    $.ajax({ 
            data: {"action": "logMartialArts", "martial_title": martial_title, "martial_h1": martial_h1, "martial_p1": martial_p1, "martial_h2": martial_h2, "martial_p2": martial_p2, "martial_h3": martial_h3, "martial_p3": martial_p3}, 
            url: url, 
            type: "POST", 
            dataType: "json" 
    }).always(function(response) { 
        console.log(response);
    }).fail(function(response) {
        // error message
        console.log("Ajax fail, see logs");
    });
}
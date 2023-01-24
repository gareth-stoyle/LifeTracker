$(document).ready(function() {
    let colors = [
      "purple",
      "blue",
      "green",
      "orange"
    ];
    let randomIndex = Math.floor(Math.random() * colors.length);
    $("body").addClass(colors[randomIndex]);
});

$(document).on('click', '#getProductivityHistory', function(e){
    /**
     * Retrieve all productivity logs from db
    */
    // cancel the event from doing its default action
    e.preventDefault();
    $('#productivity_summary').html('');
    $('#habits_summary').html('');
    $('#journal_summary').html('');
    $('#martial_arts_summary').html('');
    url = "ajax.php";
    // ajax call to retrieve logs using php file
    $.ajax({
        data: {"action": "getProductivityHistory"}, 
        url: url, 
        type: "POST", 
        dataType: "json" 
    }).done(function(response){
        let cs_total = 0;
        let msc_total = 0;
        let b2a_total = 0;
        let random_total = 0;
        console.log(response);
        $('#productivity_summary').append("<h2 class='text-center'>Productivity👨🏻‍💻</h2><table class='table table-hover table-sm' id='productivity_table'><thead class='thead-dark'><tr><th>Day</th><th>CS Learning</th><th>Masters</th><th>B2A</th><th>Random</th><th>Total</th></tr></thead></table>");
        $.each(response, function(index, log){
            cs_total += parseFloat(log.comp_sci);
            msc_total += parseFloat(log.masters);
            b2a_total += parseFloat(log.b2a);
            random_total += parseFloat(log.random);
            let date = new Date(log.date).toLocaleDateString('en-UK', { weekday: 'long' });
            let total = parseFloat(log.comp_sci) + parseFloat(log.masters) + parseFloat(log.b2a) + parseFloat(log.random);
            $('#productivity_table').append(`<tr><td>${date}</td><td>${htmlEncode(log.comp_sci)}</td><td>${htmlEncode(log.masters)}</td><td>${htmlEncode(log.b2a)}</td><td>${htmlEncode(log.random)}</td><td><strong>${total}</strong></td></tr>`);
            if (date == 'Sunday') {
                let weekly_total = cs_total + msc_total + b2a_total + random_total;
                $('#productivity_table').append(`<tr class='table-secondary'><td>Total</td><td>${cs_total}</td><td>${msc_total}</td><td>${b2a_total}</td><td>${random_total}</td><td>${weekly_total}</td></tr>`);
                cs_total = 0;
                msc_total = 0;
                b2a_total = 0;
                random_total = 0;   
            }
        });
        let weekly_total = cs_total + msc_total + b2a_total + random_total;
        $('#productivity_table').append(`<tr class='table-secondary'><td>Total</td><td>${cs_total}</td><td>${msc_total}</td><td>${b2a_total}</td><td>${random_total}</td><td>${weekly_total}</td></tr>`);
    }).fail(function(response) {
        console.log(response);
    });
});

$(document).on('click', '#getHabitsHistory', function(e){
    /**
     * Retrieve all habit logs from db
    */
    // cancel the event from doing its default action
    e.preventDefault();
    $('#productivity_summary').html('');
    $('#habits_summary').html('');
    $('#journal_summary').html('');
    $('#martial_arts_summary').html('');
    url = "ajax.php";
    // ajax call to retrieve logs using php file
    $.ajax({
        data: {"action": "getHabitsHistory"}, 
        url: url, 
        type: "POST", 
        dataType: "json" 
    }).done(function(response){
        let water_total = 0;
        let fruit_total = 0;
        let supplements_total = 0;
        let calories_total = 0;
        console.log(response);
        $('#habits_summary').append("<h2 class='text-center'>Habits📊</h2><table class='table table-hover table-sm' id='habits_table'><thead class='thead-dark'><tr><th>Water</th><th>Fruit</th><th>Supplements</th><th>Calories</th></tr></thead></table>");
        $.each(response, function(index, log){
            water_total += parseFloat(log.water);
            fruit_total += parseFloat(log.fruit);
            supplements_total += parseFloat(log.supplements);
            calories_total += parseFloat(log.calories);
            $('#habits_table').append(`<tr><td>${htmlEncode((log.water==1) ? '✅' : '❌')}</td><td>${htmlEncode((log.fruit==1) ? '✅' : '❌')}</td><td>${htmlEncode((log.supplements==1) ? '✅' : '❌')}</td><td>${htmlEncode((log.calories==1) ? '✅' : '❌')}</td></tr>`);
            let date = new Date(log.date).toLocaleDateString('en-UK', { weekday: 'long' });
            if (date == 'Sunday') {
                $('#habits_table').append(`<tr class='table-secondary' ><td>${water_total}</td><td>${fruit_total}</td><td>${supplements_total}</td><td>${calories_total}</td></tr>`);
                water_total = 0;
                fruit_total = 0;
                supplements_total = 0;
                calories_total = 0;
            }
        });
        $('#habits_table').append(`<tr class='table-secondary'><td>${water_total}</td><td>${fruit_total}</td><td>${supplements_total}</td><td><strong>${calories_total}</strong></td></tr>`);
    }).fail(function(response) {
        console.log(response);
    });
});

$(document).on('click', '#getJournalHistory', function(e){
    /**
     * Retrieve all journal logs from db
    */
    // cancel the event from doing its default action
    e.preventDefault();
    $('#productivity_summary').html('');
    $('#habits_summary').html('');
    $('#journal_summary').html('');
    $('#martial_arts_summary').html('');
    url = "ajax.php";
    // ajax call to retrieve logs using php file
    $.ajax({
        data: {"action": "getJournalHistory"}, 
        url: url, 
        type: "POST", 
        dataType: "json" 
    }).done(function(response){
        console.log(response);
        let month = new Date(response[0].date).toLocaleDateString('en-UK', { month: 'long' });
        $('#journal_summary').append(`<h2 class='text-center'>Journal📙</h2><h3>${month}</h3>`);
        $.each(response, function(index, log){
            let month1 = new Date(response[0].date).toLocaleDateString('en-UK', { month: 'long' });
            let month2 = month1.slice();
            if (month1 != month2) {
                $('#journal_summary').append("<h3>${month1}</h3>");
                month2 = month1.slice();
            }

            if (log.type == 'daily') {
                $('#journal_summary').append(`<div class='row'><div class='col-sm-6'><div class='card h-100 journal_summary_reflection'><h4 class='card-header text-white bg-secondary'>Reflection</h4><div class='card-body'><p class='card-text'>${htmlEncode(log.reflection)}</p></div></div></div><div class='col-sm-6'><div class='card h-100 journal_summary_focus'><h4 class='card-header text-white bg-secondary'>Tomorrow's Focus</h4><div class='card-body'><p class='card-text'>${htmlEncode(log.focus)}</p></div></div></div></div>`);
            } else {
                $('#journal_summary').append(`<div class='row'><div class='col-sm-4'><div class='card h-100 journal_summary_wins'><h4 class='card-header text-white bg-primary'>Wins</h4><div class='card-body'><p class='card-text'>${htmlEncode(log.wins)}</p></div></div></div><div class='col-sm-4'><div class='card h-100 journal_summary_challenges'><h4 class='card-header text-white bg-success'>Challenges</h4><div class='card-body'><p class='card-text'>${htmlEncode(log.challenges)}</p></div></div></div><div class='col-sm-4'><div class='card h-100 journal_summary_focus'><h4 class='card-header text-white bg-warning'>Next Week</h4><div class='card-body'><p class='card-text'>${htmlEncode(log.focus)}</p></div></div></div></div>`);
            }
            month1 = new Date(log.date).toLocaleDateString('en-UK', { month: 'long' });
        });
    }).fail(function(response) {
        console.log(response);
    });
});

$(document).on('click', '#getMartialArtsHistory', function(e){
    /**
     * Retrieve all martial arts logs from db
    */
    // cancel the event from doing its default action
    e.preventDefault();
    $('#productivity_summary').html('');
    $('#habits_summary').html('');
    $('#journal_summary').html('');
    $('#martial_arts_summary').html('');
    url = "ajax.php";
    // ajax call to retrieve logs using php file
    $.ajax({
        data: {"action": "getMartialArtsHistory"}, 
        url: url, 
        type: "POST", 
        dataType: "json" 
    }).done(function(response){
        console.log(response);
        let count = 1;
        let month = new Date(response[0].date).toLocaleDateString('en-UK', { month: 'long' });
        $('#martial_arts_summary').append(`<h2 class='text-center'>Martial Arts🥷🏼</h2><h3>${month}</h3>`);
        $.each(response, function(index, log){
            let month1 = new Date(response[0].date).toLocaleDateString('en-UK', { month: 'long' });
            let month2 = month1.slice();
            if (month1 != month2) {
                $('#martial_arts_summary').append("<h3>${month1}</h3>");
                month2 = month1.slice();
            }
            $('#martial_arts_summary').append(`<div class='card h-100'id='martial_arts_${count}'><h3 class='card-header text-white bg-warning'>${htmlEncode(log.title)}</h3><div class='card-body'><h4 class='card-title'>${htmlEncode(log.h1)}</h4><p class='card-text'>${htmlEncode(log.p1)}</p><h4 class='card-title'>${htmlEncode(log.h2)}</h4><p class='card-text'>${htmlEncode(log.p2)}</p><h4 class='card-title'>${htmlEncode(log.h3)}</h4><p class='card-text'>${htmlEncode(log.p3)}</p></div></div>`);
            count++;
        });
    }).fail(function(response) {
        console.log(response);
    });
});


function htmlEncode(str){
    /**
     * Escape html characters to prevent XSS
    */
    return String(str).replace(/[^\w. ]/gi, function(c){
        return '&#'+c.charCodeAt(0)+';';
    });
}
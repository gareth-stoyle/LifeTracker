$(function() {
    /**
     * on page load, check if day is sunday or not, run functions to populate page divs
     */
    const date = new Date();
    let day = date.getDay();
    let type = (day == 7) ? 'weekly' : 'daily';
    getProductivity(type);
    getHabits(type);
    getJournal();
    getMartialArts(type);
});

function getProductivity(type) {
    /**
     * Retrieve productivity logs from db
    */
    url = "ajax.php";
    // ajax call to retrieve logs using php file
    $.ajax({
        data: {"action": "getProductivity"}, 
        url: url, 
        type: "POST", 
        dataType: "json" 
    }).done(function(response){
        let cs_total = 0;
        let msc_total = 0;
        let b2a_total = 0;
        let random_total = 0;
        console.log(response);
        $('#productivity_summary').html('');
        $('#productivity_summary').append("<table class='table table-hover table-sm' id='productivity_table'><thead class='thead-dark'><tr><th>Day</th><th>CS Learning</th><th>Masters</th><th>B2A</th><th>Random</th><th>Total</th></tr></thead></table>");
        $.each(response, function(index, log){
            cs_total += parseFloat(log.comp_sci);
            msc_total += parseFloat(log.masters);
            b2a_total += parseFloat(log.b2a);
            random_total += parseFloat(log.random);
            let date = new Date(log.date).toLocaleDateString('en-UK', { weekday: 'long' });
            let total = parseFloat(log.comp_sci) + parseFloat(log.masters) + parseFloat(log.b2a) + parseFloat(log.random);
            $('#productivity_table').append(`<tr><td>${date}</td><td>${log.comp_sci}</td><td>${log.masters}</td><td>${log.b2a}</td><td>${log.random}</td><td><strong>${total}</strong></td></tr>`);
        });
        let weekly_total = cs_total + msc_total + b2a_total + random_total;
        $('#productivity_table').append(`<tr class='table-secondary'><td>Total</td><td>${cs_total}</td><td>${msc_total}</td><td>${b2a_total}</td><td>${random_total}</td><td>${weekly_total}</td></tr>`);
        if (type == 'weekly') {
            // add stats of hours worked, cs hours worked (cs and msc)
            $('#stats_summary').append(`<p>Total hours worked: ${weekly_total}</p>`);
            $('#stats_summary').append(`<p>Total CS Learning: ${cs_total+msc_total}</p>`);
        }
    }).fail(function(response) {
        console.log(response);
    });
}

function getHabits(type) {
    /**
     * Retrieve habit logs from db
    */
    url = "ajax.php";
    // ajax call to retrieve logs using php file
    $.ajax({
        data: {"action": "getHabits"}, 
        url: url, 
        type: "POST", 
        dataType: "json" 
    }).done(function(response){
        let water_total = 0;
        let fruit_total = 0;
        let supplements_total = 0;
        let calories_total = 0;
        let rows = 0;
        console.log(response);
        $('#habits_summary').html('');
        $('#habits_summary').append("<table class='table table-hover table-sm' id='habits_table'><thead class='thead-dark'><tr><th>Water</th><th>Fruit</th><th>Supplements</th><th>Calories</th></tr></thead></table>");
        $.each(response, function(index, log){
            rows++;
            water_total += parseFloat(log.water);
            fruit_total += parseFloat(log.fruit);
            supplements_total += parseFloat(log.supplements);
            calories_total += parseFloat(log.calories);
            $('#habits_table').append(`<tr><td>${htmlEncode(log.water)}</td><td>${htmlEncode(log.fruit)}</td><td>${htmlEncode(log.supplements)}</td><td>${htmlEncode(log.calories)}</td></tr>`);
        });
        $('#habits_table').append(`<tr class='table-secondary'><td>${water_total}</td><td>${fruit_total}</td><td>${supplements_total}</td><td>${calories_total}</td></tr>`);
        if (type == 'weekly') {
            // add habit stats, with average
            let weekly_total = water_total + fruit_total + supplements_total + calories_total;
            $('#stats_summary').append(`<p>Habit Completion: ${parseInt((weekly_total/(rows*4))*100)}%</p>`);
        }
    }).fail(function(response) {
        console.log(response);
    });
}

function getJournal() {
    /**
     * Retrieve journal logs from db
    */
    url = "ajax.php";
    // ajax call to retrieve logs using php file
    $.ajax({
        data: {"action": "getJournal"}, 
        url: url, 
        type: "POST", 
        dataType: "json" 
    }).done(function(response){
        console.log(response);
        $('#journal_summary').html('');
        if (response[0].type == 'daily') {
            $('#journal_summary').append(`<div class='row'><div class='col-sm-6'><div class='card h-100 journal_summary_reflection'><h4 class='card-header text-white bg-secondary'>Reflection</h4><div class='card-body'><p class='card-text'>${htmlEncode(response[0].reflection)}</p></div></div></div><div class='col-sm-6'><div class='card h-100 journal_summary_focus'><h4 class='card-header text-white bg-secondary'>Tomorrow's Focus</h4><div class='card-body'><p class='card-text'>${htmlEncode(response[0].focus)}</p></div></div></div></div>`);
        } else {
            $('#journal_summary').append(`<div class='row'><div class='col-sm-4'><div class='card h-100 journal_summary_wins'><h4 class='card-header text-white bg-primary'>Wins</h4><div class='card-body'><p class='card-text'>${htmlEncode(response[0].wins)}</p></div></div></div><div class='col-sm-4'><div class='card h-100 journal_summary_challenges'><h4 class='card-header text-white bg-success'>Challenges</h4><div class='card-body'><p class='card-text'>${htmlEncode(response[0].challenges)}</p></div></div></div><div class='col-sm-4'><div class='card h-100 journal_summary_focus'><h4 class='card-header text-white bg-warning'>Next Week</h4><div class='card-body'><p class='card-text'>${htmlEncode(response[0].focus)}</p></div></div></div></div>`);
        }
    }).fail(function(response) {
        console.log(response);
    });
}

function getMartialArts(type) {
    /**
     * Retrieve martial arts logs from db
    */
    url = "ajax.php";
    // ajax call to retrieve logs using php file
    $.ajax({
        data: {"action": "getMartialArts"}, 
        url: url, 
        type: "POST", 
        dataType: "json" 
    }).done(function(response){
        console.log(response);
        let count = 1;
        $('#martial_arts_summary').html('');
        $.each(response, function(index, log){
            $('#martial_arts_summary').append(`<div class='card h-100'id='martial_arts_${count}'><h3 class='card-header text-white bg-warning'>${htmlEncode(log.title)}</h3><div class='card-body'><h4 class='card-title'>${htmlEncode(log.h1)}</h4><p class='card-text'>${htmlEncode(log.p1)}</p><h4 class='card-title'>${htmlEncode(log.h2)}</h4><p class='card-text'>${htmlEncode(log.p2)}</p><h4 class='card-title'>${htmlEncode(log.h3)}</h4><p class='card-text'>${htmlEncode(log.p3)}</p></div></div>`);
            count++;
        });
    }).fail(function(response) {
        console.log(response);
    });

    if (type == 'weekly') {
        $('#martial_arts_summary').html('');
        $('#stats_summary').append(`<p>Martial Arts Sessions: ${count}%</p>`);
    }
}


function htmlEncode(str){
    /**
     * Escape html characters to prevent XSS
    */
    return String(str).replace(/[^\w. ]/gi, function(c){
        return '&#'+c.charCodeAt(0)+';';
    });
}
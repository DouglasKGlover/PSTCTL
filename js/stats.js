var gamesList = [];
for(var i in listList){
    var currentList = listList[i]+"List";
    for(var j in window[currentList]){
        gamesList.push(window[currentList][j][0]);
    }
}

var report = {};
$.each(gamesList,function(x,y){
    report[y] = report[y] + 1 || 1;
});

var newDivs = {};
$.each(report,function(x,y){
    newDivs[y] = newDivs[y] + 1 || 1;
});

$.each(newDivs,function(x,y){
    $("#listContainer").prepend(
        "<div id='list-" + x + "'><h2>" + y + " Games in " + x + " lists</h2></div>"
    );
});

var games = [];
$.each(report, function (x, y) {
    games.push([x, y]);
    //console.log(x);
});

games.sort();
$.each(games, function (x, y) {
    console.log(x + ": " + y[0]);
    $("#list-"+y[1]).append("<p>" + y[0] + "</p>");
});

$.each(report,function(x,y){
    //$("#list-"+y).append("<p>" + x + "</p>");
});
// Global variables
var the = getCookie(listName + "ListProd2");
var theList = the.split(",");
var trophyCount = 0;
var anyTrophies = 0;
var hidden = "false";
var thisList = listName+"List";
var thisCounter = 1;

// Function for getting a cookie
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

// Function to select local text
function selectText(element) {
    var doc = document
        , text = doc.getElementById(element)
        , range, selection
        ;
    if (doc.body.createTextRange) { //ms
        range = doc.body.createTextRange();
        range.moveToElementText(text);
        range.select();
    } else if (window.getSelection) { //all others
        selection = window.getSelection();
        range = doc.createRange();
        range.selectNodeContents(text);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}

// Create divs w/ trophy content
for(var i in window[thisList]){
    $("#list-container").append(""+
        "<div class='row list-item' id='"+ listName +"-"+ thisCounter +"'>"+
        "<div class='col-xs-1'>"+
        "<input type='checkbox' class='checkbox'/>"+
        "</div>"+
        "<div class='col-xs-1 trophy-icon'>"+
        "<img src='"+ window[thisList][i][0] +"' alt='Trophy Icon'/>"+
        "</div>"+
        "<div class='col-sm-10 col-xs-12'>"+
        "<h2>"+ window[thisList][i][1] +"</h2>"+
        "<p>"+ window[thisList][i][2] +"</p>"+
        "</div>"+
        "</div>"+
    "");
    thisCounter++;
}

// Variable has to instantiate AFTER trophy list has been built (above)
var trophiesInList = $('input[type=checkbox]').size();

// List of lists for home page
// NOTE: Replace w/ lists.js implementation?
var homePageLists = [
    "christmas",
    "custom-list-1",
    "custom-list-2",
    "apple",
    "bread",
    "dafaztfingaz",
    "fletch",
    "football",
    "germain",
    "glenn",
    "harry",
    "irvine",
    "labartu",
    "mendel",
    "olsen",
    "phantom",
    "sav",
    "shadow",
    "tech",
    "terminator",
    "tuffmuff",
    "vyrastas",
    "woody"
];

// Logic for home page
if(listName == "HOMEPAGE"){
    // Build out each list
    for(var i in homePageLists){

        // Variables
        var thisList = getCookie(homePageLists[i] + "ListProd2");
        var thisListSplit = thisList.split(",");
        var thisTrophyCount = 0;

        // Increment Trophies Collected count per list
        for(var x in thisListSplit){
            if(thisListSplit[x] == "true"){
                thisTrophyCount++;
            }
        };
        $("#" + homePageLists[i]).find(".list-trophy-count").html(thisTrophyCount);

        // Determine rank in list, style accordingly
        if(homePageLists[i] ==  "custom-list-1" || homePageLists[i] ==  "custom-list-2"){
            if(thisTrophyCount < 20){ /* Do nothing */ }
            else if(thisTrophyCount >= 20 && thisTrophyCount < 30){ $("#" + homePageLists[i]).addClass("bronze-list"); }
            else if(thisTrophyCount >= 30 && thisTrophyCount < 40){ $("#" + homePageLists[i]).addClass("silver-list"); }
            else if(thisTrophyCount >= 40 && thisTrophyCount < 50){ $("#" + homePageLists[i]).addClass("gold-list"); }
            else if(thisTrophyCount == 50){ $("#" + homePageLists[i]).addClass("platinum-list"); }
        } else if(homePageLists[i] ==  "christmas"){
            if(thisTrophyCount < 1){ /* Do nothing */ }
            else if(thisTrophyCount >= 1 && thisTrophyCount < 5){ $("#" + homePageLists[i]).addClass("bronze-list"); }
            else if(thisTrophyCount >= 5 && thisTrophyCount < 9){ $("#" + homePageLists[i]).addClass("silver-list"); }
            else if(thisTrophyCount >= 9 && thisTrophyCount < 12){ $("#" + homePageLists[i]).addClass("gold-list"); }
            else if(thisTrophyCount == 12){ $("#" + homePageLists[i]).addClass("platinum-list"); }
        } else {
            if(thisTrophyCount < 1){ /* Do nothing */ }
            else if(thisTrophyCount >= 1 && thisTrophyCount < 10){ $("#" + homePageLists[i]).addClass("bronze-list"); }
            else if(thisTrophyCount >= 10 && thisTrophyCount < 20){ $("#" + homePageLists[i]).addClass("silver-list"); }
            else if(thisTrophyCount >= 20 && thisTrophyCount < 30){ $("#" + homePageLists[i]).addClass("gold-list"); }
            else if(thisTrophyCount == 30){ $("#" + homePageLists[i]).addClass("platinum-list"); }
        }
    }
}

// Check if any trophies obtained
for(var i = 0; i < (trophiesInList+1); i++){
    if(theList[i]=="true"){
        anyTrophies++;
        trophyCount++;
    }
}

// If trophies have been obtained, then fill the BBCode section appropriately
if(anyTrophies > 0){
    // Beginning content for BBCode
    $("#bbCodeContent").html(""+
        "[B]"+ $(".banner img").attr("alt") +"[/B] - " + trophyCount + "/" + trophiesInList + "\n" +
        "[spoiler=" + $.now() + "]" + "\n" +
        "[LIST=1]\n" +
    "");
}
for(var i = 0; i < (trophiesInList+1); i++){
    // Iterate over collected trophies and list them out
    if(theList[i]=="true"){
        // Style collected trophies in the list
        $("#"+ listName +"-"+(i+1)).addClass("collected");
        $("#"+ listName +"-"+(i+1)+" .checkbox").prop('checked', true);

        // List collected trophies in BBCode
        $("#bbCodeContent").append(""+
            "[*][B]" + $("#"+ listName +"-"+(i+1)+" h2").html() + "[/B]: [I]" + $("#"+ listName +"-"+(i+1)+" p").html() + "[/I]"+ "\n" +
        "");
    }
}
if(anyTrophies > 0){
    // Ending content for BBCode
    $("#bbCodeContent").append(""+
        "[/LIST]\n" +
        "[/spoiler]" +
    "");
}

// Get total trophies earned for current list, and add the color code class to the counter
$("#trophy-count").html(trophyCount);
$("#trophy-total").html(trophiesInList);
if(trophiesInList==30){
    if(trophyCount > 0 && trophyCount < 10){ $("#trophies-earned").addClass("bronze"); }
    else if(trophyCount >= 10 && trophyCount < 20){ $("#trophies-earned").addClass("silver"); }
    else if(trophyCount >= 20 && trophyCount < 30){ $("#trophies-earned").addClass("gold"); }
    else if(trophyCount == 30){ $("#trophies-earned").addClass("platinum"); }
} else if(trophiesInList==12) {
    if(trophyCount > 0 && trophyCount < 4){ $("#trophies-earned").addClass("bronze"); }
    else if(trophyCount >= 4 && trophyCount < 8){ $("#trophies-earned").addClass("silver"); }
    else if(trophyCount >= 8 && trophyCount < 11){ $("#trophies-earned").addClass("gold"); }
    else if(trophyCount == 12){ $("#trophies-earned").addClass("platinum"); }
} else {
    if(trophyCount > 19 && trophyCount < 30){ $("#trophies-earned").addClass("bronze"); }
    else if(trophyCount > 29 && trophyCount < 40){ $("#trophies-earned").addClass("silver"); }
    else if(trophyCount > 39 && trophyCount < 50){ $("#trophies-earned").addClass("gold"); }
    else if(trophyCount == 50){ $("#trophies-earned").addClass("platinum"); }
}


$(document).ready(function(){

    // When user clicks "Save Progress"
    $("#saveProgress").click(function(){
        var CookieDate = new Date;
        CookieDate.setFullYear(CookieDate.getFullYear( ) +10);
        $(".collected").show();
        var sList = "";
        $('input[type=checkbox]').each(function () {
            sList += (this.checked ? "true," : "false,");
        });
        document.cookie=listName+"ListProd2="+sList.split(",")+";expires="+CookieDate.toGMTString()+"; path=/";
        location.reload();
    });

    // When user clicks to "Hide collected trophies"
    $("#hide-collected").click(function(){
        if(hidden=="false"){
            $(".collected").hide();
            $("#hide-collected").addClass("collected");
            $("#hide-collected").val("Show collected trophies");
            hidden="true";
        } else {
            $(".collected").show();
            $("#hide-collected").removeClass("collected");
            $("#hide-collected").val("Hide collected trophies");
            hidden="false";
        }
    });

    // When user clicks on BBCode section, select the text contained within the <pre>
    $("#bbCodeContent").click(function(){
        selectText("bbCodeContent");
    });

    // When user clicks on "Cookies" button, show modal with copy&paste cookie code (Home Page)
    $("#backup").click(function(){
        $("#cookies-backup-content").html("");
        $("#cookies-backup .modal-footer").html("Here to update your progress with a backup? Paste your backup into the text box above, and click \"Restore\"!");
        for(var i in listList){
            if(getCookie(listList[i]+"ListProd2") != ""){
                $("#cookies-backup-content").append(listList[i]+"ListProd2;"+getCookie(listList[i]+"ListProd2")+";");
                $("#cookies-backup .text-below").html("Save the text below as-is for backing up or transferring your progress!");
                $("#cookies-backup .modal-footer").html("Save the text above as-is for backing up or transferring your progress!");
            }
        }
        var completedBackup = $("#cookies-backup-content").text();
        var result = completedBackup.substring(0, completedBackup.length-1);
        $("#cookies-backup-content").html(result);
        $("#cookies-backup").modal('show');
    });
    $("#cookies-backup-content").click(function(){
        selectText("cookies-backup-content");
    });

    // Restore cookies from backup
    $("#restore button").click(function(){
        var restorationArray = $("#restore textarea").val().split(";");
        while (restorationArray.length > 0) {
            var chunk = restorationArray.splice(0,2)
            var CookieDate = new Date;
            CookieDate.setFullYear(CookieDate.getFullYear( ) +10);
            document.cookie=chunk[0]+"="+chunk[1]+";expires="+CookieDate.toGMTString()+"; path=/";
            location.reload();
        }
    });

});
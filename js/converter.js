/**
 * Created by Douglas on 2014-12-17.
 */

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

$(document).ready(function() {
    $("#convert").click(function () {

        var text = $("#input").val();
        var eachLine = text.split("\n");
        var counter = "1";

        for(var i in eachLine){
            if(counter==5){counter=1}
            if(counter==1) { $("#conversion").append('["' + eachLine[i] + '", '); } else
            if(counter==2) { $("#conversion").append('"' + eachLine[i] + '", '); } else
            if(counter==3) { $("#conversion").append('"' + eachLine[i] + '"],\n'); } else
            if(counter==4) { /* Do Nothing */ }
            counter++;
        }
        
        var completedConversion = $("#conversion").text();
        var result = completedConversion.substring(0, completedConversion.length-2);
        $("#conversion").html(result);

    });

    $("#conversion").click(function(){
        selectText("conversion");
    });
});
//Global variables
 var ss = SpreadsheetApp.getActiveSpreadsheet(); 
// var otherSs = SpreadsheetApp.openById("1ZrSEII0nUxreSYYxomA6m6YaMFB7Di7oihym9QemYRE"); 

function initMenu(){
  var ui = SpreadsheetApp.getUi();
  var menu = ui.createMenu("Reading Log");
  menu.addItem("Set Up Reading Log", "setupLog");
  menu.addItem("Show Reading Log", "showUserForm");
 // menu.addSeparator();
  menu.addItem("Clear Logs","showMessage");
  
 // var subMenu = ui.createMenu("Other Functions");
 // subMenu.addItem("Input Box", "showInputBox");
//  menu.addSubMenu(subMenu);
  menu.addToUi();
}



function onOpen(){
  initMenu()
}

function setupLog(){
  var ui = SpreadsheetApp.getUi();
  
   ui.alert("Your reading log is now ready to go!",ui.ButtonSet.OK);

}



function showUserForm() {
  var template = HtmlService.createTemplateFromFile("log");
  var html = template.evaluate(); 
  html.setTitle("Reading Log");
  SpreadsheetApp.getUi().showSidebar(html);
}


function userClicked(book,author,type,minutes,pages,summary){

  var ws = ss.getSheetByName("Reading Log");
//  var otherWs = otherSs.getSheetByName("James");
  var formattedDate = Utilities.formatDate(new Date(), "GMT", "MM/dd/yy");
  //apparently upper and lower case for the date format make a difference
  
  
 //ws.appendRow([formattedDate,book,author,type,minutes,pages,summary])
 var data = [formattedDate,book,author,type,minutes,pages,summary];
 ws.insertRowBefore(2).getRange(2,1,1,data.length).setValues([data]);
 //otherWs.insertRowBefore(2).getRange(2,1,1,data.length).setValues([data]);
  //has to be an array 

}


function getTotalPages(){
  try{
var ws = ss.getSheetByName("Reading Log"); 
var range = ws.getRange(2,6,ws.getLastRow()-1,1);
var pages = range.getValues(); 
var intPages = pages.map(r => parseInt(r.toString()));

var add = arr => arr.reduce((a,b)=> a + b, 0); 
var sum = add(intPages);
return "You have read " + sum + " pages.";
  }
  catch(err){
return "You have read 0 pages"

  }
}




function getTotalMinutes2(){
  try{
      var ws = ss.getSheetByName("Reading Log"); 
      var range = ws.getRange(2,5,ws.getLastRow()-1,1);
      var minutes = range.getValues();
      var intMinutes = minutes.map(r => parseInt(r.toString())); 

      var add = arr => arr.reduce((a,b)=> a + b, 0); 
      var sum = add(intMinutes);

      return "You have read for " + sum + " minutes"
      //Logger.log(sum);
  }
  catch(err){
    return "You have read for 0 minutes"
  }
}

function getDays(){
  try{
    var ws = ss.getSheetByName("Reading Log"); 
    var range = ws.getRange(2,1,ws.getLastRow()-1,1);
    var dates = range.getValues();
    //Logger.log(dates)

    var newArray = [];
    newArray.push(dates[0]);
    for (var n = 1; n < dates.length; n++) {
        if (newArray.join().indexOf(dates[n].join()) == -1) {
            newArray.push(dates[n])
        };
    }

    var num = newArray.length;
    Logger.log(newArray.length);
    return "You have read on " + num + " separate days"
  }
  catch(er){
    return "You have read on 0 separate days"
  }
 }



function booksRead(){
  try{
    var ws = ss.getSheetByName("Reading Log");
    var range = ws.getRange(2,2,ws.getLastRow()-1,1);
    var data = range.getValues();

    var newArray = [];
    newArray.push(data[0]);
    for (var n = 1; n < data.length; n++) {
        if (newArray.join().indexOf(data[n].join()) == -1) {
            newArray.push(data[n])
        };
    }

    //Logger.log(len)
    return "You have read " + newArray.length + " books"
  }
  catch(err){
    return "You have read 0 books"
  }
}

function booksRead2(){
      var ws = ss.getSheetByName("Reading Log");
      var range = ws.getRange(2,2,ws.getLastRow(),1);
      var data = range.getValues();

      var newArray = [];
      newArray.push(data[0]);
      for (var n = 0; n < data.length; n++) {
          if (newArray.join().indexOf(data[n].join()) == -1) {
              newArray.push("<br>" + data[n]);
          };
}

Logger.log(newArray);
return "The books you have read so far are:" + "<br>" + "<br>" + newArray
}





function getAuthors(){
var ws = ss.getSheetByName("Reading Log");
var range = ws.getRange(2,3,ws.getLastRow(),1);
var data = range.getValues();

//Logger.log(data)

  var newArray = [];
  newArray.push(data[0]);
  for (var n = 0; n < data.length; n++) {
      if (newArray.join().indexOf(data[n].join()) == -1) {
          newArray.push("<br>" + data[n]);
      };
  }

//Logger.log(newArray);
return "You have read books by the following authors:" + "<br>" + "<br>" + newArray
}







function showMessage(){
  var ui = SpreadsheetApp.getUi();
  
  var buttonPressed = ui.alert("Are you sure you want to delete ALL your data?",ui.ButtonSet.YES_NO_CANCEL);
  
  if(buttonPressed===ui.Button.YES){
    clearContents();
  }else if(buttonPressed = ui.Button.NO){
    ui.alert("You data was not deleted")
  };

}

function clearContents(){
  var ws = ss.getSheetByName("Reading Log");
  ws.getRange(2, 1, ws.getLastRow(), ws.getLastColumn()).clear();
}



function include(filename){
  return HtmlService.createHtmlOutputFromFile(filename).getContent()

}

function getBookTypes(){
var ws = ss.getSheetByName("Types");
var range = ws.getRange(2,1,ws.getLastRow(),1);
var types = range.getValues();

return types;

}


function setName(){

  var owner = ss.getOwner();
  var ssId = ss.getId(); 
  

}





function loadPartialHtml_(partial) {
  //underscore makes function private
  var htmlServ = HtmlService.createTemplateFromFile(partial);
  return htmlServ.evaluate().getContent();
}


function loadEnglishView(){

  return loadPartialHtml_("english")


}


function loadSpanishView(){

  return loadPartialHtml_("spanish")


}

function loadOverviewView(){

  return loadPartialHtml_("overview")


}

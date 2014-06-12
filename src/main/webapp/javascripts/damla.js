
// ### [CONSTANTS] #####################################################################################################

var WEBSEARCH_ITEMS_PER_PAGE  = 10;
var WEBSEARCH_SOLR_URLS       = [
  'http://solr.b73x:8983/solr/collection1',        // No trailing slash
  'http://solr.b73x:8983/solr/s_simple_boost'      // No trailing slash
];



// ### [GLOBAL VARIABLES] ##############################################################################################

var completedSearchOperation = 0;
var solrData                 = [];
var currentSearchId          = null;
var num_solr_result          = [];


// ### [FUNCTIONS] #####################################################################################################

// --- [updateRecord] --------------------------------------------------------------------------------------------------

function updateRecord(docId, orderInfo, checkbox) {

  var $checkbox = $(checkbox);
  var checked   = $checkbox.prop('checked')

  if (checked) {
    //alert("solr index" + solrId);
    //alert(num_solr_result[solrId]);
    $.ajax({
        type    : "GET",
        url     : "/searcher-web-app/insert",
        dataType: "json",
        data    : "docId=" + docId + "&orderInfo=" + orderInfo + "&searchId=" + currentSearchId+ "&solrId=" + num_solr_result[solrId],
        failure : function(response) {
          console.log("status code" + response.status);
        }
    });
  } else {
    $.ajax({
        type    : "GET",
        url     : "/searcher-web-app/delete",
        dataType: "json",
        data    : "docId=" + docId + "&searchId=" + currentSearchId,
        failure : function(response) {
          console.log("status code" + response.status);
        }
    });
  }
}



// --- [generateWebSearchResults] --------------------------------------------------------------------------------------

function generateWebSearchResults(highlighting, docs) {

  var $results = $('#results');
  var i        = 0;

  $.each(
    highlighting,
    function(key, value) {

      if (value !== null && value.content !== null) {

        var doc         = docs[key];
        var orderInfo   = doc.solr.toSource();
        var resultsText = '';
        resultsText += '<div class="result_item">';
        resultsText += '  <div>';
        resultsText += '    <input id="cbx_' + (i++) + '" type="checkbox" onchange="updateRecord(\'' + doc.id  + '\',\'' + orderInfo +  '\',\'' + doc.solr +'\', this);">';
        resultsText += '    <a target="iframe_a" href="' +  doc.url + '">' +  doc.title  + '</a>';
        resultsText += '  </div>';
        resultsText += '  <div class="result_url">' +  doc.url + '</div>';
        resultsText += '  <div class="result_snippet">... ' +  value.content  + ' ...</div>';
        resultsText += '  <div class="result_labels">';

        for (var i in doc.solr) {
          resultsText += '  <span class="label label-danger">Solr ' + i + '</span>';
        }

        resultsText += '  </div>';
        resultsText += '</div>';

        $results.append(resultsText);
      }
    }
  );
}



// --- [generateStats] -------------------------------------------------------------------------------------------------

function generateStats(data, selector) {

  var $stats         = $(selector);
  var response       = data.response;
  var responseHeader = data.responseHeader;

  if (response.numFound !== 0) {
    var statsText = '';
    
    statsText += '<div>';
    statsText +=   response.numFound;
    statsText +=   ' sonuç bulundu (' + (responseHeader.QTime / 1000) + ' saniye)';
    statsText += '</div>';
    
    $stats.html(statsText);
  }
}



// --- [getDocsMap] ----------------------------------------------------------------------------------------------------

function getDocsMap(docs) {

  var docsMap = {};

  $.each(
    docs,
    function(key, value) {
      docsMap[value.id] = value;
    }
  );

  return docsMap;
}



// --- [multiProcessWebSearchQuery] ------------------------------------------------------------------------------------

function multiProcessWebSearchQuery(query, searchId) {

  $('#results').html('');

  completedSearchOperation = 0;
  currentSearchId          = searchId;

  for (var i = 0; i < WEBSEARCH_SOLR_URLS.length; i++) {
    processWebSearchQuery(query, i);
  }
}



// --- [processWebSearchQuery] -----------------------------------------------------------------------------------------

function processWebSearchQuery(query, index) {
  
  var solrServiceUrl = WEBSEARCH_SOLR_URLS[index] + "/select";
  var fields         = '';

  fields         += 'id,';
  fields         += 'title,';
  fields         += 'url,';
  fields         += 'rows';

  solrServiceUrl += "?q=" + query;
  solrServiceUrl += "&wt=json";
  solrServiceUrl += "&json.wrf=jsonpCallback";
  solrServiceUrl += "&start=" + 0;
  solrServiceUrl += "&hl=true";
  solrServiceUrl += "&hl.fl=content";
  solrServiceUrl += "&hl.fragsize=250";
  solrServiceUrl += "&hl.simple.pre=<strong>";
  solrServiceUrl += "&hl.simple.post=</strong>";
  solrServiceUrl += "&fl=" + fields;
  solrServiceUrl += "&rows=" + WEBSEARCH_ITEMS_PER_PAGE;
  
  $.ajax({
      url          : solrServiceUrl,
      dataType     : 'jsonp',
      jsonpCallback: 'jsonpCallback',
      success      : function(data) {

        if (data === null) {
          return;
        }

        var response = data.response;

        if (response == null || response.numFound == null) {
          return;
        }

        if (response.numFound == 0) {
          return;
        }

        completedSearchOperation++;

        solrData[index] = data;

        if (completedSearchOperation == WEBSEARCH_SOLR_URLS.length) {

          deduplicateResults();
          generateStats(data, '#stats');
        }
      },
      error        : function(e) {
        console.log('Bir hata oluştu!');
      }
    }
  );
}



// --- [deduplicateResults] --------------------------------------------------------------------------------------------

function deduplicateResults() {

  var allDocs         = {};
  var allHighlighting = {};


  for (var i = 0; i < WEBSEARCH_SOLR_URLS.length; i++) {

    var data         = solrData[i];
    var docs         = getDocsMap(data.response.docs);
    var highlighting = data.highlighting;
    var order        = 0;

    // i. solr dan gelen sonuçların sayısı
    num_solr_result[i] = 0;


    $.each(
      docs,
      function(key, value) {

        num_solr_result[i] = num_solr_result[i]+1;

        order++;

        if (allDocs[key] == null) {
          value['solr'] = {};
          value.solr[i] = order;
          allDocs[key]  = value;
        } else {
          allDocs[key].solr[i] = order;
        }
      }
    );

    $.each(
      highlighting,
      function(key, value) {

        if (allHighlighting[key] == null) {
          allHighlighting[key] = value;
        }
      }
    );

    alert(num_solr_result[i]) ;
  }

  generateWebSearchResults(allHighlighting, allDocs);

}



// --- [jsonpCallback] -------------------------------------------------------------------------------------------------

function jsonpCallback() {

  // nothing to do
}

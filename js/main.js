var ListView = function(ul){
  this.el = $(ul);
}

ListView.prototype.refreshList = function(patients){
  this.el.html('');
  this.el.hide();
  this.addPatients(patients);
  this.el.fadeIn('slow');
}

ListView.prototype.addPatients = function(patients){
  $.each(patients, $.proxy(function(i, patient){
    this.addPatient(patient);
  }, this));
}

ListView.prototype.addPatient = function(patient){
  this.el.append($('<li/>').html(patient.first_name));
}

var App = (function(){

  function initialize(){
    listView.refreshList(getPatientsFromLocalStorage());
    bindEvents();
    this.sync = sync;
    this.clear = clear;
  }

  function bindEvents(){
    $('#sync').on('click', function(){
      App.sync();
    });

    $('#clear').on('click', function(){
      App.clear();
    });
  }

  function populatePatientsList(patients){
    listView.refreshList(patients);
  }

  var listView = new ListView('.main ul');

  function sync(){
    url = "http://api.rails-api-example.dev/patients",
    $.ajax({
      url:  url,
      dataType: 'jsonp',
      success: function(patients) {
        storePatientsInLocalStorage(patients);
        listView.refreshList(patients);
      },
      error: function(error){
        console.log(error);
      }
    });
  }

  function storePatientsInLocalStorage(patients){
    localStorage.setItem('patients', JSON.stringify(patients))
  }

  function getPatientsFromLocalStorage(){
    return JSON.parse(localStorage.getItem('patients'))
  }

  function clear() {
    localStorage.setItem('patients', JSON.stringify([]))
    populatePatientsList([]);
  }

  return {
    initialize: initialize
  }
}());


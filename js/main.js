var App = (function(){

  function sync(){
    url = "http://api.rails-api-example.dev/patients",
    $.ajax({
      url:  url,
      dataType: 'jsonp',
      success: function(patients) {
        storePatientsInLocalStorage(patients);
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
  }

  return {
    sync: sync,
    clear: clear,
    getPatients: getPatientsFromLocalStorage
  }

}());

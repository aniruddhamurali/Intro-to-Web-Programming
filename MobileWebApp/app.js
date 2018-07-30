function saveInfo(){
  var infos_json = [];
  $('.info').each(function(index,info){
    infos_json.push({checked:});
  });
  localStorage.infos = JSON.stringify(infos_json);
}

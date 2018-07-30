/*var a = 4;
if (a === 4) {
  console.log("the same");
}

for (var i=0; i< 10; i++) {
  console.log(i);
}

var students = ["Emily", "Aniruddha", "Cooper"];
students.push("victoria");

console.log(students);

function sq(n) {
  var n_sq = n*n;
  return(n_sq);
}

var a = 6;
console.log(a);
console.log(sq(a));

function Student(name, age) {
  var self = this;

  self.name = name;
  self.age = age;

  self.lower_name = function() {
    return(self.name.toLowerCase());
  }
}

var s = new Student("Emily",15);

console.log(s);
console.log(s.lower_name());

//JSON
var user = {
  name: "Bob",
  email: "bob@bob.com"
}

user.name = function() {
  var names = ["Bob", "Tim", "Steve"];
  return(names[Math.floor(Math.random()*3)]);
}

console.log(user.name);

var user_string = JSON.stringify(user);
console.log(user_string);

var another_user = JSON.parse(user_string);
console.log(another_user);*/


/*var alert_btn = document.getElementById("alert_btn");

alert_btn.addEventListener("click", function(){
  alert("hello world");
});*/

var alert_btn = $("alert_btn");

alert_btn.click(function(){
  alert("hello world");
});

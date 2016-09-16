/**
 *	Lab02
 *
 *	@author Karson Chilcott (kjc38)
 *	@version 09/16/16
 */

function Person(name, birth, friends){
	this.name = name;
	this.birth = new Date(birth);
	this.friends = friends;
	this.greeting = "I'm a person!";
}

var p1 = new Person("Bob", "1995/07/07", ["Stacey", "Dave"]);
console.log(p1.name);	//Test creating a person

//Name Mutatator
Person.prototype.setName = function(newName){
	this.name = newName;
}

//Name Accessor
Person.prototype.getName = function(){
	return this.name;
}

//Return the age of the person.
//Adapted from the sample code given (by Naveen Jose)
Person.prototype.getAge = function(){
	var today = new Date();
	var age = today.getFullYear() - this.birth.getFullYear();
	var month = today.getMonth() - this.birth.getMonth();

	if (month < 0 || (month === 0 && today.getDate() < this.birth.getDate())) {
	age--;
	}
	return age;
}

console.log("Age: " + p1.getAge());	//Test getting the age

//Add a friend
Person.prototype.addFriend = function(newFriend){
	this.friends.push(newFriend);
}

//Return the array of friends of a person
Person.prototype.getFriends = function(){
	return this.friends;
}

p1.addFriend("Joe");
console.log(p1.getFriends().toString()); //Test adding friends

Person.prototype.getGreeting = function(){
	return this.greeting;
}

console.log(p1.getGreeting());	//Test getting the greeting

var p2 = new Person ("Stacey", "1994/07/07", ["Bob"]);

//Compare the ages of two people
Person.prototype.compareAge = function(person){
	var p1Age = this.getAge();
	var p2Age = person.getAge();
	var same = "They are the same age!";
	var isOlder = " is older!";
	var returnVal = "";

	if (p1Age == p2Age) {
		return same;
	} else if (p1Age > p2Age) {
		var p1Name = this.getName();
		returnVal = p1Name + isOlder;
		return returnVal;
	} else {
		returnVal = person.getName() + isOlder;
		var p2Name = person.getName();
		returnVal = p2Name + isOlder;
		return returnVal;
	}
}

console.log("Comparing ages: " + p1.compareAge(p2)); //Testing compareAge

//New Child of the Person Object
//	adds major variable and changes the greeting
function Student(name, birth, friends, major){
	Person.call(this, name, birth, friends);
	this.major = major;
	this.greeting = "I'm a student!";
}
Student.prototype = Object.create(Person.prototype);

//Major Accessor
Student.prototype.getMajor = function(){
	return this.major;
}

//Major Mutator
Student.prototype.setMajor = function(newMajor){
	this.major = newMajor;
}

var s1 = new Student("Lucy", "1999/02/05", ["Carla", "Juvia"], "Astrology");

console.log(s1.getName());	//Test inheritance

s1.addFriend("Happy");


//Tests to check and see if everything is working correctly
console.log(s1.getFriends().toString());
console.log(s1.getMajor());
console.log(s1.getGreeting());	//Make sure it says student not person
console.log(s1 instanceof Student);
console.log(s1 instanceof Person);


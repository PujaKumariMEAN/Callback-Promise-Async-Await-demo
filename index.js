var express = require('express');
var app = express();
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var async = require('async');

app.use(bodyParser.json());
app.use(logger('dev'));

// callback hell - part
function addData(callback){
  var a = 1;
  var b = 5;
  var c = a+b;
  callback(null, c);
}

function decVar(callback){
  var d = 7;
  callback(null, d);
}

function multiplyData(callback){
  addData(function(err, data){
    if(err){
      callback(err, null);
    }
    else {
      decVar(function(err, result){
        if(err){
          callback(err, null)
        }
        else {
          var newData = data * result;
          callback(null, newData);
        }
      });
    }
  });
}

multiplyData(function(error, resultSet){
  if(error){
    console.log(err);
  }
  else {
    console.log(resultSet);
  }
});

//Promise part
function promise1(){
  return new Promise(function(resolve, reject){
     var a = 1;
     var b = 5;
     var c = a + b;
 resolve(c);
 });
}

function promise2(resData){
  return new Promise(function(resolve, reject){
     var d = 7 * resData;
 resolve(d);
 });
}

function promise3(){
 return promise1().then(function(data){
   return promise2(data);
 }).then(function(result){
   return result;
 });
}

promise3().then(function (dataSet) {
    console.log(dataSet);
});

//Aysnc/Await part
function addRecord(){
  // return new Promise(function(resolve, reject){
    var a = 1;
    var b = 5;
    var c = a + b;
    return c;
  // });
}

function multiplyRecord(data){
  // return new Promise(function(resolve, reject){
  var d = 7 * data;
  return d;
 // });
}

(async function() {
    var func1 = await addRecord();
    var func2 = await multiplyRecord(func1);
    console.log(func2);
}) ();


app.listen(3000, function(req, res){
  console.log("Server is running at port 3000");
});

(function() {
  'use strict';

  window._ = {};



  _.identity = function(val) {
    return val;
  };


  //Call iterator(value, key, collection) for each element of collection
  _.each = function(collection, iterator) {
    //handle arrays
    //handle objects
    if (Array.isArray(collection)){
      for (var i = 0; i<collection.length;i++){
        iterator(collection[i],i,collection);
      }
    }else{
      for (var key in collection){
        iterator(collection[key],key,collection);        
      }
    }
  };


  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  _.reduce = function(collection, iterator, accumulator) {
    //handle arrays
    //handle objects
    var check = (arguments.length===2);//true if there's no accumulator
    _.each(collection, function(value){
      //will skip first iterator step if no accumulator exists
      if(check){
        accumulator=value;
        check=false;
      }else{
        accumulator=iterator(accumulator,value)
      }
    })
    return accumulator;
  };


  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // for loop method
    // for (var i = 0; i<collection.length;i++){
    //   if (collection[i]===target) return true;
    // }
    // return false;

    // _.each method
    // var targetFound=false;
    // _.each(collection, function(value){
    //   if(value===target){
    //     targetFound=true;
    //   }
    // })
    // return targetFound;
    return _.reduce(collection, function(found,value){
      return found || value ===target;
    }, false);
  };


  // Extend a given object with properties of passed in objects.
  // Don't overwrite a key that already exists. 
  _.defaults = function(obj) {

    _.each(arguments, function(arg){
      _.each(arg, function(value, key){
        if(!obj.hasOwnProperty(key)){
          obj[key]=value;
        }
      })
    })
    return obj;
  };


  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    var data;
    var ran = false;
    return function(){
      if(!ran){
        data = func.apply(this, arguments);
        ran =true;
      }
      return data;
    }
  };


  // Like reduce, but runs from right to left. 
  // Because Zoolander
  _.reduceRight = function(collection, iterator, accumulator){
    //for array case
    var check = (arguments.length ===2);
    var size = collection.length;
    for (var i = size-1;i>-1;i--){
      if (check){
        accumulator = collection[i];
        check= false;
      }else{
        accumulator = iterator(accumulator,collection[size]);
      }
    }
    return accumulator;
  };



}());
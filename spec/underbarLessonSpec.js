(function() {
  'use strict';

  describe('Self Assessment Underbar Questions', function() {

    describe('identity', function() {
      var uniqueObject = {};

      it('should return whatever value is passed into it', function() {
        expect(_.identity(1)).to.equal(1);
        expect(_.identity('string')).to.equal('string');
        expect(_.identity(false)).to.be.false;
        expect(_.identity(uniqueObject)).to.equal(uniqueObject);
      });
    });

    describe('each', function() {
      it('should iterate over arrays, providing access to the element, index, and array itself', function() {
        var animals = ['ant', 'bat', 'cat'];
        var iterationInputs = [];

        _.each(animals, function(animal, index, list) {
          iterationInputs.push([animal, index, list]);
        });

        expect(iterationInputs).to.eql([
          ['ant', 0, animals],
          ['bat', 1, animals],
          ['cat', 2, animals]
        ]);
      });

      it('should only iterate over the array elements, not properties of the array', function() {
        var animals = ['ant', 'bat', 'cat'];
        var iterationInputs = [];

        animals.shouldBeIgnored = 'Ignore me!';

        _.each(animals, function(animal, index, list) {
          iterationInputs.push([animal, index, list]);
        });

        expect(iterationInputs).to.eql([
          ['ant', 0, animals],
          ['bat', 1, animals],
          ['cat', 2, animals]
        ]);
      });

      it('should iterate over objects, providing access to the element, index, and object itself', function() {
        var animals = { a: 'ant', b: 'bat', c: 'cat' };
        var iterationInputs = [];

        _.each(animals, function(animal, key, object) {
          iterationInputs.push([animal, key, object]);
        });

        expect(iterationInputs).to.eql([
          ['ant', 'a', animals],
          ['bat', 'b', animals],
          ['cat', 'c', animals]
        ]);
      });
    });

    describe('reduce', function() {
      it('should be able to sum up an array', function() {
        var add = function(tally, item) {return tally + item; };
        var total = _.reduce([1, 2, 3], add, 0);

        expect(total).to.equal(6);
      });

      it('should use the first element as an accumulator when none is given', function() {
        var add = function(tally, item) {return tally + item; };
        var total = _.reduce([1, 2, 3], add);

        expect(total).to.equal(6);
      });

      it('should invoke the iterator on the first element when given an accumulator', function() {
        var sumSquares = function(tally, item) {return tally + item * item; };
        var total = _.reduce([2, 3], sumSquares, 0);

        expect(total).to.equal(13);
      });

      it('should not invoke the iterator on the first element when using it as an accumulator', function() {
        var sumSquares = function(tally, item) {return tally + item * item; };
        var total = _.reduce([2, 3], sumSquares);

        expect(total).to.equal(11);
      });
    });

    describe('contains', function() {
      it('should return false if a collection does not contain a user-specified value', function() {
        expect(_.contains([4, 5, 6], 2)).to.be.false;
      });

      it('should return true if a collection contains a user-specified value', function() {
        expect(_.contains([4, 5, 6], 5)).to.be.true;
      });

      it('should work on objects', function(){
        expect(_.contains({ a: 4, b: 5, c: 6 }, 5)).to.be.true;
      });
    });

    describe('defaults', function() {
      it('returns the first argument', function() {
        var to = {};
        var from = {};
        var defaulted = _.defaults(to, from);

        expect(defaulted).to.equal(to);
      });

      it('should copy a property if that key is already set on the target', function() {
        var to = {};
        var from = { a: 1 };
        var defaulted = _.defaults(to, from);

        expect(defaulted.a).to.equal(1);
      });

      it('should not copy a property if that key is already set on the target', function() {
        var to = { a: 10 };
        var from = { a: 1 };
        var defaulted = _.defaults(to, from);

        expect(defaulted.a).to.equal(10);
      });

      it('should not copy a property if that key is already set on the target, even if the value for that key is falsy', function() {
        var to = {a: '', b: NaN };
        var from = { a: 1, b: 2 };
        var defaulted = _.defaults(to, from);

        expect(defaulted.a).to.equal('');
        expect(isNaN(defaulted.b)).to.be.true;
      });

      it('prefers the first value found when two objects are provided with properties at the same key', function() {
        var to = {};
        var from = { a: 1 };
        var alsoFrom = { a: 2 };
        var defaulted = _.defaults(to, from, alsoFrom);

        expect(defaulted.a).to.equal(1);
      });
    }); 

    describe('once', function() {
      it('should only run a user-defined function if it hasn\'t been run before', function() {
        var num = 0;
        var increment = _.once(function() {
          num += 1;
        });

        increment();
        increment();

        expect(num).to.equal(1);
      });
    });

    //todo: reduceRight specs

  });

}());



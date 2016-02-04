angular.module('app.analysis', ['app.entry']).controller('AnalysisCtrl', function($scope, EntryService){

  EntryService.get().
    success(function(rawData) {
      var people = _.map(rawData, function(entry) {
        delete entry.createdTime;
        delete entry.updatedTime;
        delete entry.id;
        return entry;
      });

      $scope.first = first(people);
      $scope.names = names(people);
      $scope.namesPluck = namesPluck(people);
      $scope.ages = ages(people);
      $scope.agesReduce = agesReduce(people);
      $scope.agesFilter21 = agesFilter21(people);
      $scope.peeps21 = peeps21(people);
      $scope.match21 = match21(people);
      $scope.matchFirstL = matchFirstL(people);
      $scope.matchLocation2 = matchLocation2(people);
      $scope.locationFilter = locationFilter(people);
      $scope.matchSocial = matchSocial(people);
      $scope.matchSocialReduce = matchSocialReduce(people);
      $scope.matchSocialGroupby = matchSocialGroupby(people);
      $scope.matchAgeGroupby = matchAgeGroupby(people);
      $scope.matchLocaReduce = matchLocaReduce(people);
      $scope.peeps21Reduce = peeps21Reduce(people);
      $scope.avgAge = avgAge(people);
      $scope.people = people;
    });
});

var first = function(people) {
  return people[0];
};

var names = function(people) {
  return _.map(people, function(person) {
    return person.name;
  });
};
var namesPluck = function(people) {
  return _.pluck(people, 'name');
};

var ages = function(people) {
  return _.map(people, function(person) {
    return person.age;
  });
};

var agesReduce = function(people) {
  return _.reduce(people, function(acc, person) {
    acc.push(person.age);
    return acc;
  }, []);
}
var agesFilter21 = function(people) {
  return _.filter(people, function(person) {
    return person.age == '21';
  });
};
var locationFilter = function(people) {
  return _.filter(people, function(person) {
    return person.location == 'Bath';
  });
};
var peeps21 = function(people) {
  var person21 = 0;
  for (i=0; i<people.length; i++) {
    if (parseInt(people[i].age)==21) {
      person21+=1
    }
  }
  return (person21/people.length)*100
};
var peeps21Reduce = function(people) {
  return _.reduce(people, function(acc, person) {
    if (parseInt(person.age)==21) {
      acc++
    }
    return acc;
  }, 0)/people.length*100;
}
var match21 = function(people) {
var matchAge = {}
  for (i=0; i<people.length; i++) { 
    if (matchAge[people[i].age]) {
      matchAge[people[i].age].push(people[i].name)
    }
    else {
      matchAge[people[i].age]=[people[i].name]
        
      }
     } 
  return matchAge
};
var matchLocation = function(people) {
  var loca = {}
  for (i=0; i<people.length; i++) {
    var detail = {}
    detail[people[i].name]=[people[i].age]
    if(loca[people[i].location]) {
      loca[people[i].location].push(detail)
    } else {
       loca[people[i].location]=[detail]
    }
  }
  return loca
}
var matchLocation2 = function(people) {
  var loca = {}
  for (i=0; i<people.length; i++) {
    var detail = {}
    detail["name"]=people[i].name
    detail["age"]=people[i].age
    if(loca[people[i].location]) {
      loca[people[i].location].push(detail)
    } else {
       loca[people[i].location]=[detail]
    }
  }
  return loca
}
var matchLocaReduce = function(people) {
  return _.reduce(people, function(acc, person) {
    acc[person.location] = acc[person.location] || [];
    acc[person.location].push({
      "name": person.name,
      "age": person.age
    });
    return acc;
  }, {});
}
var matchSocial = function(people) {
  var soc = {}
   for (i=0; i<people.length; i++) {
    var detail = {}
    detail["name"]=people[i].name
    detail["age"]=people[i].age
    if(soc[people[i].sociable]) {
      soc[people[i].sociable].push(detail)
    } else {
       soc[people[i].sociable]=[detail]
    }
   }
   return soc
}
var matchSocialReduce = function(people) {
  return _.reduce(people, function(acc, person) {
    acc[person.sociable] = acc[person.sociable] || [];
    acc[person.sociable].push({
      "name": person.name,
      "age": person.age
    });
    return acc;
  }, {});
}

var matchSocialGroupby = function(people) {
  return _.groupBy(peopleProperties(people), 'sociable');
};

var matchAgeGroupby = function(people) {
  return _.groupBy(peopleProperties(people), 'age');
};

var peopleProperties = function(people) {
  return _.map(people, function(person) {
    return personProperties(person);
  });
};

var personProperties = function(person) {
  return getProperties(person, ["name", "age", "sociable"]);
};

var getProperties = function(obj, properties) {
  return _.pick(obj, function(v, k) {
    return _.contains(properties, k);
  });
};

var matchFirstL = function(people) {
  var firstL = {}
  for (i=0; i<people.length; i++) {
    var firL = people[i].name.charAt(0)
    if(firstL[firL]) {
      firstL[firL].push(people[i].name)
    } else {
      firstL[firL]=[people[i].name]
    }
  }
  return firstL
};
var avgAge = function(people) {
  var totalAge = 0;
  for (i = 0; i < people.length; i++) {
    totalAge += parseInt(people[i].age);
  }
  return totalAge/people.length;
};
// var matchFn = function(people) {
//   var compatability = 0;
//   var totalCompat = 0;
//   return _.reduce(people, function(acc, person){
//     return _.reduce(questions, function(acc, question){
//       acc.push[{question.answer, question.accep}];
//         return _.reduce(people, function(bcc, person){
//           if 
//         }, []);
//       return acc
//     }, []);
//   }, []);

// };
var matchFn = function(people) {
  var compatability = 0;
  var totalCompat = 0;
  for (i = 0; i < people.length; i++) {
    for (j = 0; j < questions.length; j++) {
        for (k = 0; k < people.length; k++) {
          if (person[i].question[j].answer === person[k].question[j].accep && person[i].question[j].accep === person[k].question[j].answer){
            compatability +=(2*person[i].question[j].weight*person[k].question[j].weight)
          } else if (person[i].question[j].answer === person[k].question[j].accep && person[i].question[j].accep !== person[k].question[j].answer){
            compatability +=(1*person[i].question[j].weight*person[k].question[j].weight)
          } else if (person[i].question[j].answer !== person[k].question[j].accep && person[i].question[j].accep === person[k].question[j].answer){
            compatability +=(1*person[i].question[j].weight*person[k].question[j].weight)
          } 
        }
        return compat===(compatability/(2*questions.length))*100
    }
  }
  return totalAge/people.length;
};
var matchFn = function(people) {
  var compatabilityObj = {};
  for (var personName in people) {
    var person = people[personName];

    for (var otherName in people) {
      var other = people[otherName];
      var compatability = 0;
      var questions = person.questions;

      if (personName !== otherName) {
        for (var questionName in questions) {
          var question = questions[questionName];
          var otherQuestion = other.questions[questionName];
          var factor = 0;

          if (_.contains(otherQuestion.accep, question.answer) && _.contains(question.accep, otherQuestion.answer)){
            factor = 2;
          } else if (_.contains(otherQuestion.accep, question.answer) || _.contains(question.accep, otherQuestion.answer)){
            factor = 1;
          }

          compatability +=(factor*question.weight*otherQuestion.weight)
        }

        compatabilityObj[personName] = compatabilityObj[personName] || {};
        compatabilityObj[personName][otherName] = (compatability/(2*Object.keys(questions).length))*100;
      }
    }
  }
  return compatabilityObj;
};

var people = {
  person1: {
    questions: {
      question1: {
        answer: 1,
        accep: [1,2],
        weight: 0.5
      },
      question2: {
        answer: 1,
        accep: [1],
        weight: 1
      },
      question3: {
        answer: 3,
        accep: [3],
        weight: 1
      }
    }
  },
  person2: {
    questions: {
      question1: {
        answer: 3,
        accep: [3],
        weight: 1
      },
      question2: {
        answer: 1,
        accep: [1],
        weight: 1
      },
      question3: {
        answer: 2,
        accep: [2,3],
        weight: 0.5
      }
    }
  },
  person3: {
    questions: {
      question1: {
        answer: 1,
        accep: [1],
        weight: 1
      },
      question2: {
        answer: 2,
        accep: [1,2],
        weight: 0.5
      },
      question3: {
        answer: 3,
        accep: [1,3],
        weight: 0.5
      }
    }
  }
}

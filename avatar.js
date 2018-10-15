angular.module('app', [])
  .controller('mainCtrl', mainCtrl)
  .directive('avatar', avatarDirective);

function mainCtrl ($scope) {
  /*
  Let's just make sure something happens when the user submits the form by binding the declared 'addNew' function to the scope.
  You can see we are expecting a user object as a parameter. This is 'userForm'
  */
  // $scope.addNew = function (user) {
  //   alert(user.name + ' ' + user.url);
  // };
  // tada! a users array will now be bound to and made available to our html template.
  $scope.users = [];
  /*
  1. We push a new 'user' object to our users list with a name and avatarUrl property
  2. For our purposes, a quick and dirty method for clearing the form will do.
  Just note there is a more appropriate method when form validation is involved.
  */
  $scope.addNew = function (user) {
    $scope.users.push({
      name: user.name,
      avatarUrl: user.url
    }); /* [1] */
    user.name = ''; /* [2] */
    user.url = ''; /* [2] */
  };
}

function avatarDirective () {
  return {
    scope: {
      user: '=' /* [1] */
    },
    restrict: 'E', /* [2] */
    replace: 'true',
    template: (
      '<div class="Avatar">' +
        '<img ng-src="{{user.avatarUrl}}" />' +
        '<h4>{{user.name}}</h4>' +
      '</div>'
    ), /* [3] */
    link: link
  };

  function link (scope) { /* [4] */
    if (!scope.user.avatarUrl) {
      scope.user.avatarUrl = 'https://www.drupal.org/files/issues/default-avatar.png';
    }
  }

}

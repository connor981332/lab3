angular.module('app', [])
  .controller('mainCtrl', mainCtrl)
  .directive('avatar', avatarDirective)
  .directive('comment', commentsDirective);

function mainCtrl ($scope) {
  $scope.users = [];
  $scope.comments = [];
  $scope.addNew = function (user) {
    $scope.users.push({
      name: user.name,
      email: user.email,
      avatarUrl: user.url
    }); /* [1] */
    user.name = ''; /* [2] */
    user.email = ''; /* [2] */
    user.url = ''; /* [2] */
  };

  $scope.addComment = function (comment) {
    console.log(comment.comment);
    $scope.comments.push(comment.comment);
    comment.comment = '';
  }

}

function avatarDirective () {
  console.log("we are calling the avatar directive");
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
        '<h4>{{user.email}}</h4>' +
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

function commentsDirective () {
  console.log("we are calling the comment directive");
  return {
    scope: {
      comment: '='
    },
    restrict: 'E',
    replace: 'true',
    template: (
      '<div class = "Comment">' +
        '<h4>{{comment}}</h4>' +
      '</div>'
    )
  };
}

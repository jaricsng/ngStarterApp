var app = angular.module('StarterApp', ['ngMaterial', 'ngMessages', 'ui.router']);

app.controller('AppCtrl', ['$scope', '$mdBottomSheet', '$mdSidenav', '$mdDialog', function($scope, $mdBottomSheet, $mdSidenav, $mdDialog) {

    // Toolbar search toggle
    $scope.toggleSearch = function(element) {
        $scope.showSearch = !$scope.showSearch;
    };

    // Sidenav toggle
    $scope.toggleSidenav = function(menuId) {
        $mdSidenav(menuId).toggle();
    };

    // Menu items
    $scope.menu = [{
        link: '',
        title: 'Dashboard',
        icon: 'action:ic_dashboard_24px' // we have to use Google's naming convention for the IDs of the SVGs in the spritesheet
    }, {
        link: '',
        title: 'Friends',
        icon: 'social:ic_group_24px'
    }, {
        link: '',
        title: 'Messages',
        icon: 'communication:ic_message_24px'
    }];

    $scope.admin = [{
        link: 'showListBottomSheet($event)',
        title: 'Settings',
        icon: 'action:ic_settings_24px'
    }, {
        link: '',
        title: 'Trash',
        icon: 'action:ic_delete_24px'
    }, {
        link: '',
        title: 'About',
        icon: 'communication:ic_contacts_24px'
    }];

    // Mock activity
    $scope.activity = [{
        what: 'Brunch this weekend?',
        who: 'Ali Conners',
        avatar: 'svg-1',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands"
    }, {
        what: 'Summer BBQ',
        who: 'to Alex, Scott, Jennifer',
        avatar: 'svg-2',
        when: '3:08PM',
        notes: "Wish I could come out but I'm out of town this weekend"
    }, {
        what: 'Oui Oui',
        who: 'Sandra Adams',
        avatar: 'svg-3',
        when: '3:08PM',
        notes: "Do you have Paris recommendations? Have you ever been?"
    }, {
        what: 'Birthday Gift',
        who: 'Trevor Hansen',
        avatar: 'svg-4',
        when: '3:08PM',
        notes: "Have any ideas of what we should get Heidi for her birthday?"
    }, {
        what: 'Recipe to try',
        who: 'Brian Holt',
        avatar: 'svg-5',
        when: '3:08PM',
        notes: "We should eat this: Grapefruit, Squash, Corn, and Tomatillo tacos"
    }, ];

    // Bottomsheet & Modal Dialogs
    $scope.alert = '';
    $scope.showListBottomSheet = function($event) {
        $scope.alert = '';
        $mdBottomSheet.show({
            templateUrl: 'views/bottomsheet.html',
            controller: 'ListBottomSheetCtrl',
            targetEvent: $event
        }).then(function(clickedItem) {
            $scope.alert = clickedItem.name + ' clicked!';
        });
    };

    $scope.showAdd = function(ev) {
        $mdDialog.show({
                controller: DialogController,
                templateUrl: 'views/addDialog.html',
                targetEvent: ev,
            })
            .then(function(answer) {
                $scope.alert = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.alert = 'You cancelled the dialog.';
            });
    };
}]);

app.controller('ListBottomSheetCtrl', function($scope, $mdBottomSheet) {
    $scope.items = [{
        name: 'Share',
        icon: 'social:ic_share_24px'
    }, {
        name: 'Upload',
        icon: 'file:ic_cloud_upload_24px'
    }, {
        name: 'Copy',
        icon: 'content:ic_content_copy_24px'
    }, {
        name: 'Print this page',
        icon: 'action:ic_print_24px'
    }, ];

    $scope.listItemClick = function($index) {
        var clickedItem = $scope.items[$index];
        $mdBottomSheet.hide(clickedItem);
    };
});

function DialogController($scope, $mdDialog) {
    $scope.hide = function() {
        $mdDialog.hide();
    };
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
    $scope.answer = function(answer) {
        $mdDialog.hide(answer);
    };
};

app.controller('DemoCtrl', DemoCtrl);

function DemoCtrl($timeout, $q) {
    var self = this;
    // list of `state` value/display objects
    self.states = loadAll();
    self.selectedItem = null;
    self.searchText = null;
    self.querySearch = querySearch;
    // ******************************
    // Internal methods
    // ******************************
    /**
     * Search for states... use $timeout to simulate
     * remote dataservice call.
     */
    function querySearch(query) {
        var results = query ? self.states.filter(createFilterFor(query)) : [];
        return results;
    }
    /**
     * Build `states` list of key/value pairs
     */
    function loadAll() {
        var allStates = 'Ali Conners, Alex, Scott, Jennifer, \
              Sandra Adams, Brian Holt, \
              Trevor Hansen';
        return allStates.split(/, +/g).map(function(state) {
            return {
                value: state.toLowerCase(),
                display: state
            };
        });
    }
    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);
        return function filterFn(state) {
            return (state.value.indexOf(lowercaseQuery) === 0);
        };
    }
};

app.config(function($mdThemingProvider) {
    var customBlueMap = $mdThemingProvider.extendPalette('light-blue', {
        'contrastDefaultColor': 'light',
        'contrastDarkColors': ['50'],
        '50': 'ffffff'
    });
    $mdThemingProvider.definePalette('customBlue', customBlueMap);
    $mdThemingProvider.theme('default')
        .primaryPalette('customBlue', {
            'default': '500',
            'hue-1': '50'
        })
        .accentPalette('pink');
    $mdThemingProvider.theme('input', 'default')
        .primaryPalette('grey')
});

app.config(function($mdIconProvider) {
    $mdIconProvider
    // linking to https://github.com/google/material-design-icons/tree/master/sprites/svg-sprite
    //
        .iconSet('action', 'img/svg-sprite-action.svg', 24)
        .iconSet('alert', 'img/svg-sprite-alert.svg', 24)
        .iconSet('av', 'img/svg-sprite-av.svg', 24)
        .iconSet('communication', 'img/svg-sprite-communication.svg', 24)
        .iconSet('content', 'img/svg-sprite-content.svg', 24)
        .iconSet('device', 'img/svg-sprite-device.svg', 24)
        .iconSet('editor', 'img/svg-sprite-editor.svg', 24)
        .iconSet('file', 'img/svg-sprite-file.svg', 24)
        .iconSet('hardware', 'img/svg-sprite-hardware.svg', 24)
        .iconSet('image', 'img/svg-sprite-image.svg', 24)
        .iconSet('maps', 'img/svg-sprite-maps.svg', 24)
        .iconSet('navigation', 'img/svg-sprite-navigation.svg', 24)
        .iconSet('notification', 'img/svg-sprite-notification.svg', 24)
        .iconSet('social', 'img/svg-sprite-social.svg', 24)
        .iconSet('toggle', 'img/svg-sprite-toggle.svg', 24)

    // Illustrated user icons used in the docs https://material.angularjs.org/latest/#/demo/material.components.gridList
    .iconSet('avatars', 'img/avatar-icons.svg', 24)
        .defaultIconSet('img/svg-sprite-action.svg', 24);
});

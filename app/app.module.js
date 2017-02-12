import angular from 'angular';

import appComponent from './app.component';

const AppMod = angular.module('root', [])
    .component('app', appComponent);

export default AppMod;
'use strict';

const content = 
  `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus euismod lacus ac nisi dignissim posuere. Integer velit urna, auctor non tincidunt ut, sagittis id est. Quisque tortor eros, cursus sed nibh sit amet, semper vehicula purus. Mauris euismod sapien quis pellentesque gravida. Vestibulum lacus nulla, rhoncus in nibh vel, posuere euismod risus. Proin maximus, nibh eu fringilla suscipit, felis eros facilisis nisl, in tincidunt ligula ante et mauris. Nulla neque lorem, volutpat vel hendrerit non, suscipit nec nulla. Nulla non libero placerat, scelerisque tortor non, vestibulum diam. Nunc egestas gravida tincidunt.

Vivamus posuere ante ac pharetra pulvinar. Proin vel arcu sit amet velit feugiat efficitur a sagittis augue. Etiam molestie elementum orci, sit amet iaculis nibh pharetra a. Quisque semper luctus augue, at fringilla erat iaculis tincidunt. Fusce sit amet ex ac velit faucibus congue eu non orci. Nam fermentum nibh nunc, sit amet faucibus ante feugiat nec. Sed elit justo, accumsan a purus at, tincidunt vehicula neque.

Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent vestibulum luctus tincidunt. Aenean sollicitudin nisi interdum faucibus suscipit. Quisque ut eros a est vestibulum tristique vitae non libero. Mauris in tortor erat. In finibus elit quis mi semper, eu volutpat nisl hendrerit. Cras orci velit, fringilla sed lorem a, porttitor aliquam orci. Sed pellentesque leo at nisl maximus, sit amet pulvinar massa bibendum. Sed feugiat gravida massa, sed tincidunt arcu laoreet vel. Cras ac tortor quis mauris aliquam congue. Vestibulum imperdiet pharetra libero. Praesent fermentum et ante nec placerat. Etiam ullamcorper laoreet tellus, in varius massa aliquet quis. Donec eros elit, malesuada condimentum elit ut, luctus lacinia enim.

Fusce euismod pulvinar euismod. Nulla vitae sapien sed est vehicula pulvinar. Nulla dolor sem, blandit eu gravida vel, scelerisque ut neque. Aenean lacinia ut orci sed eleifend. Donec vitae nunc ullamcorper nulla semper feugiat ut id orci. Curabitur nec interdum urna, ac eleifend enim. Nulla mattis ipsum at ipsum bibendum imperdiet at in sapien. Sed euismod, massa rhoncus semper tristique, quam justo eleifend mauris, non tristique mi est vel nibh. Proin semper dapibus nisl, sit amet ullamcorper ipsum ultrices eu. Duis dignissim laoreet pellentesque. Ut laoreet, libero at sollicitudin malesuada, purus tellus accumsan justo, et varius ex mi sit amet augue. Nulla lacinia odio orci, eu rutrum quam tempor non. Maecenas eget lacus dolor. Mauris eu ex ultrices, efficitur erat eget, ornare nunc. Suspendisse bibendum, urna convallis venenatis ultrices, mi justo vehicula elit, nec mattis lacus urna in sem.

Maecenas sed erat blandit, molestie risus vulputate, molestie metus. In volutpat vehicula leo et dapibus. Ut eu egestas arcu, vitae vehicula sem. Nulla fermentum dui in purus malesuada, in commodo leo tincidunt. Nam dignissim sed ipsum quis sodales. Aliquam tristique consequat lacus vel varius. In hac habitasse platea dictumst. Nulla convallis efficitur magna, ac semper felis viverra sollicitudin. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Praesent in varius magna.

`;

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Posts', [{
      title: "Mon super titre !",
      content: content,
      UserId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Posts', null, {});
  }
};

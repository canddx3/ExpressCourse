(function () {
    'use strict';
    // this function is strict...
 }());
 

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "category", deps: []
 *
 **/

var info = {
    "revision": 1,
    "name": "initial_migration",
    "created": "2019-09-28T15:48:22.033Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: [
        "category",
        {
            "category_id": {
                "type": Sequelize.INTEGER(3).UNSIGNED,
                "field": "category_id",
                "primaryKey": true,
                "allowNull": false
            },
            "name": {
                "type": Sequelize.STRING(25),
                "field": "name",
                "allowNull": false
            },
            "last_update": {
                "type": Sequelize.DATE,
                "field": "last_update",
                "defaultValue": Sequelize.Literal,
                "allowNull": false
            },
            "createdAt": {
                "type": Sequelize.DATE,
                "field": "createdAt",
                "allowNull": false
            },
            "updatedAt": {
                "type": Sequelize.DATE,
                "field": "updatedAt",
                "allowNull": false
            }
        },
        {}
    ]
}];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};

'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "Delete" to table "users"
 *
 **/

var info = {
    "revision": 3,
    "name": "initial_migration",
    "created": "2019-10-26T01:21:08.853Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "users",
        "Delete",
        {
            "type": Sequelize.BOOLEAN,
            "field": "Delete"
        }
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

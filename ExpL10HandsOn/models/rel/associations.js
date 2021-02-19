module.exports = function(models) {
    models.posts.belongsToMany(models.users, 
        { 
            foreignKey: 'UserId'
        });
    models.users.hasMany(models.posts,
        {
            foreignKey: 'UserId'
        });
};
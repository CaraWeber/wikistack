var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {
	logging:false
});

var Page = db.define('page', {
  title: {
  	type: Sequelize.STRING, 
  	allowNull: false
  },
  urlTitle: {
  	type: Sequelize.STRING, 
  	isUrl: true, allowNull: false
  },
  content: {
  	type: Sequelize.TEXT, 
  	allowNull: false
  },
  status: {
  	type: Sequelize.ENUM('open','closed'),
  	allowNull:true
  },
  // date: {
  //   type: Sequelize.DATE,
  //   defaultValue: Sequelize.NOW,
  //   allowNull: true
  //   }
}, {
  	getterMethods: {
		route: function()  { return '/wiki/' + this.urlTitle; }
	}
}
);

Page.beforeValidate(function(page){
    page.urlTitle = page.title.replace(/\s+/g, '_').replace(/\W/g, '');
});

var User = db.define('user', {
  name: {type: Sequelize.STRING, allowNull: false},
  email: {type: Sequelize.STRING, isEmail: true, allowNull: false}
});

Page.belongsTo(User, { as: 'author' });

module.exports = {
  Page: Page,
  User: User
};
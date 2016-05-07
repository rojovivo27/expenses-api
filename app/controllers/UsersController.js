var User = require('../models/user');

export class UsersController {
	constructor(app){
		let baseRoute = '/v1/users/';

		app.get( baseRoute, this.index.bind(this) );
		app.post( baseRoute, this.store.bind(this) );

	}

	handleError(req, res, err) {
		console.log('Error: ',err);
		res.status(500).json ({error: err});
	}

	index(req, res){
		User.find({}).then(users => {
			res.json( { users: users } );
		})
		.catch (e => {
			this.handleError(req, res, e);
		});
	}

	store (req, res){
		var newUser = new User(req.body);
		if(!newUser){
			return res.status(400).json({error: 'Wrong request'});
		}

		newUser.save( function complete(err) {
			if(err){ return this.handleError(req, res, err);}

			res.json(newUser);
		});
	}
}
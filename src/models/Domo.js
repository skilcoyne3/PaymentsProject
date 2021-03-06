var mongoose = require('mongoose');
var _ = require('underscore');
var cost;

var DomoModel;

var setName = function(name) {
    return _.escape(name).trim();
};

var DomoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        set: setName
    },
    
    price: {
        type: Number,
        min: 0,
        required: true
    },
	/*cost: {
		type: Number,
		min: 0, 
		required: false
	},*/
    owner: 	{
		type: mongoose.Schema.ObjectId,
		required: true,
		ref: 'Account'
	},
    
    createdData: {
        type: Date,
        default: Date.now
    }

});

DomoSchema.methods.toAPI = function() {
	//this.cost = this.price; 
    return {
        name: this.name,
        price: this.price,
		//cost: this.cost
    };
};

DomoSchema.statics.findByOwner = function(ownerId, callback) {

    var search = {
        owner: mongoose.Types.ObjectId(ownerId)
    };

    return DomoModel.find(search).select("name price").exec(callback);
};


DomoModel = mongoose.model('Domo', DomoSchema);


module.exports.DomoModel = DomoModel;
module.exports.DomoSchema = DomoSchema;
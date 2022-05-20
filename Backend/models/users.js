const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    
    email: {
        type: String,
        required: true,
    },

    passwordHash: {
        type: String,
        required: true,
    },

    phone: {
        type: String,
        required: true,
    },
    
    isAdmin: {
        type: Boolean,
        default: false,
    }
});

usersSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

usersSchema.set('toJSON', {
    virtuals: true,
});

usersSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

usersSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

usersSchema.set('toJSON', {
    virtuals: true,
});

usersSchema.virtual('id').get(function () {
    return this._id.toHexString();
});


exports.Users = mongoose.model('User', usersSchema);
exports.usersSchema = usersSchema;
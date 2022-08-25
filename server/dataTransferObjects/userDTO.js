module.exports = class UserDTO {
    email;
    id;
    hasActivated;

    constructor(model) {
        this.email = model.email
        this.id = model._id
        this.hasActivated = model.hasActivated
    }
}
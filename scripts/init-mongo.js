// init-mongo.js
db = db.getSiblingDB('todomvc');  // Switch to todomvc database

db.createUser({
    user: "developer",
    pwd: "test123",
    roles: [
        {
            role: "readWrite",
            db: "todomvc"
        }
    ]
});

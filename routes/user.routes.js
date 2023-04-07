const {updatePassword, updateProfile } = require("../controllers/user.controllers");
const { verifyToken, isAdmin } = require("../middleware/auth");
const { validateUsersProfile } = require("../middleware/validateUsersReqBody");

module.exports = (app) => {
    app.put("/mba/api/v1/updatePassword",verifyToken , updatePassword);
    app.put("/mba/api/v1/updateProfile/:userId",[verifyToken , isAdmin, validateUsersProfile ], updateProfile);
}
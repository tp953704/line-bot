"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const UserSchema = new Schema({
    userLineId: {
        type: String,
        required: true
    },
    describe: {
        type: String,
        required: true
    },
    creatDate: {
        type: Date,
        default: Date.now
    }
});
exports.User = mongoose_1.default.model("describe", UserSchema);
//# sourceMappingURL=describe.js.map
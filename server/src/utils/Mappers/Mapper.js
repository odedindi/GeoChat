"use strict";
exports.__esModule = true;
var Mapper = /** @class */ (function () {
    function Mapper() {
        var _this = this;
        this.toDTOArr = function (models) { return models.map(function (model) { return _this.toDTO(model); }); };
    }
    return Mapper;
}());
exports["default"] = Mapper;

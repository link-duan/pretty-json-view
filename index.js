"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var PrettyJsonView = /** @class */ (function (_super) {
    __extends(PrettyJsonView, _super);
    function PrettyJsonView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderStack = [];
        return _this;
    }
    PrettyJsonView.prototype.render = function () {
        return this.format(this.props.data);
    };
    /**
     * 对数据进行格式化展示
     * @param data 数据
     */
    PrettyJsonView.prototype.format = function (data) {
        var _this = this;
        var indentStyle = this.props.indentStyle;
        var keys = Object.keys(data);
        var kvList = [];
        keys.forEach(function (k, idx) {
            _this.renderStack.push(k);
            var v = Reflect.get(data, k);
            var isLastEle = idx >= keys.length - 1;
            var dom = _this.handleValueTypes(k, v);
            kvList.push(React.createElement("div", { key: idx },
                dom,
                !isLastEle ? "," : "",
                _this.renderTagInfo()));
            _this.renderStack.pop();
        });
        if (this.renderStack.length > 0) {
            return React.createElement("div", { style: indentStyle }, kvList);
        }
        return React.createElement("div", { className: "__react-json-view" },
            "{",
            React.createElement("div", { style: indentStyle }, kvList),
            "}");
    };
    /**
     * 处理数据类型
     * @param key
     * @param val
     */
    PrettyJsonView.prototype.handleValueTypes = function (key, val) {
        var _this = this;
        var dom = React.createElement(React.Fragment, null);
        if (typeof val === "object" && val instanceof Array) {
            dom = React.createElement("span", { className: "__react-json-view-value __react-json-view-array" },
                "[",
                val.map(function (item, idx) {
                    _this.renderStack.push("$");
                    var isLast = idx === val.length - 1;
                    return React.createElement("div", { style: _this.props.indentStyle, className: "__react-json-view-array-item", key: idx },
                        _this.renderValue(key, item),
                        isLast ? "" : ",",
                        _this.renderTagInfo(),
                        _this.renderStack.pop() && "");
                }),
                "]");
        }
        else {
            dom = this.renderValue(key, val);
        }
        return React.createElement(React.Fragment, null,
            React.createElement("span", { className: "__react-json-view-key" },
                "\"",
                key,
                "\""),
            ":",
            dom);
    };
    /**
     * 渲染字段
     * @param key
     * @param val
     */
    PrettyJsonView.prototype.renderValue = function (key, val) {
        var _this = this;
        var dom = React.createElement(React.Fragment, null);
        switch (typeof val) {
            case "object":
                if (val instanceof Array) {
                    dom = React.createElement("span", { className: "__react-json-view-value __react-json-view-array" },
                        "[",
                        val.map(function (item, idx) {
                            var isLast = idx === val.length - 1;
                            return React.createElement("span", { className: "__react-json-view-array-item", key: idx },
                                _this.renderValue(key, item),
                                isLast ? "" : ",");
                        }),
                        "]");
                }
                else {
                    dom = React.createElement("span", { className: "__react-json-view-value __react-json-view-object" },
                        "{",
                        " ",
                        this.format(val),
                        "}");
                }
                break;
            case "boolean":
                dom =
                    React.createElement("span", { className: "__react-json-view-value __react-json-view-bool" }, val ? "true" : "false");
                break;
            case "string":
                dom = React.createElement("span", { className: "__react-json-view-value __react-json-view-string" },
                    "\"",
                    val,
                    "\"");
                break;
            case "number":
            case "bigint":
                dom = React.createElement("span", { className: "__react-json-view-value __react-json-view-number" }, val);
                break;
        }
        return dom;
    };
    /**
     * 渲染Tag信息
     */
    PrettyJsonView.prototype.renderTagInfo = function () {
        var tagInfo = this.props.tagInfo;
        if (tagInfo === undefined)
            return "";
        var tagKey = this.renderStack.join(".");
        var tagVal = Reflect.getOwnPropertyDescriptor(tagInfo, tagKey);
        if (!tagVal)
            return "";
        return React.createElement("span", { className: "__react-json-view-tag" },
            "//",
            tagVal.value);
    };
    PrettyJsonView.defaultProps = {
        indentStyle: {
            paddingLeft: "20px"
        },
        tagInfo: {}
    };
    return PrettyJsonView;
}(React.Component));
exports.default = PrettyJsonView;

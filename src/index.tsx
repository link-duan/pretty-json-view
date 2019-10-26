import * as React from 'react'

interface Props {
    data: object // 数据
    indentStyle?: object //缩进风格，传入style object
    tagInfo?: object // tag信息，如果设置了，就展示
}

export default class PrettyJsonView extends React.Component<Props, {}> {
    static defaultProps = {
        indentStyle: {
            paddingLeft: "20px"
        },
        tagInfo: {}
    };

    private renderStack: string[] = [];

    public render() {
        return this.format(this.props.data);
    }

    /**
     * 对数据进行格式化展示
     * @param data 数据
     */
    private format(data: object) {
        const {indentStyle} = this.props;
        let keys = Object.keys(data);
        let kvList: JSX.Element[] = [];
        keys.forEach((k, idx) => {
            this.renderStack.push(k);
            let v = Reflect.get(data, k);
            let isLastEle = idx >= keys.length - 1;
            let dom = this.handleValueTypes(k, v);
            kvList.push(
                <div key={idx}>
                    {dom}
                    {!isLastEle ? "," : ""}
                    {this.renderTagInfo()}
                </div>
            );
            this.renderStack.pop();
        });
        if (this.renderStack.length > 0) {
            return <div style={indentStyle}>{kvList}</div>;
        }
        return <div className={"__react-json-view"}>
            {"{"}
            <div style={indentStyle}>{kvList}</div>
            {"}"}
        </div>;
    }

    /**
     * 处理数据类型
     * @param key
     * @param val
     */
    private handleValueTypes(key: string, val: any) {
        let dom: JSX.Element = <></>;
        if (typeof val === "object" && val instanceof Array) {
            dom = <span className={"__react-json-view-value __react-json-view-array"}>
                    [
                {
                    val.map((item, idx) => {
                        this.renderStack.push("$");
                        let isLast = idx === val.length - 1;
                        return <div style={this.props.indentStyle} className={"__react-json-view-array-item"} key={idx}>
                            {this.renderValue(key, item)}
                            {isLast ? "" : ","}
                            {this.renderTagInfo()}
                            {this.renderStack.pop() && ""}
                        </div>;
                    })
                }
                ]
                </span>;
        } else {
            dom = this.renderValue(key, val);
        }
        return <>
            <span className={"__react-json-view-key"}>"{key}"</span>
            :
            {dom}
        </>;
    }

    /**
     * 渲染字段
     * @param key
     * @param val
     */
    private renderValue(key: string, val: any) {
        let dom: JSX.Element = <></>;
        switch (typeof val) {
            case "object":
                if (val instanceof Array) {
                    dom = <span className={"__react-json-view-value __react-json-view-array"}>
                        [
                        {
                            val.map((item, idx) => {
                                let isLast = idx === val.length - 1;
                                return <span className={"__react-json-view-array-item"} key={idx}>
                                    {this.renderValue(key, item)}
                                    {isLast ? "" : ","}
                                </span>;
                            })
                        }
                        ]
                    </span>;
                } else {
                    dom = <span
                        className={"__react-json-view-value __react-json-view-object"}>{"{"} {this.format(val)}{"}"}</span>;
                }
                break;
            case "boolean":
                dom =
                    <span className={"__react-json-view-value __react-json-view-bool"}>{val ? "true" : "false"}</span>;
                break;
            case "string":
                dom = <span className={"__react-json-view-value __react-json-view-string"}>"{val}"</span>;
                break;
            case "number":
            case "bigint":
                dom = <span className={"__react-json-view-value __react-json-view-number"}>{val}</span>;
                break;
        }
        return dom;
    }

    /**
     * 渲染Tag信息
     */
    private renderTagInfo() {
        const {tagInfo} = this.props;
        if (tagInfo === undefined) return "";
        let tagKey = this.renderStack.join(".");
        let tagVal = Reflect.getOwnPropertyDescriptor(tagInfo, tagKey);
        if (!tagVal) return "";
        return <span className={"__react-json-view-tag"}>//{tagVal.value}</span>
    }
}

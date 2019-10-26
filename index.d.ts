import * as React from 'react';
interface Props {
    data: object;
    indentStyle?: object;
    tagInfo?: object;
}
export default class PrettyJsonView extends React.Component<Props, {}> {
    static defaultProps: {
        indentStyle: {
            paddingLeft: string;
        };
        tagInfo: {};
    };
    private renderStack;
    render(): JSX.Element;
    /**
     * 对数据进行格式化展示
     * @param data 数据
     */
    private format;
    /**
     * 处理数据类型
     * @param key
     * @param val
     */
    private handleValueTypes;
    /**
     * 渲染字段
     * @param key
     * @param val
     */
    private renderValue;
    /**
     * 渲染Tag信息
     */
    private renderTagInfo;
}
export {};

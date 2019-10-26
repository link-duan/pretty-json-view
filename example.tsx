import React from 'react';
import ReactJsonView from "./index";

const App: React.FC = () => {
    let tagInfo = {
        "code": "状态码",
        "data": "数据部分",
        "data.hey": "打招呼",
        "data.detail": "开玩笑",
        "data.detail.sex": "性别",
        "data.detail.list": "数据列表",
        "data.detail.list.$": "数据内容",
        "data.detail.list.$.a": "数据字段",
    };
    let data = {
        code: 0,
        data: {
            hey: 123,
            detail: {
                name: "duanlv",
                sex: false,
                list: [
                    "xxxxxx",
                    "yyyyyyy",
                    {
                        a: 2
                    }
                ]
            }
        }
    };
    return (
        <div className="App">
            <div style={{
                width: "600px",
                margin: "0 auto",
                backgroundColor: "white",
                padding: "15px",
                borderRadius: "5px"
            }}>
                <ReactJsonView tagInfo={tagInfo} data={data}/>
            </div>
        </div>
    );
};

export default App;

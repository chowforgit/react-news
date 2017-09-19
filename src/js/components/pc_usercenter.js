import React from 'react';
import { Row, Col } from 'antd';
import { Menu, Icon, Tabs,
         message, Form, Input,
         Button, CheckBox, Modal,
         Upload, Card } from 'antd';
const TabPane = Tabs.TabPane;
import {Router, Route, Link, browserHistory} from 'react-router';
import PCHeader from './pc_header';
import PCFooter from './pc_footer';

export default class PCUserCenter extends React.Component{
    constructor(){
        super();
        this.state = {
            usercomment: '',
            usercollection: '',
            previewImage: '',
            previewVisible: false
        };
    };
    componentDidMount(){
        var myFetchOptions = {
            method: 'GET'
        };
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid="+localStorage.userid,myFetchOptions)
        .then(response=>response.json())
        .then(json=>{this.setState({usercollection: json});
        });
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid="+localStorage.userid,myFetchOptions)
        .then(response=>response.json())
        .then(json=>{this.setState({usercomment: json});
        });
    };
    render(){
        const props = {
            action: 'http://newsapi.gugujiankong.com/handler.ashx',
            headers: {
                "Access-Control-Allow-Origin" : "*"
            },
            listType: 'picture-card',
            defaultFileList: [
                {
                    uid: -1,
                    name:'xxx.jpg',
                    state: 'done',
                    url: 'http://up.qqjia.com/z/face01/face06/facejunyong/junyong04.jpg',
                    thumUrl: 'http://up.qqjia.com/z/face01/face06/facejunyong/junyong04.jpg'
                }
            ],
            onPreview: (file)=>{
                this.setState({previewImage: file.url, previewVisible:true});
            }
        };
        const {usercollection, usercomment} = this.state;
        const usercollectionList = usercollection.length?
        usercollection.map((uc,index)=>(
            <Card key={index} title={uc.uniquekey} extra={<a target="_blank" href={`/#/details/${uc.uniquekey}`} >查看</a>} >
                <p>{uc.Title}</p>
            </Card>
        ))
        :
        '您还没有收藏任何新闻，快去收藏一些新闻吧！';
        const usercommentList = usercomment.length?
        usercomment.map((comment,index)=>(
            <Card key={index} title={`于${comment.datetime} 评论了新闻${comment.uniquekey}`} extra={<a target="_blank" href={`/#/details/${comment.uniquekey}`} >查看</a>} >
                <p>{comment.Comments}</p>
            </Card>
        ))
        :
        '您还没有发表任何评论。';
        return(
            <div>
                <PCHeader/>
                    <Row>
                        <Col span={2}></Col>
                        <Col span={20}>
                            <Tabs>
                                <TabPane tab='我的收藏列表' key='1' >
                                    <div className="comment">
                                        <Row>
                                            <Col span={24}>
                                                {usercollectionList}
                                            </Col>
                                        </Row>
                                    </div>
                                </TabPane>
                                <TabPane tab='我的评论列表' key='2' >
                                    <div className="comment">
                                        <Row>
                                            <Col span={24}>
                                                {usercommentList}
                                            </Col>
                                        </Row>
                                    </div>
                                </TabPane>
                                <TabPane tab='头像设置' key='3' >
                                    <div class="clearfix">
                                        <Upload {...props}>
                                            <Icon type="plus"/>
                                            <div className="ant-upload-text">上传照片</div>
                                        </Upload>
                                        <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel} >
                                            <img alt="预览" src={this.state.previewImage} />
                                        </Modal>
                                    </div>    
                                </TabPane>
                            </Tabs>
                        </Col>
                        <Col span={2}></Col>
                    </Row>
                <PCFooter/>
            </div>
        );
    };
}
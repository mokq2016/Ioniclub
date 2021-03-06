
import {Page,Alert,NavController,ViewController,NavParams} from 'ionic-angular';

@Page({
  templateUrl: './build/pages/editor/editor.html'
})
export class editor {
  private comment:string = "";
  private isNewTopic:boolean = false;
  tab:string = "share";//主题类别
  title:string;
  constructor(params: NavParams,private _viewCtrl:ViewController,private _nav: NavController) {
    this.comment = params.get('data');
    this.isNewTopic = params.get('newTopic');
  }

  ngOnInit() {

  }

  addBlock(){
    this.comment += "\n**string**";
  }

  addQuote(){
    this.comment += "\n> ";
  }

  addList(){
    this.comment +="\n- "
  }

  addCode(){
    this.comment +="\n```\ncode\n```"
  }

  //外部连接
  addAttach(){
    let alert = Alert.create({
      title: 'Login',
      inputs: [
        {
          name: 'title',
          placeholder: '标题'
        },
        {
          name: 'url',
          value:'http://',
          type: 'url'
        }
      ],
      buttons: [
        {
          text: '取消',
          role: 'cancel'
        },
        {
          text: '输入',
          handler: data => {
            this.comment+="\n ["+data.title+"]"+"("+data.url+")"
            return true;
          }
        }
      ]
    });
    this._nav.present(alert);
  }

  //添加图片
  addImage(){
    this.comment+="\n![image](http://resource)"
  }

  submit(){
    if(this.comment){
      if(this.isNewTopic){
        if(this.title){
          this._viewCtrl.dismiss({content:this.comment,title:this.title,tab:this.tab});
        }else{
          alert("请填写标题！");
        }
      }else{
        this._viewCtrl.dismiss(this.comment);
      }
    }else{
      alert("请填写内容！");
    }

  }

}

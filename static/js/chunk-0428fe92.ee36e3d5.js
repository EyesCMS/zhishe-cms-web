(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0428fe92"],{1540:function(t,e,i){"use strict";i.d(e,"d",(function(){return o})),i.d(e,"g",(function(){return a})),i.d(e,"h",(function(){return n})),i.d(e,"f",(function(){return s})),i.d(e,"j",(function(){return l})),i.d(e,"m",(function(){return c})),i.d(e,"a",(function(){return u})),i.d(e,"n",(function(){return m})),i.d(e,"e",(function(){return f})),i.d(e,"b",(function(){return p})),i.d(e,"l",(function(){return d})),i.d(e,"o",(function(){return g})),i.d(e,"k",(function(){return h})),i.d(e,"c",(function(){return v})),i.d(e,"i",(function(){return b}));var r=i("b775");function o(t){return Object(r["a"])({url:"/forum/posts",method:"get",params:t})}function a(t,e,i){return Object(r["a"])({url:"/forum/".concat(t,"/posts"),method:"get",params:e})}function n(t,e,i){return Object(r["a"])({url:"/forum/posts/mine",method:"get",params:e})}function s(t,e){return Object(r["a"])({url:"/forum/posts/".concat(t),method:"get",params:e})}function l(t,e){return Object(r["a"])({url:"/forum/posts/".concat(t,"/remarks"),method:"get",params:e})}function c(t){return Object(r["a"])({url:"/forum/posts/remarks",method:"post",data:t})}function u(t,e){return Object(r["a"])({url:"/forum/posts/".concat(t),method:"put",data:e})}function m(t){return Object(r["a"])({url:"/forum/posts",method:"post",data:t})}function f(t){return Object(r["a"])({url:"/forum/posts",method:"get",params:t})}function p(t){return Object(r["a"])({url:"forum/posts/".concat(t),method:"delete"})}function d(t){return Object(r["a"])({url:"/forum/like",method:"post",params:t})}function g(t){return Object(r["a"])({url:"/forum/unlike",method:"post",params:t})}function h(t){return Object(r["a"])({url:"/forum/like",method:"get",params:t})}function v(t){return Object(r["a"])({url:"/forum/posts/remarks/".concat(t),method:"delete"})}function b(t){return Object(r["a"])({url:"/clubs/activities/recommended",method:"get",params:t})}},"45c5":function(t,e,i){"use strict";var r=i("7fa3"),o=i.n(r);o.a},"7fa3":function(t,e,i){},9478:function(t,e,i){"use strict";var r=i("2b0e");function o(t){var e,i=new Date(t),r=i.valueOf(),o=i.getFullYear(),a=i.getMonth()+1,n=i.getDate(),s=(i.getHours(),i.getMinutes(),i.getSeconds(),new Date),l=s.valueOf(),c=0;return c=l-r,e=c<=6e4?"刚刚":6e4<c&&c<=36e5?Math.round(c/6e4)+"分钟前":36e5<c&&c<=864e5?Math.round(c/36e5)+"小时前":864e5<c&&c<=1296e6?Math.round(c/864e5)+"天前":(c>1296e6&&s.getFullYear(),o+"-"+a+"-"+n),e}r["default"].directive("time",{bind:function(t,e){t.innerHTML=o(e.value),t.__timeout__=setInterval((function(){t.innerHTML=o(e.value)}),6e4)},unbind:function(t){clearInterval(t.__timeout__),delete t.__timeout__}})},a65d:function(t,e,i){"use strict";i.r(e);var r=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("el-card",{staticStyle:{"margin-top":"20px"}},[i("el-button",{staticStyle:{"margin-top":"10px",float:"left",cursor:"pointer"},attrs:{type:"primary"},on:{click:t.back}},[t._v("返回")]),t._v(" "),i("el-button",{staticStyle:{"margin-top":"10px",float:"right",cursor:"pointer"},attrs:{type:"primary"},on:{click:t.addForum}},[t._v("发布动态")]),t._v(" "),t._l(t.forumsList,(function(e,r){return i("div",{key:r,staticClass:"forum"},[i("el-row",{staticStyle:{"align-items":"center",display:"flex"}},[i("el-col",{attrs:{span:2}},[i("el-avatar",{staticStyle:{float:"left"},attrs:{src:e.avatarUrl}})],1),t._v(" "),i("el-col",{attrs:{span:4}},[i("p",{staticStyle:{"font-size":"16px"}},[t._v(t._s(e.posterName))]),t._v(" "),i("p",{directives:[{name:"time",rawName:"v-time",value:e.createAt,expression:"item.createAt"}],staticStyle:{"font-size":"12px"}})]),t._v(" "),i("h2",{staticStyle:{"margin-top":"0 padding: 0"}},[t._v(t._s(e.title))])],1),t._v(" "),i("el-row",[i("div",{directives:[{name:"show",rawName:"v-show",value:t.btnShow,expression:"btnShow"}],staticStyle:{display:"inline",float:"right",margin:"10px"},on:{click:function(i){return t.changeForum(e.id)}}},[i("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"编辑",placement:"top"}},[i("i",{staticClass:"el-icon-edit icon",staticStyle:{cursor:"pointer"}})])],1),t._v(" "),i("div",{staticStyle:{display:"inline",float:"right",margin:"10px"},on:{click:function(i){t.showDeleteForum(e),t.dialogVisible=!0}}},[i("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"删除",placement:"top"}},[i("i",{staticClass:"el-icon-delete icon",staticStyle:{cursor:"pointer"}})])],1)]),t._v(" "),i("el-row",{directives:[{name:"show",rawName:"v-show",value:e.imgUrl,expression:"item.imgUrl"}]},[i("el-image",{staticStyle:{width:"100px",height:"100px"},attrs:{src:e.imgUrl,onerror:"this.style.display='none'",lazy:""}})],1),t._v(" "),i("el-row",[i("p",[t._v(t._s(e.content))])]),t._v(" "),i("el-row",[i("el-badge",{staticClass:"item",attrs:{value:e.likeCount}},[i("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"点赞数",placement:"top"}},[i("p",{staticStyle:{display:"inline",float:"right",cursor:"pointer"}},[i("i",{staticClass:"el-icon-star-on",staticStyle:{display:"inline",float:"right",cursor:"pointer"}})])])],1),t._v(" "),i("el-badge",{directives:[{name:"show",rawName:"v-show",value:!t.forumsList[r].remarkVisiable,expression:"!forumsList[key].remarkVisiable"}],staticClass:"item",staticStyle:{display:"inline",float:"right",cursor:"pointer"},attrs:{value:t.forumsList[r].commentCount}},[i("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"查看评论",placement:"top"}},[i("p",{on:{click:function(i){t.getRemarkList(e),e.remarkVisiable=!0}}},[i("i",{staticClass:"el-icon-s-comment",staticStyle:{display:"inline",float:"right",cursor:"pointer"}})])])],1),t._v(" "),i("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"收起评论",placement:"top"}},[i("p",{directives:[{name:"show",rawName:"v-show",value:t.forumsList[r].remarkVisiable,expression:"forumsList[key].remarkVisiable"}],staticStyle:{display:"inline",float:"right",cursor:"pointer"},on:{click:function(i){return t.removeRemark(e)}}},[i("i",{staticClass:"el-icon-s-comment",staticStyle:{display:"inline",float:"right",cursor:"pointer"}})])]),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.forumsList[r].remarkVisiable,expression:"forumsList[key].remarkVisiable"}]},[i("el-row",{staticStyle:{"align-items":"center",display:"flex"}},[i("p",{directives:[{name:"show",rawName:"v-show",value:!t.forumsList[r].remark.totalCount,expression:"!forumsList[key].remark.totalCount"}],staticStyle:{margin:"0 auto"}},[t._v("暂无评论")])]),t._v(" "),t._l(t.forumsList[r].remark.items,(function(e,r){return i("div",{key:r,staticStyle:{"box-shadow":"0px 1px 5px 0px rgba(0, 0, 0, 0.3)","border-radius":"5px",padding:"10px"}},[i("el-row",{staticStyle:{"align-items":"center",display:"flex","background-color":"#F2F6FC"}},[i("el-col",{attrs:{span:3}},[i("el-avatar",{staticStyle:{float:"left"},attrs:{src:e.avatarUrl}})],1),t._v(" "),i("el-col",{attrs:{span:3}},[i("p",{staticStyle:{"font-size":"18px"}},[t._v(t._s(e.nickname))]),t._v(" "),i("p",{directives:[{name:"time",rawName:"v-time",value:e.createAt,expression:"index.createAt"}],staticStyle:{"font-size":"10px"}})]),t._v(" "),i("el-col",{attrs:{span:17}},[i("p",{staticStyle:{"margin-top":"0 padding: 0"}},[t._v(t._s(e.content))])]),t._v(" "),i("el-col",{directives:[{name:"show",rawName:"v-show",value:e.userId===t.userId,expression:"index.userId===userId"}],attrs:{span:2}},[i("div",{staticStyle:{display:"inline",float:"right",margin:"10px"},on:{click:function(i){return t.showDeletRemark(e)}}},[i("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"删除评论",placement:"top"}},[i("i",{staticClass:"el-icon-delete icon",staticStyle:{cursor:"pointer"}})])],1)])],1)],1)})),t._v(" "),i("el-col",{directives:[{name:"show",rawName:"v-show",value:t.forumsList[r].remark.totalCount,expression:"forumsList[key].remark.totalCount"}]},[i("div",{staticStyle:{"text-align":"center"}},[i("el-pagination",{ref:e.content,refInFor:!0,attrs:{"current-page":e.query.page,"page-sizes":[5,10,15,20],"page-count":5,"page-size":e.query.limit,layout:"total, prev, pager, next",total:e.remark.totalCount},on:{"current-change":function(i){return t.remarkCurrentChange(e)}}})],1)])],2)],1)],1)})),t._v(" "),i("div",{staticStyle:{"text-align":"center"}},[i("el-pagination",{attrs:{"current-page":t.queryInfo.page,"page-sizes":[5,10,15,20],"page-size":t.queryInfo.limit,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)],2),t._v(" "),i("el-dialog",{attrs:{visible:t.addForumDialogVisible,width:"70%",center:"",modal:""},on:{"update:visible":function(e){t.addForumDialogVisible=e},close:t.closeDialog}},[i("h2",{staticStyle:{"text-align":"center","margin-bottom":"50px"}},[t._v("发布动态")]),t._v(" "),i("el-form",{ref:"publish",attrs:{model:t.forumForm,rules:t.rules}},[i("el-form-item",{attrs:{label:"标题",prop:"title"}},[i("el-input",{attrs:{placeholder:"请输入标题"},model:{value:t.forumForm.title,callback:function(e){t.$set(t.forumForm,"title",e)},expression:"forumForm.title"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"内容",prop:"content"}},[i("el-input",{attrs:{type:"textarea",rows:5,placeholder:"请输入内容"},model:{value:t.forumForm.content,callback:function(e){t.$set(t.forumForm,"content",e)},expression:"forumForm.content"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"添加图片"}},[i("el-upload",{staticClass:"upload-demo",attrs:{action:"https://jsonplaceholder.typicode.com/posts/","before-upload":t.beforeImgUpload,"on-remove":t.handleRemove,"on-preview":t.handlePreview,"http-request":t.UploadImage,"file-list":t.fileList,"list-type":"picture"}},[i("el-button",{directives:[{name:"show",rawName:"v-show",value:1!==t.fileList.length,expression:"fileList.length !== 1"}],attrs:{size:"small",type:"primary"}},[t._v("点击上传")]),t._v(" "),i("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[t._v("只能上传jpg/jpeg文件，且不超过2M")])],1)],1)],1),t._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"primary"},on:{click:t.handleForm}},[t._v("发 布")])],1)],1),t._v(" "),i("el-dialog",{attrs:{visible:t.changeForumDialogVisible,width:"70%",center:"",modal:""},on:{"update:visible":function(e){t.changeForumDialogVisible=e}}},[i("h2",{staticStyle:{"text-align":"center","margin-bottom":"50px"}},[t._v("Change Forum")]),t._v(" "),i("el-form",{ref:"change",attrs:{model:t.forumDetile,rules:t.rules}},[i("el-form-item",{attrs:{label:"title",prop:"title"}},[i("el-input",{model:{value:t.forumDetile.title,callback:function(e){t.$set(t.forumDetile,"title",e)},expression:"forumDetile.title"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"content",prop:"content"}},[i("el-input",{attrs:{type:"textarea",rows:5},model:{value:t.forumDetile.content,callback:function(e){t.$set(t.forumDetile,"content",e)},expression:"forumDetile.content"}})],1)],1),t._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.handleChange(t.forumDetile.id)}}},[t._v("Handle Change")])],1)],1),t._v(" "),i("el-dialog",{attrs:{title:"提示",visible:t.deletRemarkVisible,width:"30%"},on:{"update:visible":function(e){t.deletRemarkVisible=e}}},[i("p",[t._v(t._s(t.deletRemark.content))]),t._v(" "),i("span",{staticStyle:{float:"right"}},[t._v("确认删除该评论吗？")]),t._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.deletRemarkVisible=!1}}},[t._v("取 消")]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.deletRemarks(t.deletRemark)}}},[t._v("确 定")])],1)]),t._v(" "),i("el-dialog",{attrs:{title:"提示",visible:t.dialogVisible,width:"30%"},on:{"update:visible":function(e){t.dialogVisible=e}}},[i("h3",[t._v(t._s(t.DeleteForum.title))]),t._v(" "),i("p",[t._v(t._s(t.DeleteForum.content))]),t._v(" "),i("span",{staticStyle:{float:"right"}},[t._v("确认删除该帖子吗？")]),t._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v("取 消")]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.deleteForum(t.DeleteForum.id)}}},[t._v("确 定")])],1)])],1)},o=[],a=(i("ac6a"),i("1540")),n=(i("9478"),{data:function(){return{userId:this.$store.getters.userId,dialogVisible:!1,deletRemarkVisible:!1,length:0,forumsList:[],forumDetile:{},remarklist:[],DeleteForum:{id:"",title:"",content:""},queryInfo:{keyword:"",page:1,limit:5,type:0,sort:"created_at",order:"desc"},total:0,addForumDialogVisible:!1,changeForumDialogVisible:!1,originState:1,btnShow:"chief"!==window.sessionStorage.getItem("roles"),forumForm:{title:"",content:"",image:""},rules:{title:[{required:!0,trigger:"blur",message:"请输入标题"}],content:[{required:!0,trigger:"blur",message:"请输入具体内容"}]},deletRemark:{content:"",id:""},fileList:[]}},created:function(){this.getForumsList()},methods:{handleSizeChange:function(t){this.queryInfo.limit=t,this.getForumsList()},handleCurrentChange:function(t){this.queryInfo.page=t,this.getForumsList()},remarkCurrentChange:function(t){t.query.page=this.$refs[t.content][0].internalCurrentPage,this.$forceUpdate,this.getRemarkList(t)},getForumsList:function(){var t=this;Object(a["h"])(this.queryInfo,this.originState).then((function(e){t.forumsList=e.data.items,t.total=e.data.totalCount,t.forumsList.forEach((function(t){t["query"]={page:1,limit:5},t["remark"]={items:null,totalCount:0}}))}))},getRemarkList:function(t){var e=this;this.$forceUpdate(),Object(a["j"])(t.id,t.query).then((function(i){200===i.status&&(t.remark=i.data,e.$forceUpdate())}))},addForum:function(){this.addForumDialogVisible=!0},handleForm:function(){var t=this;this.$refs.publish.validate((function(e){if(e){var i=new FormData;i.append("title",t.forumForm.title),i.append("content",t.forumForm.content),"string"!==typeof t.forumForm.image&&i.append("image",t.forumForm.image),t.forumForm.title="",t.forumForm.content="",t.forumForm.image="",t.fileList=[],Object(a["n"])(i).then((function(e){t.$message.success("发布成功！"),t.getForumsList(),t.addForumDialogVisible=!1})).catch((function(t){console.log(t)}))}else t.$message.error("发布失败！")}))},deleteForum:function(t){var e=this;Object(a["b"])(t).then((function(t){if(204!==t.status)return e.$message.error("删除帖子失败");e.getForumsList(),e.$message.success("删除帖子成功")})),this.dialogVisible=!1},changeForum:function(t){var e=this;this.changeForumDialogVisible=!0;var i={type:"chief"===window.sessionStorage.getItem("roles")?1:0};Object(a["f"])(t,i).then((function(t){e.forumDetile=t.data}))},handleChange:function(t){var e=this;this.$refs.change.validate((function(i){i&&Object(a["a"])(t,e.forumDetile).then((function(t){e.$message.success("修改成功"),e.getForumsList(),e.changeForumDialogVisible=!1}))}))},removeRemark:function(t){t.remarkVisiable=!1,this.$forceUpdate()},back:function(){this.$router.push("/forum/personalPost")},showDeleteForum:function(t){this.dialogVisible=!0,this.DeleteForum.id=t.id,this.DeleteForum.title=t.title,this.DeleteForum.content=t.content},showDeletRemark:function(t){this.deletRemark=t,this.deletRemarkVisible=!0},deletRemarks:function(t){var e=this;this.deletRemarkVisible=!1,Object(a["c"])(t.id).then((function(t){e.getForumsList(),e.$forceUpdate()}))},handleRemove:function(t,e){this.fileList.splice(t),console.log(t,e)},handlePreview:function(t){console.log(this.fileList)},beforeImgUpload:function(t){var e="image/jpeg"===t.type||"image/jpg"===t.type,i=t.size/1024/1024<2;return e?i?(e&&i&&(this.fileList.push(t.file),this.forumForm.image=t),void console.log("beforeImgUpload")):(this.$message.error("上传头像图片大小不能超过 2MB!"),!1):(this.$message.error("上传头像图片只能是 JPG 格式!"),!1)},closeDialog:function(){this.forumForm.content="",this.forumForm.title="",this.fileList=[]},UploadImage:function(t){t.onSuccess()}}}),s=n,l=(i("45c5"),i("2877")),c=Object(l["a"])(s,r,o,!1,null,"8d5e1e36",null);e["default"]=c.exports}}]);
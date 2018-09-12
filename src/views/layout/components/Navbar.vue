<template>
  <div>
    <el-menu class="navbar" mode="horizontal">
      <div style="float: left;height: 60px;width: 250px;margin-right:20px">
        <!--全屏按钮-->
        <hamburger style="float: left;margin: 20px 0px 0px 20px;" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
        <!--logo-->
        <div style="float: left;margin: 10px 10px 0px 20px;">
          <img src="./001.png" height="36px">
        </div> 
        <!--title-->
        <span style="float: left;color: #ffffff;font-size: 20px;line-height: 60px;">{{this.title}}</span>
      </div>
      <div style="float: right;width:200px;margin-left:50px">
        <span id="portal">
          <a href="http://218.241.206.66:11104/web-portal" target="_blank">
            <el-button class="avatar" type="text" title="门户">
              <i class="icon iconfont icon-diqiu" style="font-size: 35px;"></i>
            </el-button>
          </a>
        </span>
        <!--用户头像-->
        <el-dropdown trigger="click" style="float:right;margin-right:20px">
          <div class="avatar-wrapper">
            <img class="" :src="userImg" style="height: 50px;width: 50px;margin-top: 5px;border-radius: 10px;">
            <i class="el-icon-caret-bottom"></i>
          </div>
          <el-dropdown-menu class="user-dropdown" slot="dropdown">
            <a href="javascript:void(0)" @click="handleUpdate(userId)">
              <el-dropdown-item>基本资料</el-dropdown-item>
            </a>
            <a href="javascript:void(0)" @click="centerDialogVisible = true">
              <el-dropdown-item>修改密码</el-dropdown-item>
            </a>
            <el-dropdown-item>
              <span @click="logout" style="display:block;">退出</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div style="margin: 0;max-width: 1155px;margin: 0 auto;">
        <!--平台列表-->
       <!--  <b style="color:#FFFFFF;float: left;" @click="private"><i class="icon iconfont icon-zuo"></i></b>
        <b style="color:#FFFFFF;float: right;" @click="next"><i class="icon iconfont icon-you2"></i></b> -->
        <nav class="" style="padding:0;overflow:hidden;height:60px;margin:0;line-height: 60px">
          <div style="width:1500px;" id="emit">
            <!-- 拿到标识，增加点击事件，去请求数据，然后把当前sidebar数据拿到 --> 
            <span id="sss" v-for="(item,index)  in this.getinfo" :key="index" :class=" index === active ? 'home':'' " ref='navList' style="padding:0 10px;display: inline-block;vertical-align: top;" @click="trigger(index)">
              <!-- <a :xh="item.id"  @click="getCurSiderbarData(item.id)" target="_blank"  v-if="item.name=='系统管理'">
                <el-button class="platform" type="text">
                  <i :class="'icon iconfont'+' '+item.icon" style="font-size: 32px;float: left;margin: -5px 10px 0px 0px;"></i>
                  <span style="font-size: 16px;">{{item.name}}</span>
                </el-button>
              </a> -->
              <a :xh="item.id" @click="getCurSiderbarData(item.id)" target="_self" style="display:block">
                <!-- <el-button class="home" v-if="item.name=='企业管理平台'" style='padding: 10px 15px 5px 10px;'>
                  <i :class="'icon iconfont'+' '+item.icon" style="font-size: 32px;float: left;margin: -5px 10px 0px 0px;"></i>
                  <span style="font-size: 16px;">{{item.name}}</span>
                </el-button> -->
                <el-button class="platform" type="text">
                  <i :class="'icon iconfont'+' '+item.icon" style="font-size: 32px;float: left;margin: -5px 10px 0px 0px;"></i>
                  <span style="font-size: 16px;">{{item.name}}</span>
                </el-button>
              </a>
            </span>
            <!--  <span v-for="item  in this.getinfo" :key="item.index" class="" ref='navList' style="font-size:16px;height:60px;line-height: 60px;padding:0 10px">
           <a :href="item.url" target="_blank"  v-if="item.name=='系统管理'">
              <el-button class="platform" type="text">
                <i :class="'icon iconfont'+' '+item.icon" style="font-size: 32px;float: left;margin: -5px 10px 0px 0px;"></i>
                <span style="font-size: 16px;">{{item.name}}</span>
            </el-button>
            </a>
            <a :href="item.url" v-else target="_self">
              <el-button class="home" v-if="item.name=='企业管理平台'" style='padding: 10px 15px 5px 10px;'>
                <i :class="'icon iconfont'+' '+item.icon" style="font-size: 32px;float: left;margin: -5px 10px 0px 0px;"></i>
                <span style="font-size: 16px;">{{item.name}}</span>
              </el-button>
              <el-button class="platform" v-else type="text">
                <i :class="'icon iconfont'+' '+item.icon" style="font-size: 32px;float: left;margin: -5px 10px 0px 0px;"></i>
                <span style="font-size: 16px;">{{item.name}}</span>
              </el-button>
            </a>
            </span> -->
          </div>
        </nav>
      </div>
    </el-menu>
    <!--修改密码弹窗-->
    <el-dialog title="密码修改" :visible.sync="centerDialogVisible" width="30%" center>
      <el-row>
        <el-col :span="24">
          <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
            <el-form-item label="旧的密码" prop="oldPassword">
              <el-input type="text" v-model.number="ruleForm2.oldPassword"></el-input>
            </el-form-item>
            <el-form-item label="新的密码" prop="pass">
              <el-input type="password" v-model="ruleForm2.newPassword" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
              <el-button @click="resetForm('ruleForm2')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-dialog>
    <!--基本资料弹窗-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :model="form" status-icon :rules="rules" ref="form" label-width="120px">
        <el-form-item label="用户名" prop="username" style="width: 90%;">
          <el-input v-model="form.username" placeholder="请输入用户名" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="name" style="width: 90%;">
          <el-input v-model="form.name" placeholder="请输入昵称"></el-input>
        </el-form-item>
        <!-- <el-form-item label="性别">
          <el-radio-group v-model="form.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item> -->
        <el-form-item label="角色名称">
          <el-select class="filter-item" multiple value-key="id" disabled v-model="form.roleName" style="width:88.5%">
            <!-- <el-option v-for="item in roleOptions" :key="item.id" :label="item.name" :value="item.name"> </el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="职位名称" style="width: 90%;">
          <el-input type='text' v-model="form.positionName" :disabled="true"> </el-input>
        </el-form-item>
        <el-form-item label="部门名称" style="width: 90%;">
          <el-input type='text' v-model="form.departmentName" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" placeholder="请输入邮箱" prop="email" style="width: 90%;" :rules="[{ required: true, message: '请输入邮箱地址', trigger: 'blur' },{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur']}]">
          <el-input type="email" v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" placeholder="请输入手机号" prop="phone" style="width: 90%;">
          <el-input type="text" v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="头像">
          <el-input type="text" v-model="form.photo" style="width: 72%;" placeholder="只能上传jpg/png文件，且不超过500kb"></el-input>
          <label>
            <span class="uploadBtn">点击上传</span>
            <input class="file" name="file" type="file" accept="image/png,image/gif,image/jpeg" @change="onUpload" />
          </label>
          <!--<el-button size="small" type="success" @click='showImg'>查看图片</el-button>-->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('form')">取 消</el-button>
        <el-button type="primary" @click="update('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { updataPassword, getById, putObj, provinceInfo } from '@/api/login'
import { User } from '@/api/index'
import { mapGetters } from 'vuex'
import Hamburger from '@/components/Hamburger'
import axios from 'axios'
import Bus from './bus.js'

export default {
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('旧密码不能为空'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输新入密码'))
      } else {
        if (this.ruleForm2.checkPass !== '') {
          this.$refs.ruleForm2.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm2.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      active: 0,
      userImg: '',
      form: {
        username: '',
        name: '',
        roleName: [], // 角色名称
        departmentName: '', // 部门名称
        positionName: '', // 职位名称
        // sex: '',
        email: '',
        phone: '',
        id: '',
        photo: ''
      },
      // photo: sessionStorage.getItem('photo'),//用户头像
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '基本资料',
        create: '创建'
      },
      token: '',
      centerDialogVisible: false,
      ruleForm2: {
        userId: null,
        oldPassword: null,
        newPassword: null,
        checkPass: null
      },
      rules: {
        // roleName: [{
        //  required: true
        // }],
        positionName: [{
          required: true,
          trigger: 'blur'
        }],
        departmentName: [{
          required: true,
          trigger: 'blur'
        }],
        username: [{
          required: true,
          message: '请输入用户',
          trigger: 'blur'
        },
        {
          min: 2,
          max: 20,
          message: '长度在 2 到 20 个字符',
          trigger: 'blur'
        }
        ],
        name: [{
          required: true,
          message: '请输入账户',
          trigger: 'blur'
        },
        {
          min: 2,
          max: 20,
          message: '长度在 2 到 20 个字符',
          trigger: 'blur'
        }
        ],
        phone: [{
          required: true,
          message: '请输入手机号',
          trigger: 'blur'
        },
        {
          min: 11,
          max: 11,
          message: '长度在 11 个字符',
          trigger: 'blur'
        }
        ]
      },
      rules2: {
        pass: [{
          validator: validatePass,
          trigger: 'blur'
        }],
        checkPass: [{
          validator: validatePass2,
          trigger: 'blur'
        }],
        oldPassword: [{
          validator: checkAge,
          trigger: 'blur'
        }]
      },
      items: [],
      list: [],
      getinfo: [],
      title: ''
      // zhengyuId:this.xh
    }
  },
  components: {
    Hamburger
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar', 'data', 'photo', 'userId']),
    routes() {
      return this.data
    }
  },
  created() {
    // debugger
    // this.getCurSiderbarData(this.zhengyuId);
    // window.setTimeout(this.getCurSiderbarData,1000)
  },
  mounted() {
    this.getlist()
    console.log(this.getinfo)
    // this.xhs = document.getElementById('sss').attr(xh);
    // alert(this.xhs);
    // this.getCurSiderbarData(this.zhengyuId);
    // window.setTimeout( _ =>{

    // this.getCurSiderbarData();

    // },300)
    // this.getCurSiderbarData(this.zhengyuId);
    // this.getCurSiderbarData();
    this.userImg = this.photo
    this.token = localStorage.getItem('token')
    provinceInfo().then(response => {
      this.title = response.data.system
    })
  },
  methods: {
    trigger(idx) {
      this.active = idx
    },
    getCurSiderbarData(id) {
      // debugger
      Bus.$emit('msg', id)
      // getSiderBarInfo(id).then(response =>{
      //    sessionStorage.setItem('siderData',JSON.stringify(response.data))

      // })
    },
    // 平台列表信息展示开始
    getlist() {
      for (var i = 0; i < this.routes.length; i++) {
        // debugger
        this.getinfo.push(this.routes[i])
      }
      var ids = this.getinfo[0].id
      this.getCurSiderbarData(ids)
    },
    // 平台列表信息展示结束

    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
    // 编辑
    handleUpdate(userId) {
      this.dialogFormVisible = true
      this.dialogStatus = 'update'
      getById(userId).then(response => {
        this.form.id = response.data.id // id
        this.form.roleName = response.data.roleName // 角色名
        this.form.name = response.data.name // 昵称
        this.form.username = response.data.username // 账户
        this.form.positionName = response.data.positionName // 职位名称
        this.form.photo = response.data.photo // 图片
        this.form.email = response.data.email // 邮箱
        this.form.phone = response.data.phone // 手机号
        // this.form.sex = response.data.sex; //性别
        this.form.departmentName = response.data.departmentName
        this.dialogFormVisible = true
        this.dialogStatus = 'update'
        console.log(this.form.roleName)
      })
    },
    // 基本资料弹框中==确定修改
    update(formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        this.isPoneAvailable(this.form.phone) // 验证有效手机号
        console.log(this.poneAvailable)
        // this.form.roleName = this.form.roleName;
        console.log(111)
        console.log(this.form.roleName)
        console.log(111)
        if (valid && this.poneAvailable) {
          putObj(this.form).then(() => {
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '资料修改成功',
              type: 'success',
              duration: 2000
            })
          })
        } else {
          return false
        }
      })
    },
    // 基本资料弹框中==取消 开始
    cancel(formName) {
      this.dialogFormVisible = false
      this.$refs[formName].resetFields()
    },
    // 基本资料弹框中==取消 结束

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        const data = {
          id: this.userId,
          oldPassword: this.ruleForm2.oldPassword,
          newPassword: this.ruleForm2.newPassword
        }
        if (valid) {
          updataPassword(data).then(response => {
            if (response.infoCode === 200) {
              this.$message({
                type: 'success',
                message: '密码修改成功'
              })
            } else {
              this.$message({
                type: 'info',
                message: '密码修改失败'
              })
            }
            console.log(response)
          })
          this.centerDialogVisible = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    // 清空form表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },

    // 上传图片====方法组--开始
    showImg() {
      this.imgShow = true
      // console.log(this.form.img);
      // console.log(this.form.imgUrl)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      )
    },
    onUpload(e) {
      const file = e.target.files[0]
      this.form.photo = file.name
      const param = new FormData() // 创建form对象
      param.append('file', file, file.name) // 通过append向form对象添加数据
      param.append('chunk', '0') // 添加form表单中其他数据
      // console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      } // 添加请求头
      // axios.post('/loginApi/myuser/user/upPicture',param,config)
      //              axios.post('/loginApi/user/upPicture',param,config)
      axios.post(`${User}/user/upPicture`, param, config).then(response => {
        this.imgUrl = response.data.data
        this.form.photo = response.data.data
        sessionStorage.setItem('photo', this.form.photo)
        sessionStorage.getItem('photo')
        this.userImg = this.form.photo
      })
    },
    // 上传图片====方法组--结束

    // 验证有效手机号
    isPoneAvailable(phoneNum) {
      const myreg = /^[1][3,4,5,7,8][0-9]{9}$/
      if (!myreg.test(phoneNum)) {
        this.$notify({
          title: '警告',
          message: '无效手机号',
          type: 'warning',
          duration: 2000
        })
        this.poneAvailable = false
      } else {
        this.poneAvailable = true
      }
    },

    private() {
      const atLast = this.getinfo.shift()
      this.getinfo.push(atLast)
    },
    next() {
      const first = this.getinfo.pop()
      this.getinfo.unshift(first)
    }
  }
}

</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.navbar .avatar-container .avatar-wrapper {
  height: auto !important;
  line-height: 0 !important;
}

.navbar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%; // min-width: 1260px;
  /*width:expression_r(document.body.clientWidth < 1260 ? "1260px": "auto" );*/
  height: 60px;
  /*line-height: 50px;*/
  background-color: #152338;
  border: 1px solid #152338;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 60px;
    height: 60px;
    float: left;
    padding: 3px 10px 0 10px;
  }

  .avatar-container {
    padding: 7.5px 0;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      height: 60px;
      line-height: 60px;
      position: relative;
      .user-avatar {
        width: 45px;
        height: 45px;
        margin-top: -1px;
        border-radius: 10px;
      }
      .user-name {
        display: inline-block;
        width: 60px;
        height: 60px;
        line-height: 60px;
        border-radius: 10px;
        color: #ffffff;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 35px;
        font-size: 12px;
      }
    }
  }
}

.title {
  margin-right: 5%;
  color: #ffffff;
  font-size: 20px;
  vertical-align: top;
  height: 60px;
  line-height: 60px;
  display: inline-block;
}

.home {
  font-size: 13px;
  text-align: center;
  color: #ffffff;
  background-color: #2eb88f;
  border: none;
  transition: all 1s;
  transition-property: all;
  transition-duration: 1s;
  transition-timing-function: initial;
  transition-delay: initial;
}

.avatar {
  line-height: normal;
  color: #ffffff;
  border: none;
}

.platform {
  font-size: 13px;
  color: #ffffff;
  border: none;
}

.el-tree {
  border: none;
}

.file {
  display: none;
}

.imgBox {
  text-align: center;
  vertical-align: middle;
  min-height: 150px;
}

.uploadBtn {
  padding: 7px 20px;
  cursor: pointer;
  font-weight: normal;
  font-size: 12px;
  border-radius: 4px;
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
}

.icon-prive {
  position: absolute;
  left: 0px;
  padding: 0 15px;
  display: inline-block;
  height: 60px;
  line-height: 60px;
  color: #fff;
  cursor: pointer;
}

.icon-next {
  position: absolute;
  right: 0px;
  padding: 0 15px;
  display: inline-block;
  height: 60px;
  line-height: 60px;
  color: #fff;
  cursor: pointer;
}

.nav-list {
  position: relative;
  width: 65%; // display:flex;
  // justify-content:center;
  // align-items:center;
  /*// min-width: 500px;*/
  height: 60px;
  display: inline-block;
  overflow: hidden;
}

.nav-list .list-box {
  display: inline-block;
  text-align: center;
  padding: 0 3.5%;
  font-size: 20px !important;
}

.small-logo {
  float: left;
  line-height: normal;
  padding: 12px 15px;
  display: inline-block;
}

.small-logo img {
  vertical-align: top;
}

b {
  vertical-align: top;
  height: 60px;
  line-height: 60px;
  display: inline-block;
  cursor: pointer;
}

#portal {
  vertical-align: top;
  display: inline-block;
  width: 5%;
  min-width: 40px;
  text-align: center;
}

#portal a {
  display: inline-block;
}

</style>

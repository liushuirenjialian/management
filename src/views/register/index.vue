<style>

  .logo:before {
    content: '';
    position: absolute;
    top: 26px;
    left: 20px;
    width: 73px;
    height: 84px;
    background: url(../../assets/login_images/guohui.png) center center no-repeat;
    background-size: 110%;

  }

  .logo {
    position: absolute;
    top: 0;
    padding-top: 28px;
    padding-left: 38px;
    width: 462px;
    height: 152px;
    text-align: right;
    line-height: 84px;
    font-size: 30px;
    color: #fff;
  }

  .demo-ruleForm {
    margin-top: 150px;
  }

  .el-form-item__label {
    color: #333;
  }

  .el-button--primary {
    background: none;
    border-color: white;
  }

  .sub-btn {
    width: 100%;
    margin-top: 3%;
    background-image: linear-gradient(90deg, rgb(255, 202, 33) 0%, rgb(255, 153, 17) 50%, rgb(255, 103, 0) 100%);
    box-shadow: 0px 3px 5px 0px;
  }

  .el-button--primary:focus, .el-button--primary:hover {
    background: linear-gradient(90deg, rgb(255, 202, 33) 0%, rgb(255, 153, 17) 50%, rgb(255, 103, 0) 100%);
    border-color: rgb(255, 153, 17);
    color: #fff;
  }

  .login-container {
    position: relative;
    width: 100%;
    height: 100%;
    min-width: 1200px;
    min-height: 100%;
    background: url(/static/img/bg02.dd4927a.jpg) no-repeat 80% 80%;
    background-size: 100%;
    background-color: #2d3a4b;
  }
</style>
<template>
  <div class="login-container">
    <div class="logo">
      <span>粮食收购资格在线申报系统</span>
    </div>
    <el-row>
      <!--<el-col :span="4"><div class="grid-content bg-purple"></div></el-col>-->
      <el-col :span="8" :offset="7">
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px"
                 class="demo-ruleForm">
          <el-form-item label="企业名称" prop="pass">
            <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="账户" prop="pass">
            <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="age">
            <el-input v-model.number="ruleForm2.age"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm2')" class="sub-btn">提交</el-button>
            <!--<el-button @click="resetForm('ruleForm2')">重置</el-button>-->
          </el-form-item>
        </el-form>

      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'))
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'))
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'))
            } else {
              callback()
            }
          }
        }, 1000)
      }
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
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
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        ruleForm2: {
          pass: '',
          checkPass: '',
          age: ''
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          age: [
            { validator: checkAge, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!')
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>

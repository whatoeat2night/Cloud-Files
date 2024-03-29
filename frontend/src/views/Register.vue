<template>
  <div id="registerBackground" class="register-wrapper">
    <div class="form-wrapper">
      <h1 class="register-title">Register</h1>
      <p class="register-system">Could Files</p>
      <!-- 注册表单 -->
      <el-form
        ref="registerForm"
        :model="registerForm"
        :rules="registerFormRules"
        class="register-form"
        label-width="100px"
        hide-required-asterisk
      >
        <el-form-item prop="username">
          <el-input v-model="registerForm.username" prefix-icon="el-icon-user" placeholder="username"/>
        </el-form-item>
        <el-form-item prop="telephone">
          <el-input v-model="registerForm.telephone" prefix-icon="el-icon-mobile-phone" placeholder="phone number"/>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="registerForm.password" prefix-icon="el-icon-lock" placeholder="password" show-password/>
        </el-form-item>
        <el-form-item style="user-select: none"/>
        <el-form-item class="registerButtonWrapper">
          <el-button
            class="registerButton"
            type="primary"
            @click="submitForm('registerForm')"
          >Register</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import CanvasNest from 'canvas-nest.js'
import { addUser } from '@/request/user.js'

// 配置
const config = {
  color: '230, 162, 60', // 线条颜色
  pointColor: '230, 162, 60', // 节点颜色
  opacity: 0.5, // 线条透明度
  count: 99, // 线条数量
  zIndex: -1, // 画面层级
}

export default {
  name: 'Register',
  data() {
    return {
      // 注册表单
      registerForm: {
        telephone: '',
        username: '',
        password: '',
      },
      // 注册表单校验规则
      registerFormRules: {
        username: [{ required: true, message: 'Please enter username', trigger: 'blur' }],
        password: [
          { required: true, message: 'Please enter password', trigger: 'blur' },
          {
            min: 5,
            max: 20,
            message: '5 - 20 characters',
            trigger: 'blur',
          },
        ],
        telephone: [
          { required: true, message: 'Please enter phone number', trigger: 'blur' },
          { min: 6, max: 11, message: 'please enter phone number', trigger: 'blur' },
        ],
      },
      isPassing: false, //  滑动解锁是否验证通过
      submitDisabled: true,  //  登录按钮是否禁用
    }
  },
  computed: {
    url() {
      const _url = this.$route.query.redirect //  获取路由前置守卫中 next 函数的参数，即登录后要去的页面
      return _url || '/'  //  若登录之前有页面，则登录后仍然进入该页面
    },
  },
  watch: {
    //  滑动解锁验证通过时，若重新输入手机号、用户名或密码，滑动解锁恢复原样
    'registerForm.telephone'() {
      this.isPassing = false
    },
    'registerForm.username'() {
      this.isPassing = false
    },
    'registerForm.password'() {
      this.isPassing = false
    },
  },
  created() {
    //  绘制背景图
    this.$nextTick(() => {
      const element = document.getElementById('registerBackground')
      // eslint-disable-next-line no-new
      new CanvasNest(element, config)
    })
  },
  methods: {
    /**
     * 滑动解锁完成 回调函数
     * @param {boolean} isPassing 解锁是否通过
     */
    updateIsPassing(isPassing) {
      if (isPassing) {
        //  校验手机号
        this.$refs.registerForm.validateField('telephone', (telephoneError) => {
          if (telephoneError) {
            this.submitDisabled = true
          } else {
            this.submitDisabled = false
          }
        })
      } else {
        this.submitDisabled = true
      }
    },
    /**
     * 注册按钮点击事件 表单验证&用户注册
     * @param {boolean} formName 表单ref值
     */
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 表单各项校验通过
          addUser(this.registerForm).then((res) => {
            if (res.success) {
              this.$notify({
                title: 'success',
                message: 'Successfully registered, redirect to login page',
                type: 'success',
              })
              this.$refs[formName].resetFields()
              this.$router.replace({ path: '/login' })
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          this.$message.error('please input correct information！')
          return false
        }
      })
    },
  },
}
</script>
<style lang="stylus" scoped>
.register-wrapper {
  height: 500px !important;
  min-height: 500px !important;
  width: 100% !important;
  padding-top: 50px;

  .form-wrapper {
    width: 375px;
    margin: 0 auto;
    text-align: center;

    .register-title {
      margin-bottom: 10px;
      font-weight: 300;
      font-size: 30px;
      color: #000;
    }

    .register-system {
      font-weight: 300;
      color: #999;
    }

    .register-form {
      width: 100%;
      margin-top: 20px;

      >>> .el-form-item__content {
        margin-left: 0 !important;
      }

      &>>> .el-input__inner {
        font-size: 16px;
      }

      .registerButtonWrapper {
        .registerButton {
          width: 100%;
        }

        &>>> .el-button {
          padding: 10px 90px;
          font-size: 16px;
        }
      }
    }

    .tip {
      width: 70%;
      margin-left: 86px;
    }
  }
}
</style>

<template>
  <div id="realname">
      <!--head  -->
        <mt-header title="实名认证">
        <div slot="left">
             <mt-button icon="back" onclick="history.back()"></mt-button> 
        </div>
        </mt-header>
       <div class="realname_box">
          <ul class="realname_form_content">
            <li class="realname_line">
                <label for="realname">真实姓名</label>
                <input id="realname" type="text" placeholder="真实姓名">
            </li>
            <li>
                <label for="realname_birthday">出生日期</label>
                <input id="realname_birthday" type="text" placeholder="出生日期">
            </li>
            <li class="realname_sex_line">
                <label for="realname_sex">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别</label>
                <input type="radio" name="identity" value="男" checked="checked" /><span>男</span>
                <input type="radio" name="identity" value="女" /><span>女</span>
            </li>
            <li>
                <label for="realname_zhuanye">专&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;业</label>
                <input id="realname_zhuanye" type="text" placeholder="专业">
            </li>
            <li>
                <label for="realname_school">所属学校</label>
                <input id="realname_school" type="text" placeholder="所属学校">
            </li>
            <li>
                <label for="realname_school_address">学校地址</label>
                
            </li>
            <li>
                <label for="realname_school_address">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                <input id="realname_school_address" type="text" placeholder="请填写详细地址">
            </li>

            <li class="realname_status_line">
                <label for="realname_status">身&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;份</label>
                <input type="radio" name="realname_status" value="学生" checked="checked" /><span>学生</span>
                <input type="radio" name="realname_status" value="老师" /><span>老师</span>
            </li>
          </ul>
          <!--证书的  -->
          <div class="zhengshu_box">
            <div class="zhengshu_title">
              <span>请上传教师证件</span>
              <span>&#40;一面上传一张即可，正反面请上传2张&#41;</span>
            </div>
            <div  class="zhengshu_img_box">
              <span>
              </span>
              <span>
              </span>
            </div>
          </div>
          <!--手持身份证  -->
          <div class="shenfenzheng_box">
            <div class="shenfenzheng_title">
              <span>手持身份</span>
              <span>&#40;请上传清晰手持正、反照片&#41;</span>
            </div>
            <div  class="shenfenzheng_img_box">
              <span>
              <!-- <img src="../../assets/images/logo.png"/> -->
              </span>
              <span>
              <!-- <img src="../../assets/images/logo.png"/> -->
              </span>
            </div>
          </div>
        </div>
  </div>
</template>

<script>
// import { Toast } from 'mint-ui';
export default {
  name: 'realname',
  data () {
    return {
    }
  },
  methods:{

  },
  created(){
    this.axios.get('http://house.yijiaoxing.com/award/v1/award/list').then((res) => {
        console.log(res);
        this.award = res.data.data;
    })
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang ="less">

.realname_box{
  margin-top: 0.25rem;
  box-sizing: border-box;
  overflow-y: auto;

  .realname_form_content{
    // 表单信息部分
      box-sizing: border-box;
      width: 100%;
      padding: 0 0.25rem;
      background: white;

      li{
        width: 100%;
        display: flex;
        height: 1rem;
        label,input{
          height: 100%;
          line-height: 1;
          justify-content:flex-start;
          align-items: center;
        }
        label{
          display: inline-block;
          line-height: 1rem;
          margin-right: 0.375rem;
          
        }
        input{
          outline: none;
          border: 1px solid white;
        }
      }

      .realname_status_line span,
      .realname_sex_line span{
        display: inline-block;
        height: 100%;
        display: flex;
        align-items: center;
      }

      .realname_status_line span:nth-of-type(1),
      .realname_sex_line  span:nth-of-type(1){
        margin-right: 0.9rem;
      }
    }
    .zhengshu_box{
      // 证书部分
      box-sizing: border-box;
      padding: 0.375rem 0.25rem 0 0.25rem; 
      width: 100%;
      div{
        width: 100%;
      }
      .zhengshu_title span{
        font-size: 0.35rem;
      }
      .zhengshu_title span:first-child{
        color: #282828;
      }
      .zhengshu_title span:last-child{
        color: #3993e9;
      }
      .zhengshu_img_box{
        box-sizing: border-box;
        padding: 0.375rem 0 0.375rem 0; 
        span{
          display: inline-block;
          width: 1.5rem;
          height: 1.5rem;
          background: blue;
        }
      }
    }


    .shenfenzheng_box{
      // 身份证部分
      box-sizing: border-box;
      padding: 0.375rem 0.25rem 0 0.25rem; 
      width: 100%;
      background: white;
      div{
        width: 100%;
      }
      .shenfenzheng_title span{
        font-size: 0.35rem;
      }
      .shenfenzheng_title span:first-child{
        color: #282828;
      }
      .shenfenzheng_title span:last-child{
        color: #3993e9;
      }
      .shenfenzheng_img_box{
        box-sizing: border-box;
        padding: 0.375rem 0 0.375rem 0; 
        span{
          display: inline-block;
          width: 1.5rem;
          height: 1.5rem;
          background: blue;
        }
      }
    }

}



</style>

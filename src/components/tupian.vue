<template>
  <div class='finish_room'>
    
       <div class='finish_room2'>

           <div v-for='(item ,index ) in imgs' class='room_img'>

              <img :src="item">
              <span @click='delete_img(index)'><img src="../assets/images/delete.png" width="20" height="20"></span>
           </div>

           
           <div class='room_add_img'>
                <span><img src="../assets/images/add_img.png"></span>
                <span>上传图片</span>
                <input @change='add_img'  type="file">
           </div>

       </div>
  </div>

</template>

<script >
// import "../assets/js/index.js"
import $ from "jquery"
  export default {
          data:function(){
              return{
                    imgs:[],
              }
          },
          methods:{
              delete_img(item){
                this.imgs.splice(item,1);
              },
              add_img(event){
                    var reader =new FileReader();
                     var img1=event.target.files[0];
                        
                           reader.readAsDataURL(img1);
                           var that=this;
                           reader.onloadend=function(){
                            if(that.imgs.length>2){
                              console.log("最多3张")
                              $(".room_add_img").addClass("xiaoshi")
                            }else{
                              that.imgs.push(reader.result)
                            }
                               
                           }
                          
              }
          }
      

  }

</script>
<style scoped >
.xiaoshi{
  display: none;
}
   .finish_room{
      width: 100%;
      height: auto;
  }

     .finish_room2{
     width: 100%;
     height: auto;
     padding-top: 0.375rem;
     padding-bottom: 0.375rem;
     display: flex;
     align-items: center;
     flex-wrap:wrap;
/*     justify-content: space-around;*/
      border-bottom: 2px solid #e1e1e1;
   }
    
   .finish_room2 .room_img{
     width: 30%;
    height: 2.5rem;
     position: relative;
     margin: 0.125rem;
   }
   .finish_room2 .room_img img{    
     width: 100%;
     height: 100%;
   }
   .finish_room2>.room_img span{
      position: absolute;
      width: auto;
      height: auto;
      right: 0.125rem;
      bottom:0.075rem;
   }
 


   .room_add_img{
     width: 2.5rem;
     height: 2.5rem;
     border:1px solid #e1e1e1;
     display: flex;
     flex-direction: column;
     align-items: center;
     flex-wrap:wrap;
     justify-content: space-around;
     position: relative;
     margin-left: 0.125rem;
     background:  #f5f9fe;
   }
   .room_add_img >span:nth-child(1){
     margin-top: 0.5rem;
     width: 1.0rem;
     height: 1.0rem;
     overflow: hidden;
   }
   .room_add_img >span:nth-child(2){
      margin-bottom: 0.25rem;
   }

  .room_add_img input{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 99999;
      opacity: 0;

  }
</style>
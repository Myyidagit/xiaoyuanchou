<template>
    <!-- 过渡动画 -->
    <transition name="fade">
        <div class="img-view" @click="bigImg">
            <!-- 遮罩层 -->
            <div class="img-layer"></div>
            <div class="number">{{temp_index}}/{{imgSrc.length}}</div>
            <mt-swipe @change="handleChange" :defaultIndex="imgIndex" :auto="0" class="img">
                <mt-swipe-item class="img_item" :key="index" v-for="(item,index) in imgSrc">
                    <img :src="item.img_url">
                </mt-swipe-item>
            </mt-swipe>
        </div>
    </transition>
</template>
<script>
export default {
    data(){
        return{
         temp_index:null  
        }
    },
    props: ['imgSrc','imgIndex'],
    methods: {
        bigImg() {
            // 发送事件
            this.$emit('clickit')
        },
        handleChange(index){
            this.temp_index=index+1;
        }
    },
    created(){
        console.log(this.imgSrc)
        console.log(this.imgIndex)
        this.temp_index=this.imgIndex+1;
        
    }
}
</script>
<style scoped>

/* bigimg */

.img-view {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 666666;
}

/*遮罩层样式*/
.img-view .img-layer {
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 1);
    width: 100%;
    height: 100%;
}
.img{
    box-sizing: border-box;
    padding: 2rem 0.5rem 1.5rem 0.5rem;
}
.img_item img{
    width: 100%;
    height: 10.0rem;
}

.number{
    position: absolute;
    top: 0.5rem;
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    background: black;
    z-index: 666666;   
    text-align: center; 
    color: #fff;

}
</style>
<template>
	<div class="container">
		<div class="row">
			<div class="col">
			<select v-model="f.p" @change="selpro">
				<option :value="i" v-for="(v,i) in pro">{{v.name}}</option>
			</select>
			</div>
			<div class="col">
			<select v-model="f.c" @change="selcity">
				<option :value="i" v-for="(v,i) in city">{{v.name}}</option>
			</select>
			</div>
			<!-- <div class="col">
			<select v-model="f.cc" v-show="county.length>0" @change="result">
				<option :value="i" v-for="(v,i) in county">{{v.name}}</option>
			</select>
			</div> -->

		</div>

	</div>
</template>

<style scoped>
.container{
	width: 80%;
}
.row{
	display: flex;
	}
.col{
	/* flex-grow:1; */
	}
select{
	width:3rem;
	/* padding:.5rem; */
	height: 1rem;
	border:1px solid #eee;
	border-radius: .3rem;
	/* font-size: 1.2rem; */
	outline: none;
}
</style>

<script>
import data from "./data";

export default {
	data:function(){
		return {
           data:data,
           pro:"",
           city:"",
           county:"",
           f:{
	           p:0,
	           c:0,
	           // cc:0,
       		}
		}
	},
	created:function(){
		this.pro=this.data;
		this.city=this.pro[0]['child'];
		// this.county=this.city[0]['child'];
		this.result();
	},
	methods:{
		sendAdress(){
			console.log(this.f)
			let result=this.pro[this.f.p].name+this.city[this.f.c].name;
			//县市区都有
			// let result=this.pro[this.f.p].name+this.city[this.f.c].name+this.county[this.f.cc].name;
			// this.$emit('getAddress',this.f)
			this.$emit('aaaa',result)
			console.log(this.pro[this.f.p].name)
			console.log(this.city[this.f.c].name)
			// console.log(this.county[this.f.cc].name)
		},
		selpro:function(){
			this.city=this.pro[this.f.p]['child'];
			this.county=this.city[0]['child'];
			this.f.c=0;
			// this.f.cc=0;
			this.result();
		},
		selcity:function(){
			this.county=this.city[this.f.c]['child'];
			// this.f.cc=0;
			this.result();
		},
		result:function(){
			var re={
				pro:{id:this.pro[this.f.p].id,name:this.pro[this.f.p].name},
				city:{id:this.city[this.f.c].id,name:this.city[this.f.c].name},
				// county:{id:this.county[this.f.cc].id,name:this.county[this.f.cc].name}
			};
			this.$emit("select",re);
		}
	}
}	
</script>
<template>
      <!-- swiper -->
      <swiper :options="swiperOption">
        <swiper-slide  v-for="(worl, index) in dataList" :key="index">
          <div class="swiper-zoom-container" >
            <img v-for="(pic, index) in worl.worldimages_set" :src="pic" :key="index" >

          </div>
        </swiper-slide>
      </swiper>
</template>

<script>

  export default {
    data() {
      return {
        dataList: [],
        swiperOption: {
          lazy: true,
          zoom: true,
          // pagination: {
          //   el: '.swiper-pagination'
          // },
          // navigation: {
          //   nextEl: '.swiper-button-next',
          //   prevEl: '.swiper-button-prev'
          // }
        }
      }
    },

    mounted(){
      this.getData()
    },

    methods:{
      getData () {

        this.$axios(api + 'world/' ).then((response) => {
          // console.log(response)
          // console.log(typeof (this.id))
          // console.log(response)
          // console.log(response.data.results)
          this.dataList= []
          this.dataList= response.data.results
        }).catch(function (error) {
          console.log(error)

        })
      },
    },
  }
</script>
<style>
  .swiper-wrapper{
    padding-top: 35%;
    height: 475px;
  }
  .swiper-button-prev{
    display: none;
  }
  .swiper-button-next{
    display: none;
  }

</style>

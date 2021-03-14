<template>

  <div class="category">
    <!--顶部标题-->
    <category-nav-tab/>
    <!--左边侧边栏-->
    <category-side-bar :side-title="sideTitleData" @selectItem="selectItem"/>
    <!--  右边数据展示-->
    <category-detail :category-details="getCategoryDetails"/>
  </div>
</template>

<script>
  import CategoryNavTab from "./childComps/CategoryNavTab";
  import CategorySideBar from "./childComps/CategorySideBar";
  import CategoryDetail from "./childComps/CategoryDetail";

  import {getCategory, getSubcategory, getCategoryDetail} from 'network/category'

  export default {
    name: "Category",
    components: {
      CategoryNavTab,
      CategorySideBar,
      CategoryDetail,
    },
    data() {
      return {
        //侧边栏的数据
        sideTitleData: [],
        categoryData: {},
        currentIndex: -1,
      }
    },
    created() {
      this.getCategory();

    },

    methods: {
      getCategory() {
        getCategory().then(resp => {
          //获取请求网络的数据
          this.sideTitleData = resp.data.category.list;
          for (let i = 0; i < this.sideTitleData.length; i++) {
            //初始化每个类别的子数据
            this.categoryData[i] = {
              subcategories: [],
              categoryDetail: {
                'pop': [],
                'new': [],
                'sell': []
              }
            }
          }
          //第一请求默认的侧边栏标题的对应的子数据
          this.getSubcategory(0)

          setTimeout(() => {
            // console.log(this.categoryData[0])
          }, 1000)
        })
      },
      getSubcategory(index) {
        this.currentIndex = index
        getSubcategory(this.sideTitleData[index].maitKey).then(resp => {
          // console.log(resp.data)
          this.categoryData[index].subcategories = resp.data.list
          // console.log(this.categoryData[index].subcategories)
          // this.categoryData = {...this.categoryData}
          this.getCategoryDetail('pop')
          this.getCategoryDetail('new')
          this.getCategoryDetail('sell')
        })
      },

      getCategoryDetail(type) {
        getCategoryDetail(this.sideTitleData[this.currentIndex].miniWallkey, type).then(resp => {
          // 3.将获取的数据保存下来
          this.categoryData[this.currentIndex].categoryDetail[type] = resp
          this.categoryData = {...this.categoryData}
        })
      },
      selectItem(index) {
        this.getSubcategory(index)
      }
    },
    computed: {
      getCategoryDetails() {
        return this.categoryData[this.currentIndex]
      }
    },
  }
</script>

<style scoped>
</style>
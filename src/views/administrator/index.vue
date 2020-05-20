
<template>
  <div class="app-container">
    <div class="un-handle-layout">
      <div class="layout-title">待处理事务</div>
      <div class="un-handle-content">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-badge :value="unaudited.createNumber" class="item">
              <div class="un-handle-item">
                <span class="font-medium">社团创建申请</span>
              </div>
            </el-badge>
          </el-col>
          <el-col :span="8">
            <el-badge :value="unaudited.dismissNumber" class="item">
              <div class="un-handle-item">
                <span class="font-medium">社团解散申请</span>
              </div>
            </el-badge>
          </el-col>
          <el-col :span="8">
            <el-badge :value="unaudited.activityNumber" class="item">
              <div class="un-handle-item">
                <span class="font-medium">社团活动申请</span>
              </div>
            </el-badge>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-badge :value="unaudited.changeNumber" class="item">
              <div class="un-handle-item">
                <span class="font-medium">社长换届申请</span>
              </div>
            </el-badge>
          </el-col>
          <el-col :span="8">
            <el-badge :value="unaudited.identifyNumber" class="item">
              <div class="un-handle-item">
                <span class="font-medium">社团认证申请</span>
              </div>
            </el-badge>
          </el-col>
        </el-row>
      </div>
    </div>
    <div v-show="newUsersVisible==true" class="statistics-layout">
      <div class="layout-title">注册人数统计</div>
      <el-row>
        <el-col :span="20">
          <el-card>>
            <i class="el-icon-search" />
            <span>筛选搜索</span>
            <div style="padding: 5px;margin-top:10px">
              <el-form :inline="true" :model="form" label-width="500px">
                <el-form-item prop="startDate">
                  <el-date-picker v-model="form.startDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date" placeholder="开始日期" style="width: 90%;" />
                </el-form-item>
                <el-form-item prop="endDate">
                  <el-date-picker v-model="form.endDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date" placeholder="结束日期" style="width: 90%;" />
                </el-form-item>
                <el-button type="primary" size="small" @click="check()">查询</el-button>
              </el-form>
            </div>
          </el-card>
          <div id="chartLineBox" style="width: 200%;height: 70vh;margin-top: 10px;" />
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <div style="text-align:center">
            <el-button type="primary" @click="clubSpecies()">各类别社团占比</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <div v-show="clubSpeciesVisible==true" class="statistics-layout">
      <div class="layout-title">各类别社团占比</div>
      <div style="text-align:center">
        <el-row>
          <el-col :span="20">
            <div style="padding: 10px;border-left:1px solid #DCDFE6">
              <div style="text-align:center">
                <div id="pieBox" style="width: 1200%;height: 300px" />
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <div style="text-align:center">
              <el-button type="primary" @click="newUsers()">注册人数统计</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import { getUnaudited, getNewUser, getClubSpecie } from '@/api/admin'
export default {
  name: 'AdminHome',
  data() {
    return {
      form: {
        startDate: '',
        endDate: ''
      },
      newUsersVisible: true,
      clubSpeciesVisible: false,
      loading: false,
      dataEmpty: false,
      chartLine: '',
      pie: '',
      unaudited: {
        createNumber: '',
        changeNumber: '',
        activityNumber: '',
        dismissNumber: '',
        identifyNumber: ''
      },
      newUser: {
        date: [],
        newUsers: []
      },
      clubSpecie: {
        clubSpecies: [],
        clubSpeciesNumber: []
      }
    }
  },
  created() {
    this.getUnaudited()
  },
  mounted() {
    var nowD1 = new Date()
    var nowD2 = {
      year: nowD1.getFullYear(),
      month: (nowD1.getMonth() + 1) < 10 ? '0' + (nowD1.getMonth() + 1 + '') : nowD1.getMonth() + 1,
      date1: nowD1.getDate() < 10 ? '0' + (nowD1.getDate() + '') : nowD1.getDate()
    }
    nowD1 = nowD1.getTime() - 1000 * 60 * 60 * 24 * 10
    var nowD3 = new Date()
    nowD3.setTime(nowD1)
    var nowD4 = {
      year: nowD3.getFullYear(),
      month: (nowD3.getMonth() + 1) < 10 ? '0' + (nowD3.getMonth() + 1 + '') : nowD3.getMonth() + 1,
      date1: nowD3.getDate() < 10 ? '0' + (nowD3.getDate() + '') : nowD3.getDate()
    }
    var startD = ''
    var endD = ''
    endD = nowD2.year + '-' + nowD2.month + '-' + nowD2.date1
    startD = nowD4.year + '-' + nowD4.month + '-' + nowD4.date1
    const first = {
      startDate: startD,
      endDate: endD
    }
    getNewUser(first).then(response => {
      if (response.status === 200) {
        this.newUser.date = response.data.date
        this.newUser.newUsers = response.data.newUsers
      }
    })
    this.showChartLine()
  },
  methods: {
    // 获取未审核申请数
    getUnaudited() {
      this.Loading = true
      getUnaudited(this.loading).then(response => {
        if (response.status === 200) {
          this.unaudited.createNumber = response.data.createNumber
          this.unaudited.changeNumber = response.data.changeNumber
          this.unaudited.activityNumber = response.data.activityNumber
          this.unaudited.dismissNumber = response.data.dismissNumber
          this.unaudited.identifyNumber = response.data.identifyNumber
        }
      })
    },
    // 获取每日新注册用户数
    getNewUser() {
      this.Loading = true
      const param = {
        startDate: this.form.startDate,
        endDate: this.form.endDate
      }
      getNewUser(param).then(response => {
        if (response.status === 200) {
          this.newUser.date = response.data.date
          this.newUser.newUsers = response.data.newUsers
        }
      })
      this.showChartLine()
    },
    // 获取各类别社团占比
    getClubSpecie() {
      this.Loading = true
      getClubSpecie(this.loading).then(response => {
        if (response.data.status === 200) {
          this.clubSpecie.clubSpecies = response.data.clubSpecies
          this.clubSpecie.clubSpeciesNumber = response.data.clubSpeciesNumber
        }
      })
      this.showPie()
    },
    // 生成折线图
    showChartLine() {
      this.chartLine = echarts.init(document.getElementById('chartLineBox'))
      // 指定图表的配置项和数据
      this.chartLine.setOption({
        tooltip: { // 设置tip提示
          trigger: 'axis'
        },
        legend: { // 设置区分（哪条线属于什么）
          data: ['注册人数']
        },
        color: ['#8AE09F'], // 设置区分（每条线是什么颜色，和 legend 一一对应）
        xAxis: { // 设置x轴
          type: 'category',
          boundaryGap: false, // 坐标轴两边不留白
          data: this.newUser.date,
          name: '日期', // X轴 name
          nameTextStyle: { // 坐标轴名称的文字样式
            color: '#FA6F53',
            fontSize: 16,
            padding: [0, 0, 0, 20]
          },
          axisLine: { // 坐标轴轴线相关设置。
            lineStyle: {
              color: '#FA6F53'
            }
          }
        },
        yAxis: {
          name: '注册人数',
          nameTextStyle: {
            color: '#FA6F53',
            fontSize: 16,
            padding: [0, 0, 10, 0]
          },
          axisLine: {
            lineStyle: {
              color: '#FA6F53'
            }
          },
          type: 'value'
        },
        series: [
          {
            name: '注册人数',
            data: this.newUser.newUsers,
            type: 'line', // 类型为折线图
            lineStyle: { // 线条样式 => 必须使用normal属性
              normal: {
                color: '#8AE09F'
              }
            }
          }
        ]
      })
    },
    // 生成饼图
    showPie() {
      this.pie = echarts.init(document.getElementById('pieBox'))
      this.pie.setOption({
        title: {
          x: 'center'// x轴方向对齐方式
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          bottom: 'bottom',
          data: this.clubSpecie.clubSpecies
        },
        series: [
          {
            name: '社团数目',
            type: 'pie',
            radius: '50%',
            center: ['50%', '50%'],
            data: [
              { value: this.clubSpecie.clubSpeciesNumber[0], name: this.clubSpecie.clubSpecies[0] },
              { value: this.clubSpecie.clubSpeciesNumber[1], name: this.clubSpecie.clubSpecies[1] },
              { value: this.clubSpecie.clubSpeciesNumber[2], name: this.clubSpecie.clubSpecies[2] },
              { value: this.clubSpecie.clubSpeciesNumber[3], name: this.clubSpecie.clubSpecies[3] },
              { value: this.clubSpecie.clubSpeciesNumber[4], name: this.clubSpecie.clubSpecies[4] }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    },
    // 切换显示统计图表
    clubSpecies() {
      this.newUsersVisible = false
      this.clubSpeciesVisible = true
      this.getClubSpecie()
    },
    newUsers() {
      this.clubSpeciesVisible = false
      this.newUsersVisible = true
      this.getNewUser()
    },
    // 切换折线图日期
    check() {
      this.getNewUser()
    }
  }
}
</script>

<style scoped>
  .app-container {
    margin-top: 10px;
    margin-left: 30px;
    margin-right: 30px;
  }
  .total-layout {
    margin-top: 20px;
  }

  .total-frame {
    border: 1px solid #DCDFE6;
    padding: 20px;
    height: 100px;
  }

  .total-icon {
    color: #409EFF;
    width: 60px;
    height: 60px;
  }

  .total-title {
    position: relative;
    font-size: 16px;
    color: #909399;
    left: 70px;
    top: -50px;
  }

  .total-value {
    position: relative;
    font-size: 18px;
    color: #606266;
    left: 70px;
    top: -40px;
  }
  .un-handle-layout {
    margin-top: 20px;
    border: 1px solid #DCDFE6;
  }

  .layout-title {
    color: #606266;
    padding: 15px 20px;
    background: #F2F6FC;
    font-weight: bold;
  }

  .un-handle-content {
    padding: 20px 40px;
  }

  .un-handle-item {
    border-bottom: 1px solid #EBEEF5;
    padding: 10px;
  }

  .overview-layout {
    margin-top: 20px;
  }

  .overview-item-value {
    font-size: 24px;
    text-align: center;
  }

  .overview-item-title {
    margin-top: 10px;
    text-align: center;
  }

  .out-border {
    border: 1px solid #DCDFE6;
  }

  .mine-layout {
    position: absolute;
    right: 140px;
    top: 107px;
    width: 250px;
    height: 235px;
  }

  .statistics-layout {
    margin-top: 20px;
    border: 1px solid #DCDFE6;
  }

  .address-content{
    padding: 20px;
    font-size: 18px
  }

  .el-card {
    padding: 5px;
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.15) !important;
  }
</style>

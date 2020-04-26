<template>
  <div>
    <el-card>
      <!-- 用户列表 -->
      <el-table :data="addList" stripe border>
        <el-table-column type="index" label="#" />
        <el-table-column label="昵称" prop="nickname" />
        <el-table-column label="申请理由" prop="reason" />
        <el-table-column label="申请时间" prop="create_at" />
        <el-table-column label="状态" prop="state" />
        <el-table-column label="操作" width="100px">
          <template slot-scope="scope">
            <el-button type="primary" @click="pushToDetail(scope.row.userid)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getAddList } from '@/api/club'
export default {
  name: 'MemberAdd',
  data() {
    return {
      clubId: 1,
      addList: [],
      queryInfo: {
        keyword: '',
        page: 1,
        limit: 5,
        sort: '',
        order: 'desc'
      },
      total: 0,
      publishStatusOptions: [
        {
          value: 0,
          label: '未审核'
        },
        {
          value: 1,
          label: '审核通过'
        },
        {
          value: 2,
          label: '审核未通过'
        }
      ]
    }
  },
  created() {
    this.getAddsList()
  },
  methods: {
    getAddsList() {
      getAddList(this.clubId, this.queryInfo).then(response => {
        console.log(response)
        this.addList = response.items
        this.total = response.total_count
        console.log(this.addList)
      })
    }
  }
}
</script>

<style scoped lang="scss">

</style>

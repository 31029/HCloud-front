<template>
  <div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="节点序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column label="集群内节点名称" width="350">
        <template slot-scope="scope">
          <p>{{ scope.row.Name }} <br/>
          <span style="color: gray">{{scope.row.IP}}/{{scope.row.HostName}}</span>
            <br/>
            <el-tag type="success" v-for="label in scope.row.Lables">{{label}}</el-tag>
            <br/>
            <el-tag type="danger" v-for="label in scope.row.Taints">{{label}}</el-tag>
          </p>
        </template>
      </el-table-column>
      <el-table-column label="CPU 使用情况" width="130" align="center">
        <template slot-scope="scope">
          <span class="red">{{ Math.round(scope.row.Usage.Cpu*100) }}% </span> / {{ scope.row.Capacity.Cpu }}核
        </template>
      </el-table-column>
      <el-table-column label="内存 使用情况" width="130" align="center">
        <template slot-scope="scope">
          <span class="green">{{ Math.round(scope.row.Usage.Memory*100) }}% </span>/ {{ Math.round(scope.row.Capacity.Memory/1000/1000/1000) }}G
        </template>
      </el-table-column>
      <el-table-column label="Pods" width="130" align="center">
        <template slot-scope="scope">
           <span class="green">{{ scope.row.Usage.Pods }}</span> / {{ scope.row.Capacity.Pods }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="130" align="center">
        <template slot-scope="scope">
          {{ scope.row.CreateTime }}
        </template>
      </el-table-column>

      <el-table-column label="操作" width="100" align="center">
        <template slot-scope="scope">
          <router-link icon="el-icon-edit" :to="{name:'Nodedetail',
              params:{node:scope.row.Name}}"><el-link >编辑<i class="el-icon-edit-outline"></i></el-link></router-link>

          <router-link :to="{name:'Nodeshell',
              params:{node:scope.row.Name}}"> <el-link  >远程<i class="el-icon-s-platform el-icon--right"></i></el-link></router-link>
       </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  import { getList } from '@/api/nodes'
  import { NewClient } from "@/utils/ws";
  export default {
    data(){
      return {
        list: null,
        listLoading: true,
        wsClient:null
      }
    },
    created() {
      this.fetchData()
    },
  methods: {
    fetchData()
    {
      this.listLoading = true
      // 通过rest api 获取
      getList().then(response => {
        this.list = response.data
        this.listLoading = false
      })
      this.wsClient = NewClient()
      this.wsClient.onmessage = (e) => {
        if (e.data !== 'ping') {
          const object = JSON.parse(e.data)
          if (object.type === 'node') {
            this.list = object.result.data
            this.$forceUpdate()
          }

        }
      }

    }
  ,
  }
  }
</script>

<style>
  .red{color: #d20000
  }
  .green{color:rgb(21, 120, 21)}
</style>
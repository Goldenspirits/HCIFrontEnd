<template>
  <div class="bg">
    <div class="container_upload" style=" margin-bottom: 2em">
      <el-upload
        class="upload-demo"
        drag
        action=""
        :http-request="uploadJson"
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip" style="color: white"> 只能上传Json文件，且不超过200MB</div>
      </el-upload>

      <div style="background-color: white;
    margin: auto;
    width: 70%;
    border-radius: 10px;
    padding: 20px;">
        <el-table
          class="myTable"
          :data=this.graphList.slice((currentPage-1)*pagesize,currentPage*pagesize)
        >
          <el-table-column
            prop="id"
            label="ID"
            width="450">
          </el-table-column>
          <el-table-column
            prop="name"
            label="文件名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="uploadAt"
            label="上传时间"
            width="180">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑
              </el-button>
            </template>
          </el-table-column>

        </el-table>
        <br/>
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          layout="total, prev, pager, next"
          :total="graphList.length"
        >
        </el-pagination>
      </div>
      <br/>

    </div>
  </div>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex'

  export default {
    name: 'Upload',
    data() {
      return {
        currentPage: 1,
        pagesize: 8,
      }
    },
    computed: {
      ...mapGetters([
        'uploadFileId',
        'graphList',
        'graphInfo'
      ])
    },
    mounted() {
      this.getAllDgList();
    },
    methods: {
      async handleEdit(index, row) {
        this.getGraphInfo(row.id);
        await this.$router.push('/g/' + row.id) // 自动跳转
      },
      ...mapMutations([
        'set_uploadFileId'
      ]),
      ...mapActions([
        'uploadFile',
        'getGraphInfo',
        'getAllDgList'
      ]),

      async uploadJson(params) {
        let fd = new FormData();
        fd.append("file", params.file);
        fd.append("name", params.file.name);
        let post = {
          authorId: '4',
          name: params.file.name,
          data: fd
        };

        await this.uploadFile(post);
        this.getAllDgList();

        // await this.$router.push('/g/' + this.graphInfo.id) // 自动跳转
      },
      handleSizeChange(pSize) {
        this.pagesize = pSize;
      },
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage;
      }

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .bg {
    text-align: center;
    background: url("https://spring-security.oss-cn-beijing.aliyuncs.com/img/image-20210321044755150.png") no-repeat center;
    -moz-background-size: 100% 100%;
    background-size: 100% 100%;
    min-height: 100vh;
  }

  .upload-demo {
    color: rgba(255, 255, 255, 0);
    padding-top: 5em;
    margin-bottom: 5em;
    width: 100%;
  }

  .el-upload-dragger {
    background-color: rgba(255, 255, 255, 0.61);
  }

  .myTable {

  }

  .container_upload {
    background-color: rgba(214, 228, 255, 0.13);
    text-align: center;
    min-height: 100vh;

  }


</style>

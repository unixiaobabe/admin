<template>
  <div>
    <el-upload
      list-type="picture-card"
      action="#"
      :file-list="fileList"
      :limit="1"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-change="changeFile"
      :class="{ disabled: fileComputed }"
      :before-upload="beforeUpload"
      :http-request="upload"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-progress
    v-if="showPercent"
    :percentage="percent"
    style="width:180px"
    ></el-progress>
    <el-dialog :visible.sync="showDialog">
      <img :src="imgUrl" style="width: 100%" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import COS from "cos-js-sdk-v5";
const cos = new COS({
  SecretId: "AKIDaz80dz3rQk6C1ZqqZ5LK3VhPr2waz81e",
  SecretKey: "OWO180cz7yYtxlIZZ5LK2UgaDafU3LFt",
});
export default {
  data() {
    return {
      percent:0,
      showPercent:false,
      fileList: [
        {
          url: "http://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
        },
      ],
      showDialog: false,
      imgUrl: "",
      currentFileUid: "",
    };
  },
  computed: {
    fileComputed() {
      return this.fileList.length === 1;
    },
  },
  methods: {
    upload(params) {
      console.log("params.file",params.file);
      if (params.file) {
        cos.putObject(
          {
            Bucket:"unixiaobabe-1312604932" /* 填入您自己的存储桶，必须字段 */,
            Region: "ap-beijing" /* 存储桶所在地域，例如ap-beijing，必须字段 */,
            Key: params.file.name /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */,
            StorageClass: "STANDARD",
            Body: params.file, // 上传文件对象
            onProgress:(params) => {
              this.percent = params.percent * 100
            }
          },
          (err, data) => {
            console.log(err || data);
            if(!err && data.statusCode === 200){
              this.fileList = this.fileList.map(item => {
                if(item.uid === this.currentFileUid){
                  return {url:'http://' + data.Location,upload:true}
                }
                return item
              })
              setTimeout(() => {
                this.showPercent = false
                this.percent = 0
              },2000)
            }
          }
        );
      }
    },
    handlePreview(file) {
      this.imgUrl = file.url;
      this.showDialog = true;
    },
    handleRemove(file, fileList) {
      this.fileList = this.fileList.filter((item) => item.uid !== file.uid);
    },
    changeFile(file, fileList) {
      this.fileList = fileList.map((item) => item);
    },
    beforeUpload(file) {
      const type = ["image/jpeg", "image/gif", "image/bmp", "image/png"];
      if (!type.some((item) => item === file.type)) {
        this.$message.error("上传图片只能是 JPG GIF BMP PNG 格式");
        return false;
      }
      const maxSize = 10 * 1024 * 1024;
      if (file.size > maxSize) {
        this.$message.error("上传的图片大小不能大于10M");
        return false;
      }
      this.currentFileUid = file.uid;
      this.showPercent = true
      return true;
    },
  },
};
</script>

<style scoped>
/deep/ .disabled .el-upload--picture-card {
  display: none;
}
</style>
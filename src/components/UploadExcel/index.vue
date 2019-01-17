<template>
    <div>
      <input ref="excelUploadInput" type="file" class="excel-upload-input" accept=".xlsx,.xls" @change="handleClick">
      <div class="drop" @drop="handleDrop" @dragover="handleDragover" @dragenter="handleDragover">
        拖动Excel文件到此处或者
        <el-button :loading="loading" style="margin-left: 16px"  typeof="primary" @click="handleUpload">选择文件</el-button>
      </div>
    </div>
</template>

<script>
  import XLSX from 'xlsx'
    export default {
        name: "index",
        props:{
          beforeUpload:Function,
          onSuccess:Function
        },
        data(){
          return {
            loading:false,
            excelData:{
              header:null,
              results:null
            }
          }
        },
        methods:{
          generateData({header,results}){
            this.excelData.header=header;
            this.excelData.results=results;
            this.onSuccess && this.onSuccess(this.excelData);
          },
          handleDrop(e){
            e.stopPropagation();
            e.preventDefault();
            if(this.loading) return;
            const files=e.dataTransfer.files;
            if(files.length!==1){
              this.$message.error("仅支持上传一个文件哦！");
              return;
            }
            const rawFile=files[0];
            if(!this.isExcel(rawFile)){
              this.$message.error("仅支持上传以.xlsx，.xls，.csv，为后缀的文件哦！");
              return false;
            }
            this.upload(rawFile);
            e.stopPropagation();
            e.preventDefault();
          },
          handleDragover(e){
            e.stopPropagation();
            e.preventDefault();
            e.dataTransfer.dropEffect = 'copy';
          },
          handleUpload(){
            this.$refs['excelUploadInput'].click();
          },
          handleClick(e){
            const files=e.target.files;
            const rawFile=files[0];
            if(!rawFile)return;
            this.upload(rawFile);
          },
          upload(rawFile){
            this.$refs['excelUploadInput'].value=null;
            if(!this.beforeUpload){
              this.readerData(rawFile);
              return;
            }
            const before=this.beforeUpload(rawFile);
            if(before){
              this.readerData(rawFile);
            }
          },
          readerData(rawFile){
            this.loading=true;
            return new Promise((resolve,reject)=>{
              const reader=new FileReader();
              reader.onload=(e)=>{
                const data=e.target.result;
                const fixData=this.fixData(data);
                const workbook=XLSX.read(fixData,{type:'binary',cellDates:true});
                const firstSheetName=workbook.SheetNames[0];
                const worksheet=workbook.Sheets[firstSheetName];
                const header=this.getHeaderRow(worksheet);
                const results=XLSX.utils.sheet_to_json(worksheet,{raw:false});
                this.generateData({header,results});
                resolve();
                this.loading=false;
              }
              reader.readAsArrayBuffer(rawFile);
            })
          },
          fixData(data){
            let o='';
            let l=0;
            const w=10240;
            for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)))
            o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)))
            return o;
          },
          getHeaderRow(sheet){
            const headers = []
            const range = XLSX.utils.decode_range(sheet['!ref'])
            let C
            const R = range.s.r
            /* start in the first row */
            for (C = range.s.c; C <= range.e.c; ++C) { /* walk every column in the range */
              const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
              /* find the cell in the first row */
              let hdr = 'UNKNOWN ' + C // <-- replace with your desired default
              if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
              headers.push(hdr)
            }
            return headers;
          },
          isExcel(file){
            return /\.(xlsx|xls|csv)$/.test(file.name);
          }
        }
    }
</script>

<style scoped>
  .excel-upload-input{
    display: none;
    z-index: -9999;
  }
  .drop {
    border: 2px dashed #bbb;
    width: 100%;
    height: 160px;
    line-height: 160px;
    margin: 0 auto;
    font-size: 24px;
    border-radius: 5px;
    text-align: center;
    color: #bbb;
    position: relative;
  }
</style>

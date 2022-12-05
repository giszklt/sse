<template>
  <div class="userManagementPage">
    <div class="breadcrumb-tag">
      <i class="el-icon-menu"></i>
      <span>
<!--        首页 / 系统管理 /-->
        <span class="secondStage-tag" @click="handleRouter">
          {{secondTagLebal}}
        </span>
<!--        <span class="leaf-tag">用户管理</span>-->
        <span class="leaf-tag">{{leafTagLebal}}</span>
      </span>
    </div>
    <div class="child-userManagement" v-show="leafTagKey === 'userManagement' && !secondTagKey">
      <div class="operate-area">
        <div class="left-bnt">
          <el-button
              v-for="(bntProp, bnti) in bntProps"
              :key="bnti"
              type="primary"
              size="mini"
              :icon="bntProp.icon"
              :style="{border:bntProp.border,background:bntProp.background,color:bntProp.color,margin:bntProp.margin}"
              @click="operateClicked(bnti,bntProp.content)"
          >{{bntProp.content}}</el-button>
        </div>
        <div class="right-search">
          <el-input v-model="searchValue" placeholder="搜索">
            <el-button slot="append" icon="el-icon-my-search" @click="searchClicked"></el-button>
          </el-input>
          <div class="search-operateIcon">
            <i class="el-icon-my-ascende" @click="ascendingOder"></i>
            <div class="vertical-line"></div>
            <i class="el-icon-my-filter" @click="handleFilter"></i>
          </div>
        </div>
      </div>
      <el-table
          :data="data"
          style="width: 100%"
          :header-cell-style="{padding: '4px 0'}"
          :cell-style="{background:'#0d1b24', padding: '4px 0'}"
          :header-row-style="headerRowStyle"
          :row-style="rowStyle"
          @selection-change="handleSelectionChange"
          :height="mainTableHeight"
      >
        <el-table-column type="selection" width="44" align="center"></el-table-column>
        <template v-for="(col,coli) in cols">
          <el-table-column
              v-if="col.colprop === 'status'"
              :prop="col.colprop"
              :label="col.collabel"
              :sortable="col.sortable"
              :width="col.width"
              :key="coli"
          >
            <template slot-scope="scope">
              <div class="col-status">
                <el-button size="mini" :type="scope.row.status === '启用'?'success' :'danger'" circle></el-button>
                {{scope.row.status}}
              </div>
            </template>
          </el-table-column>
          <el-table-column
              v-else
              :prop="col.colprop"
              :label="col.collabel"
              :sortable="col.sortable"
              :width="col.width"
              :key="coli"
          ></el-table-column>
        </template>
      </el-table>
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[50, 100, 200, 300, 400]"
          :page-size="pageSize"
          layout="slot, prev, pager, next, sizes, jumper"
          :total="totalNumber"
      >
      <span>
        选中
        <span class="pagination-selected">{{selectedNumber}}</span>，
      </span>
        <span>
        共计
        <span class="pagination-selected pagination-total">{{totalNumber}}</span>
      </span>
      </el-pagination>
    </div>
    <div class="child-roleManagement" v-show="leafTagKey === 'roleManagement' && !secondTagKey">角色管理</div>
    <div class="child-menuManagement" v-show="leafTagKey === 'menuManagement' && !secondTagKey">菜单管理</div>
    <div class="father-systemManagement" v-show="secondTagKey === 'systemManagement'">
      系统管理
      <div>
        <span class="secondStage-style"
              v-for="(leafItem, leafi) in routerObj.secondStage"
              :key="leafi"
              @click="routerClicked(leafi)">
          {{leafItem.lebal}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "userManagement",
  data() {
    return {
      routerObj:{
        firstStage:{
          lebal: '首页 / 系统管理 / ',
          key: 'systemManagement',
        },
        // secondStage:['用户管理', '菜单管理', '角色管理'],
        secondStage:[
            {
              lebal: '用户管理',
              key: 'userManagement'
            },
            {
              lebal: '菜单管理',
              key: 'menuManagement'
            },
            {
              lebal: '角色管理',
              key: 'roleManagement'
            }
          ],
      },
      leafTagLebal:'',
      leafTagKey:'',
      secondTagKey:'',
      secondTagLebal:'',
      mainTableHeight:document.documentElement.clientHeight - 246,
      // mainTableHeight:window.innerHeight - 246,
      bntProps: [
        {
          content: "新增",
          border: "none",
          icon: "el-icon-my-plus",
          background: "#fec739",
          color: "#ffffff",
          margin:"0 10px 0 0"
        },
        {
          content: "编辑",
          border: "1px solid #409EFE",
          icon: "el-icon-my-edit",
          background: "transparent",
          color: "#409EFE",
          margin:"0 5px 0 0"
        },
        {
          content: "分配角色",
          border: "1px solid #409EFE",
          icon: "el-icon-my-user",
          background: "transparent",
          color: "#409EFE",
          margin:"0 5px 0 0"
        },
        {
          content: "变更状态",
          border: "1px solid #409EFE",
          icon: "el-icon-my-shield",
          background: "transparent",
          color: "#409EFE",
          margin:"0 5px 0 0"
        },
        {
          content: "重置密码",
          border: "1px solid #409EFE",
          icon: "el-icon-my-refresh",
          background: "transparent",
          color: "#409EFE",
          margin:"0 5px 0 0"
        },
        {
          content: "删除",
          border: "1px solid #ff0000",
          icon: "el-icon-my-delete",
          background: "transparent",
          color: "#ff0000",
          margin:"0 5px 0 0"
        }
      ],
      searchValue: "",
      data: [
        {
          serialNumber: '01',
          account: "admin",
          name: "管理员",
          role: "系统管理员",
          status: "启用",
          department: "卫星遥感部",
          phoneNumber: "13500068000",
          createTime: "2022-09-15 09:00"
        },
        {
          serialNumber: '02',
          account: "yianzi",
          name: "易安子",
          role: "业务管理",
          status: "禁用",
          department: "卫星遥感部",
          phoneNumber: "13500068000",
          createTime: "2022-09-15 09:00"
        },
        {
          serialNumber: '03',
          account: "zhaoyoucai",
          name: "赵有才",
          role: "业务人员",
          status: "启用",
          department: "卫星遥感部",
          phoneNumber: "13500068000",
          createTime: "2022-09-15 09:00"
        },
        {
          serialNumber: '04',
          account: "qianxiaofeng",
          name: "钱晓峰",
          role: "人影办",
          status: "启用",
          department: "卫星遥感部",
          phoneNumber: "13500068000",
          createTime: "2022-09-15 09:00"
        },
        {
          serialNumber: '05',
          account: "sunlixin",
          name: "孙立新",
          role: "指令发布员",
          status: "启用",
          department: "卫星遥感部",
          phoneNumber: "13500068000",
          createTime: "2022-09-15 09:00"
        },
        {
          serialNumber: '06',
          account: "liyunfei",
          name: "李云飞",
          role: "业务管理员",
          status: "启用",
          department: "卫星遥感部",
          phoneNumber: "13500068000",
          createTime: "2022-09-15 09:00"
        },
        {
          serialNumber: '07',
          account: "zhoujianguo",
          name: "周建国",
          role: "普通人员",
          status: "启用",
          department: "卫星遥感部",
          phoneNumber: "13500068000",
          createTime: "2022-09-15 09:00"
        },
        {
          serialNumber: '08',
          account: "wiwei",
          name: "武伟",
          role: "业务人员",
          status: "启用",
          department: "卫星遥感部",
          phoneNumber: "13500068000",
          createTime: "2022-09-15 09:00"
        },
        {
          serialNumber: '09',
          account: "zhengxifeng",
          name: "郑西峰",
          role: "业务人员",
          status: "启用",
          department: "卫星遥感部",
          phoneNumber: "13500068000",
          createTime: "2022-09-15 09:00"
        },
        {
          serialNumber: '10',
          account: "wangyuanqing",
          name: "王元庆",
          role: "业务人员",
          status: "启用",
          department: "卫星遥感部",
          phoneNumber: "13500068000",
          createTime: "2022-09-15 09:00"
        },
        {
          serialNumber: '11',
          account: "ouyangqing",
          name: "欧阳青",
          role: "业务管理员",
          status: "启用",
          department: "卫星遥感部",
          phoneNumber: "13500068000",
          createTime: "2022-09-15 09:00"
        }
      ],
      cols: [
        {
          colprop: "serialNumber",
          collabel: "序",
          sortable: false,
          width: 50
        },
        {
          colprop: "account",
          collabel: "用户账号",
          sortable: false,
          width: 150
        },
        {
          colprop: "name",
          collabel: "用户姓名",
          sortable: false,
          width: 150
        },
        {
          colprop: "role",
          collabel: "用户角色",
          sortable: true,
          width: 150
        },
        {
          colprop: "status",
          collabel: "用户状态",
          sortable: true,
          width: 150
        },
        {
          colprop: "department",
          collabel: "所属部门",
          sortable: true,
          width: 150
        },
        {
          colprop: "phoneNumber",
          collabel: "联系电话",
          sortable: false,
          width: 150
        },
        {
          colprop: "createTime",
          collabel: "创建时间",
          sortable: true,
          width: ""
        }
      ],
      currentPage: 1,
      selectedNumber: 0,
      totalNumber: 1000,
      pageSize:50,
    };
  },
  mounted() {
    let that = this;
    window.addEventListener('resize',function(){
      that.mainTableHeight = document.documentElement.clientHeight - 246;
    });
    this.leafTagLebal = this.routerObj.secondStage[0].lebal;
    this.leafTagKey = this.routerObj.secondStage[0].key;
    this.secondTagLebal = this.routerObj.firstStage.lebal;
    this.secondTagKey = '';
  },
  watch:{
    mainTableHeight(newValue){
      this.mainTableHeight = newValue;
    }
  },
  computed:{
      // computedMainHeight(){
      //   return window.innerHeight - 246;
      // }
  },
  methods: {
    handleRouter(){
      const tempSecond = this.secondTagLebal;
      const tempSecondArr = tempSecond.split('/');
      this.leafTagLebal = tempSecondArr[tempSecondArr.length - 2];
      this.secondTagLebal = tempSecondArr[0] + '/';
      this.secondTagKey = this.routerObj.firstStage.key;
    },
    routerClicked(pagei){
      this.leafTagLebal = this.routerObj.secondStage[pagei].lebal;
      this.leafTagKey = this.routerObj.secondStage[pagei].key;
      this.secondTagLebal = this.routerObj.firstStage.lebal;
      this.secondTagKey = '';
    },
    operateClicked(bnti, content) {
      console.log(bnti, content);
      switch (bnti) {
        case 0:
          //新增事件
          break;
        case 1:
          //编辑事件
          break;
        case 2:
          //分配角色事件
          break;
        case 3:
          //变更状态事件
          break;
        case 4:
          //重置密码事件
          break;
        case 5:
          //删除事件
          break;
      }
    },
    searchClicked() {
      console.log(this.searchValue);
    },
    headerRowStyle() {
      return {
        color: "#86e3f7",
        background: "#244b63",
        fontSize: "14px"
        // borderBottom: "1px solid #70afc6"
      };
    },
    rowStyle() {
      return {
        color: "white",
        background: "#0d1b24",
        fontFamily: "weiruanyahei",
        fontSize: "14px"
      };
    },
    handleSelectionChange(selectedArray) {
      this.selectedNumber = selectedArray.length;
    },
    ascendingOder(){
      console.log('升序操作')
    },
    handleFilter(){
      console.log('筛选操作')
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style scoped lang="scss">
@import url("../assets/font/font.css");
@import url("../assets/icon/myCustomIcon.css");
.userManagementPage{
  margin: 0 10px;
  .father-systemManagement{
    color: #6BE4F9;
    font-family: "weiruanyahei";
    .secondStage-style{
      margin-right: 10px;
      cursor: pointer;
    }
  }
}
.breadcrumb-tag {
  padding: 10px 10px;
  color: #fec739;
  background-color: #183C4C;
  font-family: "weiruanyahei";
  font-size: 16px;
  .secondStage-tag{
    cursor: pointer;
  }
  .leaf-tag {
    font-weight: bold;
    cursor: pointer;
  }
}
.operate-area {
  background-color: #183C4C;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  padding: 10px 0 10px 10px;
  .left-bnt,
  .right-search {
    min-width: 60px;
  }
  .left-bnt {
    .el-button--mini {
      // background: #fec739;
      // border: none;
      height: 30px;
      font-size: 14px;
      font-family: "weiruanyahei";
      padding: 7px 10px;
      border-radius: 4px;
    }
  }
  .right-search {
    display: flex;
    justify-content: center;
    align-items: center;
    /deep/ .el-button {
      background: none;
      width: 30px;
      height: 30px;
      padding: 0;
      margin: 0;
    }
    /deep/ .el-input-group__append {
      background-color: #408396;
      border: none;
      padding: 0;
      .el-icon-search {
        color: #122835;
        font-weight: bold;
        font-size: 15px;
      }
    }
    /deep/.el-input__inner {
      font-size: 14px;
      font-family: "weiruanyahei";
      background-color: transparent;
      border: 1px solid #408396;
      color: #ffffff;
      height: 30px;
      line-height: 30px;
      padding: 0 4px;
    }
    .search-operateIcon {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 20px 0 10px;
      border: 1px solid #408396;
      border-radius: 5px;
      height: 30px;
      .vertical-line{
        width: 2px;
        height: 18px;
        border-radius: 50%;
        background-color: #408396;
        margin-right: 1px;
      }
      .el-icon-my-filter{
        background-color: #6ECAE3;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        margin: 0 1px 0 0;
      }
    }
  }
}
.col-status {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 4px;
    padding: 5px;
  }
}
.el-table{
  background-color: #0d1b24;

}

/deep/ .el-table__body-wrapper::-webkit-scrollbar {
  width: 6px; /*滚动条宽度*/
  height: 8px; /*滚动条高度*/
}
/deep/ .el-table__body-wrapper::-webkit-scrollbar-track {
  //border-radius: 4px; /*滚动条的背景区域的圆角*/
  background-color: transparent; /*滚动条的背景颜色*/

}
/deep/ .el-table__body-wrapper::-webkit-scrollbar-corner {
  background-color: transparent;
}
/deep/ .el-table__body-wrapper::-webkit-scrollbar-thumb {
  border-radius: 4px; /*滚动条的圆角*/
  background-color: #244b63; /*滚动条的背景颜色*/
}


///deep/.gutter{
.el-table colgroup col[name='gutter']{
  width: 6px;
}
.el-table__body{
  width: 100% !important;
}
//div /deep/ th .el-table__cell .gutter {
//  //display: initial !important;
//  background-color: #f1f1f1;
//  position: absolute;
//  height: 100%;
//}
/* el-divider 修改高度&虚线效果 */
// /deep/.el-divider--horizontal {
//   margin: 8px 0;
//   background: 0 0;
//   border-top: 1px dashed #f00;
// }

// /deep/.el-table__body {
//   border-spacing: 0px 1px;
// }

//去掉表格底部白线
.el-table::before {
  height: 0;
}

//表格中每行的下边框
/deep/td.el-table__cell {
  border-bottom: 1px dashed #244b63 !important;
}
/deep/th.el-table__cell.is-leaf {
  border-bottom: 1px solid #86e3f7 !important;
}

// ----行hover更改底色取消----
/deep/.el-table tbody tr:hover > td {
  background-color: #0d1b24 !important;
}
// ----行hover更改底色取消----

// ----多选框调整----
/deep/.el-checkbox__inner {
  border: 1px solid #467689;
  background-color: #234b62;
  width: 16px;
  height: 16px;
}
/deep/.el-checkbox__inner:hover {
  border-color: #409eff;
}

/deep/.el-checkbox__input.is-checked .el-checkbox__inner,
/deep/.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  border: 1px solid #467689;
  background-color: #234b62;
}
// ----多选框调整----

//将表头单元格背景色透明，使回调函数的表头背景颜色可用
/deep/th.el-table__cell {
  background-color: transparent !important;
}

//表头列之间的分割线
/deep/ th.el-table__cell > .cell {
  line-height: 34px;
  border-right: 1px solid #1f3d54;
}

//分页格式
.el-pagination {
  display: flex;
  justify-content: flex-end;
  font-family: "weiruanyahei";
  font-weight: 400;
  color: white;
  padding: 6px;
  background: #183C4C;
  .pagination-selected {
    color: #7acfe5;
    text-align: center;
    min-width: 10px;
  }
  .pagination-total {
    margin-right: 10px;
  }
  /deep/.btn-prev,
  /deep/.btn-next {
    // background: transparent;
    background: #0c1b24;
    min-width: 28px;
    height: 28px;
    line-height: 28px;
    border: 1px solid #4d7e8d;
    border-radius: 5px;
    .el-icon-arrow-left,
    .el-icon-arrow-right {
      color: #4d7e8d;
    }
  }
  /deep/ li {
    background: #0c1b24;
    margin: 0 4px;
    font-size: 13px;
    min-width: 28px;
    height: 28px;
    line-height: 28px;
    border: 1px solid #4d7e8d;
    border-radius: 5px;
  }
   /deep/.active {
     color: #0c1b24;
     cursor: default;
     background: #7acfe5 !important;
   }

  /deep/.btn-quicknext,
  /deep/.btn-quickprev {
    line-height: 28px;
    color: #4d7e8d;
  }

  /deep/.btn-prev, /deep/.btn-next{
    padding: 0px;
  }



  /deep/ .el-input__inner {
    color: #6a747b;
    background: #0c1b24;
    border: 1px solid #4d7e8d;
    border-radius: 5px;
  }
  /deep/.el-pagination__editor.el-input {
    width: 40px;
  }
  /deep/.el-pagination__jump {
    margin-left: 0;
    color: #ffffff;
    .el-input__inner {
      color: #ffffff;
    }
  }
}
</style>
<style>
.popper__arrow::after {
  border-top-color: #5EB1C8 !important;
  bottom: 0px !important;
}
.popper__arrow{
  border-top-color: transparent !important;
}

.el-select-dropdown__list {
  background: #0c1b24;
  padding: 0 !important;
  font-family: 'weiruanyahei';
}
.el-select-dropdown {
  border: 1px solid #5EB1C8 !important;
}
.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  background-color: #1d323f !important;
}
</style>
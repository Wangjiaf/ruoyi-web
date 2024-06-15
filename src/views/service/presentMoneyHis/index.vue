<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="80px">
      <el-form-item label="创建者" prop="createBy">
        <el-input v-model="queryParams.createBy" placeholder="请输入创建者" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="创建时间" prop="createTime">
        <el-date-picker clearable v-model="queryParams.createTime" type="date" value-format="yyyy-MM-dd" placeholder="请选择创建时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="更新者" prop="updateBy">
        <el-input v-model="queryParams.updateBy" placeholder="请输入更新者" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="更新时间" prop="updateTime">
        <el-date-picker clearable v-model="queryParams.updateTime" type="date" value-format="yyyy-MM-dd" placeholder="请选择更新时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="queryParams.remark" placeholder="请输入备注" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="删除标识" prop="delFlag">
        <el-input v-model="queryParams.delFlag" placeholder="请输入删除标识" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="办事日期">
        <el-date-picker v-model="daterangeEventTime" style="width: 240px" value-format="yyyy-MM-dd" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="办事名称" prop="eventName">
        <el-input v-model="queryParams.eventName" placeholder="请输入办事名称" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="支付方式" prop="presentType">
        <el-select v-model="queryParams.presentType" placeholder="请选择礼金支付方式" clearable>
          <el-option v-for="dict in dict.type.service_present_pay_type" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="礼金人" prop="presentUser">
        <el-input v-model="queryParams.presentUser" placeholder="请输入礼金人" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="礼金金额" prop="presentMoney">
        <el-input v-model="queryParams.presentMoney" placeholder="请输入礼金金额" clearable  @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="汇总表ID" prop="presentMoneyId">
        <el-input v-model="queryParams.presentMoneyId" placeholder="请输入礼金汇总表ID" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd" v-hasPermi="['service:presentMoneyHis:add']">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate" v-hasPermi="['service:presentMoneyHis:edit']">修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete" v-hasPermi="['service:presentMoneyHis:remove']">删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport" v-hasPermi="['service:presentMoneyHis:export']">导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="presentMoneyHisList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键ID" align="center" prop="id" />
      <el-table-column label="更新者" align="center" prop="updateBy" />
      <el-table-column label="更新时间" align="center" prop="updateTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updateTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="办事日期" align="center" prop="eventTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.eventTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="办事名称" align="center" prop="eventName" />
      <el-table-column label="礼金支付方式" align="center" prop="presentType">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.service_present_pay_type" :value="scope.row.presentType" />
        </template>
      </el-table-column>
      <el-table-column label="礼金人" align="center" prop="presentUser" />
      <el-table-column label="礼金金额" align="center" prop="presentMoney" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)" v-hasPermi="['service:presentMoneyHis:edit']">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)" v-hasPermi="['service:presentMoneyHis:remove']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize" @pagination="getList" />

    <!-- 添加或修改礼金历史记录对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item label="办事日期" prop="eventTime">
          <el-date-picker clearable v-model="form.eventTime" type="date" value-format="yyyy-MM-dd" placeholder="请选择办事日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="办事名称" prop="eventName">
          <el-input v-model="form.eventName" placeholder="请输入办事名称" />
        </el-form-item>
        <el-form-item label="礼金支付方式" prop="presentType">
          <el-select v-model="form.presentType" placeholder="请选择礼金支付方式">
            <el-option v-for="dict in dict.type.service_present_pay_type" :key="dict.value" :label="dict.label" :value="dict.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="礼金人" prop="presentUser">
          <el-input v-model="form.presentUser" placeholder="请输入礼金人" />
        </el-form-item>
        <el-form-item label="礼金金额" prop="presentMoney">
          <el-input v-model="form.presentMoney" placeholder="请输入礼金金额" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    listPresentMoneyHis,
    getPresentMoneyHis,
    delPresentMoneyHis,
    addPresentMoneyHis,
    updatePresentMoneyHis
  } from "@/api/service/presentMoneyHis";

  export default {
    name: "PresentMoneyHis",
    dicts: ['service_present_pay_type'],
    data() {
      return {
        // 遮罩层
        loading: true,
        // 选中数组
        ids: [],
        // 非单个禁用
        single: true,
        // 非多个禁用
        multiple: true,
        // 显示搜索条件
        showSearch: true,
        // 总条数
        total: 0,
        // 礼金历史记录表格数据
        presentMoneyHisList: [],
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        // 礼金金额时间范围
        daterangeEventTime: [],
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          createBy: null,
          createTime: null,
          updateBy: null,
          updateTime: null,
          remark: null,
          delFlag: null,
          eventTime: null,
          eventName: null,
          presentType: null,
          presentUser: null,
          presentMoney: null,
          presentMoneyId: null
        },
        // 表单参数
        form: {},
        // 表单校验
        rules: {
          eventTime: [{
            required: true,
            message: "办事日期不能为空",
            trigger: "blur"
          }],
          eventName: [{
            required: true,
            message: "办事名称不能为空",
            trigger: "blur"
          }],
          presentType: [{
            required: true,
            message: "礼金支付方式不能为空",
            trigger: "change"
          }],
          presentUser: [{
            required: true,
            message: "礼金人不能为空",
            trigger: "blur"
          }],
          presentMoney: [{
            required: true,
            message: "礼金金额不能为空",
            trigger: "blur"
          }],
        }
      };
    },
    created() {
      this.getList();
    },
    methods: {
      /** 查询礼金历史记录列表 */
      getList() {
        this.loading = true;
        this.queryParams.params = {};
        if (null != this.daterangeEventTime && '' != this.daterangeEventTime) {
          this.queryParams.params["beginEventTime"] = this.daterangeEventTime[0];
          this.queryParams.params["endEventTime"] = this.daterangeEventTime[1];
        }
        listPresentMoneyHis(this.queryParams).then(response => {
          this.presentMoneyHisList = response.rows;
          this.total = response.total;
          this.loading = false;
        });
      },
      // 取消按钮
      cancel() {
        this.open = false;
        this.reset();
      },
      // 表单重置
      reset() {
        this.form = {
          id: null,
          createBy: null,
          createTime: null,
          updateBy: null,
          updateTime: null,
          remark: null,
          delFlag: null,
          eventTime: null,
          eventName: null,
          presentType: null,
          presentUser: null,
          presentMoney: null,
          presentMoneyId: null
        };
        this.resetForm("form");
      },
      /** 搜索按钮操作 */
      handleQuery() {
        this.queryParams.pageNum = 1;
        this.getList();
      },
      /** 重置按钮操作 */
      resetQuery() {
        this.daterangeEventTime = [];
        this.resetForm("queryForm");
        this.handleQuery();
      },
      // 多选框选中数据
      handleSelectionChange(selection) {
        this.ids = selection.map(item => item.id)
        this.single = selection.length !== 1
        this.multiple = !selection.length
      },
      /** 新增按钮操作 */
      handleAdd() {
        this.reset();
        this.open = true;
        this.title = "添加礼金历史记录";
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        this.reset();
        const id = row.id || this.ids
        getPresentMoneyHis(id).then(response => {
          this.form = response.data;
          this.open = true;
          this.title = "修改礼金历史记录";
        });
      },
      /** 提交按钮 */
      submitForm() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if (this.form.id != null) {
              updatePresentMoneyHis(this.form).then(response => {
                this.$modal.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              });
            } else {
              addPresentMoneyHis(this.form).then(response => {
                this.$modal.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              });
            }
          }
        });
      },
      /** 删除按钮操作 */
      handleDelete(row) {
        const ids = row.id || this.ids;
        this.$modal.confirm('是否确认删除礼金历史记录编号为"' + ids + '"的数据项？').then(function() {
          return delPresentMoneyHis(ids);
        }).then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        }).catch(() => {});
      },
      /** 导出按钮操作 */
      handleExport() {
        this.download('system/presentMoneyHis/export', {
          ...this.queryParams
        }, `presentMoneyHis_${new Date().getTime()}.xlsx`)
      }
    }
  };
</script>

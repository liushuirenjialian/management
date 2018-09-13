    <template>
        <div>
            <div class="grid-content bg-purple-light tables" style="border-left:1px solid #ccc;padding:20px;">
            <h3>明细列表</h3>
            <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column
                prop="number"
                label="序号"
                width="100">
              </el-table-column>
              <el-table-column
                label="承储库点"
                width="180">
                <template slot-scope="scope">
                <el-select :disabled="true" value="楚雄市粮食储备有限公司">

                </el-select>
                </template>
              </el-table-column>
              <el-table-column
                prop="address"
                label="仓房名称">
                <template slot-scope="scope">
                <el-select :disabled="true" value="1号货位">

                </el-select>
                </template>
              </el-table-column>
              <el-table-column
                prop="address"
                label="货位名称">
                <template slot-scope="scope">
                <el-select :disabled="true" value="小麦">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                </template>
              </el-table-column>
              <el-table-column
                prop="address"
                label="粮油品种">
                <template slot-scope="scope">
                <el-select :disabled="true" value="市级储备粮">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                </template>
              </el-table-column>
              <el-table-column
                prop="address"
                label="粮油性质">
                <template slot-scope="scope">
                <el-select :disabled="true" value="一等">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                </template>
              </el-table-column>
              <el-table-column
                prop="address"
                label="粮油等级">
                <template slot-scope="scope">
                <el-select :disabled="true" value="20160204">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                </template>
              </el-table-column>
              <el-table-column
                prop="address"
                label="生产年限">
                <template slot-scope="scope">
                <el-input :disabled="true" value="20160204"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="address"
                label="入库时间">
                <template slot-scope="scope">
                    <el-input :disabled="true" value="20180404"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="address"
                label="粮油产地">
                <template slot-scope="scope">
                <el-input :disabled="true" value="楚雄市"></el-input>
                </template>
              </el-table-column>
            </el-table>
            </div>
            <div class="grid-content bg-purple-light tables" style="border-left:1px solid #ccc;padding:20px;">
            <h3>购销信息</h3>
            <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column
                prop="number"
                label="序号"
                width="100">
              </el-table-column>
              <el-table-column
                label="承储库点"
                width="180">
                <template slot-scope="scope">
                <el-select :disabled="true" value="楚雄市粮食储备有限公司">

                </el-select>
                </template>
              </el-table-column>
              <el-table-column
                prop="address"
                label="仓房名称">
                <template slot-scope="scope">
                <el-select :disabled="true" value="1号货位">

                </el-select>
                </template>
              </el-table-column>
              <el-table-column
                prop="address"
                label="货位名称">
                <template slot-scope="scope">
                <el-select :disabled="true" value="小麦">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                </template>
              </el-table-column>
              <el-table-column
                prop="address"
                label="粮油品种">
                <template slot-scope="scope">
                <el-select :disabled="true" value="市级储备粮">

                </el-select>
                </template>
              </el-table-column>
              <el-table-column
                prop="address"
                label="轮换数量（公斤）">
                <template slot-scope="scope">
                <el-select :disabled="true" value="75000000">

                </el-select>
                </template>
              </el-table-column>
              <el-table-column
                prop="address"
                label="销售单价（元/公斤）">
                <template slot-scope="scope">
                <el-select :disabled="true" value="3">

                </el-select>
                </template>
              </el-table-column>
              <el-table-column
                prop="address"
                label="销售总价（元）">
                <template slot-scope="scope">
                <el-input :disabled="true" value="225000000"></el-input>
                </template>
              </el-table-column>
            </el-table>
            </div>
        </div>

    </template>
    <script>
        export default {
          name: 'tables',
          data() {
            return {
              tableData: [{
                number: 1,
                date: '2016-05-02',
                name: '1111',
                address: '1'
              }, {
                number: 2,
                date: '2016-05-04',
                name: '王小虎',
                address: '2'
              }],
              options: [{
                value: '1',
                label: '1'
              }, {
                value: '2',
                label: '2'
              }],
              value: ''
            }
          }

        }
    </script>
    <style>

    </style>
<template>
  <div>
    <h1 class="text-h4 mb-6">发票 OCR</h1>

    <v-row>
      <!-- 上传区域 -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>上传发票</v-card-title>
          <v-card-text>
            <FileUpload
              v-model:files="invoiceFiles"
              label="选择发票图片"
              accept="image/*,.pdf"
              prepend-icon="mdi-receipt"
            />
            <v-btn
              color="primary"
              class="mt-4"
              :loading="isExtracting"
              :disabled="invoiceFiles.length === 0"
              @click="handleExtract"
            >
              提取信息
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- 结果展示 -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>提取结果</v-card-title>
          <v-card-text>
            <div v-if="invoiceResult">
              <v-table>
                <tbody>
                  <tr>
                    <td class="font-weight-bold">发票号码</td>
                    <td>{{ invoiceResult.invoiceNumber }}</td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold">开票日期</td>
                    <td>{{ invoiceResult.invoiceDate }}</td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold">销售方名称</td>
                    <td>{{ invoiceResult.sellerName }}</td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold">销售方税号</td>
                    <td>{{ invoiceResult.sellerTaxId }}</td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold">购买方名称</td>
                    <td>{{ invoiceResult.buyerName }}</td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold">购买方税号</td>
                    <td>{{ invoiceResult.buyerTaxId }}</td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold">不含税金额</td>
                    <td>{{ invoiceResult.amountExcludingTax }}</td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold">税额</td>
                    <td>{{ invoiceResult.taxAmount }}</td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold">价税合计</td>
                    <td>{{ invoiceResult.totalAmount }}</td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold">货物或服务</td>
                    <td>{{ invoiceResult.items }}</td>
                  </tr>
                </tbody>
              </v-table>
            </div>
            <EmptyState
              v-else
              icon="mdi-receipt"
              title="暂无提取结果"
              description="上传发票图片后点击提取信息"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { extractInvoice } from '@/api/invoice'
import FileUpload from '@/components/common/FileUpload.vue'
import EmptyState from '@/components/common/EmptyState.vue'

const invoiceFiles = ref([])
const invoiceResult = ref(null)
const isExtracting = ref(false)

async function handleExtract() {
  if (invoiceFiles.value.length === 0) return

  isExtracting.value = true
  try {
    invoiceResult.value = await extractInvoice(invoiceFiles.value[0])
  } catch (error) {
    console.error('Extract error:', error)
    alert('提取失败：' + (error.message || '未知错误'))
  } finally {
    isExtracting.value = false
  }
}
</script>

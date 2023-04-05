<template lang="">
  <div class="row">
    <div class="flex xs12">
      <!-- Tabel User -->
      <va-card>
        <va-card-content>
          <h1 class="mb-4">DATA USER</h1>

          <Toolbar class="mb-4">
            <template #start>
              <Button label="New" icon="pi pi-plus" severity="success" class="mr-2" @click="openNew" />
              <Button
                label="Delete"
                icon="pi pi-trash"
                severity="danger"
                :disabled="!selectedProducts || !selectedProducts.length"
                @click="confirmDeleteSelected"
              />
            </template>

            <template #end>
              <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <InputText v-model="filters['global'].value" placeholder="Search..." class="mr-2 inline-block" />
              </span>
              <FileUpload
                mode="basic"
                accept="image/*"
                :max-file-size="1000000"
                label="Import"
                choose-label="Import"
                class="mr-2 inline-block"
              />
              <Button label="Export" icon="pi pi-upload" severity="help" @click="exportCSV($event)" />
            </template>
          </Toolbar>

          <DataTable
            :value="users"
            striped-rows
            paginator
            :filters="filters"
            :rows="5"
            :rows-per-page-options="[5, 10, 20, 50]"
            table-style="min-width: 50rem"
          >
            <Column field="id" sortable header="Code"></Column>
            <Column field="name" header="Name"></Column>
            <Column field="email" header="E - Mail"></Column>
          </DataTable>
        </va-card-content>
      </va-card>
    </div>

    <Dialog v-model:visible="userDialog" :style="{ width: '750px' }" header="Form User" :modal="true" class="p-fluid">
    </Dialog>
  </div>
</template>
<script>
  import axios from 'axios'
  import $ from 'jquery'
  import DataTable from 'primevue/datatable'
  import Column from 'primevue/column'
  import Toolbar from 'primevue/toolbar'
  import Button from 'primevue/button'
  import FileUpload from 'primevue/fileupload'
  import InputText from 'primevue/inputtext'
  import { FilterMatchMode } from 'primevue/api'
  import Dialog from 'primevue/dialog'

  export default {
    components: {
      DataTable,
      Column,
      Toolbar,
      Button,
      FileUpload,
      InputText,
      Dialog,
    },
    data() {
      return {
        modalEdit: false,
        userDialog: false,
        submitted: false,
        users: null,
        filters: {},
      }
    },
    created() {
      this.initFilters()
    },
    mounted() {
      this.getUser()
    },
    methods: {
      getUser() {
        axios
          .get('http://127.0.0.1:8000/api/users')
          // .get('http://api101.lapaksemarang.com/api/users')
          .then((response) => {
            this.users = response.data.data
            $('#tblUser').DataTable({
              data: response.data.data,
              responsive: true,
              autoWidth: true,
              dom: 'frtip',
              scrollY: false,
              columns: [
                { data: 'id' },
                { data: 'name' },
                //   { data: 'username' },
                { data: 'email' },
                //   { data: 'company_id' },
                //   { data: 'type' },
                {
                  data: 'id',
                  render: function (data, row) {
                    return (
                      '<div class="btn-group btn-group-sm" role="group"> ' +
                      '<button @click="$refs.xxx.show()" data-id="' +
                      `${data}` +
                      '" id="edit" type="button" class="btn btn-outline-success">Edit</button>' +
                      '<button type="button" class="btn btn-outline-danger">Hapus</button>' +
                      '</div>'
                    )
                  },
                },
              ],
            })
          })
          .catch((error) => console.log(error.response))
        $(document).on('click', '#edit', function () {
          let id = $(this).data('id')
        })
      },
      openNew() {
        this.user = {}
        this.submitted = false
        this.userDialog = true
      },
      initFilters() {
        this.filters = {
          global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        }
      },
    },
  }
</script>

<style>
  @import 'datatables.net-bs5';
</style>

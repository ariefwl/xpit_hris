<template lang="">
  <div class="row">
    <div class="flex xs12">
      <!-- Tabel User -->
      <va-card>
        <va-card-content>
          <router-link :to="{ name: 'user.create' }" class="btn btn-outline-primary mb-3">Tambah Data</router-link>
          <button class="btn btn-outline-success mb-3" @click="$refs.xxx.show()">Edit</button>
          <h1 class="mb-4">DATA USER</h1>
          <div class="table-responsive">
            <table id="tblUser" class="table table-striped table-bordered display">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama Karyawan</th>
                  <!-- <th>Username</th> -->
                  <th>E - Mail</th>
                  <!-- <th>Perusahaan</th> -->
                  <!-- <th>Type</th> -->
                  <th>Proses</th>
                </tr>
              </thead>
            </table>
          </div>
        </va-card-content>
      </va-card>

      <!-- Modal Edit -->
      <va-modal ref="xxx" v-model="modalEdit" :message="formEdit" :overlay="false" no-outside-dismiss blur />
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import $ from 'jquery'
  import formEdit from './FormEdit.vue'

  export default {
    data() {
      return {
        modalEdit: false,
        formEdit,
      }
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
    },
  }
</script>

<style>
  @import 'datatables.net-bs5';
</style>

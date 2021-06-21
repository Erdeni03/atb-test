<template>
  <q-page class="flex flex-center
">
  <div class="q-pa-md" style="width: 850px; height: 450px;">
    <q-markup-table  dark class="shadow-24">
      <thead>
         <tr>
          <th colspan="6" class="overflow-hidden">
            <div class="row no-wrap items-center q-pa-sm relative-position">
              <div class="text-h4 q-ml-md text-white">Список сотрудников</div>
              <q-btn to="/new-form" push class="my-btn q-pa-sm " color="white" text-color="primary" label="Добавить запись" />
            </div>
          </th>
        </tr>
        <tr>
          <th class="text-left" v-for="col in columns" :key="col.name">{{col.label}}</th>
        </tr>
      </thead>
      <tbody >
        <tr v-for="item in paginationPersons" :key="item.id">
          <td>{{item.firstName}}</td>
          <td>{{item.lastName}}</td>
          <td>{{item.middleName}}</td>
          <td>{{item.birthDate}}</td>
          <td style="max-width: 200px" class="cursor-pointer"><div class="text-no-wrap ellipsis overflow-hidden">{{item.description}}</div>  <q-tooltip>
          {{item.description ? item.description : 'Пусто'}}
        </q-tooltip></td>
          <td>
            <q-btn :to="'/edit-form/'+ item.id" color="warning" push  size="sm" class="q-mr-xs" label="правка"/>
            <q-btn color="negative" push size="sm" label="удалить" @click="deletePerson(item.id)"/>
            </td>
        </tr>
      <tr><q-pagination
    class="q-pa-sm flex justify-center"
      v-model="current"
      :max="pages"
     
    /></tr>
     
      </tbody>
    </q-markup-table>
     
   
  </div>

  </q-page>
</template>

<script>
import {mapActions} from 'vuex';
export default {
  data () {
    return {
      current: 1,
      personsPerPage: 5,
      selected: [],
      columns: [
        { name: 'firstName',label: 'Фамилия'},
        { name: 'lastName', label: 'Имя'},
        { name: 'middleName', label: 'Отчество'},
        { name: 'birthDate', label: 'День рождения'},
        { name: 'description', label: 'Описание'},
        { name: 'action', label: 'Действия'},
        
      ],
    }
  },
  methods:{
    ...mapActions({deletePerson: 'management/deletePerson'}),
  },
  computed:{
    pages(){
      return Math.ceil(this.persons.length / 5)
    },
     persons() {
      return this.$store.getters['management/persons']
    },

    paginationPersons(){
      let from = (this.current - 1)* this.personsPerPage
      let to = from + this.personsPerPage
      return this.persons.slice(from,to)
    }
  }
}
</script>

<style lang="scss" scoped>

.my-btn{
  position: absolute;
  border-radius: 0 0px 0px 15px;
  right: -17px;
  top: -9px;
}
</style>

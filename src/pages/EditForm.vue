<template>
  <q-page padding class="flex flex-center" v-if="item">
    <!-- content -->
     <div class="q-pa-md"  style="max-width: 100%; width: 700px">

    <form @submit.prevent.stop="onSubmit" @reset.prevent.stop="onReset" class="q-gutter-md q-pa-xl rounded-borders shadow-24" style="background: var(--q-color-dark);">
      <div class="text-h4 q-ml-md text-white">Редактировать запись</div>
       <q-input
       dark
        ref="name"
        filled
        v-model="name"
        label="ФИО *"
        
        hint="Введите фамилию и имя"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Обязательное поле',
                  val=> /^[^\s]+( [^\s]+)+$/.test(val) || 'Введите фамилию и имя через пробел']"
      />
    <q-input dark ref="datePicker"  filled v-model="datePicker" lazy-rules  label="День рождения *" mask="date" :rules="['date']">
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy  ref="qDateProxy" transition-show="scale" transition-hide="scale">
            <q-date v-model="datePicker" title="Месяц день" subtitle="Год рождения" navigation-min-year-month="1920/01"
      navigation-max-year-month="2022/01" >
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Закрыть" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
         <q-input
         dark
      v-model="text"
      filled
      autogrow
      placeholder='Введите описание'
      maxlength="100"
    />
      
      <div>
        <q-btn label="Обновить" type="submit" color="primary"/>
        <q-btn label="Отмена" @click="$router.push('/')" color="red"  class="q-ml-sm" />
        <q-btn label="Сброс" type="reset" color="primary" flat class="q-ml-sm"/>
      </div>
    </form>

  </div>
  </q-page>
  <Error404 v-else/>
</template>

<script>
import Error404 from './Error404.vue';
import {mapGetters} from 'vuex';
export default {
    data () {
    return {
      name: null,
      text: null,
      datePicker: null,
    }
  },
  mounted(){
    const {firstName, lastName, middleName, description, birthDate} = this.item
    this.name = middleName ? [firstName, lastName, middleName].join(' ') : [firstName, lastName].join(' ')
    this.datePicker = birthDate
    this.text = description
  },
 
    computed:{
      ...mapGetters({person: 'management/personsById'}),
      item() {
        return this.person(+this.$route.params.id) 
      
      }
    },
     methods: {
    onSubmit () {
      this.$refs.name.validate()
      this.$refs.datePicker.validate()

      if (this.$refs.name.hasError || this.$refs.datePicker.hasError ) {
        this.formHasError = true
         this.$q.notify({
          color: 'negative',
          message: 'Заполните обязательные поля'
        })
      } else {
        this.$q.notify({
          icon: 'done',
          color: 'positive',
          message: 'Успешно обновлено'
        })
         
         this.name = this.name.split(' ')
        const person = {
          id: this.item.id,
          firstName: this.name[0],
          lastName: this.name[1],
          middleName: this.name[2] || null,
          birthDate: this.datePicker, 
          description: this.text || null,
        }
        
        this.onReset()
        this.$store.dispatch('management/updateForm', person)
        
      }
      
     
    },

    onReset () {
      this.name = ''
      this.text = ''
      this.datePicker = ''

      this.$refs.name.resetValidation()
      this.$refs.datePicker.resetValidation()
    }
  },
   components: {Error404},
}
</script>

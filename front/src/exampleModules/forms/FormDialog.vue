<script setup lang="ts">

import {ref} from 'vue'
import {watchImmediate} from '@vueuse/core'
import {Form, type FormSubmitEvent} from '@primevue/forms'
import {useToast} from 'primevue'
import {zodResolver} from '@primevue/forms/resolvers/zod'
import {z} from 'zod'
import {type Customers, defaultCustomer} from '@/exampleModules/customers/types/customers'
import {
  countries,
  representatives,
  statusOptions
} from '@/exampleModules/customers/constants/customers'
import {useCloseModal} from '../../../composable/modalHandler'

const emit = defineEmits<{
  close: [refresh: boolean]
}>()

const visible = defineModel<boolean>({ required: true, type: Boolean })
const props = defineProps({
  customer: {
    type: Object as () => Customers,
    default: defaultCustomer,
  },
})

const customer = ref(props.customer)
const assignCountryCode = () => {
  const countryCode = countries.value.find(
    (country) => country.name === customer.value.country.name,
  )?.code
  countryCode ? (customer.value.country.code = countryCode) : null
}

const assignRepresentativeImage = () => {
  const representativeImage = representatives.value.find(
    (representative) => representative.name === customer.value.representative.name,
  )?.image
  representativeImage ? (customer.value.representative.image = representativeImage) : null
}

const handleSave = () => {
  try {
    if (customer.value.country.name) {
      assignCountryCode()
    }
  } catch (error) {
    console.error('Error:', error)
  }
  //setTimeout(_, 2000)
  visible.value = false
}

const toast = useToast()

watchImmediate(
  () => props.customer,
  (value) => {
    if (!value) {
      customer.value = defaultCustomer
    } else {
      customer.value = value
    }
  },
)

const resolver = zodResolver(
  z.object({
    name: z.string().min(1, { message: 'Le nom est requis.' }),
    company: z.string().min(1, { message: 'La société est requise.' }),
    balance: z.number().min(0, { message: 'Le solde doit être positif.' }),
    status: z.string().min(1, { message: 'Le statut est requis.' }),
    date: z.date({ required_error: 'La date est requise.' }),
    activity: z.number().min(0).max(100, { message: "L'activité doit être entre 0 et 100." }),
    country: z.object({
      name: z.string().min(1, { message: 'Le pays est requis.' }),
      code: z.string().optional(),
    }),
    representative: z.object({
      name: z.string().min(1, { message: 'Le représentant est requis.' }),
      image: z.string().optional(),
    }),
    verified: z.boolean(),
  }),
)
const onFormSubmit = (e: FormSubmitEvent) => {
  if (customer.value.country.name) {
    assignCountryCode()
  }
  if(customer.value.representative.name){
    assignRepresentativeImage()
  }
  if (e.valid) {
    toast.add({ severity: 'success', summary: 'Form is submitted.', life: 3000 })
  console.log(customer.value)
    visible.value = false
  }
}
const { close } = useCloseModal(emit)

</script>

<template>
  <Dialog v-model:visible="visible" modal header="test"
          @after-hide="close(true)"
  >
    <Form :model="customer" :resolver @submit="onFormSubmit">
      <div class="h-4/5 overflow-auto p-4">
        <div class="flex justify-between w-full ">
          <!-- Informations personnelles -->
          <section class="mb-6 w-1/2">
            <h2 class="text-lg font-semibold mb-8">Informations Personnelles</h2>
            <div class="flex flex-row flex-wrap justify-around">
              <div class="flex flex-col space-y-10 justify-around">
                <div class="shrink-0">
                  <FormField v-slot="$field" name="name" :initialValue="customer.name">
                    <FloatLabel>
                      <label for="name" class="block text-sm font-medium mb-1">Nom</label>
                      <InputText
                        id="name"
                        class="w-full"
                        type="text"
                        v-model="customer.name"
                      />
                      <Message
                        v-if="$field?.invalid"
                        severity="error"
                        size="small"
                        variant="simple"
                      >
                        {{ $field.error?.message }}
                      </Message>
                    </FloatLabel>
                  </FormField>
                </div>
                <div>
                  <FormField v-slot="$field" name="company" :initial-value="customer.company">
                    <FloatLabel>
                      <label for="company" class="block text-sm font-medium mb-1">Société</label>
                      <InputText v-model="customer.company" id="company" class="w-full" />
                      <Message
                        v-if="$field?.invalid"
                        severity="error"
                        size="small"
                        variant="simple"
                      >
                        {{ $field.error?.message }}
                      </Message>
                    </FloatLabel>
                  </FormField>
                </div>
              </div>

              <div class="flex flex-col space-y-10 flew-wrap justify-around">
                <div>
                  <FormField v-slot="$field" name="balance" :initial-value="customer.balance">
                    <FloatLabel>
                      <label for="balance" class="block text-sm font-medium mb-1">Balance</label>
                      <InputNumber
                        v-model="customer.balance"
                        id="balance"
                        mode="currency"
                        currency="USD"
                        locale="en-US"
                        class="w-full"
                      />
                      <Message
                        v-if="$field?.invalid"
                        severity="error"
                        size="small"
                        variant="simple"
                      >
                        {{ $field.error?.message }}
                      </Message>
                    </FloatLabel>
                  </FormField>
                </div>
                <div>
                  <FormField v-slot="$field" name="status" :initial-value="customer.status">
                    <FloatLabel>
                      <label for="status" class="block text-sm font-medium mb-1">Statut</label>
                      <Dropdown
                        size="large"
                        v-model="customer.status"
                        id="status"
                        :options="statusOptions"
                        optionLabel="label"
                        optionValue="value"
                        placeholder="Sélectionnez un statut"
                        class="w-full"
                      />
                      <Message
                        v-if="$field?.invalid"
                        severity="error"
                        size="small"
                        variant="simple"
                      >
                        {{ $field.error?.message }}
                      </Message>
                    </FloatLabel>
                  </FormField>
                </div>
              </div>
            </div>
          </section>

          <Divider layout="vertical" />

          <!-- Dates et Activité -->
          <section class="mb-6 w-1/2">
            <h2 class="text-lg font-semibold mb-2">Dates et Activité</h2>
            <div class="flex flex-col space-y-10">
              <div>
                <FormField v-slot="$field" name="date" :initial-value="customer.date">
                  <label for="date" class="block text-sm font-medium mb-1">Date</label>
                  <DatePicker v-model="customer.date" id="date" showTime class="w-full" />
                  <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
                    {{ $field.error?.message }}
                  </Message>
                </FormField>
              </div>
              <div>
                <FormField v-slot="$field" name="activity" :initialValue="customer.activity">
                  <label for="activity" class="block text-sm font-medium mb-4"
                    >Niveau d'activité</label
                  >
                  <Slider
                    v-model="customer.activity"
                    id="activity"
                    :min="0"
                    :max="100"
                    class="w-full"
                  />
                  <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
                    {{ $field.error?.message }}
                  </Message>
                </FormField>
              </div>
            </div>
          </section>
        </div>

        <div class="flex flex-wrap justify-around w-full">
          <!-- Informations sur le pays -->
          <section class="mb-6">
            <h2 class="text-lg font-semibold mb-2">Pays</h2>
            <div class="">
              <div>
                <FormField v-slot="$field" name="country.name" :initial-value="customer.country.name">
                  <label for="country" class="block text-sm font-medium mb-1">Pays</label>
                  <Dropdown
                    v-model="customer.country.name"
                    id="country"
                    :options="countries"
                    optionLabel="name"
                    optionValue="name"
                    placeholder="Sélectionnez un pays"
                    class="w-full"
                  />
                  <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
                    {{ $field.error?.message }}
                  </Message>
                </FormField>
              </div>
            </div>
          </section>

          <!-- Informations sur le représentant -->
          <section class="mb-6">
            <h2 class="text-lg font-semibold mb-2">Représentant</h2>
            <div>
              <FormField v-slot="$field" name="representative" :initialValue="customer.representative.name">
                <label for="representative" class="block text-sm font-medium mb-1"
                  >Représentant</label
                >
                <Select
                  v-model="customer.representative"
                  id="representative"
                  :options="representatives"
                  filter
                  optionLabel="name"
                  placeholder="Sélectionnez un représentant"
                  class="w-full"
                >
                  <template #option="slotProps">
                    <div class="flex items-center">
                      <img
                        :src="`https://primefaces.org/cdn/primevue/images/avatar/${slotProps.option.image}`"
                        alt="avatar"
                        class="w-8 h-8 rounded-full mr-2"
                      />
                      <div>{{ slotProps.option.name }}</div>
                    </div>
                  </template>
                </Select>
                <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
                  {{ $field.error?.message }}
                </Message>
              </FormField>
            </div>
          </section>
        </div>
      </div>
      <div class="flex w-full justify-end">
        <div class="flex flex-col space-y-4">
          <!-- Vérification -->
          <section class="flex">
            <FormField v-slot="$field" name="verified" :initialValue="customer.verified">
              <ToggleSwitch v-model="customer.verified" id="verified" />
              <label for="verified" class="ml-2 text-sm font-medium">Vérifié</label>
              <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
                {{ $field.error?.message }}
              </Message>
            </FormField>
          </section>
          <Button severity="success" label="Enregistrer" type="submit" />
        </div>
      </div>
    </Form>
  </Dialog>
</template>


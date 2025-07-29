<script setup lang="ts">
import {type Customers, defaultCustomer} from '@/exampleModules/customers/types/customers'
import {ref} from "vue";
import {statusOptions} from "@/exampleModules/customers/constants/customers";
import {watchImmediate} from "@vueuse/core";

const props = defineProps({
  customer: {
    type: Object as () => Customers,
    default: defaultCustomer,
  },
})

const customer = ref(props.customer)

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
</script>

<template>
  <!-- Conteneur principal centré -->
  <div class="flex justify-center">

  <!-- Section principale du formulaire -->
  <section class="lg:w-1/2">
    <h2 class="text-lg font-semibold mb-8">Informations Personnelles</h2>
    <!-- Grille responsive pour organiser les champs du formulaire -->
    <div class="flex flex-row flex-wrap justify-evenly gap-y-8">
      <!-- Colonne 1 : Nom et Société -->
      <div class="flex flex-col gap-y-8 w-full lg:w-4/12">
          <!-- Champ Nom avec validation -->
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
        <!-- Champ Société avec validation -->
        <div>
          <FormField v-slot="$field" name="company" :initial-value="customer.company">
            <FloatLabel>
              <label for="company" class="block text-sm font-medium mb-1">Société</label>
              <InputText v-model="customer.company" id="company" class="w-full"/>
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
      <!-- Colonne 2 : Balance et Statut -->
      <div class="flex flex-col gap-y-8 flex-wrap w-full lg:w-4/12">
          <!-- Champ Balance avec format monétaire -->
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
          <!-- Champ Statut avec menu déroulant -->
          <FormField v-slot="$field" name="status" :initial-value="customer.status">
            <FloatLabel>
              <label for="status" class="block text-sm font-medium mb-1">Statut</label>
              <Dropdown
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
  </section>
  </div>

  <div class="absolute end-4 bottom-4">
    <Button>
      <RouterLink to="/tp1">Exercice</RouterLink>
    </Button>
  </div>
</template>

<style scoped>

</style>
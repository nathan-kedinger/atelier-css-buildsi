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
  <div class="">
    <!-- Section principale du formulaire : structure de base -->
    <section class="">
      <h2 class="">Informations Personnelles</h2>
      <!-- Grille pour organiser les champs du formulaire -->
      <div class="">
        <!-- Colonne 1 : Nom et Société -->
        <div class="">
          <!-- Champ Nom avec validation et label flottant -->
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
          <!-- Champ Société avec validation et label flottant -->
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
        <div class="">
          <!-- Champ Balance avec format monétaire et validation -->
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
          <!-- Champ Statut avec menu déroulant et validation -->
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
      <RouterLink to="/tp1-correction">Correction</RouterLink>
    </Button>
  </div>
</template>

<style scoped>

</style>
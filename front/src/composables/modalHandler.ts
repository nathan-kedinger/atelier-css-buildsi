import { ref } from 'vue'

export function useModalHandler(callbackOnClose?: () => {}) {
  const isDialogOpened = ref(false)
  const openModal = () => {
    isDialogOpened.value = true
  }
  const closeModal = (refresh: boolean = false) => {
    isDialogOpened.value = false
    if (refresh) {
      callbackOnClose?.()
    }
  }

  return { isDialogOpened, openModal, closeModal }
}

export function useCloseModal(emit: (e: 'close', refresh: boolean) => void, timeout: number = 500) {
  const modal = ref(true)
  const close = (forceRefresh: boolean) => {
    modal.value = false
    // Laisse le temps de l'animation de fermeture de la modale
    setTimeout(() => emit('close', forceRefresh), timeout)
  }
  return { close, modal }
}

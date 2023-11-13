<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-6"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900 mb-3"
              >
                Menu
              </DialogTitle>
              <!-- <div class="mt-2">
                <p class="text-sm text-gray-500">
                  Your payment has been successfully submitted. We’ve sent you
                  an email with all of the details of your order.
                </p>
              </div> -->
              <div class="flex flex-col space-y-4">
                <div>
                  <button class="route-btn" @click="changeRoute('/')">
                    Home
                  </button>
                </div>
                <div>
                  <button class="route-btn" @click="changeRoute('/shop')">
                    Shop
                  </button>
                </div>
                <div>
                  <button class="route-btn" @click="changeRoute('#')">
                    Pages
                  </button>
                </div>
                <div>
                  <button class="route-btn" @click="changeRoute('#')">
                    Blog
                  </button>
                </div>
                <div>
                  <button class="route-btn" @click="changeRoute('contact')">
                    Contact
                  </button>
                </div>
                <div>
                  <button v-if="user" class="route-btn" @click="onSignout">
                    Sign out
                  </button>
                  <button
                    v-else
                    class="route-btn"
                    @click="changeRoute('signin')"
                  >
                    Sign In
                  </button>
                </div>
                <div v-if="user && user.role === 'admin'">
                  <button class="route-btn" @click="changeRoute('admin')">
                    Dashboard
                  </button>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref } from "vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import { useRouter } from "vue-router";
import auth from "../stores/auth/auth";

// const isOpen = ref(true);
const props = defineProps(["isOpen", "user"]);
const emit = defineEmits(["closeModal", "openModal"]);

function closeModal() {
  //   isOpen.value = false;
  emit("closeModal");
}
function openModal() {
  //   isOpen.value = true;
  emit("openModal");
}
const router = useRouter();
const changeRoute = (route) => {
  emit("closeModal");
  router.push(`${route}`);
};

const { logout } = auth();
const onSignout = async () => {
  emit("closeModal");
  if (confirm("Are you sure want to sign out?")) {
    await logout();
    router.push("/");
  }
};
</script>

<style lang="scss" scoped>
.route-btn {
  @apply text-secondary font-medium hover:text-gray-800;
}
</style>

<template>
  <div class="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl">
    <h1 class="text-2xl font-bold mb-6 text-blue-600 text-center">User Tasks</h1>

    <!-- Form -->
    <form @submit.prevent="addTask" class="flex flex-col md:flex-row gap-3 mb-6">
      <input
        v-model="newTask.name"
        placeholder="Task Name"
        required
        class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        v-model="newTask.description"
        placeholder="Task Description"
        required
        class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        class="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
      >
        Add Task
      </button>
    </form>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead class="bg-blue-100 text-left">
          <tr>
            <th class="px-4 py-2 font-semibold text-gray-700">Task Name</th>
            <th class="px-4 py-2 font-semibold text-gray-700">Task Description</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in tasks" :key="task.id" class="odd:bg-white even:bg-gray-50">
            <td class="px-4 py-2 border-t">{{ task.name }}</td>
            <td class="px-4 py-2 border-t">{{ task.description }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTask: {
        name: '',
        description: '',
      },
      tasks: [],
    }
  },
  methods: {
    addTask() {
      const task = {
        id: Date.now(),
        name: this.newTask.name,
        description: this.newTask.description,
      }
      this.tasks.push(task)
      this.newTask.name = ''
      this.newTask.description = ''
    },
  },
}
</script>

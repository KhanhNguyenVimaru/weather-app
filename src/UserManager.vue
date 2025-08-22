<template>
  <div class="user-manager">
    <h2>Quản lý người dùng</h2>
    <form @submit.prevent="addUser">
      <input v-model="newUser.name" placeholder="Tên người dùng" required />
      <input v-model="newUser.email" placeholder="Email" required />
      <button type="submit">Thêm</button>
    </form>
    <ul>
      <li v-for="(user, index) in users" :key="index">
        <span v-if="editIndex !== index">{{ user.name }} - {{ user.email }}</span>
        <span v-else>
          <input v-model="editUser.name" />
          <input v-model="editUser.email" />
        </span>
        <button v-if="editIndex !== index" @click="startEdit(index)">Sửa</button>
        <button v-if="editIndex === index" @click="saveEdit(index)">Lưu</button>
        <button @click="deleteUser(index)">Xóa</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      newUser: { name: '', email: '' },
      editIndex: null,
      editUser: { name: '', email: '' },
    }
  },
  methods: {
    addUser() {
      this.users.push({ ...this.newUser })
      this.newUser.name = ''
      this.newUser.email = ''
    },
    deleteUser(index) {
      this.users.splice(index, 1)
    },
    startEdit(index) {
      this.editIndex = index
      this.editUser = { ...this.users[index] }
    },
    saveEdit(index) {
      this.users[index] = { ...this.editUser }
      this.editIndex = null
    },
  },
}
</script>

<style scoped>
.user-manager {
  max-width: 400px;
  margin: 40px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}
.user-manager input {
  margin: 4px;
}
.user-manager button {
  margin-left: 4px;
}
</style>

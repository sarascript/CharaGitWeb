class User {
    constructor (id, datos) {
      this.id = id
      this.email = datos.Email
      this.username = datos.Username
      this.avatar = datos.Image
      this.bio = datos.Bio
    }
  }

export default {
    computed: {
        setUser(id, datosUser) {
            props_docuser = new User(id, datosUser)
        }
    },
    data() {
        return {
            props_blIsLoggedIn: false,
            props_objuser: {},
            props_docuser: {}
        }
    }
}
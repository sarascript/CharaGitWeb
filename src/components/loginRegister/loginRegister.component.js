export default {
  name: 'login-register',
  components: {}, 
  props: [],
  data () {
    return {
      blLoginVisible: true
    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    btnSignin1: function(event) {
      this.blLoginVisible = false
    },
    btnCancel: function(event) {
      this.blLoginVisible = true
    }
  }
}

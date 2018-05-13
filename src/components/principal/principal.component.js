import myHeader from '@/components/myHeader'
import loginRegister from '@/components/loginRegister'
import users from '@/components/users'
import { EventBus } from '../../events/events_bus';

export default {
  name: 'principal',
  components: {'loginregister':loginRegister, 'myheader':myHeader, 'users':users}, 
  props: [],
  data () {
    return {
      blLoggedUser:this.props_blIsLoggedIn
    }
  },
  computed: {

  },
  mounted () {
    EventBus.$on('loginRegister_userStateChanged', blState => {
      this.blLoggedUser = blState
    });
  },
  methods: {

  }
}

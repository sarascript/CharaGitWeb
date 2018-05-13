import { EventBus } from '../../events/events_bus';
import firebase, { firestore } from 'firebase'

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
  name: 'users',
  components: {}, 
  props: [],
  data () {
    return {
      users: []
    }
  },
  created: function() {

  },
  computed: {

  },
  mounted () {
    EventBus.$on('loginRegister_userStateChanged', blState => {
      //this.blLoggedUser = blState
      if (blState) {
        this.downloadUsers()
      }
    });
  },
  methods: {
    downloadUsers: function() {
      var that=this
      firebase.firestore().collection("Users").onSnapshot(function(querySnapshot) {
        that.users = []
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          that.users.push(new User(doc.id, doc.data()))
        });
      });
    }

  }
}

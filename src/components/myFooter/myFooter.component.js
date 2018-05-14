import firebase from 'firebase'
import { EventBus } from '../../events/events_bus';

export default {
  name: 'my-footer',
  components: {}, 
  props: [],
  data () {
    return {
      blLoginVisible: true,
    }
  },
  created: function() {
    firebase.auth().onAuthStateChanged((user) => {
      this.props_objuser = user
      if (user) {
        this.props_blIsLoggedIn = true
        var docRef = firebase.firestore().collection("Users").doc(user.uid+"");
        docRef.get().then(function(doc) {
          if (doc.exists) {
              //console.log("Document data:", doc.data());
              this.setPerfil(doc.id, doc.data())
          } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
          }
      }).catch(function(error) {
          console.log("Error getting document:", error);
      });
      } else {
        this.props_blIsLoggedIn = false
      }
      EventBus.$emit('loginRegister_userStateChanged', this.props_blIsLoggedIn)

    });
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    btnLogout: function(event) {
      firebase.auth().signOut()
    }
  }
}

import firebase from 'firebase'
import { EventBus } from '../../events/events_bus';

export default {
  name: 'login-register',
  components: {}, 
  props: [],
  data () {
    return {
      blLoginVisible: true,
      sLoginEmail: '',
      sLoginPassword: '',
      sRegisterEmail: '',
      sRegisterPassword: ''
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
    btnSignin1: function(event) {
      this.blLoginVisible = false
    },
    btnCancel: function(event) {
      this.blLoginVisible = true
    },
    btnLogin: function(event) {
      firebase.auth().signInWithEmailAndPassword(this.sLoginEmail,this.sLoginPassword).then(
        function(user) {
          //alert("You have log in with user " + user.name)
        },
        function(err) {
          alert("Error in login -> " + err)
        }
      );
    },
    btnRegister: function(event) {
      firebase.auth().createUserWithEmailAndPassword(this.sRegisterEmail, this.sRegisterPassword).then(
        function(user) {
          alert("Your account was created " + user.name)
          var docRef = firebase.firestore().collection("Users")
          docRef.doc(user.uid+"").set({Username:"Hola",Name:"Hola",Bio:"hola"})
        },
        function(err) {
          alert("Error in register -> " + err)
        }
      );
    },
    btnLogout: function(event) {
      firebase.auth().signOut()
    }
  }
}
